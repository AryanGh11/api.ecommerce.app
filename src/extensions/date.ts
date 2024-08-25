declare global {
  interface Date {
    localify(): string;
  }
}
Date.prototype.localify = function (this: Date): string {
  return "string"; // returning
};

export {};
