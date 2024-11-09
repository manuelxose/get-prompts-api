// src/domain/dtos/user/CreateUserDTO.ts

import { Validators } from "../../../shared/validators";
import { CountryCode, UserRole } from "../../enums";

export class CreateUserDTO {
  id!: string; // UUID generado externamente
  email!: string;
  password!: string;
  displayName!: string;
  photoURL!: string;
  phoneNumber!: string;
  isSeller!: boolean;
  promptsPublished!: string[];
  paymentMethods!: string[];
  promptsBought!: string[];
  role!: UserRole;
  createdAt!: Date;
  updatedAt!: Date;

  // Campos opcionales
  nickName?: string;
  stripeId?: string;
  promptsLiked?: string[];
  views?: number;
  followers?: string[];
  rank?: number;
  bio?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  website?: string;
  bannerURL?: string;
  following?: string[];
  allowMessages?: boolean;
  acceptCustomJobs?: boolean;
  countryCode?: CountryCode;

  /**
   * Método estático para crear una instancia de CreateUserDTO con validaciones.
   * @param data Datos parciales para la creación del usuario.
   * @returns Un arreglo con un posible mensaje de error y la instancia de CreateUserDTO.
   */
  static create(
    data: Partial<CreateUserDTO>
  ): [string | null, CreateUserDTO | null] {
    const dto = new CreateUserDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    // Validaciones de campos principales
    if (!Validators.isValidUUID(dto.id)) {
      errors.push("ID es requerido y debe ser un UUID válido.");
    }

    if (!Validators.isValidEmail(dto.email)) {
      errors.push("Email es requerido y debe ser válido.");
    }

    if (!Validators.isValidPassword(dto.password)) {
      errors.push(
        "Contraseña es requerida y debe cumplir con los criterios de seguridad."
      );
    }

    if (!Validators.isValidString(dto.displayName)) {
      errors.push(
        "Nombre para mostrar es requerido y debe ser una cadena válida."
      );
    }

    if (!Validators.isValidString(dto.photoURL)) {
      errors.push("photoURL es requerido y debe ser una URL válida.");
    }

    if (!Validators.isValidString(dto.phoneNumber)) {
      errors.push("Número de teléfono es requerido y debe ser válido.");
    }

    if (!Validators.isValidBoolean(dto.isSeller)) {
      errors.push("Campo 'isSeller' es requerido y debe ser booleano.");
    }

    if (!Array.isArray(dto.promptsPublished)) {
      errors.push("promptsPublished debe ser un array.");
    }

    if (!Array.isArray(dto.paymentMethods)) {
      errors.push("paymentMethods debe ser un array.");
    }

    if (!Array.isArray(dto.promptsBought)) {
      errors.push("promptsBought debe ser un array.");
    }

    if (!Validators.isValidRole(dto.role)) {
      errors.push("Rol es requerido y debe ser válido.");
    }

    if (!Validators.isValidDate(dto.createdAt)) {
      errors.push("createdAt es requerido y debe ser una fecha válida.");
    }

    if (!Validators.isValidDate(dto.updatedAt)) {
      errors.push("updatedAt es requerido y debe ser una fecha válida.");
    }

    // Validaciones de campos opcionales
    if (dto.nickName && !Validators.isValidString(dto.nickName)) {
      errors.push("nickName debe ser una cadena válida si se proporciona.");
    }

    if (dto.stripeId && !Validators.isValidString(dto.stripeId)) {
      errors.push("stripeId debe ser una cadena válida si se proporciona.");
    }

    if (dto.promptsLiked && !Array.isArray(dto.promptsLiked)) {
      errors.push("promptsLiked debe ser un array si se proporciona.");
    }

    if (dto.views && typeof dto.views !== "number") {
      errors.push("views debe ser un número si se proporciona.");
    }

    if (dto.followers && !Array.isArray(dto.followers)) {
      errors.push("followers debe ser un array si se proporciona.");
    }

    if (dto.rank && typeof dto.rank !== "number") {
      errors.push("rank debe ser un número si se proporciona.");
    }

    if (dto.bio && typeof dto.bio !== "string") {
      errors.push("bio debe ser una cadena válida si se proporciona.");
    }

    if (dto.instagram && !Validators.isValidURL(dto.instagram)) {
      errors.push("instagram debe ser una URL válida si se proporciona.");
    }

    if (dto.twitter && !Validators.isValidURL(dto.twitter)) {
      errors.push("twitter debe ser una URL válida si se proporciona.");
    }

    if (dto.youtube && !Validators.isValidURL(dto.youtube)) {
      errors.push("youtube debe ser una URL válida si se proporciona.");
    }

    if (dto.website && !Validators.isValidURL(dto.website)) {
      errors.push("website debe ser una URL válida si se proporciona.");
    }

    if (dto.bannerURL && !Validators.isValidURL(dto.bannerURL)) {
      errors.push("bannerURL debe ser una URL válida si se proporciona.");
    }

    if (dto.following && !Array.isArray(dto.following)) {
      errors.push("following debe ser un array si se proporciona.");
    }

    if (
      dto.allowMessages !== undefined &&
      !Validators.isValidBoolean(dto.allowMessages)
    ) {
      errors.push("allowMessages debe ser booleano si se proporciona.");
    }

    if (
      dto.acceptCustomJobs !== undefined &&
      !Validators.isValidBoolean(dto.acceptCustomJobs)
    ) {
      errors.push("acceptCustomJobs debe ser booleano si se proporciona.");
    }

    if (dto.countryCode && !Validators.isValidCountryCode(dto.countryCode)) {
      errors.push(
        "countryCode debe ser un código de país válido si se proporciona."
      );
    }

    // Añade más validaciones según sea necesario

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
