import React, { forwardRef, useCallback, useRef } from "react";
import { PosterProps, CustomText } from "../shared/types";

// Import AKŻ assets
import logoAkz from "../../../../assets/logos/akż/logo.png";
import akzBg1 from "../../../../assets/bg/akz/1.png";
import akzBg2 from "../../../../assets/bg/akz/2.png";
import akzBg3 from "../../../../assets/bg/akz/3.png";
import akzBg4 from "../../../../assets/bg/akz/4.png";
import akzBg5 from "../../../../assets/bg/akz/5.png";
import akzBg6 from "../../../../assets/bg/akz/6.png";
import akzBg7 from "../../../../assets/bg/akz/7.png";
import akzBg8 from "../../../../assets/bg/akz/8.png";
import akzBg9 from "../../../../assets/bg/akz/9.png";
import akzBg10 from "../../../../assets/bg/akz/10.png";
import akzBg11 from "../../../../assets/bg/akz/11.png";
import akzBg12 from "../../../../assets/bg/akz/12.png";
import akzBg13 from "../../../../assets/bg/akz/13.png";
import akzBg14 from "../../../../assets/bg/akz/14.png";
import akzBg15 from "../../../../assets/bg/akz/15.png";
import akzBg16 from "../../../../assets/bg/akz/16.png";
import sponsorHaj from "../../../../assets/logos/akż/processed-Haj.png";
import sponsorRoosters from "../../../../assets/logos/akż/processed-roosters.png";
import sponsorWts from "../../../../assets/logos/akż/processed-wts.png";
import sponsorGrantland from "../../../../assets/logos/akż/processed-grantland.png";
import sponsorMcs from "../../../../assets/logos/akż/processed-mcs.png";
import sponsorAutomax from "../../../../assets/logos/akż/processed-automax.png";
import sponsorBetonlit from "../../../../assets/logos/akż/processed-Betonlit.png";
import sponsorCausality from "../../../../assets/logos/akż/processed-Causality.png";
import sponsorRrspeedway from "../../../../assets/logos/akż/processed-rrspeedway.png";
import sponsorFormat from "../../../../assets/logos/akż/processed-format.png";
import sponsorObiad from "../../../../assets/logos/akż/processed-obiad.png";
import sponsorWirga from "../../../../assets/logos/akż/processed-wirga.png";

// Import club logos (shared)
import logoCZE from "../../../../assets/logos/CZE.png";
import logoGOR from "../../../../assets/logos/GOR.png";
import logoGRU from "../../../../assets/logos/GRU.png";
import logoLES from "../../../../assets/logos/LES.png";
import logoLUB from "../../../../assets/logos/LUB.png";
import logoTOR from "../../../../assets/logos/TOR.png";
import logoWRO from "../../../../assets/logos/WRO.png";
import logoZIE from "../../../../assets/logos/ZIE.png";

const AKZ_BG_MAP: Record<string, string> = {
  "1": akzBg1,
  "2": akzBg2,
  "3": akzBg3,
  "4": akzBg4,
  "5": akzBg5,
  "6": akzBg6,
  "7": akzBg7,
  "8": akzBg8,
  "9": akzBg9,
  "10": akzBg10,
  "11": akzBg11,
  "12": akzBg12,
  "13": akzBg13,
  "14": akzBg14,
  "15": akzBg15,
  "16": akzBg16,
};

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
  sponsorFormat,
  sponsorObiad,
  sponsorWirga,
];

// AKŻ Brand Colors
const COLORS = {
  RED: "#DC2626",
  YELLOW: "#FBBF24",
  WHITE: "#FFFFFF",
  BLACK: "#000000",
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
        transform: "rotate(-3deg)", // Slight angle for dynamic feel
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {ct.text}
    </div>
  );
}

