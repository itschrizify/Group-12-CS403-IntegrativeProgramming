const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const routeFiles = path
  .join(__dirname, "../routes/*.js")
  .replace(/\\/g, "/");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BSCS-4B Group 12 API",
      version: "1.0.0",
      description: "API documentation for authentication and student management.",
    },
    servers: [
      {
        url: "http://localhost:5432",
        description: "Local development server",
      },
    ],
    tags: [
      { name: "Authentication", description: "Register, log in, refresh tokens, and log out" },
      { name: "Students", description: "Protected student CRUD endpoints" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Student: {
          type: "object",
          required: ["id", "name", "course"],
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Alice" },
            course: { type: "string", example: "BSCS" },
          },
        },
        StudentInput: {
          type: "object",
          properties: {
            name: { type: "string", example: "Alice" },
            course: { type: "string", example: "BSCS" },
          },
        },
        RegisterInput: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "Juan Dela Cruz" },
            email: { type: "string", format: "email", example: "juan@example.com" },
            password: { type: "string", format: "password", example: "secret123" },
          },
        },
        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "juan@example.com" },
            password: { type: "string", format: "password", example: "secret123" },
          },
        },
        RefreshTokenInput: {
          type: "object",
          required: ["refreshToken"],
          properties: {
            refreshToken: { type: "string", example: "your-refresh-token" },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string", example: "Student not found" },
          },
        },
      },
    },
  },
  apis: [routeFiles],
};

module.exports = swaggerJsdoc(swaggerOptions);
