// src/domain/dtos/auth/AppleAuthCodeDTO.ts

export class AppleAuthCodeDTO {
  constructor(public code: string) {}

  static create(query: any): [string | null, AppleAuthCodeDTO | null] {
    const { code } = query;
    if (!code) {
      return ["El código de autenticación es requerido.", null];
    }
    return [null, new AppleAuthCodeDTO(code)];
  }
}
