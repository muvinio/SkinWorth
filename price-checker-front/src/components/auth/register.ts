import axios from "axios";

export async function register(login: string, password: string):Promise<boolean> {
    try  {
        const res = await axios.post('http://localhost:3000/auth/register', { userName: login, password });
        return Boolean(res); // Предполагается, что сервер возвращает токен или статус
    }
    catch {
        return false; // Ошибка авторизации
    }
}