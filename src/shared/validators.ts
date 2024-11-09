// src/shared/validators/Validators.ts

import { PromptConfigDTO } from "../domain/dtos/prompt";
import { AuthMethod, PromptCategory, UserRole } from "../domain/enums";

export class Validators {
  /**
   * Valida si el valor es un string no vacío.
   */
  static isValidString(value: any): boolean {
    return typeof value === "string" && value.trim().length > 0;
  }

  /**
   * Valida si el valor es un URL válido.
   */
  static isValidURL(value: any): boolean {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return typeof value === "string" && urlPattern.test(value);
  }

  /**
   * Valida si el valor es un ID válido (string no vacío).
   */
  static isValidId(value: any): boolean {
    return this.isValidString(value);
  }

  /**
   * Valida si el valor es un nombre válido (string no vacío).
   */
  static isValidName(value: any): boolean {
    return this.isValidString(value);
  }

  /**
   * Valida si el valor es una descripción válida (string no vacío).
   */
  static isValidDescription(value: any): boolean {
    return this.isValidString(value);
  }

  /**
   * Valida si el valor es un precio válido (número positivo).
   */
  static isValidPrice(value: any): boolean {
    return typeof value === "number" && value >= 0;
  }

  /**
   * Valida si el valor es un contador válido (número no negativo).
   */
  static isValidCount(value: any): boolean {
    return typeof value === "number" && value >= 0;
  }

  /**
   * Valida si el valor es una etiqueta válida (string no vacío).
   */
  static isValidTag(value: any): boolean {
    return this.isValidString(value);
  }

  /**
   * Valida si el array de imágenes es válido (no vacío y URLs válidas).
   */
  static isValidImageArray(images: any): boolean {
    if (!Array.isArray(images) || images.length === 0) {
      return false;
    }
    return images.every((image) => this.isValidURL(image));
  }

  /**
   * Valida si el array de tags es válido (array de strings no vacíos).
   */
  static isValidTagsArray(tags: any): boolean {
    if (!Array.isArray(tags)) {
      return false;
    }
    return tags.every((tag) => this.isValidTag(tag));
  }

  /**
   * Valida si el PromptCategory es válido.
   */
  static isValidPromptCategory(value: any): boolean {
    return Object.values(PromptCategory).includes(value);
  }

  /**
   * Valida si el country code es válido.
   */
  static isValidCountryCode(value: any): boolean {
    // Lista de códigos de país válidos (puedes expandirla según sea necesario)
    const countryCodes = [
      "US",
      "CA",
      "GB",
      "AU",
      "DE",
      "FR",
      "ES",
      "IT",
      // Agrega todos los códigos de país ISO 3166-1 alpha-2 relevantes
    ];
    return typeof value === "string" && countryCodes.includes(value);
  }

  /**
   * Valida si el tipo de GPTConfig es válido.
   */
  static isValidGPTType(value: any): boolean {
    return value === "Completion" || value === "Chat";
  }

  /**
   * Valida si el tipo de DALLEConfig es válido.
   */
  static isValidDALLEVersion(value: any): boolean {
    return value === "DALL-E 2" || value === "DALL-E 3";
  }

  static isValidNumber(value: any): boolean {
    return typeof value === "number";
  }

  static isValidRole(value: any): boolean {
    return Object.values(UserRole).includes(value);
  }

  static isValidDisplayName(value: any): boolean {
    return this.isValidString(value);
  }

  static isValidPhotoURL(value: any): boolean {
    return this.isValidURL(value);
  }

  static isValidPhoneNumber(value: any): boolean {
    return this.isValidString(value);
  }

  /**
   * Valida el formato del correo electrónico.
   * @param email - La dirección de correo electrónico a validar.
   * @returns True si el correo electrónico tiene un formato válido, false de lo contrario.
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Valida la contraseña asegurando que tenga al menos 8 caracteres, incluyendo letras y números.
   * @param password - La contraseña a validar.
   * @returns True si la contraseña es válida, false de lo contrario.
   */
  static isValidPassword(password: string): boolean {
    const minLength = 8;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&_\-.]{8,}$/;
    console.log("password: ", password);
    console.log("passwordRegex: ", passwordRegex);
    console.log("passwordRegex.test(password): ", passwordRegex.test(password));
    console.log("minLength: ", minLength);
    console.log("password.length >= minLength: ", password.length >= minLength);

    return password.length >= minLength && passwordRegex.test(password);
  }

  static isValidBoolean(value: any): boolean {
    return typeof value === "boolean";
  }

  static isValidUUID(value: any): boolean {
    return (
      typeof value === "string" &&
      value.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      ) !== null
    );
  }

  static isValidMethod(value: any): boolean {
    return Object.values(AuthMethod).includes(value);
  }

  static isValidDate(value: any): boolean {
    return value instanceof Date && !isNaN(value.getTime());
  }

  static isValidAuthMethod(value: any): boolean {
    return Object.values(AuthMethod).includes(value);
  }

  static isValidPromptConfig(value: any): boolean {
    return value instanceof PromptConfigDTO;
  }

  static isValidCategory(value: any): boolean {
    return Object.values(PromptCategory).includes(value);
  }
}
