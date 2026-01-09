import app from '../dist/index.js';

export const onRequest = async (context) => {
  return app.default.fetch(context.request, context.env, context);
};
