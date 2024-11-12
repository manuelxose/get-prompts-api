// src/domain/dtos/auth/GoogleAuthCodeDTO.ts

export class GoogleAuthCodeDTO {
  readonly code: string;

  constructor(code: string) {
    this.code = code;
  }

  static create(query: any): [string | null, GoogleAuthCodeDTO | null] {
    const { code } = query;
    if (!code) {
      return ["El código de autenticación es requerido.", null];
    }
    return [null, new GoogleAuthCodeDTO(code)];
  }
}
