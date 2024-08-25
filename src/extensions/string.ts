import { Types, isValidObjectId } from "mongoose";

declare global {
  interface String {
    toObjectId(): Types.ObjectId;
    isEmpty(): boolean;
    isNotEmpty(): boolean;
  }
}

String.prototype.toObjectId = function (this: string): Types.ObjectId {
  if (!isValidObjectId(this)) throw new Error("Invalid ObjectId format");
  return new Types.ObjectId(this);
};
String.prototype.isEmpty = function (this: string): boolean {
  return this.length === 0;
};
String.prototype.isNotEmpty = function (this: string): boolean {
  return this.length !== 0;
};
