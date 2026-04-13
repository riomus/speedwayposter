import React, { forwardRef, useCallback, useRef } from "react";
import { PosterProps, CustomText } from "../shared/types";

// AKŻ Logo
import logoAKZ from "../../../../assets/logos/akż/logo.png";
import akzBg from "../../../../assets/bg/akz/1.png";

// Club logos (shared across all riders)
import logoCZE from "../../../../assets/logos/CZE.png";
import logoGOR from "../../../../assets/logos/GOR.png";
import logoGRU from "../../../../assets/logos/GRU.png";
import logoLES from "../../../../assets/logos/LES.png";
import logoLUB from "../../../../assets/logos/LUB.png";
import logoTOR from "../../../../assets/logos/TOR.png";
import logoWRO from "../../../../assets/logos/WRO.png";
import logoZIE from "../../../../assets/logos/ZIE.png";

// AKŻ Sponsors (all 9)
import sponsorHaj from "../../../../assets/logos/akż/Haj.png";
import sponsorRoosters from "../../../../assets/logos/akż/roosters.png";
import sponsorWts from "../../../../assets/logos/akż/wts.png";
import sponsorGrantland from "../../../../assets/logos/akż/Grantland ver 1 (shadows).png";
import sponsorMcs from "../../../../assets/logos/akż/mcs.png";
import sponsorAutomax from "../../../../assets/logos/akż/automax.png";
import sponsorBetonlit from "../../../../assets/logos/akż/Betonlit.png";
import sponsorCausality from "../../../../assets/logos/akż/Causality.png";
import sponsorRRSpeedway from "../../../../assets/logos/akż/rrspeedway.png";

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
  sponsorRRSpeedway,
];

// AKŻ Brand Colors
const COLORS = {
  red: "#DC2626",
  yellow: "#FBBF24",
  white: "#FFFFFF",
  black: "#000000",
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
    [isExporting, onMove, ct.x, ct.y]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current || !onMove) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      const pxX = (dx / scale / posterWidth) * 100;
      const pxY = (dy / scale / posterHeight) * 100;
      let newX = dragRef.current.origX + pxX;
      let newY = dragRef.current.origY + pxY;
      newX = Math.max(0, Math.min(100, newX));
      newY = Math.max(0, Math.min(100, newY));
      onMove(ct.id, newX, newY);
    },
    [scale, posterWidth, posterHeight, onMove, ct.id]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    dragRef.current = null;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }, []);

  const leftPx = (ct.x / 100) * posterWidth;
  const topPx = (ct.y / 100) * posterHeight;

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        position: "absolute",
        left: `${leftPx}px`,
        top: `${topPx}px`,
        fontSize: `${fs(ct.fontSize)}px`,
        color: ct.color,
        fontWeight: ct.fontWeight,
        cursor: isExporting ? "default" : "move",
        userSelect: "none",
        whiteSpace: "nowrap",
        textShadow: "0 2px 8px rgba(0,0,0,0.5)",
      }}
    >
      {ct.text}
    </div>
  );
}

