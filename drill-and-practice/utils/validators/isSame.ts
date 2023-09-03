import { validasaur } from "../../deps.js";

export function isSame(value1: any, value2: any): validasaur.Rule{
    return async function isSameRule(value:any): Promise<validasaur.Validity> {
        if(value1 !== value2){
            return validasaur.invalid("isSame", {value,value1, value2});
        }
    };
}
