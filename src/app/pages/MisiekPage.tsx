import React, { useRef, useState } from "react";
import { Download, Eye, Settings } from "lucide-react";
import { MisiekPoster } from "../components/posters/MisiekPoster";
import { ConfigPanel } from "../components/config/ConfigPanel";
import { usePosterConfig } from "../components/posters/shared/usePosterConfig";
import { usePosterExport } from "../components/posters/shared/usePosterExport";
import { misiekConfig } from "../components/posters/configs/misiekConfig";

export default function MisiekPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "config">("preview");
  const posterRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const {
    config,
    updateConfig,
    updateHeat,
    addHeat,
    removeHeat,
    addCustomText,
    updateCustomText,
    removeCustomText,
    moveCustomText,
    setConfig,
  } = usePosterConfig(misiekConfig.defaultConfig);

  const { exporting, exportPoster } = usePosterExport();

  const handleExport = async () => {
    await exportPoster(exportRef, `${config.teamName.replace(/\s+/g, "_")}_wyniki.png`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#05080f",
        fontFamily: "'Barlow Condensed', sans-serif",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TOP NAV */}
      <header
        style={{
          background: "rgba(4,8,22,0.95)",
          borderBottom: "1px solid rgba(30,109,181,0.3)",
          padding: "0 24px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 6,
              height: 32,
              background: "linear-gradient(to bottom, #f5c518, #1e6db5)",
              borderRadius: 3,
            }}
          />
          <div>
            <div
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              Speedway Poster Builder
            </div>
            <div
              style={{
                color: "#1e6db5",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Misiek Racing Edition
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {/* Mobile tab switcher */}
          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.05)",
              borderRadius: 8,
              padding: 2,
              gap: 2,
            }}
            className="lg-hidden"
          >
            {(["preview", "config"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  background: activeTab === tab ? "rgba(30,109,181,0.8)" : "transparent",
                  color: activeTab === tab ? "#fff" : "#6b8aaa",
                  transition: "all 0.2s",
                }}
              >
                {tab === "preview" ? <Eye size={14} /> : <Settings size={14} />}
                {tab === "preview" ? "Podgląd" : "Ustawienia"}
              </button>
            ))}
          </div>

          {/* Export button */}
          <button
            onClick={handleExport}
            disabled={exporting}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 20px",
              borderRadius: 8,
              border: "none",
              cursor: exporting ? "not-allowed" : "pointer",
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "'Barlow Condensed', sans-serif",
              background: exporting ? "rgba(30,109,181,0.4)" : "linear-gradient(135deg, #1e6db5, #0d3a6e)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(30,109,181,0.4)",
              transition: "all 0.2s",
            }}
          >
            <Download size={15} />
            {exporting ? "Eksportowanie..." : "Pobierz PNG"}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* LEFT: POSTER PREVIEW */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
            background: "radial-gradient(ellipse at center, rgba(30,109,181,0.06) 0%, transparent 70%)",
            overflow: "auto",
          }}
          className={activeTab === "config" ? "mobile-hidden" : ""}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                boxShadow:
                  "0 0 0 1px rgba(30,109,181,0.2), 0 0 60px rgba(30,109,181,0.15), 0 24px 80px rgba(0,0,0,0.8)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <MisiekPoster ref={posterRef} config={config} scale={1} isExporting={false} onCustomTextMove={moveCustomText} />
            </div>

            <div
              style={{
                color: "#4a6a8a",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Podgląd · Eksport w pełnej rozdzielczości
            </div>
          </div>
        </div>

        {/* RIGHT: CONFIG PANEL */}
        <div
          style={{
            width: 360,
            flexShrink: 0,
            background: "rgba(4,8,22,0.97)",
            borderLeft: "1px solid rgba(30,109,181,0.2)",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
          className={activeTab === "preview" ? "desktop-right-panel mobile-hidden" : "desktop-right-panel"}
        >
          <ConfigPanel
            config={config}
            riderConfig={misiekConfig}
            updateConfig={updateConfig}
            updateHeat={updateHeat}
            addHeat={addHeat}
            removeHeat={removeHeat}
            addCustomText={addCustomText}
            updateCustomText={updateCustomText}
            removeCustomText={removeCustomText}
            setConfig={setConfig}
          />
        </div>
      </div>

      {/* Hidden export element at 4x scale */}
      <div
        style={{
          position: "fixed",
          top: -99999,
          left: -99999,
          visibility: exporting ? "visible" : "hidden",
          pointerEvents: "none",
        }}
      >
        <MisiekPoster ref={exportRef} config={config} scale={4} isExporting={true} />
      </div>
    </div>
  );
}
