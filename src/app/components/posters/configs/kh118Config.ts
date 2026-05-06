import { RiderConfig, PosterConfig } from "../shared/types";
import bgThumb1 from "../../../../assets/bg/kh118/1.png";
import bgThumb2 from "../../../../assets/bg/kh118/2.png";
import bgThumb3 from "../../../../assets/bg/kh118/3.png";

const defaultHeats = [
  { id: "1", name: "BIEG 1", scoreHome: "3" },
  { id: "2", name: "BIEG 2", scoreHome: "2" },
  { id: "3", name: "BIEG 3", scoreHome: "3" },
  { id: "4", name: "BIEG 4", scoreHome: "1" },
  { id: "5", name: "BIEG 5", scoreHome: "0" },
  { id: "6", name: "BIEG 6", scoreHome: "2" },
];

const defaultConfig: PosterConfig = {
  teamName: "K118 RACING",
  scoreHome: "48",
  scoreAway: "42",
  homeTeamName: "K118",
  awayTeamName: "SPARTA",
  heats: defaultHeats,
  hashtag: "KH118",
  matchInfo: "",
  headerLeft: "WYNIKI MECZU",
  headerRight: "MATCH RESULTS",
  backgroundImageId: "1",
  homeLogoId: "none",
  awayLogoId: "none",
  showHome: true,
  showAway: true,
  showU24Logo: true,
  compactRiderLogo: false,
  layoutId: "wynik",
  aspectRatio: "9:16",
  customTexts: [],
};

export const kh118Config: RiderConfig = {
  riderId: "kh118",
  riderName: "K118 RACING",
  defaultConfig,
  backgrounds: [
    { id: "1", label: "K118 Background 1", thumb: bgThumb1 },
    { id: "2", label: "K118 Background 2", thumb: bgThumb2 },
    { id: "3", label: "K118 Background 3", thumb: bgThumb3 },
  ],
  layouts: [
    { id: "wynik", label: "Wyniki (Wynik)" },
    { id: "match_day", label: "Zapowiedź (Match Day)" },
  ],
  logoPath: "logos/kh118/kd118.svg",
  sponsorPaths: [
    "sponsors/kh118/master-asia.png",
    "sponsors/kh118/bmj-light.png",
    "sponsors/kh118/color1-logo.png",
  ],
  primaryColor: "#1D4ED8",
  accentColor: "#DC2626",
};
