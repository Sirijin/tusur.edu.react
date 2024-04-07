import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import NavBar from './NavBar';
import './TasksListPage.css';
import {difficultiesDictionary, levelsDictionary, themesDictionary} from "../dictionaries";
import {Link} from "react-router-dom"; // Создайте файл стилей для страницы списка задач

const TasksListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [totalTasks, setTotalTasks] = useState(0);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // или другое значение по умолчанию

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                // Мы передаём на сервер номер страницы, уменьшенный на 1 (нумерация страниц на сервере начинается с 0)
                const response = await axios.get(`${config.BASE_URL}/api/v1/task/list`, {
                    params: {
                        page: page - 1,
                        itemsPerPage: itemsPerPage,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                setTasks(response.data.items);
                setTotalTasks(response.data.total);
            } catch (error) {
                console.error("Ошибка при получении списка задач:", error);
                // Обработка ошибок...
            }
        };

        fetchTasks(page, itemsPerPage);
    }, [page, itemsPerPage]);

    // Функция для рендеринга списка задач
    const renderTasksTable = () => {
        return (
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Описание</th>
                    <th>Сложность</th>
                    <th>Уровень</th>
                    <th>Тематика</th>
                    {/* Другие заголовки, если нужно */}
                </tr>
                </thead>
                <tbody>
                {tasks.map(task => (
                    <tr key={task.id}>
                        <td>{task.id}</td>
                        <Link to={`/tasks/${task.id}`} className="task-title">{task.title}</Link>
                        <td>{task.description}</td>
                        <td>{difficultiesDictionary[task.taskDifficultyType]}</td>
                        <td>{levelsDictionary[task.taskLevelType]}</td>
                        <td>{themesDictionary[task.taskThemeType]}</td>
                        {/* Другие поля задачи */}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    // Обработчик изменения номера страницы
    const handlePageChange = (event) => {
        const newPage = Number(event.target.value);
        setPage(newPage); // Теперь мы просто сохраняем выбранный номер страницы в состоянии
    };

    const maxPage = Math.ceil(totalTasks / itemsPerPage);

    // Обработчик изменения количества элементов на страницу
    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
    };

    return (
        <div className="tasks-page-container">
            <NavBar />
            <div className="tasks-list-container">
                <h1>Список задач</h1>
                {renderTasksTable()}
                {/* Пагинация */}
                <div className="pagination">
                    <label>
                        Страница:
                        <input
                            type="number"
                            value={page}
                            onChange={handlePageChange}
                            min="1"
                            max={maxPage}
                        />
                    </label>
                    <label>
                        Задач на странице:
                        <select
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </label>
                    <span>Всего задач: {totalTasks}</span>
                </div>
            </div>
        </div>
    );
}

export default TasksListPage;