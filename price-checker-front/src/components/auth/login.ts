import axios from "axios";

export async function login(login: string, password: string):Promise<boolean> {
    try  {
        const res = await axios.post('http://localhost:3000/auth/login', { userName: login, password });
        return Boolean(res); // Предполагается, что сервер возвращает токен или статус
    }
    catch {
        return false; // Ошибка авторизации
    }
}