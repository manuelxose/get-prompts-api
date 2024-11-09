<!-- Crea el archivo readme.md con el siguiente contenido: -->

# Get Prompts API

Este proyecto es una API RESTful que permite a los usuarios obtener información sobre los prompts disponibles en el sitio web de Get Prompts. La API se encarga de manejar las operaciones de autenticación y autorización, así como de almacenar y recuperar datos de usuarios y de prompts.

## Tecnologías utilizadas

- Node.js
- Express.js
- TypeScript
- MongoDB
- JWT

## Estructura del proyecto

El proyecto está dividido en varios archivos y carpetas:

- **src**: Contiene el código fuente del proyecto en TypeScript.
- **src/application**: Contiene las clases de dominio y las interfaces de la aplicación.
- **src/application/use-cases**: Contiene las clases de uso (casos de uso) de la aplicación.
- **src/application/interfaces**: Contiene las interfaces de la aplicación.
- **src/application/interfaces/auth**: Contiene las interfaces de autenticación.
- **src/application/interfaces/prompt**: Contiene las interfaces de prompt.
- **src/application/interfaces/user**: Contiene las interfaces de usuario.
- **src/application/interfaces/token**: Contiene las interfaces de token.
- **src/application/errors**: Contiene las clases de error.
- **src/application/shared**: Contiene las clases compartidas de la aplicación.
- **src/application/shared/validators**: Contiene las validaciones de datos.
- **src/application/shared/constants**: Contiene las constantes compartidas de la aplicación.
- **src/application/shared/config**: Contiene las configuraciones compartidas de la aplicación.
- **src/application/shared/utils**: Contiene las utilidades compartidas de la aplicación.
- **src/application/middlewares**: Contiene los middlewares de la aplicación.
- **src/application/routes**: Contiene las rutas de la aplicación.
- **src/application/controllers**: Contiene los controladores de la aplicación.
- **src/application/services**: Contiene los servicios de la aplicación.
- **src/application/repositories**: Contiene los repositorios de la aplicación.
- **src/application/models**: Contiene los modelos de la aplicación.
- **src/application/dtos**: Contiene los DTOs de la aplicación.
- **src/application/entities**: Contiene las entidades de la aplicación.
- **src/application/enums**: Contiene las enumeraciones de la aplicación.
- **src/application/adapters**: Contiene los adaptadores de la aplicación.
- **src/application/configs**: Contiene las configuraciones de la aplicación.
- **src/application/utils**: Contiene las utilidades de la aplicación.
- **src/application/index.ts**: Contiene la aplicación principal.
- **src/core**: Contiene los componentes de la aplicación.
- **src/core/adapters**: Contiene los adaptadores de la aplicación.
- **src/core/config**: Contiene las configuraciones de la aplicación.
- **src/core/utils**: Contiene las utilidades de la aplicación.
- **src/core/index.ts**: Contiene la aplicación principal.
- **src/infrastructure**: Contiene los componentes de la aplicación.
- **src/infrastructure/adapters**: Contiene los adaptadores de la aplicación.
- **src/infrastructure/config**: Contiene las configuraciones de la aplicación.
- **src/infrastructure/utils**: Contiene las utilidades de la aplicación.
- **src/infrastructure/index.ts**: Contiene la aplicación principal.
- **src/shared**: Contiene las clases compartidas de la aplicación.
- **src/shared/validators**: Contiene las validaciones de datos.
- **src/shared/constants**: Contiene las constantes compartidas de la aplicación.
- **src/shared/config**: Contiene las configuraciones compartidas de la aplicación.
- **src/shared/utils**: Contiene las utilidades compartidas de la aplicación.
- **src/shared/index.ts**: Contiene la aplicación principal.
- **src/index.ts**: Contiene la aplicación principal.
- **src/main.ts**: Contiene la aplicación principal.
- **src/app.ts**: Contiene la aplicación principal.
- **src/server.ts**: Contiene la aplicación principal.
- **src/webserver**: Contiene la aplicación principal.
- **src/webserver/server.ts**: Contiene la aplicación principal.
- **src/webserver/index.ts**: Contiene la aplicación principal.
- **src/webserver/routes**: Contiene las rutas de la aplicación.
- **src/webserver/controllers**: Contiene los controladores de la aplicación.
- **src/webserver/services**: Contiene los servicios de la aplicación.
- **src/webserver/repositories**: Contiene los repositorios de la aplicación.
- **src/webserver/models**: Contiene los modelos de la aplicación.
- **src/webserver/dtos**: Contiene los DTOs de la aplicación.
- **src/webserver/entities**: Contiene las entidades de la aplicación.
- **src/webserver/enums**: Contiene las enumeraciones de la aplicación.
- **src/webserver/adapters**: Contiene los adaptadores de la aplicación.
- **src/webserver/configs**: Contiene las configuraciones de la aplicación.

## Configuración del proyecto

Para configurar el proyecto, sigue los siguientes pasos:

1. Instalar las dependencias necesarias:

```bash
npm install
```

2. Crear un archivo de configuración:

```bash
cp .env.example .env
```

3. Configurar las variables de entorno en el archivo `.env`:

- MongoDB:

  - MONGO_DB_NAME: Nombre de la base de datos de MongoDB.
  - MONGO_UTLMONGO_URL: URL de la base de datos de MongoDB.
  - PORT: Puerto de escucha.

- JWT:

  - JWT_SECRET: Secreto para firmar y verificar los tokens JWT.

- Google OAuth:

  - GOOGLE_CLIENT_ID: ID del cliente de Google OAuth.
  - GOOGLE_CLIENT_SECRET: Secreto del cliente de Google OAuth.

- Apple OAuth:
  - APPLE_CLIENT_ID: ID del cliente de Apple OAuth.
  - APPLE_TEAM_ID: ID del equipo de Apple OAuth.
  - APPLE_KEY_ID: ID de la clave de Apple OAuth.
  - APPLE_PRIVATE_KEY: Clave privada de Apple OAuth.

4. Ejecutar el servidor de Node.js:

```bash
npm start
```
