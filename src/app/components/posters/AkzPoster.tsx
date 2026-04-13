import React, { forwardRef } from "react";
import { PosterProps } from "./shared/types";
import { BoldStrikerLayout } from "./akz/BoldStrikerLayout";
import { CleanPowerLayout } from "./akz/CleanPowerLayout";
import { SpeedDemonLayout } from "./akz/SpeedDemonLayout";

export const AkzPoster = forwardRef<HTMLDivElement, PosterProps>(
  (props, ref) => {
    const layoutId = props.config.layoutId || "bold_striker";

    switch (layoutId) {
      case "bold_striker":
        return <BoldStrikerLayout {...props} ref={ref} />;
      case "clean_power":
        return <CleanPowerLayout {...props} ref={ref} />;
      case "speed_demon":
        return <SpeedDemonLayout {...props} ref={ref} />;
      default:
        return <BoldStrikerLayout {...props} ref={ref} />;
    }
  }
);

AkzPoster.displayName = "AkzPoster";
