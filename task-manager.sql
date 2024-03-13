-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Мар 13 2024 г., 20:27
-- Версия сервера: 10.4.28-MariaDB
-- Версия PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `task-manager`
--

-- --------------------------------------------------------

--
-- Структура таблицы `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdDate` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedDate` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `completedDate` date DEFAULT NULL,
  `priority` enum('LOW','NORMAL','HIGH') NOT NULL DEFAULT 'NORMAL',
  `status` enum('CREATED','PROGRESS','COMPLETED','CANCELLED') NOT NULL DEFAULT 'CREATED',
  `authorId` int(11) DEFAULT NULL,
  `executorId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `task`
--

INSERT INTO `task` (`id`, `title`, `description`, `createdDate`, `updatedDate`, `completedDate`, `priority`, `status`, `authorId`, `executorId`) VALUES
(1, 'Починить дверь', 'Ну дверь', '2024-03-14 00:15:47.944865', '2024-03-14 00:26:11.000000', '2024-03-12', 'LOW', 'CREATED', 1, NULL),
(2, 'Покорми гусей', 'га-га-га', '2024-03-14 00:16:14.956653', '2024-03-14 00:25:16.099111', '2024-03-23', 'NORMAL', 'PROGRESS', 1, 2),
(3, 'Продать гараж', 'зачем тебе гараж?', '2024-03-14 00:16:58.430946', '2024-03-14 00:25:20.035017', '2024-03-19', 'HIGH', 'COMPLETED', 1, 2),
(4, 'Танцевать до утра', 'В темноте', '2024-03-14 00:17:37.860494', '2024-03-14 00:25:23.472851', '2024-04-21', 'LOW', 'CANCELLED', 2, 3),
(5, 'Стать айтишником', 'И есть красную икру', '2024-03-14 00:18:19.501593', '2024-03-14 00:25:26.826256', '2024-04-30', 'HIGH', 'PROGRESS', 2, 3),
(6, 'Выпить кофею', 'Обед же', '2024-03-14 00:19:05.986683', '2024-03-14 00:27:06.000000', '2024-04-09', 'NORMAL', 'CREATED', 2, 2),
(7, 'Стать суперменом', 'И никому не рассказать', '2024-03-14 00:22:39.843588', '2024-03-14 00:23:02.008257', '2024-05-10', 'HIGH', 'CREATED', 1, 1),
(8, 'Ловить уточек', 'Кря', '2024-03-14 00:26:41.144210', '2024-03-14 00:27:01.000000', '2024-02-28', 'NORMAL', 'CREATED', 1, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `middleName` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `supervisorId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `middleName`, `login`, `password`, `supervisorId`) VALUES
(1, 'Иванов', 'Иван', 'Иванович', 'ivanov', '$2b$10$nEDWZTYDs1PeSZauYHtoOuZuLa2Kli2PzA1aUP8izcpZUWFmUs1RC', NULL),
(2, 'Петров', 'Петр', 'Петрович', 'petrovich', '$2b$10$D3bgiU7Ak1Hcox2.zxjIou9Fl7AzgovJuj7zcClAiKSVrABlq.HV6', 1),
(3, 'Сергиев', 'Сергей', 'Сергеевич', 'serega', '$2b$10$UAAtFB03z7GbDAEGCHRzbeejVp43mhl.sR7d4XnQW9xOMgl8qMp8G', 1),
(4, 'Алексей', 'Алексеев', 'Алексеевич', 'alex', '$2b$10$STNy4LtIqF1kJ3TYKn6qWODspwSUl1ZfYnMsyYDqCn2f5LKjfZZHW', 2),
(5, 'Михаил', 'Михайлов', 'Михайлович', 'michalych', '$2b$10$k5GNe84wNw22YqH8.xl0fechbfo.UDiYQiutPBTblQi8IHmKffk5e', 2),
(6, 'Андрей', 'Андреев', 'Андреевич', 'andry', '$2b$10$5GBFDIhQ4.49uPpyylL25uWSobOR2YJplwXpLsIE8xJrpw7QLwV8a', 2);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_30cb9d78297c1f2a2e07df1a616` (`authorId`),
  ADD KEY `FK_de1876565f93fd5fae3a73cc8f9` (`executorId`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_a62473490b3e4578fd683235c5` (`login`),
  ADD KEY `FK_5eee61d80509271c4bd366995ec` (`supervisorId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `FK_30cb9d78297c1f2a2e07df1a616` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_de1876565f93fd5fae3a73cc8f9` FOREIGN KEY (`executorId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_5eee61d80509271c4bd366995ec` FOREIGN KEY (`supervisorId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
