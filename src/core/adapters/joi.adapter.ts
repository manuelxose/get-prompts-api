import Joi, {
  ObjectSchema,
  ValidationError,
  Schema,
  StringSchema,
  NumberSchema,
  BooleanSchema,
  ArraySchema,
} from "joi";

export interface IValidator<T> {
  validate(data: T): Promise<T>;
}

export class JoiAdapter<T> implements IValidator<T> {
  private schema: ObjectSchema<T>;

  constructor(schema: ObjectSchema<T>) {
    this.schema = schema;
  }

  async validate(data: T): Promise<T> {
    try {
      const value = await this.schema.validateAsync(data, {
        abortEarly: false,
      });
      return value;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new Error(this.formatErrors(error));
      }
      throw error;
    }
  }

  private formatErrors(error: ValidationError): string {
    return error.details.map((detail) => detail.message).join(", ");
  }

  // Métodos estáticos para proxy de Joi
  static object<T = any>(schema?: {
    [key in keyof T]: Schema;
  }): ObjectSchema<T> {
    return Joi.object<T>(schema);
  }

  static string(): StringSchema {
    return Joi.string();
  }

  static number(): NumberSchema {
    return Joi.number();
  }

  static boolean(): BooleanSchema {
    return Joi.boolean();
  }

  static array(): ArraySchema {
    return Joi.array();
  }
}
