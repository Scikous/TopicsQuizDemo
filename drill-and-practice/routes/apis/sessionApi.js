const sessionIdleCheck = async ({ response, state, user }) => {
  if (user) {
    const sessionExpire = await state.session.get("sessionExpire");
    const curTime = new Date().getTime();
    const maxInterval = 15 * 60 * 1000;

    if (curTime - sessionExpire > maxInterval) {
      await state.session.set("user", null);
      await state.session.set("sessionExpire", null);

      response.body = { expired: "true" };
      console.log("Expired");
    } else {
      response.body = { expired: "false" };
    }
    response.status = 200;
  } else {
    response.body = { user: "null" };
    console.log("No user found");
  }
};

export { sessionIdleCheck };
