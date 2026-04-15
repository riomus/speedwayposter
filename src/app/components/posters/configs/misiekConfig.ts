import { RiderConfig, PosterConfig } from "../shared/types";
import bgThumb1 from "../../../../assets/a9f444eda0b68d242315e46ad4c961ed74f42334.png";
import bgThumb2 from "../../../../assets/633cb56e126361bd8bafb54b2dc4059b83ba5b67.png";
import bgThumb3 from "../../../../assets/a58ea5c412dbad40193fcd735703fe4be406ebd5.png";
import bgThumb4 from "../../../../assets/5bb7d630512919f24bd2c3a692eb7f93e17f393a.png";
import bgThumb5 from "../../../../assets/bg/bg5.png";
import bgThumb6 from "../../../../assets/bg/bg6.png";
import bgThumb7 from "../../../../assets/bg/bg7.png";
import bgThumb8 from "../../../../assets/bg/bg8.png";
import bgThumb9 from "../../../../assets/bg/bg9.png";

const defaultHeats = [
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
  showHome: true,
  showAway: true,
  layoutId: "wynik",
  aspectRatio: "9:16",
  customTexts: [],
};

export const misiekConfig: RiderConfig = {
  riderId: "misiek",
  riderName: "MISIEK RACING",
  defaultConfig,
  backgrounds: [
    { id: "1", label: "Oryginalny", thumb: bgThumb1 },
    { id: "2", label: "Niebieski akcja", thumb: bgThumb2 },
    { id: "3", label: "Złoty efekt", thumb: bgThumb3 },
    { id: "4", label: "Złoto-niebieski", thumb: bgThumb4 },
    { id: "5", label: "Wariant 5", thumb: bgThumb5 },
    { id: "6", label: "Wariant 6", thumb: bgThumb6 },
    { id: "7", label: "Wariant 7", thumb: bgThumb7 },
    { id: "8", label: "Wariant 8", thumb: bgThumb8 },
    { id: "9", label: "Wariant 9", thumb: bgThumb9 },
  ],
  layouts: [
    { id: "wynik", label: "Wyniki (Wynik)" },
    { id: "match_day", label: "Zapowiedź (Match Day)" },
  ],
  logoPath: "7e44f37685ad3f3cf69ea7a3d89ed6e9c1d46460.png",
  sponsorPaths: [
    "sponsors/logo_brand_claim.png",
    "sponsors/arche_hotel.png",
    "sponsors/wrobel.png",
    "sponsors/f2.png",
  ],
  primaryColor: "#1e6db5",
  accentColor: "#f5c518",
};
