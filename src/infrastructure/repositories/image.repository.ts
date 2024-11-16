// src/infrastructure/repositories/image.repository.ts

import { ImageRepository } from "../../domain/repositories/image.repository";
import { ImageDataSource } from "../datasources";

class ImageRepositoryImpl implements ImageRepository {
  constructor(private readonly imageDataSource: ImageDataSource) {}

  /**
   * Subir una imagen utilizando el data source.
   * @param file Buffer de la imagen.
   * @param filename Nombre original del archivo.
   * @returns URL pública de la imagen subida.
   */
  async uploadImage(file: Buffer, filename: string): Promise<string> {
    return this.imageDataSource.uploadImage(file, filename);
  }

  async getImage(id: string): Promise<Buffer> {
    return this.imageDataSource.getImage(id);
  }

  async deleteImage(id: string): Promise<void> {
    return this.imageDataSource.deleteImage(id);
  }
}

export { ImageRepositoryImpl as ImageRepository };
