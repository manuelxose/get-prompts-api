// src/infrastructure/datasources/image.awsS3.datasource.ts

export abstract class ImageDataSource {
  abstract getImage(id: string): Promise<any>;
  abstract deleteImage(id: string): Promise<void>;
}
