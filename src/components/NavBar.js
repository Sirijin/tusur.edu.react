import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './NavBar.css'; // Стили для NavBar

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Удаляем токен из localStorage
        navigate('/login'); // Перенаправляем пользователя на страницу входа
    };

    return (
        <nav className="main-nav">
            <Link to="/home">Главная</Link>
            <Link to="/tasks">Список задач</Link>
            <Link to="/profile">Профиль</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/theory">Теория</Link>
            <Link to="/competitions">Соревнования</Link>
            <Link to="/test">Тест</Link>
            <button onClick={handleLogout} className="logout-button">Выйти</button>
        </nav>
    );
}

export default NavBar;