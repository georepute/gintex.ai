export default function GlobalMapPage() {
  return (
    <iframe
      src="/global-map.html"
      className="w-full border-0 block"
      style={{ height: "calc(100vh - 80px)", display: "block" }}
      title="GeoRepute World Intelligence Map"
      allowFullScreen
    />
  );
}
