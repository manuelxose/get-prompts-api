// src/domain/entities/user/UserEntity.ts

import { CountryCode, UserRole } from "../../enums";

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
  role: UserRole;
  countryCode?: CountryCode;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    displayName: string,
    photoURL: string,
    phoneNumber: string,
    isSeller: boolean,
    promptsPublished: string[],
    paymentMethods: string[],
    promptsBought: string[],
    role: UserRole,
    createdAt: Date,
    updatedAt: Date,
    nickName?: string,
    stripeId?: string,
    promptsLiked: string[] = [],
    views: number = 0,
    followers: string[] = [],
    rank: number = 0,
    bio: string = "",
    instagram: string = "",
    twitter: string = "",
    youtube: string = "",
    website: string = "",
    bannerURL: string = "",
    following: string[] = [],
    allowMessages: boolean = true,
    acceptCustomJobs: boolean = false,
    countryCode?: CountryCode
  ) {
    this.id = id;
    this.displayName = displayName;
    this.photoURL = photoURL;
    this.phoneNumber = phoneNumber;
    this.isSeller = isSeller;
    this.promptsPublished = promptsPublished;
    this.paymentMethods = paymentMethods;
    this.promptsBought = promptsBought;
    this.nickName = nickName;
    this.stripeId = stripeId;
    this.promptsLiked = promptsLiked;
    this.views = views;
    this.followers = followers;
    this.rank = rank;
    this.bio = bio;
    this.instagram = instagram;
    this.twitter = twitter;
    this.youtube = youtube;
    this.website = website;
    this.bannerURL = bannerURL;
    this.following = following;
    this.allowMessages = allowMessages;
    this.acceptCustomJobs = acceptCustomJobs;
    this.role = role;
    this.countryCode = countryCode;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
