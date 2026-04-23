import { RiderConfig, PosterConfig } from "../shared/types";
import bgThumb1 from "../../../../assets/bg/akz/1.png";
import bgThumb2 from "../../../../assets/bg/akz/2.png";
import bgThumb3 from "../../../../assets/bg/akz/3.png";
import bgThumb4 from "../../../../assets/bg/akz/4.png";

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
    { id: "1", label: "AKŻ Background 1", thumb: bgThumb1 },
    { id: "2", label: "AKŻ Background 2", thumb: bgThumb2 },
    { id: "3", label: "AKŻ Background 3", thumb: bgThumb3 },
    { id: "4", label: "AKŻ Background 4", thumb: bgThumb4 },
  ],
  layouts: [
    { id: "speed_demon", label: "Speed Demon" },
  ],
  logoPath: "logos/akż/logo.png",
  sponsorPaths: [
    "logos/akż/processed-Haj.png",
    "logos/akż/processed-roosters.png",
    "logos/akż/processed-wts.png",
    "logos/akż/processed-Grantland ver 1 (shadows).png",
    "logos/akż/processed-mcs.png",
    "logos/akż/processed-automax.png",
    "logos/akż/processed-Betonlit.png",
    "logos/akż/processed-Causality.png",
    "logos/akż/processed-rrspeedway.png",
    "logos/akż/processed-format.png",
  ],
  primaryColor: "#DC2626",
  accentColor: "#FBBF24",
};
