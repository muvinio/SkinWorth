import axios from "axios";


export async function login(login: string, password: string):Promise<any> {
    try  {
        const res = await axios.post('http://localhost:5000/auth/login', { userName: login, password });
        return Boolean(res); // Предполагается, что сервер возвращает токен или статус
    }
    catch (error: any) {
    if (axios.isAxiosError(error)) {
        const messages = error.response?.data?.message;
        if (Array.isArray(messages)) {
        return messages; // выводим массив ошибок
        } else if (typeof messages === 'string') {
        return [messages]; // если вдруг строка
        }
    } else {
        return []; // or return a default value
    }
}
}