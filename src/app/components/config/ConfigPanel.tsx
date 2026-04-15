import React from "react";
import { Plus, Trash2, Type } from "lucide-react";
import { PosterConfig, Heat, CustomText, RiderConfig } from "../posters/shared/types";
import { Field } from "./fields/Field";
import { SelectField } from "./fields/SelectField";
import { SectionTitle } from "./fields/SectionTitle";

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

interface ConfigPanelProps {
  config: PosterConfig;
  riderConfig: RiderConfig;
  updateConfig: (key: keyof PosterConfig, value: string) => void;
  updateHeat: (id: string, field: keyof Heat, value: string) => void;
  addHeat: () => void;
  removeHeat: (id: string) => void;
  addCustomText: () => void;
  updateCustomText: (id: string, field: keyof CustomText, value: string | number) => void;
  removeCustomText: (id: string) => void;
  setConfig: React.Dispatch<React.SetStateAction<PosterConfig>>;
}

export function ConfigPanel({
  config,
  riderConfig,
  updateConfig,
  updateHeat,
  addHeat,
  removeHeat,
  addCustomText,
  updateCustomText,
  removeCustomText,
  setConfig,
}: ConfigPanelProps) {
  return (
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
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SelectField
            label="Szablon grafiki"
            value={config.layoutId || riderConfig.layouts[0]?.id || "wynik"}
            onChange={(v) => {
              setConfig((c) => {
                const next = { ...c, layoutId: v };
                // Auto-update headers for MISIEK layouts
                if (riderConfig.riderId === "misiek") {
                  if (v === "match_day") {
                    if (c.headerLeft === "WYNIKI MECZU") next.headerLeft = "DZIEŃ MECZOWY";
                    if (c.headerRight === "MATCH RESULTS") next.headerRight = "MATCH DAY";
                  } else {
                    if (c.headerLeft === "DZIEŃ MECZOWY") next.headerLeft = "WYNIKI MECZU";
                    if (c.headerRight === "MATCH DAY") next.headerRight = "MATCH RESULTS";
                  }
                }
                return next;
              });
            }}
            options={riderConfig.layouts.map((layout) => ({
              id: layout.id,
              label: layout.label,
            }))}
          />
          <SelectField
            label="Proporcje"
            value={config.aspectRatio || "9:16"}
            onChange={(v) => updateConfig("aspectRatio", v)}
            options={[
              { id: "9:16", label: "9:16 (Story)" },
              { id: "1:1", label: "1:1 (Kwadrat)" },
              { id: "4:5", label: "4:5 (Instagram)" },
            ]}
          />
        </div>
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
            onChange={(v) => updateConfig("teamName", v)}
            placeholder="MISIEK RACING"
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {(["showHome", "showAway"] as const).map((key, i) => (
              <label
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  color: "#9ab8d8",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  userSelect: "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={config[key] ?? true}
                  onChange={(e) => setConfig((c) => ({ ...c, [key]: e.target.checked }))}
                  style={{ accentColor: "#1e6db5", width: 15, height: 15 }}
                />
                {i === 0 ? "Gospodarze" : "Goście"}
              </label>
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}
          >
            <Field
              label="Wynik (Gosp.)"
              value={config.scoreHome}
              onChange={(v) => updateConfig("scoreHome", v)}
              placeholder="45"
              type="number"
            />
            <Field
              label="Wynik (Goście)"
              value={config.scoreAway}
              onChange={(v) => updateConfig("scoreAway", v)}
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
              onChange={(v) => updateConfig("homeLogoId", v)}
              options={CLUB_LOGOS}
            />
            <SelectField
              label="Logo gości"
              value={config.awayLogoId || "none"}
              onChange={(v) => updateConfig("awayLogoId", v)}
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
              onChange={(v) => updateConfig("homeTeamName", v)}
              placeholder="Włókniarz"
            />
            <Field
              label="Nazwa gości"
              value={config.awayTeamName || ""}
              onChange={(v) => updateConfig("awayTeamName", v)}
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
            onChange={(v) => updateConfig("headerLeft", v)}
            placeholder={config.layoutId === "match_day" ? "DZIEŃ MECZOWY" : "WYNIKI MECZU"}
          />
          <Field
            label="Tytuł (EN)"
            value={config.headerRight}
            onChange={(v) => updateConfig("headerRight", v)}
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
              fontFamily: "'Barlow Condensed', sans-serif",
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
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#e05050")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b3030")}
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
                    onChange={(e) => updateHeat(heat.id, "name", e.target.value)}
                    style={{
                      background: "rgba(30,109,181,0.08)",
                      border: "1px solid rgba(30,109,181,0.25)",
                      borderRadius: 5,
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 700,
                      fontFamily: "'Barlow Condensed', sans-serif",
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
                    onChange={(e) => updateHeat(heat.id, "scoreHome", e.target.value)}
                    style={{
                      background: "rgba(30,109,181,0.08)",
                      border: "1px solid rgba(30,109,181,0.25)",
                      borderRadius: 5,
                      color: /[a-zA-Z]/.test(heat.scoreHome) ? "#ff4444" : "#f5c518",
                      fontSize: 15,
                      fontWeight: 900,
                      fontFamily: "'Barlow Condensed', sans-serif",
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
          {riderConfig.backgrounds.map((opt) => {
            const isSelected = (config.backgroundImageId || riderConfig.backgrounds[0]?.id) === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => updateConfig("backgroundImageId", opt.id)}
                style={{
                  padding: 0,
                  border: isSelected ? "2px solid #f5c518" : "2px solid rgba(30,109,181,0.25)",
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
                    background: isSelected ? "rgba(245,197,24,0.85)" : "rgba(4,8,22,0.75)",
                    padding: "3px 6px",
                    textAlign: "center",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: isSelected ? "#060b18" : "#9ab8d8",
                    fontFamily: "'Barlow Condensed', sans-serif",
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
          onChange={(v) => updateConfig("hashtag", v)}
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
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#e05050")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b3030")}
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <Field label="Treść" value={ct.text} onChange={(v) => updateCustomText(ct.id, "text", v)} placeholder="Wpisz tekst..." />
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
                    onChange={(e) => updateCustomText(ct.id, "fontSize", parseInt(e.target.value))}
                    style={{ width: "100%", accentColor: "#1e6db5" }}
                  />
                  <span style={{ color: "#6b8aaa", fontSize: 11, textAlign: "center" }}>{ct.fontSize}px</span>
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
                    onChange={(e) => updateCustomText(ct.id, "fontWeight", parseInt(e.target.value))}
                    style={{ width: "100%", accentColor: "#1e6db5" }}
                  />
                  <span style={{ color: "#6b8aaa", fontSize: 11, textAlign: "center" }}>{ct.fontWeight}</span>
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
                  {["#ffffff", "#f5c518", "#1e6db5", "#2e8de0", "#ff4444", "#00ff88"].map((color) => (
                    <button
                      key={color}
                      onClick={() => updateCustomText(ct.id, "color", color)}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        border: ct.color === color ? "2px solid #fff" : "2px solid rgba(255,255,255,0.15)",
                        background: color,
                        cursor: "pointer",
                        transition: "border-color 0.2s",
                      }}
                    />
                  ))}
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
    </div>
  );
}
