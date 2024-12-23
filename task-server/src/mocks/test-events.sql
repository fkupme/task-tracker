-- Сначала переименовываем столбцы
ALTER TABLE base_events 
RENAME COLUMN "createdAt" TO created_at;
ALTER TABLE base_events 
RENAME COLUMN "updatedAt" TO updated_at;
ALTER TABLE base_events 
RENAME COLUMN "userId" TO user_id;

ALTER TABLE single_events 
DROP COLUMN "createdAt";
ALTER TABLE single_events 
DROP COLUMN "updatedAt";
ALTER TABLE recurring_events 
DROP COLUMN "createdAt";
ALTER TABLE recurring_events 
DROP COLUMN "updatedAt";

-- Очищаем таблицы в правильном порядке (из-за внешних ключей)
TRUNCATE TABLE single_events CASCADE;
TRUNCATE TABLE recurring_events CASCADE;
TRUNCATE TABLE base_events CASCADE;

-- Сбрасываем автоинкремент
ALTER SEQUENCE base_events_id_seq RESTART WITH 1;

-- Сначала создаем базовые события для повторяющихся событий
INSERT INTO base_events (event_name, start_time, end_time, user_id, created_at, updated_at) VALUES
('Утренняя йога', '07:00', '08:00', 1, NOW(), NOW()),
('Планерка', '09:00', '10:00', 1, NOW(), NOW()),
('Обед', '13:00', '14:00', 1, NOW(), NOW()),
('Английский язык', '15:00', '16:30', 1, NOW(), NOW()),
('Тренажерный зал', '18:00', '19:30', 1, NOW(), NOW()),
('Медитация', '20:00', '20:30', 1, NOW(), NOW()),
('Бассейн', '07:30', '09:00', 1, NOW(), NOW()),
('Курсы программирования', '16:00', '18:00', 1, NOW(), NOW()),
('Ужин с семьей', '19:00', '20:00', 1, NOW(), NOW()),
('Чтение', '21:00', '22:00', 1, NOW(), NOW());

-- Создаем повторяющиеся события
INSERT INTO recurring_events (base_event_id, week_day, exceptions, general_comment) VALUES
(1, 1, NULL, 'Практика для бодрости'),  -- Йога по понедельникам
(2, 1, ARRAY['2024-12-30']::date[], 'Ежедневный созвон с командой'),  -- Планерка по понедельникам, кроме 30-го
(3, 2, NULL, 'Перерыв на обед'),  -- Обед по вторникам
(4, 2, NULL, 'Занятия с преподавателем'),  -- Английский по вторникам
(5, 3, ARRAY['2024-12-25']::date[], 'Силовая тренировка'),  -- Тренажерка по средам, кроме 25-го
(6, 3, NULL, 'Вечерняя практика'),  -- Медитация по средам
(7, 4, NULL, 'Плавание'),  -- Бассейн по четвергам
(8, 4, NULL, 'Изучение Python'),  -- Программирование по четвергам
(9, 5, NULL, 'Семейная традиция'),  -- Ужин по пятницам
(10, 5, NULL, 'Художественная литература'); -- Чтение по пятницам

-- Создаем базовые события для одиночных событий
INSERT INTO base_events (event_name, start_time, end_time, user_id, created_at, updated_at) VALUES
('Встреча с клиентом', '11:00', '12:30', 1, NOW(), NOW()),
('Стоматолог', '14:00', '15:30', 1, NOW(), NOW()),
('Новогодний корпоратив', '18:00', '23:00', 1, NOW(), NOW()),
('Шоппинг подарков', '12:00', '16:00', 1, NOW(), NOW()),
('Детский утренник', '10:00', '12:00', 1, NOW(), NOW()),
('Сдача проекта', '15:00', '17:00', 1, NOW(), NOW()),
('Новогодняя елка', '17:00', '19:00', 1, NOW(), NOW()),
('Фотосессия', '13:00', '14:30', 1, NOW(), NOW()),
('Маникюр', '11:30', '13:00', 1, NOW(), NOW()),
('Массаж', '16:00', '17:30', 1, NOW(), NOW());

-- Создаем одиночные события
INSERT INTO single_events (base_event_id, date, comment) VALUES
(11, '2024-12-23', 'Важная встреча'),
(12, '2024-12-23', 'Записаться заранее'),
(13, '2024-12-27', 'Взять подарок для обмена'),
(14, '2024-12-24', 'Составить список'),
(15, '2024-12-25', 'Взять камеру'),
(16, '2024-12-26', 'Подготовить документы'),
(17, '2024-12-28', 'Праздничная одежда'),
(18, '2024-12-29', 'Семейный образ'),
(19, '2024-12-30', 'Новогодний дизайн'),
(20, '2024-12-30', 'Подарочный сертификат'); 