// src/utils/cacheKeyGenerator.ts

import { GetPromptDTO } from "../../domain/dtos/prompt";

export const generateCacheKey = (getPromptDTO: GetPromptDTO): string => {
  const {
    mainFilter = "all",
    productType = "all",
    typeFilter = "all",
    sortBy = "none",
    model = "all",
    categories = [],
    generalCategories = [],
    tags = [],
    page = 1,
    limit = 10,
  } = getPromptDTO;

  const key = `prompts:mainFilter=${mainFilter}:productType=${productType}:typeFilter=${typeFilter}:sortBy=${sortBy}:model=${model}:categories=${categories
    .sort()
    .join(",")}:generalCategories=${generalCategories
    .sort()
    .join(",")}:tags=${tags.sort().join(",")}:page=${page}:limit=${limit}`;

  return key;
};

export const generatePromptCacheKey = (id: string): string => {
  return `prompts:${id}`;
};
