import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';
import './RegistrationPage.css';
import {useNavigate} from "react-router-dom"; // Убедитесь, что у вас есть этот файл с настройками

const RegistrationPage = () => {

    const navigate = useNavigate(); // Используем хук для работы с историей браузера

    const [formData, setFormData] = useState({
        dailyActivity: 0,
        balance: 0,
        daysInARow: 0,
        birthday: '',
        email: '',
        firstName: '',
        lastName: '',
        middleName: '',
        password: '',
        username: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${config.BASE_URL}/api/v1/auth/register`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('Регистрация прошла успешно:', response.data);
            navigate('/login'); // Редиректим пользователя на страницу авторизации
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
        }
    };

    return (
        <div className="registration-container">
            <form onSubmit={handleSubmit}>
                {/* Здесь поля ввода для атрибутов */}
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Имя" required />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Фамилия" required />
                <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Отчество" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Имя пользователя" required />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Пароль" required />
                <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} placeholder="Дата рождения" />
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default RegistrationPage;