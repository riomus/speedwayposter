import React, { forwardRef, useCallback, useRef } from "react";
import { PosterProps, CustomText } from "../shared/types";

// AKŻ Assets
import akzLogo from "../../../../assets/logos/akż/logo.png";
import sponsorHaj from "../../../../assets/logos/akż/Haj.png";
import sponsorRoosters from "../../../../assets/logos/akż/roosters.png";
import sponsorWts from "../../../../assets/logos/akż/wts.png";
import sponsorGrantland from "../../../../assets/logos/akż/Grantland ver 1 (shadows).png";
import sponsorMcs from "../../../../assets/logos/akż/mcs.png";
import sponsorAutomax from "../../../../assets/logos/akż/automax.png";
import sponsorBetonlit from "../../../../assets/logos/akż/Betonlit.png";
import sponsorCausality from "../../../../assets/logos/akż/Causality.png";
import sponsorRrspeedway from "../../../../assets/logos/akż/rrspeedway.png";

// Club logos
import logoCZE from "../../../../assets/logos/CZE.png";
import logoGOR from "../../../../assets/logos/GOR.png";
import logoGRU from "../../../../assets/logos/GRU.png";
import logoLES from "../../../../assets/logos/LES.png";
import logoLUB from "../../../../assets/logos/LUB.png";
import logoTOR from "../../../../assets/logos/TOR.png";
import logoWRO from "../../../../assets/logos/WRO.png";
import logoZIE from "../../../../assets/logos/ZIE.png";

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

const SPONSORS = [
  sponsorHaj,
  sponsorRoosters,
  sponsorWts,
  sponsorGrantland,
  sponsorMcs,
  sponsorAutomax,
  sponsorBetonlit,
  sponsorCausality,
  sponsorRrspeedway,
];

// AKŻ Brand Colors
const COLORS = {
  red: "#DC2626",
  yellow: "#FBBF24",
  white: "#FFFFFF",
  black: "#000000",
};

// Draggable text component
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
    [ct.x, ct.y, isExporting, onMove]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current || !onMove) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      const newX = dragRef.current.origX + (dx / (posterWidth * scale)) * 100;
      const newY = dragRef.current.origY + (dy / (posterHeight * scale)) * 100;
      onMove(ct.id, Math.max(0, Math.min(100, newX)), Math.max(0, Math.min(100, newY)));
    },
    [ct.id, onMove, posterWidth, posterHeight, scale]
  );

  const handlePointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        position: "absolute",
        left: `${ct.x}%`,
        top: `${ct.y}%`,
        fontSize: fs(ct.fontSize),
        color: ct.color,
        fontWeight: ct.fontWeight,
        cursor: isExporting || !onMove ? "default" : "move",
        userSelect: "none",
        textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
        whiteSpace: "nowrap",
      }}
    >
      {ct.text}
    </div>
  );
}

