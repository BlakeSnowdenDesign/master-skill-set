import { useEffect, useRef } from "react";
// @ts-ignore Shared plain JS module is also embedded by the Wix exporter.
import { headerMarkup, initHeader } from "@/header-shared.mjs";
import "@/header.css";

export default function StudioHeader({ open = false, previewBase }: { open?: boolean; previewBase?: string }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!host.current) return;
    return initHeader(host.current, { open });
  }, [open]);
  return <div ref={host} dangerouslySetInnerHTML={{ __html: headerMarkup({ previewBase }) }} />;
}
