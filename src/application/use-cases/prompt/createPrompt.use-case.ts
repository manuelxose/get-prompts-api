// src/application/use-cases/prompt/createPrompt.use-case.ts

import { CreatePromptDTO, UploadToDbDTO } from "../../../domain/dtos/prompt";
import { UpdateUserDTO } from "../../../domain/dtos/user";
import { PromptEntity } from "../../../domain/entities/prompt";
import { CustomError } from "../../../domain/errors";
import {
  ImageRepository,
  PromptRepository,
  UserRepository,
} from "../../../domain/repositories";

/**
 * Caso de uso para crear un nuevo prompt.
 */
export class CreatePromptUseCase {
  constructor(
    private promptRepository: PromptRepository,
    private imageRepository: ImageRepository,
    private userRepository: UserRepository
  ) {}
  /**
   * Ejecutar el caso de uso para crear un prompt.
   * @param createPromptDTO DTO que contiene los datos para crear el prompt.
   * @returns El prompt creado.
   * @throws CustomError si ocurre algún error durante el proceso.
   */
  async execute(createPromptDTO: CreatePromptDTO): Promise<PromptEntity> {
    const uploadedImageUrls: string[] = [];
    try {
      // Subida de imágenes
      for (const image of createPromptDTO.images) {
        const { buffer, filename } = image;

        if (!buffer || !filename) {
          throw CustomError.badRequest(
            "Cada imagen debe tener un buffer y un filename válido."
          );
        }
        console.log("buffer: ", buffer);
        console.log("filename: ", filename);

        const imageUrl = await this.imageRepository.uploadImage(
          buffer,
          filename
        );

        console.log("imageUrl: ", imageUrl);
        if (!imageUrl) {
          throw CustomError.internal("Error al subir la imagen");
        }

        uploadedImageUrls.push(imageUrl);
      }
      // Crear DTO para la base de datos
      const uploadDTO: UploadToDbDTO = {
        ...createPromptDTO,
        images: uploadedImageUrls,
      };

      // Crear prompt en la base de datos
      const createdPrompt: PromptEntity = await this.promptRepository.create(
        uploadDTO
      );

      //Si el prompt se crea con exito, se debe añadir al usuario
      const [errr, updateDTO] = UpdateUserDTO.create({
        id: createdPrompt.userId,
        promptsPublished: [createdPrompt.id],
      });

      if (errr) {
        throw CustomError.badRequest(errr);
      }

      await this.userRepository.update(updateDTO!);

      return createdPrompt;
    } catch (error: any) {
      // Eliminar imágenes ya subidas en caso de error
      for (const imageUrl of uploadedImageUrls) {
        // Extraer el ID de la imagen desde la URL (asumiendo una estructura específica)
        const imageId = this.extractImageIdFromUrl(imageUrl);
        await this.imageRepository.deleteImage(imageId);
      }

      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internal("Error al crear el prompt: " + error);
    }
  }

  /**
   * Función para extraer el ID de la imagen desde la URL.
   * Esto depende de cómo estructures las URLs de las imágenes.
   * @param url URL de la imagen.
   * @returns ID de la imagen.
   */
  private extractImageIdFromUrl(url: string): string {
    // Implementa la lógica para extraer el ID de la imagen
    // Por ejemplo, si la URL es 'https://s3.amazonaws.com/bucket/prompts/uuid1.jpg'
    // Puedes extraer 'uuid1.jpg' y luego obtener 'uuid1'
    const parts = url.split("/");
    const filename = parts[parts.length - 1];
    const imageId = filename.split(".")[0];
    return imageId;
  }
}
