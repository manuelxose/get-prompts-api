// src/domain/dtos/prompt/UpdatePromptDTO.ts

import { Validators } from "../../../shared/validators";
import { PromptCategory, CountryCode } from "../../enums";
import { PromptConfigDTO } from "./promptConfig.dto";

export class UpdatePromptDTO {
  id!: string; // Prompt ID
  userId?: string;
  category?: PromptCategory;
  name?: string;
  shortDescription?: string;
  price?: number;
  country?: CountryCode;
  config?: PromptConfigDTO;
  images?: string[];

  customPrice?: number;
  fullDescription?: string;
  tags?: string[];

  isActive?: boolean;
  views?: number;
  likes?: number;
  salesCount?: number;

  static create(
    data: Partial<UpdatePromptDTO>
  ): [string | null, UpdatePromptDTO | null] {
    const dto = new UpdatePromptDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!dto.id) {
      errors.push("Prompt ID is required");
    } else if (typeof dto.id !== "string") {
      errors.push("Prompt ID must be a string");
    }

    if (dto.userId && typeof dto.userId !== "string") {
      errors.push("User ID must be a string");
    }

    if (dto.category && !Validators.isValidRole(dto.category)) {
      // Ajustar si hay un validador específico para categorías
      errors.push("Invalid category");
    }

    if (dto.name && typeof dto.name !== "string") {
      errors.push("Name must be a string");
    }

    if (dto.shortDescription && typeof dto.shortDescription !== "string") {
      errors.push("Short description must be a string");
    }

    if (dto.price !== undefined && typeof dto.price !== "number") {
      errors.push("Price must be a number");
    }

    if (dto.customPrice !== undefined && typeof dto.customPrice !== "number") {
      errors.push("Custom price must be a number");
    }

    if (dto.country && !Validators.isValidCountryCode(dto.country)) {
      errors.push("Invalid country code");
    }

    if (dto.images) {
      if (dto.images.length === 0) {
        errors.push("At least one image is required");
      } else {
        dto.images.forEach((image, index) => {
          if (!Validators.isValidURL(image)) {
            errors.push(`Image URL at index ${index} is invalid`);
          }
        });
      }
    }

    // Validar config si es necesario

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
