import React from 'react';
import NavBar from "./NavBar";

const CompetitionsPage = () => {
    return (
        <div>
            <NavBar /> {/* Вставьте NavBar в верхнюю часть страницы */}
            <div className="page-content">
                <h1>Соревнования</h1>
                {/* Содержимое вашей страницы */}
            </div>
        </div>
    );
}

export default CompetitionsPage;