export const CleanPowerLayout = forwardRef<HTMLDivElement, PosterProps>(
  ({ config, scale = 1, isExporting = false, onCustomTextMove }, ref) => {
    const {
      scoreHome,
      scoreAway,
      homeTeamName,
      awayTeamName,
      heats,
      hashtag,
      matchInfo,
      headerLeft,
      headerRight,
      homeLogoId,
      awayLogoId,
      aspectRatio = "9:16",
      customTexts = [],
    } = config;

    const BASE_W = 540;
    const ASPECT_HEIGHTS: Record<string, number> = {
      "9:16": 960,
      "1:1": 540,
      "4:5": 675,
    };
    const baseH = ASPECT_HEIGHTS[aspectRatio] || 960;

    const w = BASE_W * scale;
    const h = baseH * scale;

    // Font scaling function
    const fs = (size: number) => size * scale;

    // Determine winner for yellow highlight
    const homeScore = parseFloat(scoreHome) || 0;
    const awayScore = parseFloat(scoreAway) || 0;
    const homeWins = homeScore > awayScore;
    const awayWins = awayScore > homeScore;

    // Single team mode detection
    const isSingleTeam = !homeTeamName || !awayTeamName;

    // Get club logos
    const homeLogo = homeLogoId ? CLUB_LOGOS_MAP[homeLogoId] : undefined;
    const awayLogo = awayLogoId ? CLUB_LOGOS_MAP[awayLogoId] : undefined;

    return (
      <div
        ref={ref}
        style={{
          width: `${w}px`,
          height: `${h}px`,
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Inter', 'Roboto', sans-serif",
          background: COLORS.black,
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${akzBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Background with subtle red radial gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at center, ${COLORS.red}15 0%, ${COLORS.black} 70%)`,
          }}
        />

        {/* Header - Solid Red Bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: `${fs(60)}px`,
            background: COLORS.red,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: `0 ${fs(20)}px`,
            zIndex: 10,
          }}
        >
          {/* Logo Left */}
          <img
            src={logoAKZ}
            alt="AKŻ Logo"
            style={{
              height: `${fs(40)}px`,
              width: "auto",
              objectFit: "contain",
              filter: "brightness(0) invert(1)", // White logo
            }}
          />

          {/* Header Right Text */}
          {headerRight && (
            <div
              style={{
                fontSize: `${fs(14)}px`,
                color: COLORS.white,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {headerRight}
            </div>
          )}
        </div>

        {/* Score Section - Centered */}
        <div
          style={{
            position: "absolute",
            top: `${fs(100)}px`,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: `${fs(10)}px`,
            zIndex: 5,
          }}
        >
          {/* Team Names */}
          {!isSingleTeam && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: `${fs(20)}px`,
                marginBottom: `${fs(10)}px`,
              }}
            >
              {homeLogo && (
                <img
                  src={homeLogo}
                  alt="Home Logo"
                  style={{
                    height: `${fs(40)}px`,
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              )}
              <div
                style={{
                  fontSize: `${fs(18)}px`,
                  color: COLORS.white,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {homeTeamName}
              </div>
              <div
                style={{
                  fontSize: `${fs(16)}px`,
                  color: COLORS.white,
                  fontWeight: 400,
                }}
              >
                VS
              </div>
              <div
                style={{
                  fontSize: `${fs(18)}px`,
                  color: COLORS.white,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {awayTeamName}
              </div>
              {awayLogo && (
                <img
                  src={awayLogo}
                  alt="Away Logo"
                  style={{
                    height: `${fs(40)}px`,
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              )}
            </div>
          )}

          {/* Single Team Mode */}
          {isSingleTeam && (homeTeamName || awayTeamName) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: `${fs(15)}px`,
                marginBottom: `${fs(10)}px`,
              }}
            >
              {(homeLogo || awayLogo) && (
                <img
                  src={homeLogo || awayLogo}
                  alt="Team Logo"
                  style={{
                    height: `${fs(45)}px`,
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              )}
              <div
                style={{
                  fontSize: `${fs(20)}px`,
                  color: COLORS.white,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {homeTeamName || awayTeamName}
              </div>
            </div>
          )}

          {/* Scores */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: `${fs(30)}px`,
            }}
          >
            <div
              style={{
                fontSize: `${fs(120)}px`,
                fontWeight: 900,
                color: homeWins ? COLORS.yellow : COLORS.white,
                lineHeight: 1,
                textShadow: homeWins
                  ? `0 0 ${fs(30)}px ${COLORS.yellow}80`
                  : `0 ${fs(4)}px ${fs(12)}px rgba(0,0,0,0.7)`,
              }}
            >
              {scoreHome}
            </div>

            {!isSingleTeam && (
              <>
                {/* Thin Red Divider */}
                <div
                  style={{
                    width: `${fs(3)}px`,
                    height: `${fs(100)}px`,
                    background: COLORS.red,
                  }}
                />

                <div
                  style={{
                    fontSize: `${fs(120)}px`,
                    fontWeight: 900,
                    color: awayWins ? COLORS.yellow : COLORS.white,
                    lineHeight: 1,
                    textShadow: awayWins
                      ? `0 0 ${fs(30)}px ${COLORS.yellow}80`
                      : `0 ${fs(4)}px ${fs(12)}px rgba(0,0,0,0.7)`,
                  }}
                >
                  {scoreAway}
                </div>
              </>
            )}
          </div>

          {/* Match Info */}
          {matchInfo && (
            <div
              style={{
                fontSize: `${fs(14)}px`,
                color: COLORS.white,
                fontWeight: 500,
                marginTop: `${fs(10)}px`,
                textAlign: "center",
                opacity: 0.9,
              }}
            >
              {matchInfo}
            </div>
          )}
        </div>

        {/* Heats Section - Clean Grid */}
        {heats.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: `${fs(380)}px`,
              left: `${fs(30)}px`,
              right: `${fs(30)}px`,
              zIndex: 5,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: `${fs(8)}px`,
              }}
            >
              {heats.map((heat) => (
                <div
                  key={heat.id}
                  style={{
                    background: `${COLORS.white}10`,
                    border: `1px solid ${COLORS.white}30`,
                    borderRadius: `${fs(6)}px`,
                    padding: `${fs(10)}px ${fs(12)}px`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: `${fs(13)}px`,
                      color: COLORS.white,
                      fontWeight: 600,
                    }}
                  >
                    {heat.name}
                  </div>
                  <div
                    style={{
                      fontSize: `${fs(16)}px`,
                      color: COLORS.yellow,
                      fontWeight: 700,
                      background: `${COLORS.yellow}20`,
                      padding: `${fs(4)}px ${fs(10)}px`,
                      borderRadius: `${fs(4)}px`,
                    }}
                  >
                    {heat.scoreHome}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hashtag */}
        {hashtag && (
          <div
            style={{
              position: "absolute",
              bottom: `${fs(200)}px`,
              left: 0,
              right: 0,
              textAlign: "center",
              fontSize: `${fs(16)}px`,
              color: COLORS.white,
              fontWeight: 600,
              opacity: 0.8,
              zIndex: 5,
            }}
          >
            {hashtag}
          </div>
        )}

        {/* Footer - White Separator & Sponsors */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: COLORS.black,
            zIndex: 10,
          }}
        >
          {/* White horizontal separator line */}
          <div
            style={{
              width: "100%",
              height: `${fs(2)}px`,
              background: COLORS.white,
            }}
          />

          {/* Sponsors Grid */}
          <div
            style={{
              padding: `${fs(16)}px ${fs(12)}px`,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: `${fs(12)}px`,
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            {SPONSORS.map((sponsor, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: fs(8),
                }}
              >
                <img
                  src={sponsor}
                  alt={`Sponsor ${idx + 1}`}
                  style={{
                    height: fs(40),
                    width: "auto",
                    maxWidth: "100%",
                    objectFit: "contain",
                    filter: "brightness(0) invert(1)", // White filter
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Custom Draggable Texts */}
        {customTexts.map((ct) => (
          <DraggableText
            key={ct.id}
            ct={ct}
            scale={scale}
            posterWidth={BASE_W}
            posterHeight={baseH}
            fs={fs}
            onMove={onCustomTextMove}
            isExporting={isExporting}
          />
        ))}
      </div>
    );
  }
);

CleanPowerLayout.displayName = "CleanPowerLayout";
