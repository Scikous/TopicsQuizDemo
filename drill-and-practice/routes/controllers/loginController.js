import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const showLoginForm = async ({ render }) => {
  render("auth/login.eta");
};

const postLoginForm = async ({ render, response, request, state }) => {
  const body = request.body({ type: "form" });
  const loginParams = await body.value;

  const email = loginParams.get("email");
  const password = loginParams.get("password");

  const errors = {
    errors: { invalidError: "Either email or password is incorrect" },
  };

  const user = await userService.getUserByEmail(email);
  if (user.length === 0) {
    response.status = 400;
    render("auth/login.eta", { errors: errors });
  } else {
    const passwordDB = user[0].password;
    const passMatch = await bcrypt.compare(password, passwordDB);

    if (!passMatch) {
        response.status = 400;
        render("auth/login.eta", { errors: errors });
    } else {
        await state.session.set("user", user[0]);
        await state.session.set("sessionExpire", new Date().getTime() + 1000*15*60);
        response.redirect("/topics");
    }
  }
};

const postUserLogout = async ({ response, user, state }) => {
  if (user) {
    await state.session.set("user", null);
    await state.session.set("sessionExpire", null);
    response.redirect("/auth/login");
  }else{
    response.status = 401;
  }
};

export {
  showLoginForm,
  postLoginForm,
  postUserLogout,
};
