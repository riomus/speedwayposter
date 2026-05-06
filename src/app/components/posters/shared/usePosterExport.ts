import { useState, RefObject } from "react";
import { toPng } from "html-to-image";

export function usePosterExport() {
  const [exporting, setExporting] = useState(false);

  const exportPoster = async (ref: RefObject<HTMLDivElement>, filename: string) => {
    if (!ref.current) return;

    setExporting(true);
    // Let React commit the `isExporting=true` render
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Make sure every webfont weight used in the posters is fully loaded.
    // Otherwise the snapshot can capture a frame using a fallback font with
    // different vertical metrics, shifting text positions.
    if (typeof document !== "undefined" && (document as any).fonts?.load) {
      try {
        const fonts = (document as any).fonts;
        await Promise.all([
          fonts.load(`400 16px "Barlow Condensed"`),
          fonts.load(`600 16px "Barlow Condensed"`),
          fonts.load(`700 16px "Barlow Condensed"`),
          fonts.load(`800 16px "Barlow Condensed"`),
          fonts.load(`900 16px "Barlow Condensed"`),
          fonts.load(`700 16px "Oswald"`),
        ]);
        await fonts.ready;
      } catch {
        /* ignore */
      }
    }
    await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));

    try {
      const node = ref.current;
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 1,
        width: node.offsetWidth,
        height: node.offsetHeight,
      });

      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setExporting(false);
    }
  };

  return { exporting, exportPoster };
}
