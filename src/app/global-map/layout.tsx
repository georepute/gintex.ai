import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Intelligence Map — GeoRepute | Gintex AI",
};

export default function GlobalMapLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`body { overflow: hidden !important; }`}</style>
      {children}
    </>
  );
}
