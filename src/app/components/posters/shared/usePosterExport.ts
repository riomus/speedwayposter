import { useState, RefObject } from "react";
import html2canvas from "html2canvas";

export function usePosterExport() {
  const [exporting, setExporting] = useState(false);

  const exportPoster = async (ref: RefObject<HTMLDivElement>, filename: string) => {
    if (!ref.current) return;

    setExporting(true);
    // Give React time to render the updated `isExporting` state and load fonts
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const canvas = await html2canvas(ref.current, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        windowWidth: ref.current.scrollWidth,
        windowHeight: ref.current.scrollHeight,
      });

      const link = document.createElement("a");
      link.download = filename;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setExporting(false);
    }
  };

  return { exporting, exportPoster };
}
