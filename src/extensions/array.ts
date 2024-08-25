declare global {
  interface Array<T> {
    isEmpty(): boolean;
    isNotEmpty(): boolean;
    joinWithCustomLastSeparator(
      separator: string,
      lastSeparator: string
    ): string;
  }
}
Array.prototype.isEmpty = function (this: Array<any>): boolean {
  return this.length === 0;
};
Array.prototype.isNotEmpty = function (this: Array<any>): boolean {
  return this.length !== 0;
};
Array.prototype.joinWithCustomLastSeparator = function (
  this: Array<any>,
  separator: string,
  lastSeparator: string
): string {
  if (this.length === 0) return "";
  if (this.length === 1) return this[0];
  return this.slice(0, -1).join(separator) + lastSeparator + this.slice(-1);
};

export {};
