import * as userService from "../../services/userService.js";
import { validasaur, bcrypt  } from "../../deps.js";
import {isSame} from "./isSame.ts";
import * as validateService from "../../services/validateService.js";

const showRegistrationForm = async ({render}) =>{
    render("registration.eta");
};

const postRegistrationForm = async ({render, response, request}) =>{
    const body = request.body({type: "form"});
    const registerParams = await body.value;

    const email = registerParams.get("email");
    const password = registerParams.get("password");
    const verification = registerParams.get("verification");

    const validationRules = {email: [validasaur.lengthBetween(4, 255),validasaur.isEmail, validasaur.required],
        password: [validasaur.lengthBetween(4, 60), isSame(password, verification) ,validasaur.required],};
    const validationErrorMsgs = {messages: {"email.lengthBetween": "email must be between 4 and 255 characters",
                                            "password.lengthBetween": "password must be between 4 and 60 characters",
                                            "isSame": "password and verification do not match",}};//helpst to avoid user from figuring out if email exists 

    let [passes, errors] = await validasaur.validate({email: email, password: password}, validationRules, validationErrorMsgs);
    
    if(await validateService.userExists(email)){
        errors.email = {userExists: "User exists already"};
        passes = false;
    }

    if(!passes){
        console.log(errors, await validateService.userExists(email));
        render("registration.eta", {email: email, errors: errors});
    }
    else{
        const encryptedPass = await bcrypt.hash(password);  
        await userService.addUser(email, encryptedPass);
        response.redirect("/auth/login");
    }
};





export {showRegistrationForm, postRegistrationForm };