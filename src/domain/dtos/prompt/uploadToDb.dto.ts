export class UploadToDbDTO {
  id?: string;
  userId!: string;
  category!: string;
  name!: string;
  shortDescription!: string;
  fullDescription?: string;
  price!: number;
  customPrice?: number;
  country!: string;
  tags?: string[];
  isActive?: boolean;
  views?: number;
  likes?: number;
  config?: any;
  images?: string[];
  ratings?: any[]; // Define adecuadamente si implementas ratings
  reviews?: any[]; // Define adecuadamente si implementas reviews
  salesCount?: number;

  static create(
    data: Partial<UploadToDbDTO>
  ): [string | null, UploadToDbDTO | null] {
    const dto = new UploadToDbDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (!dto.id) {
      errors.push("ID es requerido y debe ser un UUID válido.");
    }

    if (!dto.userId) {
      errors.push("userId es requerido y debe ser un UUID válido.");
    }

    if (!dto.category) {
      errors.push("Category es requerida y debe ser válida.");
    }

    if (!dto.name) {
      errors.push("Name es requerido y debe ser una cadena válida.");
    }

    if (!dto.shortDescription) {
      errors.push(
        "Short description es requerida y debe ser una cadena válida."
      );
    }

    if (typeof dto.price !== "number" || dto.price < 0) {
      errors.push("Price es requerido y debe ser un número positivo.");
    }

    if (!dto.country) {
      errors.push("Country es requerido y debe ser un código de país válido.");
    }

    if (!dto.config) {
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
