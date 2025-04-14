import type { Options } from "../types/Options";

export function isUsernameValid(username: string) {
  if (username.length < 3 || username.length > 16) {
    return false;
  }
  return /^[a-zA-Z0-9_]+$/.test(username);
}

export function getHeaders(options?: Options) {
  if (options?.customUserAgent) {
    return {
      headers: {
        "User-Agent": options.customUserAgent,
      },
    };
  }
  return {};
}

export function getFormattedRank(rawRank: string | undefined): string | null {
  if (!rawRank) return null;
  const formattedRank = rawRank.replace(/[^A-Z]/g, "");
  return formattedRank == "" ? null : formattedRank;
}
