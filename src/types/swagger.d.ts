declare module 'swagger-jsdoc' {
  const swaggerJSDoc: (options: unknown) => unknown;
  export default swaggerJSDoc;
  export type Options = Record<string, unknown>;
}

declare module 'swagger-ui-express' {
  import { RequestHandler } from 'express';
  const serve: RequestHandler[];
  function setup(swaggerDoc: unknown, opts?: unknown): RequestHandler;
  const swaggerUi: { serve: RequestHandler[]; setup: typeof setup };
  export default swaggerUi;
  export { serve, setup };
}
