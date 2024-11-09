// src/domain/dtos/user/updateUserProfile.dto.ts

import { Validators } from "../../../shared/validators";
import { UserEntity } from "../../entities/user/user.entity";
import { CountryCode, UserRole } from "../../enums";

export class UpdateUserDTO {
  id!: string; // Usamos `!` para indicar que esta propiedad será asignada posteriormente
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  isSeller?: boolean;
  nickName?: string;
  bio?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  website?: string;
  bannerURL?: string;
  allowMessages?: boolean;
  acceptCustomJobs?: boolean;
  role?: UserRole;
  countryCode?: CountryCode;

  static create(
    data: Partial<UpdateUserDTO>
  ): [string | null, UpdateUserDTO | null] {
    const dto = new UpdateUserDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    // Validaciones utilizando el módulo de Validators
    if (dto.displayName && !Validators.isValidDisplayName(dto.displayName)) {
      errors.push("Display name must be between 3 and 50 characters");
    }
    if (dto.photoURL && !Validators.isValidURL(dto.photoURL)) {
      errors.push("Invalid URL format for photoURL");
    }
    if (dto.phoneNumber && !Validators.isValidPhoneNumber(dto.phoneNumber)) {
      errors.push("Invalid phone number format");
    }
    if (dto.role && !Validators.isValidRole(dto.role)) {
      errors.push("Invalid role");
    }
    if (dto.countryCode && !Validators.isValidCountryCode(dto.countryCode)) {
      errors.push("Invalid country code");
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }

  static createFromDTO(dto: UpdateUserDTO): UserEntity {
    return new UserEntity(
      dto.id,
      dto.displayName || "",
      dto.photoURL || "",
      dto.phoneNumber || "",
      dto.isSeller || false,
      [], // promptsPublished (inicializado vacío)
      [], // paymentMethods (inicializado vacío)
      [], // promptsBought (inicializado vacío)
      dto.role || UserRole.USER, // Rol predeterminado
      new Date(), // createdAt
      new Date(), // updatedAt
      dto.nickName || "",
      "", // stripeId predeterminado a vacío
      [], // promptsLiked inicializado vacío
      0, // views predeterminado a 0
      [], // followers inicializado vacío
      0, // rank predeterminado a 0
      dto.bio || "", // bio
      dto.instagram || "", // instagram
      dto.twitter || "", // twitter
      dto.youtube || "", // youtube
      dto.website || "", // website
      dto.bannerURL || "", // bannerURL
      [], // following inicializado vacío
      dto.allowMessages ?? true, // allowMessages predeterminado a true
      dto.acceptCustomJobs ?? false, // acceptCustomJobs predeterminado a false
      dto.countryCode // countryCode
    );
  }
}
