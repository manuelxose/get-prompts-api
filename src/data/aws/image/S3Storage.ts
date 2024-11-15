import { AWSCongig } from "../config/awsConfig";

export class S3Storage {
  private bucketName: string;
  private s3: AWS.S3;

  constructor(bucketName: string) {
    this.bucketName = bucketName;
    this.s3 = AWSCongig.awsS3();
  }

  async uploadImage(file: File): Promise<string> {
    const fileName = file.name;
    const filePath = `${this.bucketName}/${fileName}`;
    const params = {
      Bucket: this.bucketName,
      Key: filePath,
      Body: file.arrayBuffer(),
      ContentType: file.type,
      ACL: "public-read",
    };
    try {
      const data = await this.s3.upload(params).promise();
      return data.Location;
    } catch (error) {
      console.error("Error al subir imagen a S3:", error);
      throw error;
    }
  }
}
