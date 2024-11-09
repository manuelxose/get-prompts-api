// src/domain/dtos/prompt/PromptConfigDTO.ts

import {
  GPTConfigDTO,
  DALLEConfigDTO,
  LeonardoAIConfigDTO,
  LlamaConfigDTO,
  MidJourneyConfigDTO,
  PromptBaseConfigDTO,
  StableDiffusionConfigDTO,
  BardConfigDTO,
} from "../prompt-config";

export class PromptConfigDTO {
  GPTConfig?: GPTConfigDTO;
  DALLEConfig?: DALLEConfigDTO;
  LeonardoAIConfig?: LeonardoAIConfigDTO;
  LlamaConfig?: LlamaConfigDTO;
  MidJourneyConfig?: MidJourneyConfigDTO;
  PromptBaseConfig?: PromptBaseConfigDTO;
  StableDiffusionConfig?: StableDiffusionConfigDTO;
  BardConfig?: BardConfigDTO;

  static create(
    data: Partial<PromptConfigDTO>
  ): [string | null, PromptConfigDTO | null] {
    const dto = new PromptConfigDTO();
    Object.assign(dto, data);

    const errors: string[] = [];

    if (dto.GPTConfig) {
      const [error, configDTO] = GPTConfigDTO.create(dto.GPTConfig);
      if (error) {
        errors.push(`GPTConfig Error: ${error}`);
      } else {
        dto.GPTConfig = configDTO!;
      }
    }

    if (dto.DALLEConfig) {
      const [error, configDTO] = DALLEConfigDTO.create(dto.DALLEConfig);
      if (error) {
        errors.push(`DALLEConfig Error: ${error}`);
      } else {
        dto.DALLEConfig = configDTO!;
      }
    }

    if (dto.LeonardoAIConfig) {
      const [error, configDTO] = LeonardoAIConfigDTO.create(
        dto.LeonardoAIConfig
      );
      if (error) {
        errors.push(`LeonardoAIConfig Error: ${error}`);
      } else {
        dto.LeonardoAIConfig = configDTO!;
      }
    }

    if (dto.LlamaConfig) {
      const [error, configDTO] = LlamaConfigDTO.create(dto.LlamaConfig);
      if (error) {
        errors.push(`LlamaConfig Error: ${error}`);
      } else {
        dto.LlamaConfig = configDTO!;
      }
    }

    if (dto.MidJourneyConfig) {
      const [error, configDTO] = MidJourneyConfigDTO.create(
        dto.MidJourneyConfig
      );
      if (error) {
        errors.push(`MidJourneyConfig Error: ${error}`);
      } else {
        dto.MidJourneyConfig = configDTO!;
      }
    }

    if (dto.PromptBaseConfig) {
      const [error, configDTO] = PromptBaseConfigDTO.create(
        dto.PromptBaseConfig
      );
      if (error) {
        errors.push(`PromptBaseConfig Error: ${error}`);
      } else {
        dto.PromptBaseConfig = configDTO!;
      }
    }

    if (dto.StableDiffusionConfig) {
      const [error, configDTO] = StableDiffusionConfigDTO.create(
        dto.StableDiffusionConfig
      );
      if (error) {
        errors.push(`StableDiffusionConfig Error: ${error}`);
      } else {
        dto.StableDiffusionConfig = configDTO!;
      }
    }

    if (dto.BardConfig) {
      const [error, configDTO] = BardConfigDTO.create(dto.BardConfig);
      if (error) {
        errors.push(`BardConfig Error: ${error}`);
      } else {
        dto.BardConfig = configDTO!;
      }
    }

    if (errors.length > 0) {
      return [errors.join(", "), null];
    }

    return [null, dto];
  }
}
