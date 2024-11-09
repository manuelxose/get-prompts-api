// src/infrastructure/middlewares/validators.ts

import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../domain/errors/customError";
import {
  PromptCategory,
  CountryCode,
  GPTEngine,
  UserRole,
} from "../../domain/enums";
import { JoiAdapter as Joi } from "../../core/adapters";

/**
 * Validador para registrar usuario.
 */
export const registerUserValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    country: Joi.string().length(2).required(), // ISO 3166-1 alpha-2
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }
  next();
};

/**
 * Validador para iniciar sesión.
 */
export const loginUserValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }
  next();
};

/**
 * Validador para crear un prompt.
 */
export const createPromptValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    category: Joi.string()
      .valid(...Object.values(PromptCategory))
      .required(),
    name: Joi.string().min(3).max(100).required(),
    shortDescription: Joi.string().min(10).max(300).required(),
    fullDescription: Joi.string().optional(),
    price: Joi.number().min(0).required(),
    customPrice: Joi.number().min(0).optional(),
    country: Joi.string()
      .valid(...Object.values(CountryCode))
      .required(),
    tags: Joi.array().items(Joi.string()).optional(),
    config: Joi.object().required(),
    images: Joi.array().items(Joi.string().uri()).min(1).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }
  next();
};

/**
 * Validador para obtener un prompt.
 */
export const getPromptValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });

  const { id } = req.params;
  const { error } = schema.validate({ id });
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }
  next();
};

/**
 * Validador para actualizar el perfil del usuario.
 */
export const updateUserProfileValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    displayName: Joi.string().min(3).max(50).optional(),
    photoURL: Joi.string().uri().optional(),
    phoneNumber: Joi.string().optional(),
    isSeller: Joi.boolean().optional(),
    nickName: Joi.string().min(3).max(30).optional(),
    bio: Joi.string().max(500).optional(),
    instagram: Joi.string().uri().optional(),
    twitter: Joi.string().uri().optional(),
    youtube: Joi.string().uri().optional(),
    website: Joi.string().uri().optional(),
    bannerURL: Joi.string().uri().optional(),
    allowMessages: Joi.boolean().optional(),
    acceptCustomJobs: Joi.boolean().optional(),
    role: Joi.string()
      .valid(...Object.values(UserRole))
      .optional(),
    country: Joi.string()
      .valid(...Object.values(CountryCode))
      .optional(),
    // Agrega otros campos según sea necesario
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }
  next();
};
