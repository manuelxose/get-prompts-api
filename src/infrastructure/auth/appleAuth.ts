// src/infrastructure/auth/appleAuth.ts

import passport from "passport";
import { Strategy as AppleStrategy, Profile } from "passport-apple";
import { userAuthRepository } from "../repositories";
import { AuthMethod } from "../../domain/enums/authMethod.enum";
import { User } from "../../domain/entities/user/user.entity";
import { CustomError } from "../../domain/errors/customError";
import jwt from "jsonwebtoken";

passport.use(
  new AppleStrategy(
    {
      clientID: process.env.APPLE_CLIENT_ID as string,
      teamID: process.env.APPLE_TEAM_ID as string,
      keyID: process.env.APPLE_KEY_ID as string,
      privateKey: process.env.APPLE_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n"
      ) as string,
      callbackURL: "/api/auth/apple/callback",
      passReqToCallback: false,
    },
    async (accessToken, refreshToken, idToken, profile: Profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) {
          throw new CustomError("No email found in Apple profile", 400);
        }

        let user: User | null = await userAuthRepository.findByEmail(email);

        if (!user) {
          // Registrar nuevo usuario
          user = await userAuthRepository.register({
            name: profile.displayName || "Apple User",
            email,
            password: "", // No se requiere contraseña para OAuth
            country: "US", // Puedes obtener el país del perfil si está disponible
          });
          // Actualizar método de autenticación
          user.authMethod = AuthMethod.APPLE;
          // Actualizar en la base de datos
          // Implementa este método si es necesario
        }

        // Generar token JWT
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET as string,
          { expiresIn: process.env.JWT_EXPIRES_IN as string }
        );

        return done(null, { user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialización y deserialización
passport.serializeUser((data: any, done) => {
  done(null, data);
});

passport.deserializeUser((data: any, done) => {
  done(null, data);
});
