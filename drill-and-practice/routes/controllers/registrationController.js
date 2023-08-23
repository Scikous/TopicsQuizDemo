import * as userService from "../../services/userService.js";
import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";
import * as questionsService from "../../services/questionsService.js";
import * as questionAOService from "../../services/questionAnswerOptionsService.js";


import {isSame} from "./isSame.ts";

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

    const [passes, errors] = await validasaur.validate({email: email, password: password, verification: verification}, validationRules);
    console.log(passes, errors);
    if(!passes){
        errors.password = {isSame: "password and verification do not match"};
        console.log(errors);
        render("registration.eta", {email: email, errors: errors});
    }

};

export {showRegistrationForm, postRegistrationForm };