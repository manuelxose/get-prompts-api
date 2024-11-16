// src/domain/dtos/prompt/CreatePromptDTO.ts

import { Validators } from "../../../shared/validators";
import { CountryCode, PromptCategory } from "../../enums";
import { CustomError } from "../../errors";
import { ImageInput } from "../../models/image/imageInput.model";
import { PromptConfig, Rating, Review } from "../../models/prompt";

/**
 * Clase DTO para la creación de un prompt.
 */
export class CreatePromptDTO {
  id?: string; // UUID generado externamente
  userId!: string; // ID del usuario que crea el prompt
  category!: PromptCategory;
  name!: string;
  shortDescription!: string;
  price!: number;
  country!: CountryCode;
  config!: PromptConfig;
  images!: ImageInput[]; // Array de imágenes a subir

  // Campos opcionales
  fullDescription?: string;
  customPrice?: number;
  tags?: string[];
  isActive?: boolean;
  views?: number;
  likes?: number;
  salesCount?: number;
  ratings?: Rating[]; // Define adecuadamente si implementas ratings
  reviews?: Review[]; // Define adecuadamente si implementas reviews

  /**
   * Método estático para crear una instancia de CreatePromptDTO con validaciones.
   * @param data Datos parciales para la creación del prompt.
   * @returns Un arreglo con un posible mensaje de error y la instancia de CreatePromptDTO.
   */
  static create(
    data: Partial<CreatePromptDTO>
  ): [string | null, CreatePromptDTO | null] {
    const dto = new CreatePromptDTO();

    Object.assign(dto, data);

    const errors: string[] = [];

    if (data.images) {
      dto.images = data.images.map((image) => {
        if (!image.data) {
          throw CustomError.badRequest("Image data is required");
        }
        const buffer = Buffer.from(image.data.split(",")[1], "base64"); // Convertir Base64 a Buffer

        if (!image.filename) {
          throw CustomError.badRequest("Image filename is required");
        }
        if (!Validators.isValidString(image.filename)) {
          throw CustomError.badRequest("Image filename must be a string");
        }
        return {
          buffer,
          filename: image.filename,
        };
      });
    }

    // Validaciones de campos principales
    // if (!Validators.isValidUUID(dto.id)) {
    //   errors.push("ID es requerido y debe ser un UUID válido.");
    // }

    if (!Validators.isValidUUID(dto.userId)) {
      errors.push("userId es requerido y debe ser un UUID válido.");
    }

    if (!Validators.isValidCategory(dto.category)) {
      errors.push("Category es requerida y debe ser válida.");
    }

    if (!Validators.isValidString(dto.name)) {
      errors.push("Name es requerido y debe ser una cadena válida.");
    }

    if (!Validators.isValidString(dto.shortDescription)) {
      errors.push(
        "Short description es requerida y debe ser una cadena válida."
      );
    }

    if (typeof dto.price !== "number" || dto.price < 0) {
      errors.push("Price es requerido y debe ser un número positivo.");
    }

    if (!Validators.isValidCountryCode(dto.country)) {
      errors.push("Country es requerido y debe ser un código de país válido.");
    }

    if (!Validators.isValidPromptConfig(dto.config)) {
      errors.push("Config es requerida y debe ser válida.");
    }

    if (!Array.isArray(dto.images) || dto.images.length === 0) {
      errors.push("Images es requerido y debe ser un array no vacío.");
    } else {
      // Validar cada imagen
      dto.images.forEach((image, index) => {
        if (!Buffer.isBuffer(image.buffer)) {
          errors.push(`Image at index ${index} must be a valid Buffer.`);
        }
        if (!Validators.isValidString(image.filename)) {
          errors.push(`Image at index ${index} must have a valid filename.`);
        }
      });
    }

    // Validaciones de campos opcionales
    if (dto.fullDescription && typeof dto.fullDescription !== "string") {
      errors.push(
        "fullDescription debe ser una cadena válida si se proporciona."
      );
    }

    if (
      dto.customPrice !== undefined &&
      (typeof dto.customPrice !== "number" || dto.customPrice < 0)
    ) {
      errors.push("customPrice debe ser un número positivo si se proporciona.");
    }

    if (dto.tags && !Array.isArray(dto.tags)) {
      errors.push("tags debe ser un array si se proporciona.");
    }

    if (dto.isActive !== undefined && typeof dto.isActive !== "boolean") {
      errors.push("isActive debe ser booleano si se proporciona.");
    }

    if (dto.views !== undefined && typeof dto.views !== "number") {
      errors.push("views debe ser un número si se proporciona.");
    }

    if (dto.likes !== undefined && typeof dto.likes !== "number") {
      errors.push("likes debe ser un número si se proporciona.");
    }

    if (dto.salesCount !== undefined && typeof dto.salesCount !== "number") {
      errors.push("salesCount debe ser un número si se proporciona.");
    }

    // Añade más validaciones según sea necesario

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
