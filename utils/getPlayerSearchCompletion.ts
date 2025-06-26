import type { Options, ApiError } from "../types/Common";
import type { PlayerSearchCompletion } from "../types/Player";
import { getHeaders, isUsernameValid } from "./common";

export default async function getPlayerSearchCompletion(
  searchTerm: string,
  options?: Options
): Promise<PlayerSearchCompletion | ApiError> {
  if (!searchTerm || searchTerm.length < 3 || !isUsernameValid(searchTerm))
    return [];

  try {
    const data = await fetch(
      `https://www.coralmc.it/api/v1/stats/search/${encodeURIComponent(
        searchTerm
      )}`,
      {
        ...getHeaders(options),
      }
    );

    const json = await data.json();

    if ("message" in json) {
      return json as ApiError;
    }

    return json as PlayerSearchCompletion;
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
