// src/infrastructure/mappers/UserMapper.ts

import { IUser } from "../../data/mongodb/models";
import { UserEntity } from "../../domain/entities/user/user.entity";

export class UserMapper {
  static toEntity(user: IUser): UserEntity {
    return new UserEntity(
      user.id,
      user.displayName,
      user.photoURL,
      user.phoneNumber,
      user.isSeller,
      user.promptsPublished,
      user.paymentMethods,
      user.promptsBought,
      user.role,
      user.createdAt,
      user.updatedAt,
      user.nickName,
      user.stripeId,
      user.promptsLiked,
      user.views,
      user.followers,
      user.rank,
      user.bio,
      user.instagram,
      user.twitter,
      user.youtube,
      user.website,
      user.bannerURL,
      user.following,
      user.allowMessages,
      user.acceptCustomJobs,
      user.countryCode
    );
  }
}
