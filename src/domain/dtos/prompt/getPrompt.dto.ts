import {
  MainFilter,
  ProductType,
  TypeFilter,
  SortBy,
  Model,
  Category,
  GeneralCategory,
  Tag,
} from "../../enums";

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

  static create(params: any): [string | null, GetPromptDTO | null] {
    const dto = new GetPromptDTO();

    // Validación manual
    try {
      if (
        params.mainFilter &&
        !Object.values(MainFilter).includes(params.mainFilter)
      ) {
        throw new Error(`Invalid mainFilter: ${params.mainFilter}`);
      }
      if (
        params.productType &&
        !Object.values(ProductType).includes(params.productType)
      ) {
        throw new Error(`Invalid productType: ${params.productType}`);
      }
      if (
        params.typeFilter &&
        !Object.values(TypeFilter).includes(params.typeFilter)
      ) {
        throw new Error(`Invalid typeFilter: ${params.typeFilter}`);
      }
      if (params.sortBy && !Object.values(SortBy).includes(params.sortBy)) {
        throw new Error(`Invalid sortBy: ${params.sortBy}`);
      }
      if (params.model && !Object.values(Model).includes(params.model)) {
        throw new Error(`Invalid model: ${params.model}`);
      }

      if (params.categories) {
        if (!Array.isArray(params.categories)) {
          throw new Error("categories must be an array");
        }
        for (const category of params.categories) {
          if (!Object.values(Category).includes(category)) {
            throw new Error(`Invalid category: ${category}`);
          }
        }
      }

      if (params.generalCategories) {
        if (!Array.isArray(params.generalCategories)) {
          throw new Error("generalCategories must be an array");
        }
        for (const generalCategory of params.generalCategories) {
          if (!Object.values(GeneralCategory).includes(generalCategory)) {
            throw new Error(`Invalid generalCategory: ${generalCategory}`);
          }
        }
      }

      if (params.tags) {
        if (!Array.isArray(params.tags)) {
          throw new Error("tags must be an array");
        }
        for (const tag of params.tags) {
          if (!Object.values(Tag).includes(tag)) {
            throw new Error(`Invalid tag: ${tag}`);
          }
        }
      }

      dto.mainFilter = params.mainFilter;
      dto.productType = params.productType;
      dto.typeFilter = params.typeFilter;
      dto.sortBy = params.sortBy;
      dto.model = params.model;
      dto.categories = params.categories;
      dto.generalCategories = params.generalCategories;
      dto.tags = params.tags;
      dto.page = params.page ? Number(params.page) : 1;
      dto.limit = params.limit ? Math.min(Number(params.limit), 100) : 10;

      return [null, dto];
    } catch (validationError: any) {
      return [validationError.message, null];
    }
  }
}
