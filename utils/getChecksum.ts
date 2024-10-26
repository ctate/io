import crypto from "crypto";

export function getChecksum(data: string) {
  const hash = crypto.createHash("md5");
  hash.update(data);
  return hash.digest("hex");
}
