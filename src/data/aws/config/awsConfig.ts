import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  PutObjectCommandInput,
  GetObjectCommandInput,
  DeleteObjectCommandInput,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";
import { env } from "../../../core/config/env";

export class AWSConfig {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: env.awsRegion,
      credentials: {
        accessKeyId: env.awsAccessKeyId,
        secretAccessKey: env.awsSecretAccessKey,
      },
    });
  }

  public async putObject(
    bucket: string,
    key: string,
    body: Buffer,
    contentType: string
  ): Promise<string> {
    const params: PutObjectCommandInput = {
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    };

    const command = new PutObjectCommand(params);
    await this.s3Client.send(command);

    // Utiliza directamente `env.awsRegion` en lugar de `this.s3Client.config.region`
    const region = env.awsRegion;

    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  }
  public async getObject(bucket: string, key: string): Promise<Buffer> {
    const params: GetObjectCommandInput = {
      Bucket: bucket,
      Key: key,
    };

    const command = new GetObjectCommand(params);
    const data = await this.s3Client.send(command);

    if (!data.Body) {
      throw new Error(`Object with key ${key} not found.`);
    }

    // Convertir Body a Buffer si es un ReadableStream o Uint8Array
    if (Buffer.isBuffer(data.Body)) {
      return data.Body;
    } else if (typeof (data.Body as any).on === "function") {
      return this.streamToBuffer(data.Body as any);
    } else if (data.Body instanceof Uint8Array) {
      return Buffer.from(data.Body);
    } else {
      throw new Error("Unexpected data type for S3 object body.");
    }
  }

  public async deleteObject(bucket: string, key: string): Promise<void> {
    const params: DeleteObjectCommandInput = {
      Bucket: bucket,
      Key: key,
    };

    const command = new DeleteObjectCommand(params);
    await this.s3Client.send(command);
  }

  private async streamToBuffer(stream: any): Promise<Buffer> {
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }

  public getBucketName(): string {
    return env.awsBucketName;
  }
}
