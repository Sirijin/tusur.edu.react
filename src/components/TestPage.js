import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import NavBar from './NavBar';

const TestPage = () => {
    const [testData, setTestData] = useState([]);
    const [answers, setAnswers] = useState({}); // Теперь answers - это объект, где ключи - это id задач
    const [correctSolutionsCount, setCorrectSolutionsCount] = useState(null);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/v1/task/test`, {
                    params: {
                        tasksAmount: 20 // Указываем количество заданий в тесте
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                setTestData(response.data.items);
                // Инициализируем ответы пустыми строками
                const initialAnswers = response.data.items.reduce((acc, task) => {
                    acc[task.id] = '';
                    return acc;
                }, {});
                setAnswers(initialAnswers);
            } catch (error) {
                console.error("Ошибка при получении теста:", error);
                // Обработка ошибок...
            }
        };

        fetchTest();
    }, []);

    const handleInputChange = (taskId, value) => {
        setAnswers(prev => ({ ...prev, [taskId]: value }));
    };

    const handleSubmitTest = async () => {
        const testSolutionRequest = { solutions: answers };
        try {
            const response = await axios.post(`${config.BASE_URL}/api/v1/task/test`, testSolutionRequest, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setCorrectSolutionsCount(response.data.correctSolutionsCount);
            alert(`Вы правильно решили ${response.data.correctSolutionsCount} задач из ${testData.length}.`);
            // Здесь вы можете обработать ответ сервера, например, показать сообщение пользователю
        } catch (error) {
            console.error("Ошибка при отправке теста:", error);
            // Обработка ошибок...
        }
    };

    return (
        <div>
            <NavBar />
            <div className="test-container">
                {testData.map((task, index) => (
                    <div key={task.id} className="task-item">
                        <div>{task.title}</div>
                        <textarea
                            value={answers[task.id] || ''}
                            onChange={(e) => handleInputChange(task.id, e.target.value)}
                            placeholder={`Ответ на задачу ${index + 1}`}
                        />
                    </div>
                ))}
                <button onClick={handleSubmitTest}>Отправить тест</button>

                {correctSolutionsCount !== null && (
                    <div>
                        <p>Количество правильно решенных задач: {correctSolutionsCount}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestPage;