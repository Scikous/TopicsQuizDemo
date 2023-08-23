import { validasaur } from "../../deps.js";

export function isSame(password: string, verification: string): validasaur.Rule{
    return async function isSameRule(value:any): Promise<validasaur.Validity> {
        if(password !== verification || (typeof value !== "string")){
            return validasaur.invalid("isSame", {value,verification});
        }
    };
}
