// src/adapters/BcryptAdapter.ts
import bcrypt from "bcrypt";

export class BcryptAdapter {
  private readonly saltRounds: number;

  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds;
  }

  /**
   * Hashea una contraseña utilizando bcrypt.
   * @param password La contraseña en texto plano a hashear.
   * @returns La contraseña hasheada.
   */
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  /**
   * Compara una contraseña en texto plano con un hash almacenado.
   * @param password La contraseña en texto plano.
   * @param hashedPassword El hash de la contraseña.
   * @returns True si coinciden, false en caso contrario.
   */
  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
