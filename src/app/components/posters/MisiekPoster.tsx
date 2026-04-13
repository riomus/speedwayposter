import React, { forwardRef, useCallback, useRef } from "react";
import { PosterProps, CustomText } from "./shared/types";
import logoImg from "../../../assets/7e44f37685ad3f3cf69ea7a3d89ed6e9c1d46460.png";
import riderImg1 from "../../../assets/a9f444eda0b68d242315e46ad4c961ed74f42334.png";
import riderImg2 from "../../../assets/633cb56e126361bd8bafb54b2dc4059b83ba5b67.png";
import riderImg3 from "../../../assets/a58ea5c412dbad40193fcd735703fe4be406ebd5.png";
import riderImg4 from "../../../assets/5bb7d630512919f24bd2c3a692eb7f93e17f393a.png";
import riderImg5 from "../../../assets/bg/bg5.png";
import riderImg6 from "../../../assets/bg/bg6.png";
import riderImg7 from "../../../assets/bg/bg7.png";
import riderImg8 from "../../../assets/bg/bg8.png";
import riderImg9 from "../../../assets/bg/bg9.png";

import logoCZE from "../../../assets/logos/CZE.png";
import logoGOR from "../../../assets/logos/GOR.png";
import logoGRU from "../../../assets/logos/GRU.png";
import logoLES from "../../../assets/logos/LES.png";
import logoLUB from "../../../assets/logos/LUB.png";
import logoTOR from "../../../assets/logos/TOR.png";
import logoWRO from "../../../assets/logos/WRO.png";
import logoZIE from "../../../assets/logos/ZIE.png";
import logoEkstraliga from "../../../assets/logos/pgeekstraliga-4.png";

import sponsorF2 from "../../../assets/sponsors/f2.png";
import sponsorArche from "../../../assets/sponsors/arche_hotel.png";
import sponsorBrand from "../../../assets/sponsors/logo_brand_claim.png";
import sponsorWrobel from "../../../assets/sponsors/wrobel.png";

const CLUB_LOGOS_MAP: Record<string, string> = {
  CZE: logoCZE,
  GOR: logoGOR,
  GRU: logoGRU,
  LES: logoLES,
  LUB: logoLUB,
  TOR: logoTOR,
  WRO: logoWRO,
  ZIE: logoZIE,
};

const BG_IMAGES: Record<string, string> = {
  "1": riderImg1,
  "2": riderImg2,
  "3": riderImg3,
  "4": riderImg4,
  "5": riderImg5,
  "6": riderImg6,
  "7": riderImg7,
  "8": riderImg8,
  "9": riderImg9,
};

// objectPosition per image to best frame the rider
const BG_POSITIONS: Record<string, string> = {
  "1": "center top",
  "2": "center center",
  "3": "center 35%",
  "4": "center 40%",
  "5": "center center",
  "6": "center center",
  "7": "center center",
  "8": "center center",
  "9": "center center",
};

// For portrait images use "cover" (fills height, may crop sides).
// For landscape images use "fill-width" (fills full width, positions vertically).
// "fill-width" top offset: percentage of image height to shift up (e.g. "-20%" = move up by 20% of image height)
const BG_MODE: Record<
  string,
  { mode: "cover" | "fill-width"; verticalOffset: string }
> = {
  "1": { mode: "cover", verticalOffset: "0%" },
  "2": { mode: "fill-width", verticalOffset: "-15%" },
  "3": { mode: "fill-width", verticalOffset: "-10%" },
  "4": { mode: "fill-width", verticalOffset: "-10%" },
  "5": { mode: "cover", verticalOffset: "0%" },
  "6": { mode: "cover", verticalOffset: "0%" },
  "7": { mode: "cover", verticalOffset: "0%" },
  "8": { mode: "cover", verticalOffset: "0%" },
  "9": { mode: "cover", verticalOffset: "0%" },
};

