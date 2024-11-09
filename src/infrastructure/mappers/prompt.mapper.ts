// src/infrastructure/mappers/prompt.mapper.ts

import { PromptEntity } from "../../domain/entities/prompt";
import { PromptDocument } from "../../data/mongodb/models/prompt.model";

export class PromptMapper {
  /**
   * Convertir un documento de Mongoose a una entidad de dominio.
   * @param prompt PromptDocument de Mongoose.
   * @returns PromptEntity.
   */
  static toEntity(prompt: PromptDocument): PromptEntity {
    return new PromptEntity(
      prompt.id,
      prompt.userId,
      prompt.category,
      prompt.name,
      prompt.shortDescription,
      prompt.price,
      prompt.country,
      prompt.config, // Asignación correcta de config
      prompt.createdAt,
      prompt.updatedAt,
      prompt.isActive,
      prompt.views,
      prompt.likes,
      prompt.images || [],
      prompt.customPrice || 0,
      prompt.fullDescription || "",
      prompt.tags || [], // Asignación correcta de tags
      prompt.ratings || [],
      prompt.reviews || [],
      prompt.salesCount || 0
    );
  }

  /**
   * (Opcional) Convertir una entidad de dominio a un documento de Mongoose.
   * Útil si necesitas crear o actualizar documentos directamente.
   * @param prompt PromptEntity.
   * @returns Objeto plano para Mongoose.
   */
  static toDocument(prompt: PromptEntity): Partial<PromptDocument> {
    return {
      id: prompt.id,
      userId: prompt.userId,
      category: prompt.category,
      name: prompt.name,
      shortDescription: prompt.shortDescription,
      fullDescription: prompt.fullDescription,
      price: prompt.price,
      customPrice: prompt.customPrice,
      country: prompt.country,
      tags: prompt.tags,
      isActive: prompt.isActive,
      views: prompt.views,
      likes: prompt.likes,
      config: prompt.config,
      images: prompt.images,
      ratings: prompt.ratings,
      reviews: prompt.reviews,
      salesCount: prompt.salesCount,
      updatedAt: prompt.updatedAt,
    };
  }
}
