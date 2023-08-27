import * as userService from "../../services/userService.js";
import { bcrypt  } from "../../deps.js";

const showLoginForm = async ({render}) =>{
    render("login.eta");
};

const postLoginForm = async ({render, response, request, state}) =>{
    const body = request.body({type: "form"});
    const loginParams = await body.value;

    const email = loginParams.get("email");
    const password = loginParams.get("password");

    const errors = {errors: {invalidError: "Either email or password is incorrect",},};

    const user = await userService.getUserByEmail(email);
    if(user.length === 0){
        render("login.eta", {errors: errors});  
    }else{
        const passwordDB = user[0].password;

        const passMatch = await bcrypt.compare(password, passwordDB);
        if(!passMatch){
            render("login.eta", {errors: errors});
        }
        else{
            state.session.set("user", user[0]);
            response.redirect("/topics");
        }
    }
};





export {showLoginForm, postLoginForm };