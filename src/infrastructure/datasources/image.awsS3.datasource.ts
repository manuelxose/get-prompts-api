// src/infrastructure/datasources/image.awsS3.datasource.ts

import path from "path";
import { AWSConfig } from "../../data/aws/config/awsConfig";
import { ImageDataSource } from "../../domain/datasources";
import { uuid } from "../../core/adapters";

export class ImageAwsS3DataSourceImpl implements ImageDataSource {
  private s3: AWSConfig;
  private bucketName: string;
  private uuid = uuid.generate();
  constructor() {
    // Métodos de inicialización o configuración de la base de datos si es necesario
    this.s3 = new AWSConfig();
    this.bucketName = this.s3.getBucketName();
  }

  /**
   * Subir una imagen a S3.
   * @param file Buffer de la imagen.
   * @param filename Nombre original del archivo.
   * @returns URL pública de la imagen subida.
   */
  async uploadImage(file: Buffer, filename: string): Promise<string> {
    const fileExtension = path.extname(filename).substring(1);
    const uniqueFilename = `${this.uuid}.${fileExtension}`;
    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.bucketName,
      Key: `prompts/${uniqueFilename}`,
      Body: file,
      ContentType: this.getContentType(fileExtension),
      ACL: "public-read", // Asegura que la imagen sea accesible públicamente
    };

    const data = await this.s3.upload(params);
    return data.Location; // URL pública de la imagen
  }

  async getImage(id: string): Promise<Buffer> {
    const params: AWS.S3.GetObjectRequest = {
      Bucket: this.bucketName,
      Key: `prompts/${id}`,
    };
    const data = await this.s3.getObject(params);
    if (!data.Body) {
      throw new Error(`Image with ID ${id} not found.`);
    }
    return data.Body as Buffer;
  }

  async deleteImage(id: string): Promise<void> {
    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: this.bucketName,
      Key: `prompts/${id}`,
    };
    await this.s3.deleteObject(params);
  }

  /**
   * Obtener el tipo de contenido basado en la extensión del archivo.
   * @param extension Extensión del archivo.
   * @returns Tipo de contenido MIME.
   */
  private getContentType(extension: string): string {
    const mimeTypes: { [key: string]: string } = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      // Añade más tipos si es necesario
    };
    return mimeTypes[extension.toLowerCase()] || "application/octet-stream";
  }
}

export { ImageAwsS3DataSourceImpl as ImageDataSource };