function DraggableText({
  ct,
  scale,
  posterWidth,
  posterHeight,
  fs,
  onMove,
  isExporting,
}: {
  ct: CustomText;
  scale: number;
  posterWidth: number;
  posterHeight: number;
  fs: (n: number) => number;
  onMove?: (id: string, x: number, y: number) => void;
  isExporting: boolean;
}) {
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (isExporting || !onMove) return;
      e.preventDefault();
      e.stopPropagation();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX: ct.x,
        origY: ct.y,
      };
    },
    [ct.x, ct.y, isExporting, onMove],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current || !onMove) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      const newX = dragRef.current.origX + (dx / posterWidth) * 100;
      const newY = dragRef.current.origY + (dy / posterHeight) * 100;
      onMove(ct.id, Math.max(0, Math.min(100, newX)), Math.max(0, Math.min(100, newY)));
    },
    [ct.id, posterWidth, posterHeight, onMove],
  );

  const handlePointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: `${ct.x}%`,
        top: `${ct.y}%`,
        color: ct.color,
        fontSize: fs(ct.fontSize),
        fontWeight: ct.fontWeight,
        fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        lineHeight: 1.1,
        textShadow: `0 ${fs(2)}px ${fs(8)}px rgba(0,0,0,0.8)`,
        cursor: isExporting ? "default" : "move",
        userSelect: "none",
        whiteSpace: "nowrap",
        zIndex: 10,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {ct.text}
    </div>
  );
}

