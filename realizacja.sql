-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2024 at 03:54 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `br_system`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `realizacja`
--

CREATE TABLE `realizacja` (
  `id` int(11) NOT NULL,
  `id_realization` int(11) NOT NULL,
  `start_surname` text NOT NULL,
  `end_surname` text NOT NULL,
  `company` text NOT NULL,
  `mail_data` text NOT NULL,
  `mail_time` text NOT NULL,
  `mail_id` text NOT NULL,
  `realization_date` text NOT NULL,
  `realization_place` text NOT NULL,
  `worker_name` text NOT NULL,
  `worker_position` text NOT NULL,
  `worker_work_time` text NOT NULL,
  `real_time_work` text NOT NULL,
  `invoice_work_time` text NOT NULL,
  `worker_kilometers` int(11) NOT NULL,
  `invoice_kilometers` int(11) NOT NULL,
  `worker_route` text NOT NULL,
  `comment` text NOT NULL,
  `sent_r7` text NOT NULL,
  `mechanic` text NOT NULL,
  `added_coast` text NOT NULL,
  `realization_status` text NOT NULL,
  `bill_status` text NOT NULL,
  `kilometer_status` text NOT NULL,
  `invoice_status` text NOT NULL,
  `delete_status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `realizacja`
--

INSERT INTO `realizacja` (`id`, `id_realization`, `start_surname`, `end_surname`, `company`, `mail_data`, `mail_time`, `mail_id`, `realization_date`, `realization_place`, `worker_name`, `worker_position`, `worker_work_time`, `real_time_work`, `invoice_work_time`, `worker_kilometers`, `invoice_kilometers`, `worker_route`, `comment`, `sent_r7`, `mechanic`, `added_coast`, `realization_status`, `bill_status`, `kilometer_status`, `invoice_status`, `delete_status`) VALUES
(12, 1, 'Mazur', 'Stachura', 'CEMET', '0000-00-00', '0000-00-00', '54321', '16.01.2024', 'Kraków', 'Dauksza Andrzej', 'rewident', 'sz', '08:00', 'sz', 120, 120, 'Warszawa - Kraków', 'zamówiono na godzinę 08:00', 'tak', 'nie', 'nie', 'progress', 'progress', 'progress', 'progress', 'tak'),
(13, 2, 'Zemczak', 'Malinowski', 'POLMIEDŹ', '0000-00-00', '0000-00-00', '89432', '21.02.2024', 'Wrocław', 'Jaskuła Leszek', 'ustawiacz', '12', '09:00', '12', 140, 140, 'Łódź - Wrocław', 'zamówiono na godzinę 09:00', 'nie', 'Kociszewski Andrzej', 'nie', 'progress', 'progress', 'progress', 'progress', 'nie'),
(14, 3, 'Chchelska', 'Mazur', 'QEMETICA', '0000-00-00', '0000-00-00', '12345', '06.03.2024', 'Poznań', 'Kociszewski Andrzej', 'maszynsita', '8', '10:30', '8', 95, 95, 'Gdańsk - Poznań', 'zamówiono na godzinę 10:30', 'tak', 'nie', 'nie', 'progress', 'progress', 'progress', 'progress', 'tak'),
(15, 4, 'Malinowski', 'Zemczak', 'ORION', '0000-00-00', '0000-00-00', '98765', '11.04.2024', 'Gdynia', 'Sawicki Zbigniew', 'pilot', '12', '06:00', '12', 200, 200, 'Szczecin - Gdynia', 'zamówiono na godzinę 06:00', 'nie', 'Kociszewski Andrzej', 'nie', 'done', 'done', 'done', 'done', 'nie'),
(16, 5, 'Stachura', 'Chchelska', 'ALZA', '0000-00-00', '0000-00-00', '67890', '16.05.2024', 'Katowice', 'Pyś Paweł', 'kierownik pociagu', '8', '13:30', '8', 150, 150, 'Opole - Katowice', 'zamówiono na godzinę 13:30', 'tak', 'nie', 'nie', 'progress', 'progress', 'progress', 'progress', 'nie'),
(17, 6, 'Mazur', 'Zemczak', 'POLTRANS', '0000-00-00', '0000-00-00', '54322', '26.01.2024', 'Bydgoszcz', 'Sajur Andrzej', 'ustawiacz', '12', '08:45', '12', 180, 180, 'Toruń - Bydgoszcz', 'zamówiono na godzinę 08:45', 'tak', 'nie', 'nie', 'progress', 'progress', 'progress', 'progress', 'nie'),
(18, 7, 'Zemczak', 'Mazur', 'PPMT', '0000-00-00', '0000-00-00', '67891', '03.02.2024', 'Gorzów Wielkopolski', 'Bobola Wojciech', 'pilot', '12', '10:00', '12', 90, 90, 'Poznań - Gorzów Wielkopolski', 'zamówiono na godzinę 10:00', 'nie', 'nie', 'nie', 'progress', 'progress', 'progress', 'progress', 'nie'),
(19, 8, 'Chchelska', 'Malinowski', 'CEMET', '0000-00-00', '0000-00-00', '54323', '09.03.2024', 'Szczecin', 'Tychoniec Michał', 'rewident', 'sz', '14:30', 'sz', 75, 75, 'Gorzów Wielkopolski - Szczecin', 'zamówiono na godzinę 14:30', 'tak', 'nie', 'nie', 'progress', 'progress', 'progress', 'progress', 'nie'),
(20, 9, 'Malinowski', 'Stachura', 'QEMETICA', '0000-00-00', '0000-00-00', '45678', '13.03.2024', 'Gliwice', 'Ciszewski Leszek', 'maszynsita', '8', '11:15', '8', 130, 130, 'Katowice - Gliwice', 'zamówiono na godzinę 11:15', 'nie', '', 'nie', 'done', 'done', 'done', 'done', 'nie'),
(21, 10, 'Stachura', 'Chchelska', 'ORION', '0000-00-00', '0000-00-00', '13579', '21.04.2024', 'Opole', 'Koczan Jarosław', 'kierownik pociagu', '8', '16:00', '8', 165, 165, 'Gliwice - Opole', 'zamówiono na godzinę 16:00', 'tak', 'nie', 'nie', 'progress', 'progress', 'progress', 'progress', 'nie'),
(22, 11, 'Mazur', 'Stachura', 'ALZA', '0000-00-00', '0000-00-00', '24680', '06.05.2024', 'Rzeszów', 'Dauksza Andrzej', 'rewident', 'sz', '12:00', 'sz', 110, 110, 'Tarnów - Rzeszów', 'zamówiono na godzinę 12:00', 'tak', 'nie', 'nie', 'done', 'done', 'done', 'done', 'nie'),
(24, 13, 'Szywacz', 'Szywacz', 'EUROTRANS', '0000-00-00', '0000-00-00', '21/2024/23', '22.11.2024', 'Zawiercie', 'Dauksza Andrzej', 'rewident', 'sz', '21:20', 'sz', 120, 120, 'Katowice - Zawiercie - Katowice', 'zamówiono na godzinę 21:00', 'nie', 'Kociszewski', 'brak', 'done', 'done', 'done', 'done', 'nie');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `realizacja`
--
ALTER TABLE `realizacja`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `realizacja`
--
ALTER TABLE `realizacja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
