import React, { forwardRef, useCallback, useRef } from "react";
import { PosterProps, CustomText } from "./shared/types";
import logoK118 from "../../../assets/logos/kh118/kd118.png";
import logoU24 from "../../../assets/logos/u24ekstraliga.png";
import bg1 from "../../../assets/bg/kh118/1.png";
import bg2 from "../../../assets/bg/kh118/2.png";
import bg3 from "../../../assets/bg/kh118/3.png";
import sponsorMasterAsia from "../../../assets/sponsors/kh118/master-asia.png";
import sponsorBmj from "../../../assets/sponsors/kh118/bmj-light.png";
import sponsorMotomoda from "../../../assets/sponsors/kh118/color1-logo.png";

import logoCZE from "../../../assets/logos/CZE.png";
import logoGOR from "../../../assets/logos/GOR.png";
import logoGRU from "../../../assets/logos/GRU.png";
import logoLES from "../../../assets/logos/LES.png";
import logoLUB from "../../../assets/logos/LUB.png";
import logoTOR from "../../../assets/logos/TOR.png";
import logoWRO from "../../../assets/logos/WRO.png";
import logoZIE from "../../../assets/logos/ZIE.png";

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
  "1": bg1,
  "2": bg2,
  "3": bg3,
};

const COLORS = {
  NAVY_DEEP: "#050B1E",
  NAVY: "#0A1730",
  BLUE: "#1D4ED8",
  BLUE_BRIGHT: "#3B82F6",
  BLUE_GLOW: "#60A5FA",
  RED: "#DC2626",
  RED_BRIGHT: "#EF4444",
  WHITE: "#FFFFFF",
  TEXT_DIM: "#9ab8d8",
};

const SPONSORS = [sponsorMasterAsia, sponsorBmj, sponsorMotomoda];

