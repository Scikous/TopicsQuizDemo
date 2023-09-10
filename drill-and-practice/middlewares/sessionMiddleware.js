const sessionMiddleware = async (context, next) => {
  if (context.user) {
    const maxInterval = 15 * 60 * 1000;
    await context.state.session.set("sessionExpire", new Date().getTime() + maxInterval);
  }
  await next();
};

export { sessionMiddleware };
