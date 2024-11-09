import cors from "cors";
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { AppRoutes } from "../../core/config";
import { errorHandler } from "../../domain/errors/errorHandler";

export class Server {
  private readonly app: Application;
  private readonly allowedOrigins = [
    "https://getprompts.store",
    "http://localhost:4200",
    "https://www.getprompts.store",
  ];

  constructor() {
    this.app = express();
    this.initServer();
  }

  private initServer() {
    // Configuración de CORS
    const corsOptions: cors.CorsOptions = {
      origin: (origin, callback) => {
        if (!origin || this.allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("No permitido por CORS"));
        }
      },
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
      optionsSuccessStatus: 204,
    };

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.set("trust proxy", true);

    this.app.use(AppRoutes.routes);
    this.app.use(errorHandler);

    this.app.get("/", (req, res) => {
      res.send("API está funcionando!");
    });
  }

  async start(port: number): Promise<void> {
    return new Promise((resolve) => {
      this.app.listen(port, "0.0.0.0", () => {
        console.log(`Servidor ejecutándose en el puerto ${port}`);
        resolve();
      });
    });
  }
}
