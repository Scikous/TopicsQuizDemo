const sessionMiddleware = async (context, next) => {
  if (context.user) {
    await context.state.session.set(
      "sessionExpire",
      new Date().getTime() + 5000,
    );
  }
  await next();
};

export { sessionMiddleware };
