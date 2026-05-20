import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply auth logic to /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next({ request });
  }

  // Guard: if Supabase env vars are missing, allow through to avoid crashing
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  try {
    const { data: { user } } = await supabase.auth.getUser();

    // Protect all /admin/* routes except /admin/login
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
      if (!user) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/admin/login";
        return NextResponse.redirect(loginUrl);
      }
    }

    // Redirect logged-in users away from /admin/login
    if (pathname === "/admin/login" && user) {
      const dashUrl = request.nextUrl.clone();
      dashUrl.pathname = "/admin/dashboard";
      return NextResponse.redirect(dashUrl);
    }
  } catch {
    // If auth check fails, redirect to login for safety
    if (pathname !== "/admin/login") {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*"],
};
