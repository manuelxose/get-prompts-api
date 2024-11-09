// src/domain/dtos/prompt/CreatePromptDTO.ts

import { Validators } from "../../../shared/validators";
import { PromptCategory, CountryCode } from "../../enums";
import { PromptConfig } from "../../models/prompt";

export class CreatePromptDTO {
  id!: string; // UUID generado externamente
  userId!: string; // ID del usuario que crea el prompt
  category!: PromptCategory;
  name!: string;
  shortDescription!: string;
  price!: number;
  country!: CountryCode;
  config!: PromptConfig;
  images!: string[];

  // Campos opcionales
  fullDescription?: string;
  customPrice?: number;
  tags?: string[];
  isActive?: boolean;
  views?: number;
  likes?: number;
  ratings?: string[]; // Define adecuadamente si implementas ratings
  reviews?: string[]; // Define adecuadamente si implementas reviews
  salesCount?: number;

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

    // Validaciones de campos principales
    if (!Validators.isValidUUID(dto.id)) {
      errors.push("ID es requerido y debe ser un UUID válido.");
    }

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

    if (dto.ratings && !Array.isArray(dto.ratings)) {
      errors.push("ratings debe ser un array si se proporciona.");
    }

    if (dto.reviews && !Array.isArray(dto.reviews)) {
      errors.push("reviews debe ser un array si se proporciona.");
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
