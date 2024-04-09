import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'; // Добавляем useHistory
import config from '../config';
import './LoginPage.css'; // Здесь будут стили для страницы

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Используем хук для работы с историей браузера

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${config.BASE_URL}/api/v1/auth/login`, {
                username,
                password
            });
            const token = response.data.token;
            localStorage.setItem('authToken', token); // Сохраняем токен в localStorage
            setError('');
            navigate('/home'); // Перенаправляем пользователя на главную страницу
        } catch (err) {
            setError('Ошибка при входе. Проверьте введенные данные.');
            console.error(err);
        }
    };


    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Авторизация</h2>
                {error && <p className="error-message">{error}</p>}
                <label>
                    Имя пользователя:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label>
                    Пароль:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button type="submit">Войти</button>
            </form>
            <Link to="/register">Регистрация</Link>
        </div>
    );
};

export default LoginPage;