import swUiExp from "swagger-ui-express"
import swJsDoc from "swagger-jsdoc"
import { Router } from "express";
import config  from "config";

const PORT = config.get("port") || 3000;

const swRouter = Router();
const swagger = swJsDoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    servers: [
      {
        url: "http://localhost:" + PORT,
        description: "User Blog",
        variables: {
          port: {
            enum: [PORT],
            // default: 5000,
          },
        },
      },
      {
        url: "http://localhost:4000",
        description: "User Blog",
        variables: {
          port: {
            enum: [PORT],
            // default: 5000,
          },
        },
      },
    ],
    info: {
      version: "1.0.0",
      title: "User Blog",
      description: "Docs for User Blog",
    },
    components: {
      securitySchemes: {
        Token: {
          type: "apiKey",
          name: "token",
          in: "header",
          description: "access_token",
        },
      },
    },
  },
  apis: [
    `${process.cwd()}/swagger/docs/userdoc.yaml`,
    `${process.cwd()}/swagger/components/usercom.yaml`,
  ],
});

swRouter.use("/docs", swUiExp.serve, swUiExp.setup(swagger));
export = swRouter ;
