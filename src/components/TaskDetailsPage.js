import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import NavBar from './NavBar';
import {difficultiesDictionary, levelsDictionary, themesDictionary} from "../dictionaries";

const TaskDetailsPage = () => {
    const [task, setTask] = useState(null);
    const {id} = useParams();
    const [solution, setSolution] = useState([""]); // В качестве решения устанавливаем массив из одной пустой строки
    const [modalContent, setModalContent] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/v1/task/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                setTask(response.data);
            } catch (error) {
                console.error("Ошибка при получении деталей задачи:", error);
                // Обработка ошибки
            }
        };

        fetchTaskDetails();
    }, [id]);

    const submitSolution = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${config.BASE_URL}/api/v1/task/${id}`, {
                solution: solution
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setModalContent(response.data.something);
            setShowModal(true); // Показываем модальное окно с ответом сервера
        } catch (error) {
            console.error("Ошибка при отправке решения задачи:", error);
            // Обработка ошибки
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <NavBar/>
            <div className="task-details-container">
                {task ? (
                    <>
                        <h2>Детали задачи</h2>
                        <table className="task-details-table">
                            <tbody>
                            <tr>
                                <th>Название</th>
                                <td>{task.title}</td>
                            </tr>
                            <tr>
                                <th>Описание</th>
                                <td>{task.description}</td>
                            </tr>
                            <tr>
                                <th>Сложность</th>
                                <td>{difficultiesDictionary[task.taskDifficultyType]}</td>
                            </tr>
                            <tr>
                                <th>Уровень</th>
                                <td>{levelsDictionary[task.taskLevelType]}</td>
                            </tr>
                            <tr>
                                <th>Тематика</th>
                                <td>{themesDictionary[task.taskThemeType]}</td>
                            </tr>
                            {/* Другие поля задачи при необходимости */}
                            </tbody>
                        </table>
                        {/* Форма для решений и модальное окно из предыдущего примера */}
                    </>
                ) : (
                    <p>Загрузка...</p>
                )}
                <form onSubmit={submitSolution} className="solution-input-container">
          <textarea
              className="solution-text-area"
              value={solution[0]}
              onChange={(e) => setSolution([e.target.value])}
              placeholder="Введите ваше решение здесь..."/>
                    <button type="submit" className="submit-solution-button">Отправить ответ</button>
                </form>
            </div>
            {showModal && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content">
                        <span className="close-modal-button" onClick={closeModal}>&times;</span>
                        {modalContent}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskDetailsPage;