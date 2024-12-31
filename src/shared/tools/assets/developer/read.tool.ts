import { RawDevelopers } from "@shared/types";
import { read } from "../fs";

export const readRawDevelopers = (): RawDevelopers => {
  const raw = read<RawDevelopers>("developers.raw.json");

  return raw;
};
