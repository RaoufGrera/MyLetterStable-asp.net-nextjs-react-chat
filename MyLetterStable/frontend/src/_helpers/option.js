import {authHeader } from "./auth-header";
export function option(type, data = null, isAuth = false) {
    const auth = (isAuth) ? authHeader() : null;
    const result = {
        method: type,
        headers: {
            'Content-Type': 'application/json',
            auth
        }
    }
    if (type != "GET") {
        result.body = JSON.stringify(data);

    }
    return result;
}