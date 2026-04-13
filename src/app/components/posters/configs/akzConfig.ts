import { RiderConfig, PosterConfig } from "../shared/types";
import bgThumb1 from "../../../../assets/bg/akz/1.png";

const defaultHeats = [
  { id: "1", name: "BIEG 1", scoreHome: "5" },
  { id: "2", name: "BIEG 2", scoreHome: "3" },
  { id: "3", name: "BIEG 3", scoreHome: "4" },
  { id: "4", name: "BIEG 4", scoreHome: "2" },
  { id: "5", name: "BIEG 5", scoreHome: "5" },
];

const defaultConfig: PosterConfig = {
  teamName: "AKŻ RACING",
  scoreHome: "52",
  scoreAway: "38",
  homeTeamName: "AKŻ",
  awayTeamName: "SPARTA",
  heats: defaultHeats,
  hashtag: "#AKZRACING",
  matchInfo: "",
  headerLeft: "WYNIKI MECZU",
  headerRight: "MATCH RESULTS",
  backgroundImageId: "1",
  homeLogoId: "none",
  awayLogoId: "none",
  layoutId: "speed_demon",
  aspectRatio: "9:16",
  customTexts: [],
};

export const akzConfig: RiderConfig = {
  riderId: "akz",
  riderName: "AKŻ RACING",
  defaultConfig,
  backgrounds: [
    { id: "1", label: "AKŻ Background", thumb: bgThumb1 },
  ],
  layouts: [
    { id: "speed_demon", label: "Speed Demon" },
  ],
  logoPath: "logos/akż/logo.png",
  sponsorPaths: [
    "logos/akż/Haj.png",
    "logos/akż/roosters.png",
    "logos/akż/wts.png",
    "logos/akż/Grantland ver 1 (shadows).png",
    "logos/akż/mcs.png",
    "logos/akż/automax.png",
    "logos/akż/Betonlit.png",
    "logos/akż/Causality.png",
    "logos/akż/rrspeedway.png",
    "logos/akż/format.jpeg",
  ],
  primaryColor: "#DC2626",
  accentColor: "#FBBF24",
};