export const BoldStrikerLayout = forwardRef<HTMLDivElement, PosterProps>(
  ({ config, scale = 1, isExporting = false, onCustomTextMove }, ref) => {
    const BASE_W = 540;

    // Aspect ratio handling
    const aspectRatio = config.aspectRatio || "9:16";
    let BASE_H = 960; // default 9:16
    if (aspectRatio === "1:1") BASE_H = 540;
    if (aspectRatio === "4:5") BASE_H = 675;

    const fs = (size: number) => size * scale;

    const posterWidth = BASE_W * scale;
    const posterHeight = BASE_H * scale;

    // Layout selection
    const layoutId = config.layoutId || "wynik";
    const isMatchDay = layoutId === "match_day";

    // Single team mode detection
    const singleTeamMode = !config.homeTeamName || !config.awayTeamName;

    // Winner detection for yellow glow
    const homeScore = parseInt(config.scoreHome) || 0;
    const awayScore = parseInt(config.scoreAway) || 0;
    const homeWins = homeScore > awayScore;
    const awayWins = awayScore > homeScore;

    return (
      <div
        ref={ref}
        style={{
          width: posterWidth,
          height: posterHeight,
          position: "relative",
          fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
          overflow: "hidden",
          backgroundColor: COLORS.black,
        }}
      >
        {/* Background with diagonal red stripe */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${COLORS.black} 0%, ${COLORS.black} 30%, ${COLORS.red} 30%, ${COLORS.red} 70%, ${COLORS.black} 70%, ${COLORS.black} 100%)`,
          }}
        />

        {/* Header bar with red gradient bottom */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: fs(60),
            background: COLORS.black,
            borderBottom: `${fs(4)}px solid ${COLORS.red}`,
            boxShadow: `0 ${fs(2)}px ${fs(8)}px rgba(220, 38, 38, 0.5)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: `0 ${fs(20)}px`,
          }}
        >
          {/* AKŻ Logo */}
          <img
            src={akzLogo}
            alt="AKŻ Logo"
            style={{
              height: fs(45),
              objectFit: "contain",
            }}
          />

          {/* Header text */}
          <div
            style={{
              color: COLORS.white,
              fontSize: fs(18),
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {config.headerLeft}
          </div>
        </div>

        {/* Main content area */}
        <div
          style={{
            position: "absolute",
            top: fs(80),
            left: 0,
            right: 0,
            bottom: fs(140),
            display: "flex",
            flexDirection: "column",
            padding: `${fs(20)}px ${fs(30)}px`,
          }}
        >
          {/* Score section */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: fs(40),
              marginTop: fs(40),
              marginBottom: fs(40),
            }}
          >
            {/* Home team section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: fs(15),
              }}
            >
              {config.homeLogoId && CLUB_LOGOS_MAP[config.homeLogoId] && (
                <img
                  src={CLUB_LOGOS_MAP[config.homeLogoId]}
                  alt="Home logo"
                  style={{
                    width: fs(80),
                    height: fs(80),
                    objectFit: "contain",
                  }}
                />
              )}
              {config.homeTeamName && (
                <div
                  style={{
                    color: COLORS.white,
                    fontSize: fs(20),
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {config.homeTeamName}
                </div>
              )}
              <div
                style={{
                  fontSize: fs(120),
                  fontWeight: 900,
                  color: COLORS.white,
                  lineHeight: 1,
                  textShadow: homeWins
                    ? `0 0 ${fs(30)}px ${COLORS.yellow}, 0 0 ${fs(50)}px ${COLORS.yellow}`
                    : `${fs(4)}px ${fs(4)}px ${fs(12)}px rgba(0,0,0,0.8)`,
                  filter: homeWins ? `drop-shadow(0 0 ${fs(20)}px ${COLORS.yellow})` : "none",
                }}
              >
                {config.scoreHome}
              </div>
            </div>

            {/* Colon separator (hidden in single team mode) */}
            {!singleTeamMode && (
              <div
                style={{
                  fontSize: fs(80),
                  fontWeight: 900,
                  color: COLORS.red,
                  lineHeight: 1,
                }}
              >
                :
              </div>
            )}

            {/* Away team section */}
            {!singleTeamMode && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: fs(15),
                }}
              >
                {config.awayLogoId && CLUB_LOGOS_MAP[config.awayLogoId] && (
                  <img
                    src={CLUB_LOGOS_MAP[config.awayLogoId]}
                    alt="Away logo"
                    style={{
                      width: fs(80),
                      height: fs(80),
                      objectFit: "contain",
                    }}
                  />
                )}
                {config.awayTeamName && (
                  <div
                    style={{
                      color: COLORS.white,
                      fontSize: fs(20),
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    {config.awayTeamName}
                  </div>
                )}
                <div
                  style={{
                    fontSize: fs(120),
                    fontWeight: 900,
                    color: COLORS.white,
                    lineHeight: 1,
                    textShadow: awayWins
                      ? `0 0 ${fs(30)}px ${COLORS.yellow}, 0 0 ${fs(50)}px ${COLORS.yellow}`
                      : `${fs(4)}px ${fs(4)}px ${fs(12)}px rgba(0,0,0,0.8)`,
                    filter: awayWins ? `drop-shadow(0 0 ${fs(20)}px ${COLORS.yellow})` : "none",
                  }}
                >
                  {config.scoreAway}
                </div>
              </div>
            )}
          </div>

          {/* Heats grid */}
          {config.heats && config.heats.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: fs(12),
                marginTop: fs(30),
              }}
            >
              {config.heats.map((heat) => (
                <div
                  key={heat.id}
                  style={{
                    border: `${fs(2)}px solid ${COLORS.red}`,
                    borderRadius: fs(8),
                    padding: `${fs(12)}px ${fs(16)}px`,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <div
                    style={{
                      color: COLORS.white,
                      fontSize: fs(14),
                      fontWeight: 600,
                      marginBottom: fs(6),
                    }}
                  >
                    {heat.name}
                  </div>
                  <div
                    style={{
                      color: COLORS.yellow,
                      fontSize: fs(24),
                      fontWeight: 900,
                    }}
                  >
                    {heat.scoreHome}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Match info */}
          {config.matchInfo && (
            <div
              style={{
                position: "absolute",
                bottom: fs(20),
                left: fs(30),
                right: fs(30),
                color: COLORS.white,
                fontSize: fs(16),
                fontWeight: 600,
                textAlign: "center",
                textShadow: `${fs(2)}px ${fs(2)}px ${fs(8)}px rgba(0,0,0,0.9)`,
              }}
            >
              {config.matchInfo}
            </div>
          )}
        </div>

        {/* Sponsor footer - pure black background with 3x3 grid */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: fs(140),
            backgroundColor: COLORS.black,
            borderTop: `${fs(3)}px solid ${COLORS.red}`,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(3, 1fr)",
            gap: fs(8),
            padding: fs(16),
          }}
        >
          {SPONSORS.map((sponsor, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={sponsor}
                alt={`Sponsor ${idx + 1}`}
                style={{
                  maxWidth: "90%",
                  maxHeight: "90%",
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Custom draggable text */}
        {config.customTexts?.map((ct) => (
          <DraggableText
            key={ct.id}
            ct={ct}
            scale={scale}
            posterWidth={BASE_W}
            posterHeight={BASE_H}
            fs={fs}
            onMove={onCustomTextMove}
            isExporting={isExporting}
          />
        ))}

        {/* Hashtag */}
        {config.hashtag && (
          <div
            style={{
              position: "absolute",
              bottom: fs(150),
              right: fs(30),
              color: COLORS.yellow,
              fontSize: fs(18),
              fontWeight: 700,
              textShadow: `${fs(2)}px ${fs(2)}px ${fs(8)}px rgba(0,0,0,0.9)`,
            }}
          >
            {config.hashtag}
          </div>
        )}
      </div>
    );
  }
);

BoldStrikerLayout.displayName = "BoldStrikerLayout";
