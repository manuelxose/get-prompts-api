// src/infrastructure/mappers/UserMapper.ts

import { IUser } from "../../data/mongodb/models";
import { UserEntity } from "../../domain/entities/user";

export class UserMapper {
  static toEntity(user: IUser): UserEntity {
    return UserEntity.create({
      id: user.id,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      isSeller: user.isSeller,
      promptsPublished: user.promptsPublished,
      paymentMethods: user.paymentMethods,
      promptsBought: user.promptsBought,
      nickName: user.nickName,
      stripeId: user.stripeId,
      promptsLiked: user.promptsLiked,
      views: user.views,
      followers: user.followers,
      rank: user.rank,
      bio: user.bio,
      instagram: user.instagram,
      twitter: user.twitter,
      youtube: user.youtube,
      website: user.website,
      bannerURL: user.bannerURL,
      following: user.following,
      allowMessages: user.allowMessages,
      acceptCustomJobs: user.acceptCustomJobs,
      role: user.role,
      countryCode: user.countryCode,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
