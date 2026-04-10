import React, { useRef, useState, useCallback } from "react";
import html2canvas from "html2canvas";
import {
  Plus,
  Trash2,
  Download,
  Settings,
  Eye,
  Image,
  Type,
} from "lucide-react";
import {
  SpeedwayPoster,
  PosterConfig,
  Heat,
  CustomText,
} from "./components/SpeedwayPoster";
import "../styles/fonts.css";
import bgThumb1 from "../assets/a9f444eda0b68d242315e46ad4c961ed74f42334.png";
import bgThumb2 from "../assets/633cb56e126361bd8bafb54b2dc4059b83ba5b67.png";
import bgThumb3 from "../assets/a58ea5c412dbad40193fcd735703fe4be406ebd5.png";
import bgThumb4 from "../assets/5bb7d630512919f24bd2c3a692eb7f93e17f393a.png";
import bgThumb5 from "../assets/bg/bg5.png";
import bgThumb6 from "../assets/bg/bg6.png";
import bgThumb7 from "../assets/bg/bg7.png";
import bgThumb8 from "../assets/bg/bg8.png";
import bgThumb9 from "../assets/bg/bg9.png";

const BG_OPTIONS = [
  { id: "1", label: "Oryginalny", thumb: bgThumb1 },
  { id: "2", label: "Niebieski akcja", thumb: bgThumb2 },
  { id: "3", label: "Złoty efekt", thumb: bgThumb3 },
  { id: "4", label: "Złoto-niebieski", thumb: bgThumb4 },
  { id: "5", label: "Wariant 5", thumb: bgThumb5 },
  { id: "6", label: "Wariant 6", thumb: bgThumb6 },
  { id: "7", label: "Wariant 7", thumb: bgThumb7 },
  { id: "8", label: "Wariant 8", thumb: bgThumb8 },
  { id: "9", label: "Wariant 9", thumb: bgThumb9 },
];

const CLUB_LOGOS = [
  { id: "none", label: "Brak" },
  { id: "CZE", label: "Włókniarz Częstochowa" },
  { id: "GOR", label: "Stal Gorzów" },
  { id: "GRU", label: "GKM Grudziądz" },
  { id: "LES", label: "Unia Leszno" },
  { id: "LUB", label: "Motor Lublin" },
  { id: "TOR", label: "Apator Toruń" },
  { id: "WRO", label: "Sparta Wrocław" },
  { id: "ZIE", label: "Falubaz Zielona Góra" },
];

const defaultHeats: Heat[] = [
  { id: "1", name: "BIEG 1", scoreHome: "3" },
  { id: "2", name: "BIEG 2", scoreHome: "3" },
  { id: "3", name: "BIEG 3", scoreHome: "2" },
  { id: "4", name: "BIEG 4", scoreHome: "1" },
  { id: "5", name: "BIEG 5", scoreHome: "0" },
];

const defaultConfig: PosterConfig = {
  teamName: "MISIEK RACING",
  scoreHome: "45",
  scoreAway: "45",
  homeTeamName: "WŁÓKNIARZ",
  awayTeamName: "SPARTA",
  heats: defaultHeats,
  hashtag: "MISIEKRACING",
  matchInfo: "",
  headerLeft: "WYNIKI MECZU",
  headerRight: "MATCH RESULTS",
  backgroundImageId: "1",
  homeLogoId: "none",
  awayLogoId: "none",
  layoutId: "wynik",
  customTexts: [],
};

function generateId() {
  return Math.random().toString(36).slice(2);
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: FieldProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <label
        style={{
          color: "#9ab8d8",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontFamily: "'Barlow Condensed', sans-serif",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          background: "rgba(30,109,181,0.08)",
          border: "1px solid rgba(30,109,181,0.3)",
          borderRadius: 6,
          color: "#ffffff",
          fontSize: 14,
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 600,
          padding: "8px 12px",
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) =>
          (e.target.style.borderColor = "#1e6db5")
        }
        onBlur={(e) =>
          (e.target.style.borderColor = "rgba(30,109,181,0.3)")
        }
      />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: SelectFieldProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <label
        style={{
          color: "#9ab8d8",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontFamily: "'Barlow Condensed', sans-serif",
        }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: "rgba(30,109,181,0.08)",
          border: "1px solid rgba(30,109,181,0.3)",
          borderRadius: 6,
          color: "#ffffff",
          fontSize: 14,
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 600,
          padding: "8px 12px",
          outline: "none",
          transition: "border-color 0.2s",
          appearance: "none",
        }}
        onFocus={(e) =>
          (e.target.style.borderColor = "#1e6db5")
        }
        onBlur={(e) =>
          (e.target.style.borderColor = "rgba(30,109,181,0.3)")
        }
      >
        {options.map((opt) => (
          <option key={opt.id} value={opt.id} style={{ background: "#060b18", color: "#fff" }}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
        marginTop: 4,
      }}
    >
      <div
        style={{
          width: 3,
          height: 16,
          background:
            "linear-gradient(to bottom, #f5c518, #1e6db5)",
          borderRadius: 2,
        }}
      />
      <span
        style={{
          color: "#ffffff",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontFamily: "'Barlow Condensed', sans-serif",
        }}
      >
        {children}
      </span>
    </div>
  );
}

