// src/adapters/FileUploadAdapter.ts
import formidable, { Fields, Files } from "formidable";
import { IncomingMessage } from "http"; // Import IncomingMessage from http module
import fs from "fs";

interface FileUploadResult {
  fields: Fields;
  files: Files;
}

export class FileUploadAdapter {
  private form: InstanceType<typeof formidable.IncomingForm>;

  constructor() {
    this.form = new formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
    });
  }

  public async parse(req: IncomingMessage): Promise<FileUploadResult> {
    return new Promise((resolve, reject) => {
      this.form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });
  }

  public async readFileAsBuffer(filepath: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(filepath, (err: any, data: Buffer) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }
}
