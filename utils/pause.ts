export function pause(seconds = 5) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
