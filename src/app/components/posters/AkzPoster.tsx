import { forwardRef } from "react";
import { PosterProps } from "./shared/types";
import { SpeedDemonLayout } from "./akz/SpeedDemonLayout";

export const AkzPoster = forwardRef<HTMLDivElement, PosterProps>(
  (props, ref) => {
    return <SpeedDemonLayout {...props} ref={ref} />;
  }
);

AkzPoster.displayName = "AkzPoster";