export const SpeedDemonLayout = forwardRef<HTMLDivElement, PosterProps>(
  ({ config, scale = 1, isExporting = false, onCustomTextMove }, ref) => {
    const {
      scoreHome,
      scoreAway,
      heats,
      headerLeft,
      headerRight,
      homeLogoId,
      awayLogoId,
      homeTeamName = "GOSPODARZE",
      awayTeamName = "GOŚCIE",
      aspectRatio = "9:16",
      customTexts = [],
      backgroundImageId,
    } = config;

    const akzBg = AKZ_BG_MAP[backgroundImageId || "1"] || akzBg1;

    const hasHome = !!config.homeTeamName;
    const hasAway = !!config.awayTeamName;
    const singleTeamMode = (hasHome && !hasAway) || (!hasHome && hasAway);

    const homeScoreNum = scoreHome ? parseInt(scoreHome) : null;
    const awayScoreNum = scoreAway ? parseInt(scoreAway) : null;
    const homeWins = homeScoreNum !== null && awayScoreNum !== null && homeScoreNum > awayScoreNum;
    const awayWins = homeScoreNum !== null && awayScoreNum !== null && awayScoreNum > homeScoreNum;

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
        data-export-target="true"
        style={{
          width: w,
          height: h,
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
          backgroundColor: COLORS.BLACK,
          flexShrink: 0,
        }}
      >
        {/* === BACKGROUND IMAGE === */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${akzBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* === BACKGROUND: Red-to-Black Gradient === */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 70% 20%, rgba(220, 38, 38, 0.13) 0%, ${COLORS.BLACK} 60%)`,
          }}
        />

        {/* === TOP SECTION: Logo and Headers in same row === */}
        <div
          style={{
            position: "absolute",
            top: fs(20),
            left: fs(20),
            right: fs(20),
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 5,
          }}
        >
          {/* AKŻ Logo */}
          <img
            src={logoAkz}
            alt="AKŻ Logo"
            style={{
              height: fs(60),
              filter: isExporting ? "none" : "drop-shadow(0 2px 8px rgba(0,0,0,0.6))",
            }}
          />

          {/* Headers: PL / EN */}
          <div
            style={{
              display: "flex",
              gap: fs(20),
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: fs(16),
                fontWeight: 700,
                color: COLORS.WHITE,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                textShadow: `0 ${fs(2)}px ${fs(6)}px rgba(0,0,0,0.8)`,
                transform: "skewX(-5deg)",
              }}
            >
              {headerLeft}
            </div>
            <div
              style={{
                fontSize: fs(16),
                fontWeight: 700,
                color: COLORS.YELLOW,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                textShadow: `0 ${fs(2)}px ${fs(6)}px rgba(0,0,0,0.8)`,
                transform: "skewX(-5deg)",
              }}
            >
              {headerRight}
            </div>
          </div>
        </div>

        {/* === SCORE SECTION (Asymmetric placement) === */}
        <div
          style={{
            position: "absolute",
            top: fs(140),
            left: fs(30),
            right: fs(30),
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 5,
            transform: "skewX(-3deg)", // Slight skew for motion
          }}
        >
          {/* Home Score */}
          <div style={{ textAlign: "left", flex: 1 }}>
            {homeLogoId && CLUB_LOGOS_MAP[homeLogoId] && (
              <img
                src={CLUB_LOGOS_MAP[homeLogoId]}
                alt="Home Team"
                style={{
                  height: fs(50),
                  marginBottom: fs(10),
                  filter: isExporting ? "none" : "drop-shadow(0 4px 12px rgba(0,0,0,0.9))",
                }}
              />
            )}
            <div
              style={{
                fontSize: fs(24),
                fontWeight: 900,
                color: COLORS.WHITE,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                textShadow: `0 ${fs(3)}px ${fs(12)}px rgba(0,0,0,0.9)`,
              }}
            >
              {homeTeamName}
            </div>
            <div
              style={{
                fontSize: fs(120),
                fontWeight: 900,
                color: homeWins ? COLORS.YELLOW : COLORS.WHITE,
                lineHeight: 0.9,
                textShadow: `0 ${fs(6)}px ${fs(20)}px rgba(0,0,0,0.9), 0 0 ${fs(40)}px ${homeWins ? `${COLORS.YELLOW}66` : "transparent"}`,
                filter: homeWins ? `drop-shadow(0 0 ${fs(20)}px ${COLORS.YELLOW})` : "none",
              }}
            >
              {homeScoreNum !== null ? homeScoreNum : ""}
            </div>
          </div>

          {/* Separator */}
          {!singleTeamMode && (scoreHome || scoreAway) && (
            <div
              style={{
                fontSize: fs(60),
                fontWeight: 900,
                color: COLORS.RED,
                margin: `0 ${fs(20)}px`,
                textShadow: `0 ${fs(4)}px ${fs(12)}px rgba(0,0,0,0.9)`,
                transform: "rotate(-10deg)",
              }}
            >
              :
            </div>
          )}

          {/* Away Score */}
          {!singleTeamMode && (
            <div style={{ textAlign: "right", flex: 1 }}>
              {awayLogoId && CLUB_LOGOS_MAP[awayLogoId] && (
                <img
                  src={CLUB_LOGOS_MAP[awayLogoId]}
                  alt="Away Team"
                  style={{
                    height: fs(50),
                    marginBottom: fs(10),
                    filter: isExporting ? "none" : "drop-shadow(0 4px 12px rgba(0,0,0,0.9))",
                  }}
                />
              )}
              <div
                style={{
                  fontSize: fs(24),
                  fontWeight: 900,
                  color: COLORS.WHITE,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  textShadow: `0 ${fs(3)}px ${fs(12)}px rgba(0,0,0,0.9)`,
                }}
              >
                {awayTeamName}
              </div>
              <div
                style={{
                  fontSize: fs(120),
                  fontWeight: 900,
                  color: awayWins ? COLORS.YELLOW : COLORS.WHITE,
                  lineHeight: 0.9,
                  textShadow: `0 ${fs(6)}px ${fs(20)}px rgba(0,0,0,0.9), 0 0 ${fs(40)}px ${awayWins ? `${COLORS.YELLOW}66` : "transparent"}`,
                  filter: awayWins ? `drop-shadow(0 0 ${fs(20)}px ${COLORS.YELLOW})` : "none",
                }}
              >
                {awayScoreNum !== null ? awayScoreNum : ""}
              </div>
            </div>
          )}
        </div>

        {/* === HEATS SECTION (Staggered grid) === */}
        {heats.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: fs(aspectRatio === "1:1" ? 280 : aspectRatio === "4:5" ? 370 : 420),
              left: fs(25),
              right: fs(25),
              zIndex: 5,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: fs(12),
              }}
            >
              {heats.map((heat, idx) => (
                <div
                  key={heat.id}
                  style={{
                    background: isExporting
                      ? 'rgba(0, 0, 0, 0.85)'
                      : `linear-gradient(135deg, rgba(220, 38, 38, 0.13) 0%, rgba(0, 0, 0, 0.87) 100%)`,
                    border: `${fs(2)}px solid rgba(220, 38, 38, 0.4)`,
                    borderRadius: fs(8),
                    padding: `${fs(14)}px ${fs(10)}px ${fs(16)}px ${fs(10)}px`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: fs(6),
                    minHeight: fs(80),
                    // Stagger every other heat
                    transform: isExporting ? undefined : (idx % 2 === 0 ? `translateY(${fs(-5)}) rotate(-1deg)` : `translateY(${fs(5)}) rotate(1deg)`),
                    boxShadow: isExporting ? 'none' : `0 ${fs(4)}px ${fs(12)}px rgba(0,0,0,0.6)`,
                  }}
                >
                  <div
                    style={{
                      fontSize: fs(14),
                      fontWeight: 700,
                      color: COLORS.YELLOW,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      textAlign: "center",
                    }}
                  >
                    {heat.name}
                  </div>
                  <div
                    style={{
                      fontSize: fs(32),
                      fontWeight: 900,
                      color: COLORS.WHITE,
                      lineHeight: 1,
                      textShadow: isExporting ? 'none' : `0 ${fs(2)}px ${fs(6)}px rgba(0,0,0,0.8)`,
                      textAlign: "center",
                    }}
                  >
                    {heat.scoreHome}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === CUSTOM DRAGGABLE TEXT === */}
        {customTexts.map((ct) => (
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

        {/* === FOOTER: Sponsors with yellow accent === */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: COLORS.BLACK,
            borderTop: `${fs(3)}px solid ${COLORS.YELLOW}`,
            padding: fs(6),
            zIndex: 5,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: fs(2),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {SPONSORS.map((sponsor, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: fs(1),
                  overflow: "hidden",
                  flex: "0 0 23%",
                  height: fs(48),
                }}
              >
                <div
                  role="img"
                  aria-label={`Sponsor ${idx + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${sponsor})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* === GRUNGE TEXTURE OVERLAY === */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent ${fs(2)}px,
                rgba(255,255,255,0.03) ${fs(2)}px,
                rgba(255,255,255,0.03) ${fs(4)}px
              )
            `,
            pointerEvents: "none",
            opacity: 0.3,
            mixBlendMode: "overlay",
          }}
        />
      </div>
    );
  }
);

SpeedDemonLayout.displayName = "SpeedDemonLayout";
