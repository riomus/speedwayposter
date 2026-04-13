import { useState, RefObject } from "react";
import html2canvas from "html2canvas";

export function usePosterExport() {
  const [exporting, setExporting] = useState(false);

  const exportPoster = async (ref: RefObject<HTMLDivElement>, filename: string) => {
    if (!ref.current) return;

    setExporting(true);
    // Give React time to render the updated `isExporting` state in the DOM before capturing.
    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      const canvas = await html2canvas(ref.current, {
        scale: 4,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#060b18",
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
