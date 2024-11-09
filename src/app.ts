import { MongoDatabase } from "./core/config";
import { env } from "./core/config/env";
import { Server } from "./infrastructure/webserver/server";

class App {
  private server: Server;

  constructor() {
    this.server = new Server();
  }

  async start(): Promise<void> {
    try {
      // Conectar a la base de datos
      await MongoDatabase.connect({
        mongoUrl: env.mongodbUri as string, // Aseguramos que no es undefined
        dbName: env.dbName as string,
      });

      // Iniciar el servidor en el puerto especificado
      const port = env.port;
      await this.server.start(port);

      console.log(`Servidor iniciado en el puerto ${port}`);

      // Manejar señales de proceso para una desconexión limpia
      this.handleProcessSignals();
    } catch (error) {
      console.error("Error al iniciar la aplicación:", error);
      process.exit(1);
    }
  }

  private handleProcessSignals(): void {
    process.on("SIGINT", this.shutdown.bind(this));
    process.on("SIGTERM", this.shutdown.bind(this));
  }

  private async shutdown(): Promise<void> {
    try {
      console.log("Cerrando la aplicación...");
      await MongoDatabase.disconnect();
      console.log("Desconectado de MongoDB");
      process.exit(0);
    } catch (error) {
      console.error("Error al cerrar la aplicación:", error);
      process.exit(1);
    }
  }
}

// Iniciar la aplicación
const app = new App();
app.start();
