// src/domain/repositories/image.repository.ts

export abstract class ImageRepository {
  abstract uploadImage(file: Buffer, filename: string): Promise<string>;
  abstract getImage(id: string): Promise<Buffer>;
  abstract deleteImage(id: string): Promise<void>;
}
