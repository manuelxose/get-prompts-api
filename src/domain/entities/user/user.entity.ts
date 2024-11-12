// src/domain/entities/user/UserEntity.ts

import { uuid } from "../../../core/adapters";
import { CountryCode, UserRole } from "../../enums";

interface UserEntityProps {
  id?: string; // UUID, opcional para permitir generación automática
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  isSeller?: boolean;
  promptsPublished?: string[];
  paymentMethods?: string[];
  promptsBought?: string[];
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
  role?: UserRole;
  countryCode?: CountryCode;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserEntity {
  id: string; // UUID
  displayName: string;
  photoURL: string;
  phoneNumber: string;
  isSeller: boolean;
  promptsPublished: string[];
  paymentMethods: string[];
  promptsBought: string[];
  nickName?: string;
  stripeId?: string;
  promptsLiked: string[];
  views: number;
  followers: string[];
  rank: number;
  bio: string;
  instagram: string;
  twitter: string;
  youtube: string;
  website: string;
  bannerURL: string;
  following: string[];
  allowMessages: boolean;
  acceptCustomJobs: boolean;
  role: UserRole;
  countryCode?: CountryCode;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: UserEntityProps = {}) {
    this.id = props.id || this.generateUUID();
    this.displayName = props.displayName || "Anonymous";
    this.photoURL = props.photoURL || "";
    this.phoneNumber = props.phoneNumber || "";
    this.isSeller = props.isSeller || false;
    this.promptsPublished = props.promptsPublished || [];
    this.paymentMethods = props.paymentMethods || [];
    this.promptsBought = props.promptsBought || [];
    this.nickName = props.nickName;
    this.stripeId = props.stripeId;
    this.promptsLiked = props.promptsLiked || [];
    this.views = props.views || 0;
    this.followers = props.followers || [];
    this.rank = props.rank || 0;
    this.bio = props.bio || "";
    this.instagram = props.instagram || "";
    this.twitter = props.twitter || "";
    this.youtube = props.youtube || "";
    this.website = props.website || "";
    this.bannerURL = props.bannerURL || "";
    this.following = props.following || [];
    this.allowMessages =
      props.allowMessages !== undefined ? props.allowMessages : true;
    this.acceptCustomJobs =
      props.acceptCustomJobs !== undefined ? props.acceptCustomJobs : false;
    this.role = props.role || UserRole.USER;
    this.countryCode = props.countryCode;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  // Método para generar UUID (puedes usar una librería como 'uuid' para esto)
  private generateUUID(): string {
    return uuid.generate();
  }

  // Método estático de fábrica para mayor flexibilidad
  static create(props: UserEntityProps = {}): UserEntity {
    return new UserEntity(props);
  }
}
