import { useState, RefObject } from "react";
import html2canvas from "html2canvas";

export function usePosterExport() {
  const [exporting, setExporting] = useState(false);

  const exportPoster = async (ref: RefObject<HTMLDivElement>, filename: string) => {
    if (!ref.current) return;

    setExporting(true);
    // Give React time to render the updated `isExporting` state and load fonts
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const canvas = await html2canvas(ref.current, {
        scale: 4,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#060b18",
        logging: false,
        letterRendering: true,
        removeContainer: true,
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          // Ensure fonts are loaded in cloned document
          const clonedElement = clonedDoc.querySelector('[data-export-target]');
          if (clonedElement instanceof HTMLElement) {
            clonedElement.style.fontFamily = "'Barlow Condensed', 'Oswald', sans-serif";
          }
        },
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
