import type { Options, ApiError } from "../types/Common";
import type { BedwarsMatchDetail } from "../types/Bedwars";
import { getHeaders } from "./common";

export default async function getBedwarsMatch(
  matchId: string | number,
  options?: Options
): Promise<BedwarsMatchDetail | ApiError> {
  try {
    const data = await fetch(
      `https://www.coralmc.it/api/v1/stats/bedwars/match/${matchId}`,
      {
        ...getHeaders(options),
      }
    );

    const json = await data.json();

    if ("message" in json) {
      return json as ApiError;
    }

    return json as BedwarsMatchDetail;
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
