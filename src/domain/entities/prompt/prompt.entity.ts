// src/domain/entities/prompt/PromptEntity.ts

import { PromptCategory, CountryCode } from "../../enums";
import { PromptConfig, Rating, Review } from "../../models/prompt";

export class PromptEntity {
  // Identifiers
  id: string;
  userId: string;
  category: PromptCategory;

  // Basic Information
  name: string;
  shortDescription: string;
  fullDescription?: string;
  price: number;
  customPrice?: number;
  country: CountryCode;
  tags?: string[];

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  views: number;
  likes: number;

  // Configuration Specific to Category
  config: PromptConfig;

  // Assets
  images: string[];

  // Optional Fields for Scalability and Filtering
  ratings?: Rating[];
  reviews?: Review[];
  salesCount?: number;

  constructor(
    id: string,
    userId: string,
    category: PromptCategory,
    name: string,
    shortDescription: string,
    price: number,
    country: CountryCode,
    config: PromptConfig,
    createdAt: Date,
    updatedAt: Date,
    isActive: boolean = true,
    views: number = 0,
    likes: number = 0,
    images: string[] = [],
    customPrice?: number,
    fullDescription?: string,
    tags?: string[],
    ratings?: Rating[],
    reviews?: Review[],
    salesCount?: number
  ) {
    this.id = id;
    this.userId = userId;
    this.category = category;
    this.name = name;
    this.shortDescription = shortDescription;
    this.price = price;
    this.customPrice = customPrice;
    this.fullDescription = fullDescription;
    this.country = country;
    this.tags = tags;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isActive = isActive;
    this.views = views;
    this.likes = likes;
    this.config = config;
    this.images = images;
    this.ratings = ratings;
    this.reviews = reviews;
    this.salesCount = salesCount;
  }
}
