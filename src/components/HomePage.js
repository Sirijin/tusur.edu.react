import React from 'react';
import NavBar from './NavBar'; // Импортируем NavBar
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <NavBar /> {/* Вставляем NavBar */}
            <h1 style={{ paddingTop: '50px' }}>Добро пожаловать на главную страницу</h1>
            {/* Тут будет контент страницы */}
        </div>
    );
};

export default HomePage;