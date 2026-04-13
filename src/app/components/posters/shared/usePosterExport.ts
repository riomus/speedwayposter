import { useState, RefObject } from "react";
import domtoimage from "dom-to-image-more";

export function usePosterExport() {
  const [exporting, setExporting] = useState(false);

  const exportPoster = async (ref: RefObject<HTMLDivElement>, filename: string) => {
    if (!ref.current) return;

    setExporting(true);
    // Give React time to render the updated `isExporting` state and load fonts
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const dataUrl = await domtoimage.toPng(ref.current, {
        quality: 1.0,
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
