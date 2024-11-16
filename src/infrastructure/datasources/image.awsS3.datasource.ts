import path from "path";
import { AWSConfig } from "../../data/aws/config/awsConfig";
import { ImageDataSource } from "../../domain/datasources";
import { uuid } from "../../core/adapters";

export class ImageAwsS3DataSourceImpl implements ImageDataSource {
  private s3: AWSConfig;
  private bucketName: string;
  private uuid = uuid.generate();

  constructor() {
    this.s3 = new AWSConfig();
    this.bucketName = this.s3.getBucketName();
  }

  async uploadImage(file: Buffer, filename: string): Promise<string> {
    console.log("uploadImage");
    const fileExtension = path.extname(filename).substring(1);
    const uniqueFilename = `${this.uuid}.${fileExtension}`;
    const contentType = this.getContentType(fileExtension);
    return this.s3.putObject(
      this.bucketName,
      `prompts/${uniqueFilename}`,
      file,
      contentType
    );
  }

  async getImage(id: string): Promise<Buffer> {
    return this.s3.getObject(this.bucketName, `prompts/${id}`);
  }

  async deleteImage(id: string): Promise<void> {
    await this.s3.deleteObject(this.bucketName, `prompts/${id}`);
  }

  private getContentType(extension: string): string {
    const mimeTypes: { [key: string]: string } = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
    };
    return mimeTypes[extension.toLowerCase()] || "application/octet-stream";
  }
}

export { ImageAwsS3DataSourceImpl as ImageDataSource };