export const MisiekPoster = forwardRef<HTMLDivElement, PosterProps>(
  ({ config, scale = 1, isExporting = false, onCustomTextMove }, ref) => {
    const {
      teamName,
      scoreHome,
      scoreAway,
      heats,
      hashtag,
      headerLeft,
      headerRight,
      backgroundImageId,
      homeLogoId,
      awayLogoId,
      layoutId = "wynik",
      homeTeamName = "GOSPODARZE",
      awayTeamName = "GOŚCIE",
      aspectRatio = "9:16",
    } = config;

    const riderImg = BG_IMAGES[backgroundImageId || "1"] || riderImg1;
    const riderImgPos = BG_POSITIONS[backgroundImageId || "1"] || "center center";
    const riderMode = BG_MODE[backgroundImageId || "1"] || {
      mode: "cover",
      verticalOffset: "0%",
    };

    const hasHome = !!config.homeTeamName;
    const hasAway = !!config.awayTeamName;
    const singleTeamMode = (hasHome && !hasAway) || (!hasHome && hasAway);

    const homeWins = parseInt(scoreHome || "0") > parseInt(scoreAway || "0");
    const awayWins = parseInt(scoreHome || "0") < parseInt(scoreAway || "0");
    const isDrawn = parseInt(scoreHome || "0") === parseInt(scoreAway || "0");

    const BASE_W = 540;
    const ASPECT_HEIGHTS: Record<string, number> = {
      "9:16": 960,
      "1:1": 540,
      "4:5": 675,
    };
    const baseH = ASPECT_HEIGHTS[aspectRatio] || 960;

    const w = BASE_W * scale;
    const h = baseH * scale;
    const fs = (n: number) => n * scale;

    return (
      <div
        ref={ref}
        style={{
          width: w,
          height: h,
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
          backgroundColor: "#060b18",
          flexShrink: 0,
        }}
      >
        {/* === BACKGROUND PHOTO === */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${riderImg})`,
            backgroundSize: "cover",
            backgroundPosition: riderImgPos,
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* === TOP DARK GRADIENT === */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(4,8,22,0.92) 0%, rgba(4,8,22,0.75) 12%, rgba(4,8,22,0.3) 28%, rgba(4,8,22,0.05) 45%, rgba(4,8,22,0.0) 55%, rgba(4,8,22,0.55) 68%, rgba(4,8,22,0.92) 78%, rgba(4,8,22,1) 90%)",
          }}
        />

        {/* === SIDE EDGE GRADIENTS (vignette) === */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(4,8,22,0.6) 0%, transparent 20%, transparent 80%, rgba(4,8,22,0.6) 100%)",
          }}
        />

        {/* === DECORATIVE: Blue top accent bar === */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: fs(4),
            background: "linear-gradient(to right, #1e6db5, #2e8de0, #f5c518)",
          }}
        />

        {/* === DECORATIVE: diagonal stripe top-left === */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
          width={fs(120)}
          height={fs(80)}
          viewBox={`0 0 120 80`}
        >
          <defs>
            <linearGradient id="stripeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e6db5" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#1e6db5" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 14, 28].map((offset, i) => (
            <polygon
              key={i}
              points={`${offset},0 ${offset + 10},0 0,${offset + 10} 0,${offset}`}
              fill={i === 0 ? "#f5c518" : "#1e6db5"}
              opacity={i === 0 ? 0.95 : 0.7 - i * 0.15}
            />
          ))}
        </svg>

        {/* === HEADER BAR === */}
        <div
          style={{
            position: "absolute",
            top: fs(4),
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            padding: `${fs(12)}px ${fs(18)}px`,
            background: "rgba(4,8,22,0.88)",
            borderBottom: `${fs(2)}px solid #1e6db5`,
            gap: fs(14),
          }}
        >
          {/* Ekstraliga Logo */}
          <img
            src={logoEkstraliga}
            alt="PGE Ekstraliga"
            style={{
              height: fs(64),
              objectFit: "contain",
              flexShrink: 0,
            }}
          />

          {/* Logo */}
          <img
            src={logoImg}
            alt="Misiek Racing"
            style={{
              height: fs(42),
              objectFit: "contain",
              flexShrink: 0,
            }}
          />

          {/* Czestochowa Logo */}
          <img
            src={logoCZE}
            alt="Włókniarz Częstochowa"
            style={{
              height: fs(64),
              objectFit: "contain",
              flexShrink: 0,
            }}
          />

          {/* Vertical separator */}
          <div
            style={{
              width: fs(2),
              height: fs(44),
              background: "linear-gradient(to bottom, transparent, #1e6db5, transparent)",
              flexShrink: 0,
            }}
          />

          {/* Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: fs(1),
            }}
          >
            <div
              style={{
                color: "#ffffff",
                fontSize: fs(15),
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              {headerLeft || (layoutId === "match_day" ? "DZIEŃ MECZOWY" : "WYNIKI MECZU")}
            </div>
            <div
              style={{
                color: "#9ab8d8",
                fontSize: fs(11),
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              {headerRight || (layoutId === "match_day" ? "MATCH DAY" : "MATCH RESULTS")}
            </div>
          </div>
        </div>

        {/* === SCORE / MATCH DAY SECTION === */}
        <div
          style={{
            position: "absolute",
            top: fs(105),
            left: fs(18),
            right: fs(18),
          }}
        >
          {/* Team name */}
          {layoutId === "wynik" && (
            <div
              style={{
                color: "#ffffff",
                fontSize: fs(20),
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textShadow: `0 ${fs(2)}px ${fs(12)}px rgba(0,0,0,0.8)`,
                lineHeight: 1,
                marginBottom: fs(6),
              }}
            >
              {teamName || "MISIEK RACING"}
            </div>
          )}

          {layoutId === "wynik" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: fs(12),
                lineHeight: 1,
                width: singleTeamMode ? "100%" : undefined,
              }}
            >
              {hasHome && homeLogoId && homeLogoId !== "none" && CLUB_LOGOS_MAP[homeLogoId] && (
                <img
                  src={CLUB_LOGOS_MAP[homeLogoId]}
                  alt="Home Logo"
                  style={{
                    marginTop: isExporting ? fs(42) : 0,
                    transform: isExporting ? `translateY(${fs(16)}px)` : "none",
                    height: fs(76),
                    width: "auto",
                    flexShrink: 0,
                    objectFit: "contain",
                    filter: `drop-shadow(0 ${fs(4)}px ${fs(16)}px rgba(0,0,0,0.8))`,
                  }}
                />
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: fs(8),
                  lineHeight: 1,
                  flex: singleTeamMode ? 1 : undefined,
                }}
              >
                {hasHome && (
                  <span
                    style={{
                      color: homeWins ? "#f5c518" : "#ffffff",
                      fontSize: fs(88),
                      fontWeight: 900,
                      letterSpacing: "-0.02em",
                      textShadow: homeWins
                        ? `0 0 ${fs(30)}px rgba(245,197,24,0.4), 0 ${fs(4)}px ${fs(20)}px rgba(0,0,0,0.9)`
                        : `0 ${fs(4)}px ${fs(20)}px rgba(0,0,0,0.9)`,
                      lineHeight: 1,
                      flex: singleTeamMode ? 1 : undefined,
                      textAlign: singleTeamMode ? ("center" as const) : undefined,
                    }}
                  >
                    {scoreHome || "0"}
                  </span>
                )}
                {!singleTeamMode && (
                  <span
                    style={{
                      color: "#1e6db5",
                      fontSize: fs(70),
                      fontWeight: 900,
                      textShadow: `0 0 ${fs(20)}px rgba(30,109,181,0.5)`,
                      lineHeight: 1,
                      alignSelf: "center",
                    }}
                  >
                    :
                  </span>
                )}
                {hasAway && (
                  <span
                    style={{
                      color: awayWins ? "#f5c518" : "#ffffff",
                      fontSize: fs(88),
                      fontWeight: 900,
                      letterSpacing: "-0.02em",
                      textShadow: awayWins
                        ? `0 0 ${fs(30)}px rgba(245,197,24,0.4), 0 ${fs(4)}px ${fs(20)}px rgba(0,0,0,0.9)`
                        : `0 ${fs(4)}px ${fs(20)}px rgba(0,0,0,0.9)`,
                      lineHeight: 1,
                      flex: singleTeamMode ? 1 : undefined,
                      textAlign: singleTeamMode ? ("center" as const) : undefined,
                    }}
                  >
                    {scoreAway || "0"}
                  </span>
                )}
              </div>
              {hasAway && awayLogoId && awayLogoId !== "none" && CLUB_LOGOS_MAP[awayLogoId] && (
                <img
                  src={CLUB_LOGOS_MAP[awayLogoId]}
                  alt="Away Logo"
                  style={{
                    marginTop: isExporting ? fs(42) : 0,
                    transform: isExporting ? `translateY(${fs(16)}px)` : "none",
                    height: fs(76),
                    width: "auto",
                    flexShrink: 0,
                    objectFit: "contain",
                    filter: `drop-shadow(0 ${fs(4)}px ${fs(16)}px rgba(0,0,0,0.8))`,
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* === BOTTOM PANEL === */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background:
              "linear-gradient(to top, rgba(4,8,22,1) 0%, rgba(4,8,22,0.97) 60%, rgba(4,8,22,0.85) 80%, transparent 100%)",
            padding: `${fs(32)}px ${fs(18)}px ${fs(20)}px`,
          }}
        >
          {/* Blue accent line top */}
          <div
            style={{
              height: fs(2),
              background:
                "linear-gradient(to right, transparent, #1e6db5, #2e8de0, #f5c518, transparent)",
              marginBottom: fs(16),
              opacity: 0.8,
            }}
          />

          {/* Heats grid */}
          {layoutId === "wynik" && heats.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: `${fs(4)}px ${fs(12)}px`,
                marginBottom: fs(14),
              }}
            >
              {heats.map((heat) => {
                return (
                  <div
                    key={heat.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: fs(4),
                      padding: `0px 10px 12px 10px`,
                      borderLeft: `${fs(3)}px solid #555`,
                    }}
                  >
                    <span
                      style={{
                        color: "#ffffff",
                        fontSize: fs(13),
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        display: "block",
                      }}
                    >
                      {heat.name}
                    </span>
                    <span
                      style={{
                        color: "#ffffff",
                        fontSize: fs(15),
                        fontWeight: 900,
                        letterSpacing: "0.05em",
                        display: "block",
                      }}
                    >
                      {heat.scoreHome}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Match Day Layout bottom block */}
          {layoutId === "match_day" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: singleTeamMode ? "center" : "space-between",
                width: "100%",
                marginBottom: fs(18),
                gap: fs(16),
              }}
            >
              {hasHome && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: fs(8),
                    flex: 1,
                  }}
                >
                  {homeLogoId && homeLogoId !== "none" && CLUB_LOGOS_MAP[homeLogoId] && (
                    <img
                      src={CLUB_LOGOS_MAP[homeLogoId]}
                      alt="Home Logo"
                      style={{
                        height: fs(90),
                        width: "auto",
                        objectFit: "contain",
                        filter: `drop-shadow(0 ${fs(4)}px ${fs(16)}px rgba(0,0,0,0.8))`,
                      }}
                    />
                  )}
                  <div
                    style={{
                      color: "#ffffff",
                      fontSize: fs(24),
                      fontWeight: 900,
                      textAlign: "center",
                      lineHeight: 1.1,
                      textTransform: "uppercase",
                      textShadow: `0 ${fs(2)}px ${fs(10)}px rgba(0,0,0,0.9)`,
                    }}
                  >
                    {homeTeamName}
                  </div>
                </div>
              )}

              {!singleTeamMode && (
                <div
                  style={{
                    color: "#1e6db5",
                    fontSize: fs(40),
                    fontWeight: 900,
                    textShadow: `0 0 ${fs(20)}px rgba(30,109,181,0.5)`,
                    marginTop: `-${fs(30)}px`,
                  }}
                >
                  VS
                </div>
              )}

              {hasAway && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: fs(8),
                    flex: 1,
                  }}
                >
                  {awayLogoId && awayLogoId !== "none" && CLUB_LOGOS_MAP[awayLogoId] && (
                    <img
                      src={CLUB_LOGOS_MAP[awayLogoId]}
                      alt="Away Logo"
                      style={{
                        height: fs(90),
                        width: "auto",
                        objectFit: "contain",
                        filter: `drop-shadow(0 ${fs(4)}px ${fs(16)}px rgba(0,0,0,0.8))`,
                      }}
                    />
                  )}
                  <div
                    style={{
                      color: "#f5c518",
                      fontSize: fs(24),
                      fontWeight: 900,
                      textAlign: "center",
                      lineHeight: 1.1,
                      textTransform: "uppercase",
                      textShadow: `0 ${fs(2)}px ${fs(10)}px rgba(0,0,0,0.9)`,
                    }}
                  >
                    {awayTeamName}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Separator */}
          <div
            style={{
              height: fs(1),
              background: "rgba(30,109,181,0.3)",
              marginBottom: fs(12),
            }}
          />

          {/* Hashtag */}
          <div style={{ textAlign: "center" }}>
            <span
              style={{
                color: "#2e8de0",
                fontSize: fs(15),
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textShadow: `0 0 ${fs(20)}px rgba(46,141,224,0.6)`,
              }}
            >
              #{hashtag || "MISIEKRACING"}
            </span>
          </div>

          {/* Sponsors */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: fs(12),
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}>
              <img src={sponsorBrand} alt="Sponsor" style={{ maxHeight: fs(100), maxWidth: "100%" }} />
            </div>
            <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}>
              <img src={sponsorArche} alt="Sponsor" style={{ maxHeight: fs(100), maxWidth: "100%" }} />
            </div>
            <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}>
              <img src={sponsorWrobel} alt="Sponsor" style={{ maxHeight: fs(100), maxWidth: "100%" }} />
            </div>
            <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}>
              <img src={sponsorF2} alt="Sponsor" style={{ maxHeight: fs(100), maxWidth: "100%" }} />
            </div>
          </div>
        </div>

        {/* === DECORATIVE: bottom-right corner accent === */}
        <svg
          style={{
            position: "absolute",
            bottom: fs(18),
            right: fs(14),
            pointerEvents: "none",
            opacity: 0.35,
          }}
          width={fs(40)}
          height={fs(40)}
          viewBox="0 0 40 40"
        >
          <rect x="28" y="0" width="12" height="40" rx="2" fill="#1e6db5" />
          <rect x="14" y="0" width="10" height="40" rx="2" fill="#555" />
          <rect x="2" y="0" width="8" height="40" rx="2" fill="#888" />
        </svg>

        {/* === DECORATIVE: speed lines top === */}
        <svg
          style={{
            position: "absolute",
            top: fs(68),
            right: 0,
            pointerEvents: "none",
            opacity: 0.25,
          }}
          width={fs(180)}
          height={fs(120)}
          viewBox="0 0 180 120"
        >
          {[0, 12, 24, 36, 48, 60, 72, 84].map((y, i) => (
            <line
              key={i}
              x1="180"
              y1={y}
              x2="0"
              y2={y + 40}
              stroke={i % 3 === 0 ? "#f5c518" : "#2e8de0"}
              strokeWidth={i % 3 === 0 ? "1.5" : "1"}
              strokeOpacity={0.6 - i * 0.06}
            />
          ))}
        </svg>

        {/* === CUSTOM TEXTS === */}
        {(config.customTexts || []).map((ct) => (
          <DraggableText
            key={ct.id}
            ct={ct}
            scale={scale}
            posterWidth={w}
            posterHeight={h}
            fs={fs}
            onMove={onCustomTextMove}
            isExporting={isExporting}
          />
        ))}

        {/* === DECORATIVE: bottom accent bar === */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: fs(3),
            background: "linear-gradient(to right, #f5c518, #1e6db5, #2e8de0, #1e6db5, #f5c518)",
          }}
        />
      </div>
    );
  }
);

MisiekPoster.displayName = "MisiekPoster";