function DraggableText({
  ct,
  posterWidth,
  posterHeight,
  fs,
  onMove,
  isExporting,
}: {
  ct: CustomText;
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

export const Kh118Poster = forwardRef<HTMLDivElement, PosterProps>(
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
      matchInfo,
    } = config;

    const bgImg = BG_IMAGES[backgroundImageId || "1"] || bg1;

    const showHome = config.showHome ?? true;
    const showAway = config.showAway ?? true;
    const showU24 = config.showU24Logo ?? false;
    const compactLogo = config.compactRiderLogo ?? false;

    const homeWins = parseInt(scoreHome || "0") > parseInt(scoreAway || "0");
    const awayWins = parseInt(scoreHome || "0") < parseInt(scoreAway || "0");

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
          backgroundColor: COLORS.NAVY_DEEP,
          flexShrink: 0,
        }}
      >
        {/* === BACKGROUND PHOTO === */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* === LIGHT VIGNETTE for legibility (kept subtle) === */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(5,11,30,0.45) 0%, rgba(5,11,30,0.0) 22%, rgba(5,11,30,0.0) 60%, rgba(5,11,30,0.65) 86%, rgba(5,11,30,1) 100%)",
          }}
        />

        {/* === DECORATIVE: thin diagonal speed shards top-left === */}
        <svg
          style={{
            position: "absolute",
            top: fs(40),
            left: 0,
            pointerEvents: "none",
            opacity: 0.5,
          }}
          width={fs(80)}
          height={fs(420)}
          viewBox="0 0 80 420"
        >
          {[0, 60, 130, 220, 310].map((y, i) => (
            <line
              key={i}
              x1="0"
              y1={y}
              x2="80"
              y2={y - 30}
              stroke={i % 2 === 0 ? COLORS.BLUE_GLOW : COLORS.BLUE_BRIGHT}
              strokeWidth="2"
              strokeOpacity={0.85 - i * 0.15}
            />
          ))}
        </svg>

        {/* === HERO LOGO: BIG K118 TOP-LEFT (or compact when toggle is on) === */}
        <img
          src={logoK118}
          alt="K118"
          style={{
            position: "absolute",
            top: compactLogo ? fs(28) : fs(30),
            left: compactLogo ? fs(20) : fs(22),
            width: compactLogo ? "auto" : fs(260),
            height: compactLogo ? fs(44) : "auto",
            filter: `drop-shadow(0 ${fs(compactLogo ? 2 : 6)}px ${fs(compactLogo ? 6 : 20)}px rgba(0,0,0,0.7))`,
            zIndex: 5,
          }}
        />

        {/* === TOP-RIGHT HEADER LABEL + optional U-24 === */}
        <div
          style={{
            position: "absolute",
            top: fs(34),
            right: fs(24),
            display: "flex",
            alignItems: "center",
            gap: fs(10),
            zIndex: 5,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: fs(4),
            }}
          >
            <div
              style={{
                padding: `${fs(4)}px ${fs(14)}px`,
                background: COLORS.RED,
                color: COLORS.WHITE,
                fontSize: fs(11),
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                transform: "skewX(-12deg)",
                boxShadow: `0 ${fs(2)}px ${fs(6)}px rgba(0,0,0,0.5)`,
                lineHeight: 1.2,
              }}
            >
              <span style={{ display: "inline-block", transform: "skewX(12deg)", lineHeight: 1.2 }}>
                {headerLeft || (layoutId === "match_day" ? "DZIEŃ MECZOWY" : "WYNIKI MECZU")}
              </span>
            </div>
            <div
              style={{
                color: COLORS.BLUE_GLOW,
                fontSize: fs(10),
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textShadow: `0 ${fs(1)}px ${fs(4)}px rgba(0,0,0,0.8)`,
                lineHeight: 1.2,
              }}
            >
              {headerRight || (layoutId === "match_day" ? "MATCH DAY" : "MATCH RESULTS")}
            </div>
          </div>
          {showU24 && (
            <img
              src={logoU24}
              alt="U-24 Ekstraliga"
              style={{
                height: fs(34),
                width: "auto",
                filter: `drop-shadow(0 ${fs(2)}px ${fs(6)}px rgba(0,0,0,0.7))`,
              }}
            />
          )}
        </div>

        {/* === LAYOUT: WYNIK (RESULTS) === */}
        {layoutId === "wynik" && (
          <>
            {/* Score block — bottom-left over rider boots area */}
            <div
              style={{
                position: "absolute",
                bottom: fs(160),
                left: fs(24),
                right: fs(24),
                zIndex: 5,
              }}
            >
              {/* Team name banner */}
              {teamName && (
                <div
                  style={{
                    display: "inline-block",
                    padding: `${fs(4)}px ${fs(12)}px`,
                    background: `linear-gradient(90deg, ${COLORS.BLUE} 0%, transparent 100%)`,
                    borderLeft: `${fs(3)}px solid ${COLORS.RED}`,
                    color: COLORS.WHITE,
                    fontSize: fs(15),
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: fs(10),
                    lineHeight: 1.2,
                    textShadow: `0 ${fs(2)}px ${fs(6)}px rgba(0,0,0,0.8)`,
                  }}
                >
                  {teamName}
                </div>
              )}

              {/* Score row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: fs(14),
                  background: "rgba(5,11,30,0.78)",
                  backdropFilter: isExporting ? undefined : "blur(6px)",
                  border: `${fs(1)}px solid rgba(59,130,246,0.4)`,
                  padding: `${fs(10)}px ${fs(14)}px`,
                  borderRadius: fs(6),
                  width: "fit-content",
                  maxWidth: "100%",
                  lineHeight: 1,
                }}
              >
                {showHome && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: fs(4), lineHeight: 1 }}>
                    {homeLogoId && homeLogoId !== "none" && CLUB_LOGOS_MAP[homeLogoId] && (
                      <img
                        src={CLUB_LOGOS_MAP[homeLogoId]}
                        alt="Home"
                        style={{
                          height: fs(48),
                          width: "auto",
                          objectFit: "contain",
                          filter: `drop-shadow(0 ${fs(2)}px ${fs(6)}px rgba(0,0,0,0.7))`,
                        }}
                      />
                    )}
                    <span
                      style={{
                        color: COLORS.TEXT_DIM,
                        fontSize: fs(11),
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        lineHeight: 1,
                      }}
                    >
                      {homeTeamName}
                    </span>
                  </div>
                )}

                {showHome && (
                  <span
                    style={{
                      display: "block",
                      color: homeWins ? COLORS.RED_BRIGHT : COLORS.WHITE,
                      fontSize: fs(72),
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      textShadow: homeWins
                        ? `0 0 ${fs(24)}px rgba(239,68,68,0.55), 0 ${fs(3)}px ${fs(12)}px rgba(0,0,0,0.9)`
                        : `0 ${fs(3)}px ${fs(12)}px rgba(0,0,0,0.9)`,
                    }}
                  >
                    {scoreHome}
                  </span>
                )}

                {showHome && showAway && (scoreHome || scoreAway) && (
                  <span
                    style={{
                      display: "block",
                      color: COLORS.BLUE_BRIGHT,
                      fontSize: fs(54),
                      fontWeight: 900,
                      lineHeight: 1,
                      textShadow: `0 0 ${fs(16)}px rgba(59,130,246,0.55)`,
                    }}
                  >
                    :
                  </span>
                )}

                {showAway && (
                  <span
                    style={{
                      display: "block",
                      color: awayWins ? COLORS.RED_BRIGHT : COLORS.WHITE,
                      fontSize: fs(72),
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      textShadow: awayWins
                        ? `0 0 ${fs(24)}px rgba(239,68,68,0.55), 0 ${fs(3)}px ${fs(12)}px rgba(0,0,0,0.9)`
                        : `0 ${fs(3)}px ${fs(12)}px rgba(0,0,0,0.9)`,
                    }}
                  >
                    {scoreAway}
                  </span>
                )}

                {showAway && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: fs(4), lineHeight: 1 }}>
                    {awayLogoId && awayLogoId !== "none" && CLUB_LOGOS_MAP[awayLogoId] && (
                      <img
                        src={CLUB_LOGOS_MAP[awayLogoId]}
                        alt="Away"
                        style={{
                          height: fs(48),
                          width: "auto",
                          objectFit: "contain",
                          filter: `drop-shadow(0 ${fs(2)}px ${fs(6)}px rgba(0,0,0,0.7))`,
                        }}
                      />
                    )}
                    <span
                      style={{
                        color: COLORS.TEXT_DIM,
                        fontSize: fs(11),
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        lineHeight: 1,
                      }}
                    >
                      {awayTeamName}
                    </span>
                  </div>
                )}
              </div>

              {/* Heats — single horizontal row of mini-pills */}
              {heats.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: fs(6),
                    marginTop: fs(12),
                  }}
                >
                  {heats.map((heat) => (
                    <div
                      key={heat.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: fs(6),
                        background: "rgba(5,11,30,0.85)",
                        border: `${fs(1)}px solid ${COLORS.BLUE_BRIGHT}`,
                        borderRadius: fs(3),
                        padding: `${fs(4)}px ${fs(8)}px`,
                      }}
                    >
                      <span
                        style={{
                          color: COLORS.BLUE_GLOW,
                          fontSize: fs(10),
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          lineHeight: 1,
                        }}
                      >
                        {heat.name}
                      </span>
                      <span
                        style={{
                          color: COLORS.WHITE,
                          fontSize: fs(14),
                          fontWeight: 900,
                          lineHeight: 1,
                        }}
                      >
                        {heat.scoreHome}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* === LAYOUT: MATCH DAY === */}
        {layoutId === "match_day" && (
          <div
            style={{
              position: "absolute",
              left: fs(24),
              right: fs(24),
              bottom: fs(165),
              zIndex: 5,
              display: "flex",
              flexDirection: "column",
              gap: fs(10),
            }}
          >
            {showHome && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: fs(14),
                }}
              >
                {homeLogoId && homeLogoId !== "none" && CLUB_LOGOS_MAP[homeLogoId] && (
                  <img
                    src={CLUB_LOGOS_MAP[homeLogoId]}
                    alt="Home"
                    style={{
                      height: fs(70),
                      width: "auto",
                      objectFit: "contain",
                      filter: `drop-shadow(0 ${fs(3)}px ${fs(10)}px rgba(0,0,0,0.85))`,
                    }}
                  />
                )}
                <div
                  style={{
                    color: COLORS.WHITE,
                    fontSize: fs(28),
                    fontWeight: 900,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    lineHeight: 1,
                    textShadow: `0 ${fs(2)}px ${fs(8)}px rgba(0,0,0,0.85)`,
                  }}
                >
                  {homeTeamName}
                </div>
              </div>
            )}

            {showHome && showAway && (
              <div
                style={{
                  color: COLORS.RED_BRIGHT,
                  fontSize: fs(28),
                  fontWeight: 900,
                  letterSpacing: "0.1em",
                  lineHeight: 1,
                  textShadow: `0 0 ${fs(14)}px rgba(239,68,68,0.6)`,
                  paddingLeft: fs(8),
                }}
              >
                VS
              </div>
            )}

            {showAway && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: fs(14),
                }}
              >
                {awayLogoId && awayLogoId !== "none" && CLUB_LOGOS_MAP[awayLogoId] && (
                  <img
                    src={CLUB_LOGOS_MAP[awayLogoId]}
                    alt="Away"
                    style={{
                      height: fs(70),
                      width: "auto",
                      objectFit: "contain",
                      filter: `drop-shadow(0 ${fs(3)}px ${fs(10)}px rgba(0,0,0,0.85))`,
                    }}
                  />
                )}
                <div
                  style={{
                    color: COLORS.BLUE_GLOW,
                    fontSize: fs(28),
                    fontWeight: 900,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    lineHeight: 1,
                    textShadow: `0 ${fs(2)}px ${fs(8)}px rgba(0,0,0,0.85)`,
                  }}
                >
                  {awayTeamName}
                </div>
              </div>
            )}

            {matchInfo && (
              <div
                style={{
                  marginTop: fs(6),
                  color: COLORS.WHITE,
                  fontSize: fs(15),
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  lineHeight: 1.2,
                  textShadow: `0 ${fs(2)}px ${fs(6)}px rgba(0,0,0,0.85)`,
                }}
              >
                {matchInfo}
              </div>
            )}
          </div>
        )}

        {/* === HASHTAG (above sponsor strip) === */}
        {hashtag && (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: fs(125),
              textAlign: "center",
              zIndex: 5,
            }}
          >
            <span
              style={{
                display: "inline-block",
                color: COLORS.BLUE_GLOW,
                fontSize: fs(13),
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                lineHeight: 1.2,
                textShadow: `0 0 ${fs(16)}px rgba(96,165,250,0.7)`,
              }}
            >
              #{hashtag}
            </span>
          </div>
        )}

        {/* === SPONSOR STRIP — BOTTOM (FRAMED SLOTS) === */}
        <div
          style={{
            position: "absolute",
            bottom: fs(20),
            left: fs(20),
            right: fs(20),
            display: "grid",
            gridTemplateColumns: `repeat(${SPONSORS.length}, 1fr)`,
            gap: fs(10),
            zIndex: 5,
          }}
        >
          {SPONSORS.map((sponsor, idx) => (
            <div
              key={idx}
              style={{
                height: fs(80),
                background: "rgba(5,11,30,0.55)",
                border: `${fs(1.5)}px solid ${COLORS.BLUE_BRIGHT}`,
                borderRadius: fs(3),
                boxShadow: `inset 0 0 ${fs(8)}px rgba(59,130,246,0.15)`,
                padding: fs(8),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={sponsor}
                alt={`Sponsor ${idx + 1}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </div>

        {/* === CUSTOM TEXTS === */}
        {(config.customTexts || []).map((ct) => (
          <DraggableText
            key={ct.id}
            ct={ct}
            posterWidth={w}
            posterHeight={h}
            fs={fs}
            onMove={onCustomTextMove}
            isExporting={isExporting}
          />
        ))}
      </div>
    );
  }
);

Kh118Poster.displayName = "Kh118Poster";