export default function App() {
  const [config, setConfig] =
    useState<PosterConfig>(defaultConfig);
  const [exporting, setExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "preview" | "config"
  >("preview");
  const posterRef = useRef<HTMLDivElement>(null);

  const update = useCallback(
    (key: keyof PosterConfig, value: string) => {
      setConfig((c) => ({ ...c, [key]: value }));
    },
    [],
  );

  const updateHeat = useCallback(
    (id: string, field: keyof Heat, value: string) => {
      setConfig((c) => ({
        ...c,
        heats: c.heats.map((h) =>
          h.id === id ? { ...h, [field]: value } : h,
        ),
      }));
    },
    [],
  );

  const addHeat = useCallback(() => {
    setConfig((c) => ({
      ...c,
      heats: [
        ...c.heats,
        {
          id: generateId(),
          name: `BIEG ${c.heats.length + 1}`,
          scoreHome: "0",
        },
      ],
    }));
  }, []);

  const removeHeat = useCallback((id: string) => {
    setConfig((c) => ({
      ...c,
      heats: c.heats.filter((h) => h.id !== id),
    }));
  }, []);

  const addCustomText = useCallback(() => {
    setConfig((c) => ({
      ...c,
      customTexts: [
        ...(c.customTexts || []),
        {
          id: generateId(),
          text: "TEKST",
          x: 50,
          y: 50,
          fontSize: 24,
          color: "#ffffff",
          fontWeight: 800,
        },
      ],
    }));
  }, []);

  const updateCustomText = useCallback(
    (id: string, field: keyof CustomText, value: string | number) => {
      setConfig((c) => ({
        ...c,
        customTexts: (c.customTexts || []).map((ct) =>
          ct.id === id ? { ...ct, [field]: value } : ct,
        ),
      }));
    },
    [],
  );

  const removeCustomText = useCallback((id: string) => {
    setConfig((c) => ({
      ...c,
      customTexts: (c.customTexts || []).filter((ct) => ct.id !== id),
    }));
  }, []);

  const moveCustomText = useCallback((id: string, x: number, y: number) => {
    setConfig((c) => ({
      ...c,
      customTexts: (c.customTexts || []).map((ct) =>
        ct.id === id ? { ...ct, x, y } : ct,
      ),
    }));
  }, []);

  const handleExport = async () => {
    if (!posterRef.current) return;
    setExporting(true);
    // Give React time to render the updated `isExporting` state in the DOM before capturing.
    await new Promise((resolve) => setTimeout(resolve, 100));
    try {
      const canvas = await html2canvas(posterRef.current, {
        scale: 4,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#060b18",
      });
      const link = document.createElement("a");
      link.download = `${config.teamName.replace(/\s+/g, "_")}_wyniki.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setExporting(false);
    }
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
              background:
                "linear-gradient(to bottom, #f5c518, #1e6db5)",
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
                  background:
                    activeTab === tab
                      ? "rgba(30,109,181,0.8)"
                      : "transparent",
                  color: activeTab === tab ? "#fff" : "#6b8aaa",
                  transition: "all 0.2s",
                }}
              >
                {tab === "preview" ? (
                  <Eye size={14} />
                ) : (
                  <Settings size={14} />
                )}
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
              background: exporting
                ? "rgba(30,109,181,0.4)"
                : "linear-gradient(135deg, #1e6db5, #0d3a6e)",
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
            background:
              "radial-gradient(ellipse at center, rgba(30,109,181,0.06) 0%, transparent 70%)",
            overflow: "auto",
          }}
          className={
            activeTab === "config" ? "mobile-hidden" : ""
          }
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
              <SpeedwayPoster
                ref={posterRef}
                config={config}
                scale={1}
                isExporting={exporting}
                onCustomTextMove={moveCustomText}
              />
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
          className={
            activeTab === "preview"
              ? "desktop-right-panel mobile-hidden"
              : "desktop-right-panel"
          }
        >
          <div
            style={{
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Layout section */}
            <div>
              <SectionTitle>Wygląd / Layout</SectionTitle>
              <SelectField
                label="Szablon grafiki"
                value={config.layoutId || "wynik"}
                onChange={(v) => {
                  setConfig((c) => {
                    const next = { ...c, layoutId: v };
                    if (v === "match_day") {
                      if (c.headerLeft === "WYNIKI MECZU") next.headerLeft = "DZIEŃ MECZOWY";
                      if (c.headerRight === "MATCH RESULTS") next.headerRight = "MATCH DAY";
                    } else {
                      if (c.headerLeft === "DZIEŃ MECZOWY") next.headerLeft = "WYNIKI MECZU";
                      if (c.headerRight === "MATCH DAY") next.headerRight = "MATCH RESULTS";
                    }
                    return next;
                  });
                }}
                options={[
                  { id: "wynik", label: "Wyniki (Wynik)" },
                  { id: "match_day", label: "Zapowiedź (Match Day)" },
                ]}
              />
              <SelectField
                label="Proporcje"
                value={config.aspectRatio || "9:16"}
                onChange={(v) => update("aspectRatio", v)}
                options={[
                  { id: "9:16", label: "9:16 (Story)" },
                  { id: "1:1", label: "1:1 (Kwadrat)" },
                  { id: "4:5", label: "4:5 (Instagram)" },
                ]}
              />
            </div>

            {/* Scores section */}
            <div>
              <SectionTitle>Dane meczu</SectionTitle>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <Field
                  label="Nazwa drużyny"
                  value={config.teamName}
                  onChange={(v) => update("teamName", v)}
                  placeholder="MISIEK RACING"
                />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                  }}
                >
                  <Field
                    label="Gospodarze"
                    value={config.scoreHome}
                    onChange={(v) => update("scoreHome", v)}
                    placeholder="45"
                    type="number"
                  />
                  <Field
                    label="Goście"
                    value={config.scoreAway}
                    onChange={(v) => update("scoreAway", v)}
                    placeholder="45"
                    type="number"
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                  }}
                >
                  <SelectField
                    label="Logo gospodarzy"
                    value={config.homeLogoId || "none"}
                    onChange={(v) => update("homeLogoId", v)}
                    options={CLUB_LOGOS}
                  />
                  <SelectField
                    label="Logo gości"
                    value={config.awayLogoId || "none"}
                    onChange={(v) => update("awayLogoId", v)}
                    options={CLUB_LOGOS}
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                  }}
                >
                  <Field
                    label="Nazwa gospodarzy"
                    value={config.homeTeamName || ""}
                    onChange={(v) => update("homeTeamName", v)}
                    placeholder="Włókniarz"
                  />
                  <Field
                    label="Nazwa gości"
                    value={config.awayTeamName || ""}
                    onChange={(v) => update("awayTeamName", v)}
                    placeholder="Sparta"
                  />
                </div>
              </div>
            </div>

            {/* Header section */}
            <div>
              <SectionTitle>Nagłówek</SectionTitle>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <Field
                  label="Tytuł (PL)"
                  value={config.headerLeft}
                  onChange={(v) => update("headerLeft", v)}
                  placeholder={config.layoutId === "match_day" ? "DZIEŃ MECZOWY" : "WYNIKI MECZU"}
                />
                <Field
                  label="Tytuł (EN)"
                  value={config.headerRight}
                  onChange={(v) => update("headerRight", v)}
                  placeholder={config.layoutId === "match_day" ? "MATCH DAY" : "MATCH RESULTS"}
                />
              </div>
            </div>

            {/* Heats section */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <SectionTitle>Biegi</SectionTitle>
                <button
                  onClick={addHeat}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 10px",
                    borderRadius: 6,
                    border: "1px solid rgba(30,109,181,0.4)",
                    background: "rgba(30,109,181,0.12)",
                    color: "#2e8de0",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontFamily:
                      "'Barlow Condensed', sans-serif",
                  }}
                >
                  <Plus size={13} />
                  Dodaj bieg
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {config.heats.map((heat, idx) => (
                  <div
                    key={heat.id}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(30,109,181,0.15)",
                      borderRadius: 8,
                      padding: "10px 12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          color: "#f5c518",
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        Bieg {idx + 1}
                      </span>
                      <button
                        onClick={() => removeHeat(heat.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#6b3030",
                          padding: 2,
                          borderRadius: 4,
                          display: "flex",
                          alignItems: "center",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                        ((
                          e.currentTarget as HTMLElement
                        ).style.color = "#e05050")
                        }
                        onMouseLeave={(e) =>
                        ((
                          e.currentTarget as HTMLElement
                        ).style.color = "#6b3030")
                        }
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto auto",
                        gap: 8,
                        alignItems: "end",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 3,
                        }}
                      >
                        <label
                          style={{
                            color: "#9ab8d8",
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}
                        >
                          Nazwa
                        </label>
                        <input
                          value={heat.name}
                          onChange={(e) =>
                            updateHeat(
                              heat.id,
                              "name",
                              e.target.value,
                            )
                          }
                          style={{
                            background: "rgba(30,109,181,0.08)",
                            border:
                              "1px solid rgba(30,109,181,0.25)",
                            borderRadius: 5,
                            color: "#fff",
                            fontSize: 13,
                            fontWeight: 700,
                            fontFamily:
                              "'Barlow Condensed', sans-serif",
                            padding: "6px 10px",
                            outline: "none",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 3,
                        }}
                      >
                        <label
                          style={{
                            color: "#9ab8d8",
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}
                        >
                          Twój
                        </label>
                        <input
                          type="text"
                          value={heat.scoreHome}
                          onChange={(e) =>
                            updateHeat(
                              heat.id,
                              "scoreHome",
                              e.target.value,
                            )
                          }
                          style={{
                            background: "rgba(30,109,181,0.08)",
                            border:
                              "1px solid rgba(30,109,181,0.25)",
                            borderRadius: 5,
                            color: /[a-zA-Z]/.test(
                              heat.scoreHome,
                            )
                              ? "#ff4444"
                              : "#f5c518",
                            fontSize: 15,
                            fontWeight: 900,
                            fontFamily:
                              "'Barlow Condensed', sans-serif",
                            padding: "6px 10px",
                            outline: "none",
                            width: 52,
                            textAlign: "center",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {config.heats.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      color: "#3a5a7a",
                      fontSize: 13,
                      padding: "20px 0",
                      fontStyle: "italic",
                    }}
                  >
                    Brak biegów. Kliknij "Dodaj bieg" aby dodać.
                  </div>
                )}
              </div>
            </div>

            {/* Background image section */}
            <div>
              <SectionTitle>Obraz tła</SectionTitle>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                {BG_OPTIONS.map((opt) => {
                  const isSelected =
                    (config.backgroundImageId || "1") ===
                    opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() =>
                        update(
                          "backgroundImageId" as keyof PosterConfig,
                          opt.id,
                        )
                      }
                      style={{
                        padding: 0,
                        border: isSelected
                          ? "2px solid #f5c518"
                          : "2px solid rgba(30,109,181,0.25)",
                        borderRadius: 8,
                        background: "none",
                        cursor: "pointer",
                        overflow: "hidden",
                        position: "relative",
                        transition: "border-color 0.2s",
                      }}
                    >
                      <img
                        src={opt.thumb}
                        alt={opt.label}
                        style={{
                          width: "100%",
                          height: 80,
                          objectFit: "cover",
                          objectPosition: "center top",
                          display: "block",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: isSelected
                            ? "rgba(245,197,24,0.85)"
                            : "rgba(4,8,22,0.75)",
                          padding: "3px 6px",
                          textAlign: "center",
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: isSelected
                            ? "#060b18"
                            : "#9ab8d8",
                          fontFamily:
                            "'Barlow Condensed', sans-serif",
                          transition: "all 0.2s",
                        }}
                      >
                        {isSelected ? "✓ " : ""}
                        {opt.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Social section */}
            <div>
              <SectionTitle>Media społecznościowe</SectionTitle>
              <Field
                label="Hashtag (bez #)"
                value={config.hashtag}
                onChange={(v) => update("hashtag", v)}
                placeholder="MISIEKRACING"
              />
            </div>

            {/* Custom texts section */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <SectionTitle>Własny tekst</SectionTitle>
                <button
                  onClick={addCustomText}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 10px",
                    borderRadius: 6,
                    border: "1px solid rgba(30,109,181,0.4)",
                    background: "rgba(30,109,181,0.12)",
                    color: "#2e8de0",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontFamily: "'Barlow Condensed', sans-serif",
                  }}
                >
                  <Type size={13} />
                  Dodaj tekst
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {(config.customTexts || []).map((ct, idx) => (
                  <div
                    key={ct.id}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(30,109,181,0.15)",
                      borderRadius: 8,
                      padding: "10px 12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          color: "#f5c518",
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        Tekst {idx + 1}
                      </span>
                      <button
                        onClick={() => removeCustomText(ct.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#6b3030",
                          padding: 2,
                          borderRadius: 4,
                          display: "flex",
                          alignItems: "center",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.color = "#e05050")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.color = "#6b3030")
                        }
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <Field
                      label="Treść"
                      value={ct.text}
                      onChange={(v) => updateCustomText(ct.id, "text", v)}
                      placeholder="Wpisz tekst..."
                    />
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 8,
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <label
                          style={{
                            color: "#9ab8d8",
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            fontFamily: "'Barlow Condensed', sans-serif",
                          }}
                        >
                          Rozmiar
                        </label>
                        <input
                          type="range"
                          min={10}
                          max={80}
                          value={ct.fontSize}
                          onChange={(e) =>
                            updateCustomText(ct.id, "fontSize", parseInt(e.target.value))
                          }
                          style={{ width: "100%", accentColor: "#1e6db5" }}
                        />
                        <span style={{ color: "#6b8aaa", fontSize: 11, textAlign: "center" }}>
                          {ct.fontSize}px
                        </span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <label
                          style={{
                            color: "#9ab8d8",
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            fontFamily: "'Barlow Condensed', sans-serif",
                          }}
                        >
                          Grubość
                        </label>
                        <input
                          type="range"
                          min={100}
                          max={900}
                          step={100}
                          value={ct.fontWeight}
                          onChange={(e) =>
                            updateCustomText(ct.id, "fontWeight", parseInt(e.target.value))
                          }
                          style={{ width: "100%", accentColor: "#1e6db5" }}
                        />
                        <span style={{ color: "#6b8aaa", fontSize: 11, textAlign: "center" }}>
                          {ct.fontWeight}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      <label
                        style={{
                          color: "#9ab8d8",
                          fontSize: 10,
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          fontFamily: "'Barlow Condensed', sans-serif",
                        }}
                      >
                        Kolor
                      </label>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {["#ffffff", "#f5c518", "#1e6db5", "#2e8de0", "#ff4444", "#00ff88"].map(
                          (color) => (
                            <button
                              key={color}
                              onClick={() => updateCustomText(ct.id, "color", color)}
                              style={{
                                width: 28,
                                height: 28,
                                borderRadius: 6,
                                border:
                                  ct.color === color
                                    ? "2px solid #fff"
                                    : "2px solid rgba(255,255,255,0.15)",
                                background: color,
                                cursor: "pointer",
                                transition: "border-color 0.2s",
                              }}
                            />
                          ),
                        )}
                        <input
                          type="color"
                          value={ct.color}
                          onChange={(e) => updateCustomText(ct.id, "color", e.target.value)}
                          style={{
                            width: 28,
                            height: 28,
                            border: "2px solid rgba(255,255,255,0.15)",
                            borderRadius: 6,
                            background: "none",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {(config.customTexts || []).length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      color: "#3a5a7a",
                      fontSize: 13,
                      padding: "12px 0",
                      fontStyle: "italic",
                    }}
                  >
                    Przeciągnij tekst na plakacie aby zmienić pozycję.
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: "rgba(30,109,181,0.15)",
                margin: "0 -20px",
              }}
            />

            {/* Tips */}
            <div
              style={{
                background: "rgba(30,109,181,0.06)",
                border: "1px solid rgba(30,109,181,0.15)",
                borderRadius: 8,
                padding: "12px 14px",
              }}
            >
              <div
                style={{
                  color: "#2e8de0",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                💡 Wskazówka
              </div>
              <div
                style={{
                  color: "#6b8aaa",
                  fontSize: 12,
                  lineHeight: 1.5,
                }}
              >
                Pobierz plik PNG w wysokiej rozdzielczości
                gotowy do publikacji na Instagram, Facebook i
                inne platformy social media.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          opacity: 0.3;
        }
        @media (max-width: 768px) {
          .mobile-hidden { display: none !important; }
          .desktop-right-panel { width: 100% !important; border-left: none !important; }
        }
        @media (min-width: 769px) {
          .lg-hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}