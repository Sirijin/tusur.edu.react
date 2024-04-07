import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import NavBar from './NavBar';
import './ProfilePage.css';  // Вы можете создать этот CSS файл для стилей вашего профиля

const ProfilePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Функция для получения данных пользователя
        const fetchData = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/v1/user/lk`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                setUser(response.data); // Сохраняем пользователя в состоянии
            } catch (error) {
                console.error("Ошибка при получении данных профиля:", error);
                // Обработка ошибок, например, редирект на страницу входа, вывод сообщения
            }
        };

        fetchData();
    }, []);

    // Функция для форматирования даты
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString();
    };

    // Если данные пока что не получены, показываем сообщение о загрузке
    if (!user) {
        return <div>Загрузка...</div>;
    }

    // Отображаем данные профиля
    return (
        <div className="profile-page">
            <NavBar />
            <div className="profile-content">
                <h1>Профиль пользователя</h1>
                <p>Имя: {user.firstName}</p>
                <p>Фамилия: {user.lastName}</p>
                <p>Отчество: {user.middleName}</p>
                <p>Имя пользователя: {user.username}</p>
                <p>Электронная почта: {user.email}</p>
                <p>ID Пользователя: {user.id}</p>
                <p>Роль: {user.role}</p>
                <p>Баланс: {user.balance}</p>
                <p>Дни подряд: {user.daysInARow}</p>
                <p>Ежедневная активность: {user.dailyActivity}</p>
                <p>Дата рождения: {formatDate(user.birthday)}</p>
            </div>
        </div>
    );
}

export default ProfilePage;