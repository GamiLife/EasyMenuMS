import { fromFile, fromBuffer } from "file-type";

export const mimeByName = async (fileName: string) => {
  const mime = await fromFile(fileName);
  return mime;
};

export const mimeByBuffer = async (buffer: Buffer) => {
  const mime = await fromBuffer(buffer);
  return mime;
};
