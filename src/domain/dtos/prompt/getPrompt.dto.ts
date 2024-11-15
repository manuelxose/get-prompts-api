// src/domain/dtos/prompt.dto.ts
import Joi from "joi";
import {
  MainFilter,
  ProductType,
  TypeFilter,
  SortBy,
  Model,
  Category,
  GeneralCategory,
  Tag,
} from "../../enums"; // Asegúrate de importar las enums correctamente

export interface GetPromptDTO {
  mainFilter?: MainFilter;
  productType?: ProductType;
  typeFilter?: TypeFilter;
  sortBy?: SortBy;
  model?: Model;
  categories?: Category[];
  generalCategories?: GeneralCategory[];
  tags?: Tag[];
  page?: number;
  limit?: number;
}

export const GetPromptSchema = Joi.object({
  mainFilter: Joi.string().valid(...Object.values(MainFilter)),
  productType: Joi.string().valid(...Object.values(ProductType)),
  typeFilter: Joi.string().valid(...Object.values(TypeFilter)),
  sortBy: Joi.string().valid(...Object.values(SortBy)),
  model: Joi.string().valid(...Object.values(Model)),
  categories: Joi.array().items(Joi.string().valid(...Object.values(Category))),
  generalCategories: Joi.array().items(
    Joi.string().valid(...Object.values(GeneralCategory))
  ),
  tags: Joi.array().items(Joi.string().valid(...Object.values(Tag))),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});

export class GetPromptDTO implements GetPromptDTO {
  mainFilter?: MainFilter;
  productType?: ProductType;
  typeFilter?: TypeFilter;
  sortBy?: SortBy;
  model?: Model;
  categories?: Category[];
  generalCategories?: GeneralCategory[];
  tags?: Tag[];
  page?: number;
  limit?: number;

  static create(
    params: any
  ): [Joi.ValidationError | null, GetPromptDTO | null] {
    const { error, value } = GetPromptSchema.validate(params, {
      abortEarly: false,
    });
    if (error) {
      return [error, null];
    }
    return [null, value];
  }
}
