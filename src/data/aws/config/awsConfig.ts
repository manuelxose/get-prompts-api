import AWS from "aws-sdk";
import { env } from "../../../core/config/env";

export class AWSConfig {
  public s3: AWS.S3;
  private bucketName: string;
  constructor() {
    this.bucketName = env.awsBucketName;
    AWS.config.update({
      region: env.awsRegion,
      credentials: {
        accessKeyId: env.awsAccessKeyId,
        secretAccessKey: env.awsSecretAccessKey,
      },
    });

    this.s3 = new AWS.S3();
  }

  public getBucketName(): string {
    return this.bucketName;
  }

  // Métodos para exponer directamente los de S3
  async upload(params: AWS.S3.PutObjectRequest) {
    return this.s3.upload(params).promise();
  }

  async getObject(params: AWS.S3.GetObjectRequest) {
    return this.s3.getObject(params).promise();
  }

  async deleteObject(params: AWS.S3.DeleteObjectRequest) {
    return this.s3.deleteObject(params).promise();
  }
}
