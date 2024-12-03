-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2024 at 09:12 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perkantas-database`
--

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `id` bigint(20) NOT NULL,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`id`, `code`, `name`, `usr_crt`, `dtm_crt`, `usr_upd`, `dtm_upd`) VALUES
(1, '001', 'Surabaya', 'admin', '2024-10-25 15:02:56', 'admin', '2024-10-25 15:02:56'),
(2, '002', 'Malang', 'admin', '2024-10-25 15:02:56', 'admin', '2024-10-25 15:02:56'),
(3, '003', 'Jember', 'admin', '2024-10-25 15:02:56', 'admin', '2024-10-25 15:02:56'),
(4, '004', 'Kediri', 'admin', '2024-10-25 15:02:56', 'admin', '2024-10-25 15:02:56'),
(5, '005', 'Mataram', 'admin', '2024-10-25 15:02:56', 'admin', '2024-10-25 15:02:56'),
(6, '006', 'Batam', 'admin', '2024-10-25 15:02:56', 'admin', '2024-10-25 15:02:56'),
(7, '007', 'Banyuwangi', 'admin', '2024-10-25 15:02:56', 'admin', '2024-10-25 15:02:56');

-- --------------------------------------------------------

--
-- Table structure for table `credential`
--

CREATE TABLE `credential` (
  `id` bigint(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `discipleship_target`
--

CREATE TABLE `discipleship_target` (
  `id` bigint(20) NOT NULL,
  `city_id` bigint(20) NOT NULL,
  `period_year` varchar(4) NOT NULL,
  `evangelism_target` int(20) NOT NULL DEFAULT 0,
  `evangelism_movement_target` int(20) NOT NULL DEFAULT 0,
  `ktb_leader_target` int(11) NOT NULL DEFAULT 0,
  `ktb_group_target` int(20) NOT NULL DEFAULT 0,
  `notes` varchar(255) DEFAULT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discipleship_target`
--

INSERT INTO `discipleship_target` (`id`, `city_id`, `period_year`, `evangelism_target`, `evangelism_movement_target`, `ktb_leader_target`, `ktb_group_target`, `notes`, `usr_crt`, `dtm_crt`, `usr_upd`, `dtm_upd`) VALUES
(1, 1, '2024', 200, 180, 20, 20, NULL, 'Admin', '2024-10-22 05:25:55', 'Admin', '2024-10-22 06:50:39'),
(2, 2, '2024', 150, 125, 10, 10, NULL, 'Admin', '2024-10-25 07:01:54', 'Admin', '2024-10-25 07:01:54'),
(3, 1, '2023', 100, 100, 10, 10, NULL, 'Admin', '2024-11-06 06:30:13', 'Admin', '2024-11-06 06:30:13'),
(4, 2, '2023', 100, 100, 10, 10, NULL, 'Admin', '2024-11-20 07:55:10', 'Admin', '2024-11-20 07:55:10'),
(5, 3, '2024', 80, 50, 5, 5, NULL, 'Admin', '2024-11-20 07:56:12', 'Admin', '2024-11-20 07:56:12'),
(6, 3, '2023', 70, 40, 8, 8, NULL, 'Admin', '2024-11-20 07:56:26', 'Admin', '2024-11-20 07:56:26'),
(7, 4, '2024', 150, 140, 10, 15, NULL, 'Admin', '2024-11-20 07:56:46', 'Admin', '2024-11-20 07:56:46'),
(8, 4, '2023', 100, 50, 10, 8, NULL, 'Admin', '2024-11-20 07:57:10', 'Admin', '2024-11-20 07:57:10'),
(9, 5, '2024', 60, 50, 5, 5, NULL, 'Admin', '2024-11-20 07:57:22', 'Admin', '2024-11-20 07:57:22'),
(10, 5, '2023', 40, 40, 5, 5, NULL, 'Admin', '2024-11-20 07:57:34', 'Admin', '2024-11-20 07:57:34'),
(11, 6, '2024', 30, 30, 3, 3, NULL, 'Admin', '2024-11-20 07:57:45', 'Admin', '2024-11-20 07:57:45'),
(12, 6, '2023', 25, 25, 3, 3, NULL, 'Admin', '2024-11-20 07:57:56', 'Admin', '2024-11-20 07:57:56'),
(13, 7, '2024', 35, 25, 4, 4, NULL, 'Admin', '2024-11-20 07:58:07', 'Admin', '2024-11-20 07:58:07'),
(14, 7, '2023', 40, 30, 5, 6, NULL, 'Admin', '2024-11-20 07:58:20', 'Admin', '2024-11-20 07:58:20');

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `id` bigint(20) NOT NULL,
  `institution_id` bigint(20) NOT NULL,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`id`, `institution_id`, `code`, `name`, `usr_crt`, `dtm_crt`, `usr_upd`, `dtm_upd`) VALUES
(1, 1, 'IPA', 'Ilmu Pengetahuan Alam', 'Admin', '2024-11-20 13:53:14', 'Admin', '2024-11-20 13:53:14'),
(2, 1, 'IPS', 'Ilmu Pengetahuan Sosial', 'Admin', '2024-11-20 13:53:14', 'Admin', '2024-11-20 13:53:14'),
(3, 2, 'IPA', 'Ilmu Pengetahuan Alam', 'Admin', '2024-11-20 13:53:14', 'Admin', '2024-11-20 13:53:14'),
(4, 2, 'IPS', 'Ilmu Pengetahuan Sosial', 'Admin', '2024-11-20 13:53:14', 'Admin', '2024-11-20 13:53:14'),
(5, 3, 'IPA', 'Ilmu Pengetahuan Alam', 'Admin', '2024-11-20 13:53:14', 'Admin', '2024-11-20 13:53:14'),
(6, 3, 'IPS', 'Ilmu Pengetahuan Sosial', 'Admin', '2024-11-20 13:53:14', 'Admin', '2024-11-20 13:53:14'),
(7, 4, 'IPA', 'Ilmu Pengetahuan Alam', 'Admin', '2024-11-20 13:53:14', 'Admin', '2024-11-20 13:53:14'),
(8, 4, 'IPS', 'Ilmu Pengetahuan Sosial', 'Admin', '2024-11-20 13:53:14', 'Admin', '2024-11-20 13:53:14'),
(9, 5, 'IPA', 'Ilmu Pengetahuan Alam', 'Admin', '2024-11-20 13:53:14', 'Admin', '2024-11-20 13:53:14'),
(10, 5, 'IPS', 'Ilmu Pengetahuan Sosial', 'Admin', '2024-11-20 13:53:14', 'Admin', '2024-11-20 13:53:14'),
(11, 6, 'ENG', 'Teknik Industri', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(12, 6, 'BUS', 'Akuntansi Bisnis', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(13, 6, 'IT', 'Informatika', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(14, 7, 'ENG', 'Teknik Industri', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(15, 7, 'BUS', 'Bisnis', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(16, 7, 'LAW', 'Hukum', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(17, 8, 'AGR', 'Pertanian', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(18, 8, 'MED', 'Kedokteran', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(19, 8, 'ENG', 'Teknik', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(20, 9, 'AGR', 'Pertanian', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(21, 9, 'EDU', 'Pendidikan', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(22, 9, 'SCI', 'Ilmu Pengetahuan Alam', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(23, 10, 'EDU', 'Pendidikan', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(24, 10, 'MED', 'Kedokteran', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(25, 10, 'LAW', 'Hukum', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(26, 11, 'AGR', 'Pertanian', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(27, 11, 'SCI', 'Ilmu Pengetahuan Alam', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(28, 11, 'BUS', 'Bisnis', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(29, 12, 'ENG', 'Teknik Industri', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(30, 12, 'BUS', 'Bisnis', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(31, 12, 'IT', 'Teknologi Informasi', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(32, 13, 'AGR', 'Pertanian', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(33, 13, 'EDU', 'Pendidikan', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05'),
(34, 13, 'SCI', 'Ilmu Pengetahuan Alam', 'Admin', '2024-11-20 13:54:05', 'Admin', '2024-11-20 13:54:05');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `institution`
--

CREATE TABLE `institution` (
  `id` bigint(20) NOT NULL,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(5) NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `institution`
--

INSERT INTO `institution` (`id`, `code`, `name`, `type`, `address`, `usr_crt`, `dtm_crt`, `usr_upd`, `dtm_upd`) VALUES
(1, '201', 'SMAN 1 Surabaya', 'SHS', 'Jl. Wijaya Kusuma No.48, Surabaya', 'Admin', '2024-11-20 13:46:15', 'Admin', '2024-11-20 13:46:15'),
(2, '202', 'SMAN 2 Surabaya', 'SHS', 'Jl. Tentara Genie Pelajar No.41, Surabaya', 'Admin', '2024-11-20 13:46:15', 'Admin', '2024-11-20 13:46:15'),
(3, '203', 'SMAN 3 Surabaya', 'SHS', 'Jl. Pemuda No.17, Surabaya', 'Admin', '2024-11-20 13:46:15', 'Admin', '2024-11-20 13:46:15'),
(4, '204', 'SMAN 4 Surabaya', 'SHS', 'Jl. Mayjen Prof. Dr. Moestopo No.4, Surabaya', 'Admin', '2024-11-20 13:46:15', 'Admin', '2024-11-20 13:46:15'),
(5, '205', 'SMAN 5 Surabaya', 'SHS', 'Jl. Kusumabangsa No.21, Surabaya', 'Admin', '2024-11-20 13:46:15', 'Admin', '2024-11-20 13:46:15'),
(6, '301', 'Universitas Kristen Petra', 'COL', 'Jl. Siwalankerto No.121-131, Surabaya', 'Admin', '2024-11-20 13:46:15', 'Admin', '2024-11-20 13:46:15'),
(7, '302', 'Universitas Surabaya (Ubaya)', 'COL', 'Jl. Raya Kalirungkut, Surabaya', 'Admin', '2024-11-20 13:46:15', 'Admin', '2024-11-20 13:46:15'),
(8, '303', 'Universitas Brawijaya', 'COL', 'Jl. Veteran, Malang', 'Admin', '2024-11-20 13:46:15', 'Admin', '2024-11-20 13:46:15'),
(9, '304', 'Universitas Jember', 'COL', 'Jl. Kalimantan No.37, Jember', 'Admin', '2024-11-20 13:46:15', 'Admin', '2024-11-20 13:46:15'),
(10, '305', 'Universitas Negeri Malang', 'COL', 'Jl. Semarang No.5, Malang', 'Admin', '2024-11-20 13:46:15', 'Admin', '2024-11-20 13:46:15'),
(11, '306', 'Universitas Mataram', 'COL', 'Jl. Majapahit No.62, Mataram', 'Admin', '2024-11-20 13:46:15', 'Admin', '2024-11-20 13:46:15'),
(12, '307', 'Universitas Batam', 'COL', 'Jl. Uniba No.5, Batam', 'Admin', '2024-11-20 13:46:15', 'Admin', '2024-11-20 13:46:15'),
(13, '308', 'Politeknik Negeri Banyuwangi', 'COL', 'Jl. Raya Jember KM 13, Labanasem, Banyuwangi', 'Admin', '2024-11-20 13:46:15', 'Admin', '2024-11-20 13:46:15'),
(14, '401', 'Perkantas Surabaya', 'WORK', 'Jl. Tenggilis Mejoyo KA 10-12, Surabaya 60292', 'Admin', '2024-11-20 13:46:15', 'Admin', '2024-11-20 13:46:15'),
(15, '402', 'Perkantas Malang', 'WORK', 'Jl. Raya Tlogomas No.11, Malang', 'Admin', '2024-11-20 13:46:15', 'Admin', '2024-11-20 13:46:15'),
(16, '403', 'Perkantas Jember', 'WORK', 'Jl. Jawa No.22, Jember', 'Admin', '2024-11-20 13:46:15', 'Admin', '2024-11-20 13:46:15'),
(17, '404', 'Perkantas Jakarta', 'WORK', 'Jl. Danau Toba No.91, Jakarta', 'Admin', '2024-11-20 13:46:15', 'Admin', '2024-11-20 13:46:15'),
(18, '405', 'Perkantas Batam', 'WORK', 'Jl. Raja Isa, Batam', 'Admin', '2024-11-20 13:46:15', 'Admin', '2024-11-20 13:46:15');

-- --------------------------------------------------------

--
-- Table structure for table `ktb`
--

CREATE TABLE `ktb` (
  `id` bigint(20) NOT NULL,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `last_meet_dt` datetime DEFAULT NULL,
  `last_material_name` varchar(100) DEFAULT NULL,
  `last_material_chapter` int(11) DEFAULT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ktb`
--

INSERT INTO `ktb` (`id`, `code`, `name`, `last_meet_dt`, `last_material_name`, `last_material_chapter`, `usr_crt`, `dtm_crt`, `usr_upd`, `dtm_upd`) VALUES
(1, '001', 'Matius', '2023-10-13 00:00:00', 'Pemimpin Menurut Hati Allah', 3, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28'),
(2, '002', 'Markus', '2023-04-10 00:00:00', 'Doa yang Mengubah Dunia', 11, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28'),
(3, '003', 'Lukas', '2024-09-13 00:00:00', 'Memahami Alkitab Setiap Hari', 12, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28'),
(4, '004', 'Yohanes', '2023-02-11 00:00:00', 'Doa yang Mengubah Dunia', 8, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28'),
(5, '005', 'Kisah Para Rasul', '2023-07-01 00:00:00', 'Pelayanan yang Berdampak', 3, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28'),
(6, '006', 'Roma', '2023-09-15 00:00:00', 'Dasar-Dasar Iman Kristen', 4, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28'),
(7, '007', 'Korintus', '2024-03-08 00:00:00', 'Kesaksian Hidup di Tengah Dunia', 9, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28'),
(8, '008', 'Galatia', '2024-05-18 00:00:00', 'Fondasi Iman Kristen', 7, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28'),
(9, '009', 'Efesus', '2023-12-20 00:00:00', 'Bertumbuh dalam Komunitas', 5, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28'),
(10, '010', 'Filipi', '2024-06-09 00:00:00', 'Doa yang Mengubah Dunia', 2, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28'),
(11, '011', 'Kolose', '2023-03-25 00:00:00', 'Pelayanan yang Berdampak', 6, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28'),
(12, '012', 'Tesalonika', '2023-05-15 00:00:00', 'Dasar-Dasar Iman Kristen', 9, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28'),
(13, '013', 'Timotius', '2024-10-12 00:00:00', 'Fondasi Iman Kristen', 13, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28'),
(14, '014', 'Titus', '2024-04-14 00:00:00', 'Bertumbuh dalam Komunitas', 8, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28'),
(15, '015', 'Filemon', '2023-06-21 00:00:00', 'Mengenal Yesus Lebih Dekat', 6, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28'),
(16, '016', 'Ibrani', '2024-07-04 00:00:00', 'Kesaksian Hidup di Tengah Dunia', 7, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28'),
(17, '017', 'Yakobus', '2023-08-29 00:00:00', 'Memahami Alkitab Setiap Hari', 11, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28'),
(18, '018', 'Petrus', '2023-11-10 00:00:00', 'Karakter Kristus dalam Keluarga', 6, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28'),
(19, '019', 'Yudas', '2024-08-30 00:00:00', 'Mengenal Yesus Lebih Dekat', 10, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28'),
(20, '020', 'Wahyu', '2024-09-13 00:00:00', 'Memahami Alkitab Setiap Hari', 12, 'Admin', '2024-11-20 06:59:28', 'Admin', '2024-11-20 06:59:28');

-- --------------------------------------------------------

--
-- Table structure for table `ktbhistory`
--

CREATE TABLE `ktbhistory` (
  `id` bigint(20) NOT NULL,
  `ktb_id` bigint(20) NOT NULL,
  `meet_dt` datetime NOT NULL,
  `material_id` bigint(20) NOT NULL,
  `material_name` varchar(100) NOT NULL,
  `material_chapter` int(11) NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 1,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ktbhistory`
--

INSERT INTO `ktbhistory` (`id`, `ktb_id`, `meet_dt`, `material_id`, `material_name`, `material_chapter`, `is_active`, `usr_crt`, `dtm_crt`, `usr_upd`, `dtm_upd`) VALUES
(1, 1, '2024-11-10 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(2, 1, '2024-04-08 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(3, 1, '2024-09-17 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(4, 1, '2023-12-12 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(5, 1, '2024-06-23 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(6, 1, '2024-05-12 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(7, 2, '2024-07-01 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(8, 2, '2024-11-04 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(9, 2, '2024-08-29 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(10, 2, '2024-08-14 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(11, 2, '2024-09-19 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(12, 2, '2024-08-01 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(13, 2, '2024-04-26 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 7, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(14, 2, '2024-11-03 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 8, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(15, 3, '2024-02-19 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(16, 3, '2024-03-04 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(17, 3, '2024-03-12 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(18, 3, '2023-12-26 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(19, 3, '2024-07-04 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(20, 3, '2024-08-22 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(21, 3, '2024-08-02 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 7, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(22, 3, '2024-02-03 07:47:42', 10, 'Fondasi Iman Kristen', 8, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(23, 4, '2024-03-13 07:47:42', 4, 'Memahami Alkitab Setiap Hari', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(24, 4, '2024-04-09 07:47:42', 4, 'Memahami Alkitab Setiap Hari', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(25, 4, '2024-03-19 07:47:42', 4, 'Memahami Alkitab Setiap Hari', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(26, 4, '2024-07-15 07:47:42', 4, 'Memahami Alkitab Setiap Hari', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(27, 4, '2023-11-24 07:47:42', 4, 'Memahami Alkitab Setiap Hari', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(28, 4, '2024-07-11 07:47:42', 4, 'Memahami Alkitab Setiap Hari', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(29, 4, '2023-12-19 07:47:42', 4, 'Memahami Alkitab Setiap Hari', 7, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(30, 5, '2024-10-27 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(31, 5, '2023-12-28 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(32, 5, '2024-04-07 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(33, 5, '2024-10-28 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(34, 5, '2023-12-10 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(35, 5, '2024-03-22 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(36, 5, '2024-09-27 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 7, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(37, 5, '2024-04-06 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 8, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(38, 6, '2024-01-17 07:47:42', 8, 'Doa yang Mengubah Dunia', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(39, 6, '2024-08-01 07:47:42', 8, 'Doa yang Mengubah Dunia', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(40, 6, '2024-05-10 07:47:42', 8, 'Doa yang Mengubah Dunia', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(41, 6, '2024-08-02 07:47:42', 8, 'Doa yang Mengubah Dunia', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(42, 6, '2024-07-27 07:47:42', 8, 'Doa yang Mengubah Dunia', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(43, 6, '2024-08-13 07:47:42', 8, 'Doa yang Mengubah Dunia', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(44, 6, '2024-05-01 07:47:42', 9, 'Pelayanan yang Berdampak', 7, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(45, 6, '2024-05-21 07:47:42', 9, 'Pelayanan yang Berdampak', 8, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(46, 7, '2023-11-29 07:47:42', 9, 'Pelayanan yang Berdampak', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(47, 7, '2023-12-13 07:47:42', 9, 'Pelayanan yang Berdampak', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(48, 7, '2023-12-30 07:47:42', 9, 'Pelayanan yang Berdampak', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(49, 7, '2024-09-07 07:47:42', 9, 'Pelayanan yang Berdampak', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(50, 7, '2024-06-13 07:47:42', 9, 'Pelayanan yang Berdampak', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(51, 7, '2024-07-28 07:47:42', 9, 'Pelayanan yang Berdampak', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(52, 7, '2024-09-07 07:47:42', 9, 'Pelayanan yang Berdampak', 7, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(53, 8, '2024-01-11 07:47:42', 7, 'Karakter Kristus dalam Keluarga', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(54, 8, '2024-09-26 07:47:42', 7, 'Karakter Kristus dalam Keluarga', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(55, 8, '2024-04-02 07:47:42', 7, 'Karakter Kristus dalam Keluarga', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(56, 8, '2024-04-09 07:47:42', 7, 'Karakter Kristus dalam Keluarga', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(57, 8, '2024-05-05 07:47:42', 7, 'Karakter Kristus dalam Keluarga', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(58, 8, '2023-12-02 07:47:42', 7, 'Karakter Kristus dalam Keluarga', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(59, 8, '2023-11-30 07:47:42', 7, 'Karakter Kristus dalam Keluarga', 7, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(60, 8, '2024-09-18 07:47:42', 8, 'Doa yang Mengubah Dunia', 8, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(61, 9, '2024-08-23 07:47:42', 6, 'Bertumbuh dalam Komunitas', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(62, 9, '2024-09-01 07:47:42', 6, 'Bertumbuh dalam Komunitas', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(63, 9, '2024-03-09 07:47:42', 6, 'Bertumbuh dalam Komunitas', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(64, 9, '2024-02-24 07:47:42', 6, 'Bertumbuh dalam Komunitas', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(65, 9, '2024-08-05 07:47:42', 6, 'Bertumbuh dalam Komunitas', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(66, 9, '2024-07-24 07:47:42', 6, 'Bertumbuh dalam Komunitas', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(67, 10, '2024-03-12 07:47:42', 10, 'Fondasi Iman Kristen', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(68, 10, '2024-06-02 07:47:42', 10, 'Fondasi Iman Kristen', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(69, 10, '2023-12-26 07:47:42', 10, 'Fondasi Iman Kristen', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(70, 10, '2024-02-03 07:47:42', 10, 'Fondasi Iman Kristen', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(71, 10, '2024-08-14 07:47:42', 10, 'Fondasi Iman Kristen', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(72, 10, '2023-12-30 07:47:42', 10, 'Fondasi Iman Kristen', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(73, 10, '2024-09-29 07:47:42', 10, 'Fondasi Iman Kristen', 7, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(74, 11, '2024-05-04 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(75, 11, '2024-01-14 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(76, 11, '2024-06-02 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(77, 11, '2024-04-05 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(78, 11, '2024-05-08 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(79, 11, '2023-12-03 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(80, 12, '2023-12-11 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(81, 12, '2024-03-26 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(82, 12, '2024-09-20 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(83, 12, '2023-12-25 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(84, 12, '2024-09-14 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(85, 12, '2023-12-29 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(86, 13, '2024-07-09 07:47:42', 9, 'Pelayanan yang Berdampak', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(87, 13, '2024-10-05 07:47:42', 9, 'Pelayanan yang Berdampak', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(88, 13, '2024-09-30 07:47:42', 9, 'Pelayanan yang Berdampak', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(89, 13, '2024-10-26 07:47:42', 9, 'Pelayanan yang Berdampak', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(90, 13, '2024-08-27 07:47:42', 9, 'Pelayanan yang Berdampak', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(91, 13, '2024-11-15 07:47:42', 9, 'Pelayanan yang Berdampak', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(92, 13, '2024-07-24 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 7, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(93, 13, '2024-03-05 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 8, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(94, 14, '2024-06-25 07:47:42', 8, 'Doa yang Mengubah Dunia', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(95, 14, '2024-04-14 07:47:42', 8, 'Doa yang Mengubah Dunia', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(96, 14, '2024-11-15 07:47:42', 8, 'Doa yang Mengubah Dunia', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(97, 14, '2024-01-09 07:47:42', 8, 'Doa yang Mengubah Dunia', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(98, 14, '2024-05-25 07:47:42', 8, 'Doa yang Mengubah Dunia', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(99, 14, '2024-02-24 07:47:42', 8, 'Doa yang Mengubah Dunia', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(100, 14, '2024-07-09 07:47:42', 8, 'Doa yang Mengubah Dunia', 7, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(101, 15, '2024-07-30 07:47:42', 6, 'Bertumbuh dalam Komunitas', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(102, 15, '2024-06-23 07:47:42', 6, 'Bertumbuh dalam Komunitas', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(103, 15, '2024-11-12 07:47:42', 6, 'Bertumbuh dalam Komunitas', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(104, 15, '2024-07-28 07:47:42', 6, 'Bertumbuh dalam Komunitas', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(105, 15, '2024-03-12 07:47:42', 6, 'Bertumbuh dalam Komunitas', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(106, 15, '2024-09-09 07:47:42', 6, 'Bertumbuh dalam Komunitas', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(107, 15, '2024-01-10 07:47:42', 6, 'Bertumbuh dalam Komunitas', 7, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(108, 16, '2024-02-27 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(109, 16, '2024-06-22 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(110, 16, '2023-12-17 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(111, 16, '2024-11-02 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(112, 16, '2023-12-18 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(113, 16, '2024-08-23 07:47:42', 1, 'Mengenal Yesus Lebih Dekat', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(114, 16, '2024-10-28 07:47:42', 7, 'Karakter Kristus dalam Keluarga', 7, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(115, 16, '2024-01-17 07:47:42', 7, 'Karakter Kristus dalam Keluarga', 8, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(116, 17, '2024-01-06 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(117, 17, '2024-06-15 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(118, 17, '2024-09-15 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(119, 17, '2023-12-02 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(120, 17, '2024-04-28 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(121, 17, '2024-04-26 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(122, 17, '2023-12-12 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 7, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(123, 18, '2024-08-03 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(124, 18, '2024-01-06 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(125, 18, '2024-02-05 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(126, 18, '2024-01-20 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(127, 18, '2023-12-10 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(128, 18, '2024-02-27 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(129, 18, '2024-06-04 07:47:42', 3, 'Pemimpin Menurut Hati Allah', 7, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(130, 19, '2024-11-14 07:47:42', 6, 'Bertumbuh dalam Komunitas', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(131, 19, '2023-12-18 07:47:42', 6, 'Bertumbuh dalam Komunitas', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(132, 19, '2024-04-19 07:47:42', 6, 'Bertumbuh dalam Komunitas', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(133, 19, '2024-10-02 07:47:42', 6, 'Bertumbuh dalam Komunitas', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(134, 19, '2024-03-05 07:47:42', 6, 'Bertumbuh dalam Komunitas', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(135, 19, '2024-03-10 07:47:42', 6, 'Bertumbuh dalam Komunitas', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(136, 19, '2024-03-09 07:47:42', 4, 'Memahami Alkitab Setiap Hari', 7, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(137, 19, '2024-10-17 07:47:42', 4, 'Memahami Alkitab Setiap Hari', 8, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(138, 20, '2024-06-19 07:47:42', 4, 'Memahami Alkitab Setiap Hari', 1, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(139, 20, '2024-09-28 07:47:42', 4, 'Memahami Alkitab Setiap Hari', 2, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(140, 20, '2023-12-20 07:47:42', 4, 'Memahami Alkitab Setiap Hari', 3, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(141, 20, '2024-08-04 07:47:42', 4, 'Memahami Alkitab Setiap Hari', 4, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(142, 20, '2024-03-20 07:47:42', 4, 'Memahami Alkitab Setiap Hari', 5, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(143, 20, '2024-10-20 07:47:42', 5, 'Kesaksian Hidup di Tengah Dunia', 6, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42'),
(144, 20, '2024-09-05 07:47:42', 5, 'Kesaksian Hidup di Tengah Dunia', 7, 1, 'Admin', '2024-11-20 07:47:42', 'Admin', '2024-11-20 07:47:42');

-- --------------------------------------------------------

--
-- Table structure for table `ktbhistorymember`
--

CREATE TABLE `ktbhistorymember` (
  `id` bigint(20) NOT NULL,
  `ktb_history_id` bigint(20) NOT NULL,
  `member_id` bigint(20) NOT NULL,
  `is_attending` bigint(20) NOT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ktbhistorymember`
--

INSERT INTO `ktbhistorymember` (`id`, `ktb_history_id`, `member_id`, `is_attending`, `usr_crt`, `dtm_crt`, `usr_upd`, `dtm_upd`) VALUES
(1, 1, 1, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(2, 1, 2, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(3, 1, 3, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(4, 1, 4, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(5, 1, 5, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(6, 2, 6, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(7, 2, 7, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(8, 2, 8, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(9, 2, 9, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(10, 2, 10, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(11, 3, 11, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(12, 3, 12, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(13, 3, 13, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(14, 3, 14, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(15, 3, 15, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(16, 4, 16, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(17, 4, 17, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(18, 4, 18, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(19, 4, 19, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(20, 4, 20, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(21, 5, 21, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(22, 5, 22, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(23, 5, 23, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(24, 5, 24, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(25, 5, 25, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(26, 6, 26, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(27, 6, 27, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(28, 6, 28, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(29, 6, 29, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(30, 6, 30, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(31, 7, 31, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(32, 7, 32, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(33, 7, 33, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(34, 7, 34, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(35, 7, 35, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(36, 8, 36, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(37, 8, 37, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(38, 8, 38, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(39, 8, 39, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(40, 8, 40, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(41, 9, 41, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(42, 9, 42, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(43, 9, 43, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(44, 9, 44, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(45, 9, 45, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(46, 10, 46, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(47, 10, 47, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(48, 10, 48, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(49, 10, 49, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(50, 10, 50, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(51, 11, 51, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(52, 11, 52, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(53, 11, 53, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(54, 11, 54, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(55, 11, 55, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(56, 12, 56, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(57, 12, 57, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(58, 12, 58, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(59, 12, 59, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(60, 12, 60, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(61, 13, 61, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(62, 13, 62, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(63, 13, 63, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(64, 13, 64, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(65, 13, 65, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(66, 14, 66, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(67, 14, 67, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(68, 14, 68, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(69, 14, 69, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(70, 14, 70, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(71, 15, 71, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(72, 15, 72, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(73, 15, 73, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(74, 15, 74, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(75, 15, 75, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(76, 16, 76, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(77, 16, 77, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(78, 16, 78, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(79, 16, 79, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(80, 16, 80, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(81, 17, 81, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(82, 17, 82, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(83, 17, 83, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(84, 17, 84, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(85, 17, 85, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(86, 18, 86, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(87, 18, 87, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(88, 18, 88, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(89, 18, 89, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(90, 18, 90, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(91, 19, 91, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(92, 19, 92, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(93, 19, 93, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(94, 19, 94, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(95, 19, 95, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(96, 20, 96, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(97, 20, 97, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(98, 20, 98, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(99, 20, 99, 0, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21'),
(100, 20, 100, 1, 'Admin', '2024-11-20 07:38:21', 'Admin', '2024-11-20 07:38:21');

-- --------------------------------------------------------

--
-- Table structure for table `ktbmember`
--

CREATE TABLE `ktbmember` (
  `id` bigint(20) NOT NULL,
  `ktb_id` bigint(20) NOT NULL,
  `member_id` bigint(20) NOT NULL,
  `is_pktb` tinyint(4) NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `old_ktb_id` bigint(20) DEFAULT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ktbmember`
--

INSERT INTO `ktbmember` (`id`, `ktb_id`, `member_id`, `is_pktb`, `is_active`, `old_ktb_id`, `usr_crt`, `dtm_crt`, `usr_upd`, `dtm_upd`) VALUES
(1, 1, 1, 1, 1, 1, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(2, 1, 2, 0, 1, 1, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(3, 1, 3, 0, 1, 1, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(4, 1, 4, 0, 1, 1, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(5, 1, 5, 0, 1, 1, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(6, 2, 6, 1, 1, 2, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(7, 2, 7, 0, 1, 2, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(8, 2, 8, 0, 1, 2, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(9, 2, 9, 0, 1, 2, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(10, 2, 10, 0, 1, 2, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(11, 3, 11, 1, 1, 3, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(12, 3, 12, 0, 1, 3, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(13, 3, 13, 0, 1, 3, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(14, 3, 14, 0, 1, 3, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(15, 3, 15, 0, 1, 3, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(16, 4, 16, 1, 1, 4, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(17, 4, 17, 0, 1, 4, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(18, 4, 18, 0, 1, 4, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(19, 4, 19, 0, 1, 4, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(20, 4, 20, 0, 1, 4, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(21, 5, 21, 1, 1, 5, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(22, 5, 22, 0, 1, 5, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(23, 5, 23, 0, 1, 5, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(24, 5, 24, 0, 1, 5, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(25, 5, 25, 0, 1, 5, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(26, 6, 26, 1, 1, 6, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(27, 6, 27, 0, 1, 6, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(28, 6, 28, 0, 1, 6, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(29, 6, 29, 0, 1, 6, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(30, 6, 30, 0, 1, 6, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(31, 7, 31, 1, 1, 7, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(32, 7, 32, 0, 1, 7, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(33, 7, 33, 0, 1, 7, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(34, 7, 34, 0, 1, 7, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(35, 7, 35, 0, 1, 7, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(36, 8, 36, 1, 1, 8, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(37, 8, 37, 0, 1, 8, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(38, 8, 38, 0, 1, 8, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(39, 8, 39, 0, 1, 8, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(40, 8, 40, 0, 1, 8, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(41, 9, 41, 1, 1, 9, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(42, 9, 42, 0, 1, 9, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(43, 9, 43, 0, 1, 9, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(44, 9, 44, 0, 1, 9, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(45, 9, 45, 0, 1, 9, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(46, 10, 46, 1, 1, 10, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(47, 10, 47, 0, 1, 10, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(48, 10, 48, 0, 1, 10, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(49, 10, 49, 0, 1, 10, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(50, 10, 50, 0, 1, 10, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(51, 11, 51, 1, 1, 11, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(52, 11, 52, 0, 1, 11, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(53, 11, 53, 0, 1, 11, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(54, 11, 54, 0, 1, 11, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(55, 11, 55, 0, 1, 11, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(56, 12, 56, 1, 1, 12, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(57, 12, 57, 0, 1, 12, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(58, 12, 58, 0, 1, 12, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(59, 12, 59, 0, 1, 12, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(60, 12, 60, 0, 1, 12, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(61, 13, 61, 1, 1, 13, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(62, 13, 62, 0, 1, 13, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(63, 13, 63, 0, 1, 13, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(64, 13, 64, 0, 1, 13, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(65, 13, 65, 0, 1, 13, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(66, 14, 66, 1, 1, 14, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(67, 14, 67, 0, 1, 14, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(68, 14, 68, 0, 1, 14, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(69, 14, 69, 0, 1, 14, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(70, 14, 70, 0, 1, 14, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(71, 15, 71, 1, 1, 15, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(72, 15, 72, 0, 1, 15, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(73, 15, 73, 0, 1, 15, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(74, 15, 74, 0, 1, 15, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(75, 15, 75, 0, 1, 15, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(76, 16, 76, 1, 1, 16, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(77, 16, 77, 0, 1, 16, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(78, 16, 78, 0, 1, 16, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(79, 16, 79, 0, 1, 16, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(80, 16, 80, 0, 1, 16, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(81, 17, 81, 1, 1, 17, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(82, 17, 82, 0, 1, 17, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(83, 17, 83, 0, 1, 17, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(84, 17, 84, 0, 1, 17, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(85, 17, 85, 0, 1, 17, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(86, 18, 86, 1, 1, 18, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(87, 18, 87, 0, 1, 18, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(88, 18, 88, 0, 1, 18, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(89, 18, 89, 0, 1, 18, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(90, 18, 90, 0, 1, 18, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(91, 19, 91, 1, 1, 19, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(92, 19, 92, 0, 1, 19, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(93, 19, 93, 0, 1, 19, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(94, 19, 94, 0, 1, 19, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(95, 19, 95, 0, 1, 19, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(96, 20, 96, 1, 1, 20, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(97, 20, 97, 0, 1, 20, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(98, 20, 98, 0, 1, 20, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(99, 20, 99, 0, 1, 20, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25'),
(100, 20, 100, 0, 1, 20, 'Admin', '2024-11-20 07:36:25', 'Admin', '2024-11-20 07:36:25');

-- --------------------------------------------------------

--
-- Table structure for table `logapi`
--

CREATE TABLE `logapi` (
  `id` bigint(20) NOT NULL,
  `request_id` varchar(200) NOT NULL,
  `url` varchar(500) NOT NULL,
  `method_name` varchar(200) NOT NULL,
  `param_input` varchar(2000) NOT NULL,
  `response_status` int(11) NOT NULL,
  `param_output` varchar(2000) NOT NULL,
  `error_message` varchar(2000) DEFAULT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `material`
--

CREATE TABLE `material` (
  `id` bigint(20) NOT NULL,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `chapter_count` int(11) NOT NULL,
  `is_pra_ktb` tinyint(1) NOT NULL DEFAULT 0,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `material`
--

INSERT INTO `material` (`id`, `code`, `name`, `chapter_count`, `is_pra_ktb`, `usr_crt`, `dtm_crt`, `usr_upd`, `dtm_upd`) VALUES
(1, '100', 'Mengenal Yesus Lebih Dekat', 12, 0, 'Admin', '2024-07-25 09:00:00', 'Admin', '2024-07-25 09:00:00'),
(2, '101', 'Dasar-Dasar Iman Kristen', 10, 0, 'Admin', '2024-07-25 09:15:00', 'Admin', '2024-07-25 09:15:00'),
(3, '102', 'Pemimpin Menurut Hati Allah', 8, 0, 'Admin', '2024-07-25 09:30:00', 'Admin', '2024-07-25 09:30:00'),
(4, '103', 'Memahami Alkitab Setiap Hari', 15, 0, 'Admin', '2024-07-25 09:45:00', 'Admin', '2024-07-25 09:45:00'),
(5, '104', 'Kesaksian Hidup di Tengah Dunia', 10, 0, 'Admin', '2024-07-25 10:00:00', 'Admin', '2024-07-25 10:00:00'),
(6, '105', 'Bertumbuh dalam Komunitas', 8, 0, 'Admin', '2024-07-25 10:15:00', 'Admin', '2024-07-25 10:15:00'),
(7, '106', 'Karakter Kristus dalam Keluarga', 14, 0, 'Admin', '2024-07-25 10:30:00', 'Admin', '2024-07-25 10:30:00'),
(8, '107', 'Doa yang Mengubah Dunia', 12, 0, 'Admin', '2024-07-25 10:45:00', 'Admin', '2024-07-25 10:45:00'),
(9, '108', 'Pelayanan yang Berdampak', 9, 0, 'Admin', '2024-07-25 11:00:00', 'Admin', '2024-07-25 11:00:00'),
(10, '109', 'Fondasi Iman Kristen', 13, 0, 'Admin', '2024-07-25 11:15:00', 'Admin', '2024-07-25 11:15:00');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `birth_dt` datetime DEFAULT NULL,
  `birth_place` varchar(100) DEFAULT NULL,
  `mobile_phn` varchar(20) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `inst_type` varchar(5) DEFAULT NULL,
  `city_id` bigint(20) NOT NULL,
  `institution_id` bigint(20) DEFAULT NULL,
  `faculty_id` bigint(20) DEFAULT NULL,
  `alpha_member_id` bigint(20) DEFAULT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `name`, `address`, `gender`, `birth_dt`, `birth_place`, `mobile_phn`, `status`, `inst_type`, `city_id`, `institution_id`, `faculty_id`, `alpha_member_id`, `usr_crt`, `dtm_crt`, `usr_upd`, `dtm_upd`) VALUES
(1, 'Asman Santoso', 'Jl. Soekarno Hatta No.12, Malang', 'M', '1990-12-06 00:00:00', 'Kupang', '0825523715', 0, 'SHS', 2, 3, 5, 259, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(2, 'Rachel Nuraini', 'Jl. Mastrip No.8, Jember', 'F', '1992-11-27 00:00:00', 'Denpasar', '0848670174', 0, 'SHS', 3, 4, 7, 991, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(3, 'Icha Uyainah', 'Jl. Raya Darmo No.56, Surabaya', 'F', '1976-12-14 00:00:00', 'Langsa', '0864256960', 0, 'SHS', 1, 1, 1, 186, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(4, 'Puput Simbolon', 'Jl. Manyar Kertoarjo No.7, Surabaya', 'F', '2000-07-15 00:00:00', 'Bengkulu', '0864722714', 0, 'SHS', 1, 2, 3, 180, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(5, 'Teddy Sudiati', 'Jl. Kalibaru No.7, Banyuwangi', 'M', '2005-04-26 00:00:00', 'Singkawang', '0874289067', 0, 'COL', 7, 8, 19, 474, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(6, 'Wahyu Usada', 'Jl. Hang Lekir No.55, Batam', 'M', '1967-01-16 00:00:00', 'Pasuruan', '0840887697', 0, 'COL', 6, 7, 14, 319, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(7, 'Zalindra Yolanda', 'Jl. Soekarno Hatta No.12, Malang', 'F', '1996-01-06 00:00:00', 'Probolinggo', '0800401589', 0, 'SHS', 2, 3, 5, 443, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(8, 'Wani Kusmawati', 'Jl. Gajah Mada No.9, Jember', 'F', '1982-11-22 00:00:00', 'Batu', '0832964441', 0, 'SHS', 3, 4, 8, 304, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(9, 'Julia Sihombing', 'Jl. Ijen Boulevard No.45, Malang', 'F', '2001-08-07 00:00:00', 'Malang', '0845065296', 0, 'SHS', 2, 3, 5, 800, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(10, 'Michelle Sihotang', 'Jl. Rogojampi No.9, Banyuwangi', 'F', '1986-01-25 00:00:00', 'Batu', '0841119882', 0, 'COL', 7, 8, 19, 653, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(11, 'Bakidin Mayasari', 'Jl. Kalibaru No.7, Banyuwangi', 'M', '2005-04-28 00:00:00', 'Tomohon', '0826592465', 0, 'COL', 7, 8, 18, 890, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(12, 'Garang Irawan', 'Jl. Mastrip No.8, Jember', 'M', '1986-11-19 00:00:00', 'Semarang', '0824132662', 0, 'SHS', 3, 4, 7, 288, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(13, 'Prabu Adriansyah', 'Jl. Letjen Sutoyo No.11, Banyuwangi', 'M', '2000-02-26 00:00:00', 'Cirebon', '0800320774', 0, 'COL', 7, 8, 18, 875, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(14, 'Nadine Nasyidah', 'Jl. Kalikepiting No.111, Surabaya', 'F', '2004-01-03 00:00:00', 'Sukabumi', '0815220109', 0, 'SHS', 1, 1, 1, 419, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(15, 'Zelda Purwanti', 'Jl. Tlogomas No.98, Malang', 'F', '1984-11-26 00:00:00', 'Pematangsiantar', '0877986565', 0, 'SHS', 2, 3, 5, 818, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(16, 'Lutfan Riyanti', 'Jl. Gajah Mada No.9, Jember', 'M', '1992-07-08 00:00:00', 'Kendari', '0878137530', 0, 'SHS', 3, 4, 7, 690, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(17, 'Julia Pradipta', 'Jl. Soekarno Hatta No.12, Malang', 'F', '1978-01-03 00:00:00', 'Ternate', '0817738667', 0, 'SHS', 2, 3, 5, 370, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(18, 'Olivia Jailani', 'Jl. Mastrip No.8, Jember', 'F', '1974-12-27 00:00:00', 'Cirebon', '0862597108', 0, 'SHS', 3, 4, 8, 784, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(19, 'Genta Susanti', 'Jl. Sudirman No.3, Kediri', 'F', '2002-01-17 00:00:00', 'Magelang', '0812396857', 0, 'SHS', 4, 5, 10, 555, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(20, 'Capa Napitupulu', 'Jl. Kalimantan No.22, Jember', 'M', '1978-06-16 00:00:00', 'Surakarta', '0899552648', 0, 'SHS', 3, 4, 8, 770, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(21, 'Nabila Iswahyudi', 'Jl. Gajah Mada No.9, Jember', 'F', '1999-01-17 00:00:00', 'Blitar', '0814363196', 0, 'SHS', 3, 4, 8, 538, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(22, 'Bella Kuswoyo', 'Jl. Letjen S. Parman No.5, Kediri', 'F', '1973-03-18 00:00:00', 'Manado', '0833447283', 0, 'SHS', 4, 5, 10, 569, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(23, 'Jarwadi Nashiruddin', 'Jl. Soekarno Hatta No.12, Malang', 'M', '1995-01-29 00:00:00', 'Banjarmasin', '0849220576', 0, 'SHS', 2, 3, 6, 329, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(24, 'Saka Saputra', 'Jl. Rogojampi No.9, Banyuwangi', 'M', '1965-09-14 00:00:00', 'Yogyakarta', '0843802337', 0, 'COL', 7, 8, 17, 129, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(25, 'Asirwada Hassanah', 'Jl. Tlogomas No.98, Malang', 'M', '1965-03-22 00:00:00', 'Padang Sidempuan', '0806371238', 0, 'SHS', 2, 3, 6, 724, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(26, 'Cakrajiya Dongoran', 'Jl. Ijen Boulevard No.45, Malang', 'M', '1973-06-25 00:00:00', 'Jayapura', '0816498851', 0, 'SHS', 2, 3, 6, 618, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(27, 'Hafshah Suartini', 'Jl. Letjen Sutoyo No.11, Banyuwangi', 'F', '1988-05-07 00:00:00', 'Kediri', '0853043414', 0, 'COL', 7, 8, 17, 879, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(28, 'Bakiono Pradana', 'Jl. Majapahit No.28, Mataram', 'M', '1968-04-06 00:00:00', 'Banda Aceh', '0867904112', 0, 'COL', 5, 6, 12, 214, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(29, 'Nurul Puspita', 'Jl. Mastrip No.8, Jember', 'F', '1992-03-28 00:00:00', 'Cimahi', '0877220328', 0, 'SHS', 3, 4, 8, 780, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(30, 'Jarwa Santoso', 'Jl. Kalikepiting No.111, Surabaya', 'M', '1988-12-16 00:00:00', 'Banda Aceh', '0833062727', 0, 'SHS', 1, 1, 1, 232, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(31, 'Zaenab Firmansyah', 'Jl. Kalimantan No.22, Jember', 'F', '2004-05-02 00:00:00', 'Subulussalam', '0866986743', 0, 'SHS', 3, 4, 8, 658, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(32, 'Pardi Wijayanti', 'Jl. Majapahit No.28, Mataram', 'M', '1989-02-21 00:00:00', 'Subulussalam', '0861258851', 0, 'COL', 5, 6, 12, 332, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(33, 'Silvia Utami', 'Jl. Nagoya No.3, Batam', 'F', '1969-02-20 00:00:00', 'Medan', '0814310925', 0, 'COL', 6, 7, 14, 515, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(34, 'Maimunah Anggriawan', 'Jl. Kalibaru No.7, Banyuwangi', 'F', '1967-07-20 00:00:00', 'Kota Administrasi Jakarta Barat', '0810546130', 0, 'COL', 7, 8, 17, 604, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(35, 'Elon Rajasa', 'Jl. Sudirman No.3, Kediri', 'M', '1982-09-28 00:00:00', 'Balikpapan', '0872028385', 0, 'SHS', 4, 5, 10, 490, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(36, 'Ina Prayoga', 'Jl. Mastrip No.8, Jember', 'F', '1962-10-14 00:00:00', 'Solok', '0876896323', 0, 'SHS', 3, 4, 7, 353, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(37, 'Heru Wahyudin', 'Jl. Letjen Sutoyo No.11, Banyuwangi', 'M', '1985-11-28 00:00:00', 'Bukittinggi', '0817141849', 0, 'COL', 7, 8, 17, 145, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(38, 'Daniswara Nainggolan', 'Jl. Kalimantan No.22, Jember', 'M', '1964-11-19 00:00:00', 'Salatiga', '0805850173', 0, 'SHS', 3, 4, 8, 966, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(39, 'Padma Sihombing', 'Jl. Kalibaru No.7, Banyuwangi', 'F', '1986-11-08 00:00:00', 'Meulaboh', '0889635401', 0, 'COL', 7, 8, 18, 852, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(40, 'Malik Suartini', 'Jl. Rogojampi No.9, Banyuwangi', 'M', '2006-04-16 00:00:00', 'Tidore Kepulauan', '0802330403', 0, 'COL', 7, 8, 18, 855, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(41, 'Wirda Nugroho', 'Jl. Letjen S. Parman No.5, Kediri', 'F', '1976-09-28 00:00:00', 'Sungai Penuh', '0894616496', 0, 'SHS', 4, 5, 10, 472, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(42, 'Tira Dongoran', 'Jl. Tlogomas No.98, Malang', 'F', '1976-08-24 00:00:00', 'Gorontalo', '0855735921', 0, 'SHS', 2, 3, 6, 915, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(43, 'Rachel Wasita', 'Jl. Kalikepiting No.111, Surabaya', 'F', '1992-04-06 00:00:00', 'Denpasar', '0823092003', 0, 'SHS', 1, 2, 4, 681, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(44, 'Kamaria Prabowo', 'Jl. Dhoho No.17, Kediri', 'F', '1978-04-22 00:00:00', 'Madiun', '0825122464', 0, 'SHS', 4, 5, 10, 950, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(45, 'Gabriella Pranowo', 'Jl. Kalimantan No.22, Jember', 'F', '1976-03-29 00:00:00', 'Batam', '0838633664', 0, 'SHS', 3, 4, 7, 104, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(46, 'Mariadi Nasyiah', 'Jl. Manyar Kertoarjo No.7, Surabaya', 'M', '1967-02-01 00:00:00', 'Pasuruan', '0825948649', 0, 'SHS', 1, 1, 2, 528, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(47, 'Ellis Hutasoit', 'Jl. Soekarno Hatta No.12, Malang', 'F', '1961-03-19 00:00:00', 'Padangpanjang', '0896582338', 0, 'SHS', 2, 3, 6, 463, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(48, 'Jarwi Samosir', 'Jl. Kalimantan No.22, Jember', 'M', '1965-02-17 00:00:00', 'Bukittinggi', '0853584246', 0, 'SHS', 3, 4, 7, 814, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(49, 'Cahyadi Farida', 'Jl. Rogojampi No.9, Banyuwangi', 'M', '1999-03-26 00:00:00', 'Dumai', '0800808114', 0, 'COL', 7, 8, 19, 240, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(50, 'Darsirah Mayasari', 'Jl. Mastrip No.8, Jember', 'M', '1971-05-29 00:00:00', 'Kota Administrasi Jakarta Timur', '0800208183', 0, 'SHS', 3, 4, 8, 813, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(51, 'Aisyah Riyanti', 'Jl. Mastrip No.8, Jember', 'F', '2003-11-19 00:00:00', 'Yogyakarta', '0895812862', 0, 'SHS', 3, 4, 7, 858, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(52, 'Sadina Hardiansyah', 'Jl. Udayana No.6, Mataram', 'F', '1969-04-29 00:00:00', 'Tangerang Selatan', '0885971076', 0, 'COL', 5, 6, 11, 320, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(53, 'Lulut Maryati', 'Jl. Udayana No.6, Mataram', 'M', '1989-02-20 00:00:00', 'Bogor', '0862132984', 0, 'COL', 5, 6, 12, 522, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(54, 'Kariman Astuti', 'Jl. Dhoho No.17, Kediri', 'M', '1963-02-19 00:00:00', 'Parepare', '0824725197', 0, 'SHS', 4, 5, 10, 601, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(55, 'Ophelia Uwais', 'Jl. Letjen S. Parman No.5, Kediri', 'F', '1976-01-02 00:00:00', 'Surabaya', '0807580819', 0, 'SHS', 4, 5, 9, 780, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(56, 'Dono Jailani', 'Jl. Ijen Boulevard No.45, Malang', 'M', '1989-11-05 00:00:00', 'Subulussalam', '0833011898', 0, 'SHS', 2, 3, 6, 541, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(57, 'Eka Nugroho', 'Jl. Soekarno Hatta No.12, Malang', 'F', '2000-03-31 00:00:00', 'Kota Administrasi Jakarta Utara', '0819510895', 0, 'SHS', 2, 3, 6, 414, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(58, 'Violet Dabukke', 'Jl. Ijen Boulevard No.45, Malang', 'F', '2001-06-13 00:00:00', 'Pangkalpinang', '0884302882', 0, 'SHS', 2, 3, 5, 467, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(59, 'Pardi Tarihoran', 'Jl. Udayana No.6, Mataram', 'M', '1990-09-04 00:00:00', 'Banjarmasin', '0853527345', 0, 'COL', 5, 6, 13, 176, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(60, 'Shakila Simanjuntak', 'Jl. Nagoya No.3, Batam', 'F', '1994-04-10 00:00:00', 'Sabang', '0886914374', 0, 'COL', 6, 7, 14, 180, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(61, 'Cecep Prayoga', 'Jl. Gajah Mada No.9, Jember', 'M', '1998-12-29 00:00:00', 'Kendari', '0800768242', 0, 'SHS', 3, 4, 7, 170, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(62, 'Jessica Tampubolon', 'Jl. Rogojampi No.9, Banyuwangi', 'F', '1989-07-17 00:00:00', 'Solok', '0874870553', 0, 'COL', 7, 8, 19, 130, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(63, 'Natalia Agustina', 'Jl. Nagoya No.3, Batam', 'F', '1978-08-03 00:00:00', 'Padangpanjang', '0809616230', 0, 'COL', 6, 7, 15, 913, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(64, 'Wulan Thamrin', 'Jl. Kalimantan No.22, Jember', 'F', '1985-12-05 00:00:00', 'Langsa', '0846780492', 0, 'SHS', 3, 4, 7, 524, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(65, 'Mala Siregar', 'Jl. Nagoya No.3, Batam', 'F', '1961-01-27 00:00:00', 'Bima', '0893241052', 0, 'COL', 6, 7, 15, 350, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(66, 'Makuta Narpati', 'Jl. Manyar Kertoarjo No.7, Surabaya', 'M', '1961-09-22 00:00:00', 'Kediri', '0850533071', 0, 'SHS', 1, 1, 2, 344, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(67, 'Limar Hardiansyah', 'Jl. Mastrip No.8, Jember', 'M', '1989-09-07 00:00:00', 'Kota Administrasi Jakarta Pusat', '0887334781', 0, 'SHS', 3, 4, 7, 786, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(68, 'Jati Wahyuni', 'Jl. Manyar Kertoarjo No.7, Surabaya', 'M', '1974-10-12 00:00:00', 'Cirebon', '0847560580', 0, 'SHS', 1, 1, 2, 979, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(69, 'Vanesa Permadi', 'Jl. Rogojampi No.9, Banyuwangi', 'F', '2006-06-21 00:00:00', 'Metro', '0885818495', 0, 'COL', 7, 8, 17, 231, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(70, 'Indra Maryati', 'Jl. Raya Darmo No.56, Surabaya', 'M', '1970-04-13 00:00:00', 'Bima', '0856290718', 0, 'SHS', 1, 1, 2, 891, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(71, 'Jayeng Pradipta', 'Jl. Kalikepiting No.111, Surabaya', 'M', '1963-01-20 00:00:00', 'Bogor', '0811643397', 0, 'SHS', 1, 2, 3, 874, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(72, 'Hairyanto Hartati', 'Jl. Mastrip No.8, Jember', 'M', '1961-03-27 00:00:00', 'Parepare', '0866130765', 0, 'SHS', 3, 4, 7, 339, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(73, 'Aurora Hidayanto', 'Jl. Letjen S. Parman No.5, Kediri', 'F', '1984-06-20 00:00:00', 'Kotamobagu', '0866180167', 0, 'SHS', 4, 5, 10, 931, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(74, 'Irnanto Prabowo', 'Jl. Soekarno Hatta No.12, Malang', 'M', '1973-10-13 00:00:00', 'Tual', '0854721025', 0, 'SHS', 2, 3, 6, 536, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(75, 'Pia Setiawan', 'Jl. Cakranegara No.15, Mataram', 'F', '1974-10-24 00:00:00', 'Surabaya', '0873016969', 0, 'COL', 5, 6, 11, 963, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(76, 'Talia Jailani', 'Jl. Dhoho No.17, Kediri', 'F', '1961-11-20 00:00:00', 'Langsa', '0806877418', 0, 'SHS', 4, 5, 9, 602, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(77, 'Radit Natsir', 'Jl. Letjen Sutoyo No.11, Banyuwangi', 'M', '1987-04-27 00:00:00', 'Blitar', '0854679036', 0, 'COL', 7, 8, 17, 893, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(78, 'Zamira Haryanti', 'Jl. Soekarno Hatta No.12, Malang', 'F', '1980-04-20 00:00:00', 'Prabumulih', '0881454294', 0, 'SHS', 2, 3, 5, 108, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(79, 'Jagapati Winarno', 'Jl. Letjen S. Parman No.5, Kediri', 'M', '1994-04-09 00:00:00', 'Magelang', '0886005530', 0, 'SHS', 4, 5, 9, 646, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(80, 'Ciaobella Waskita', 'Jl. Letjen S. Parman No.5, Kediri', 'F', '2000-08-10 00:00:00', 'Bekasi', '0865288896', 0, 'SHS', 4, 5, 10, 669, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(81, 'Nardi Mandasari', 'Jl. Kalimantan No.22, Jember', 'M', '1993-11-28 00:00:00', 'Banda Aceh', '0899979331', 0, 'SHS', 3, 4, 7, 978, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(82, 'Bakiman Kuswoyo', 'Jl. Raya Darmo No.56, Surabaya', 'M', '1990-11-01 00:00:00', 'Bengkulu', '0859699754', 0, 'SHS', 1, 2, 4, 180, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(83, 'Tiara Susanti', 'Jl. Tlogomas No.98, Malang', 'F', '1965-04-13 00:00:00', 'Tanjungpinang', '0888990542', 0, 'SHS', 2, 3, 6, 552, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(84, 'Zulfa Sitompul', 'Jl. Soekarno Hatta No.12, Malang', 'F', '1999-09-04 00:00:00', 'Kota Administrasi Jakarta Selatan', '0862649829', 0, 'SHS', 2, 3, 6, 463, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(85, 'Violet Riyanti', 'Jl. Letjen S. Parman No.5, Kediri', 'F', '1989-12-01 00:00:00', 'Tanjungbalai', '0858351311', 0, 'SHS', 4, 5, 9, 369, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(86, 'Alika Tampubolon', 'Jl. Dhoho No.17, Kediri', 'F', '1975-09-22 00:00:00', 'Palopo', '0832404893', 0, 'SHS', 4, 5, 10, 227, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(87, 'Karimah Rahmawati', 'Jl. Manyar Kertoarjo No.7, Surabaya', 'F', '1963-03-26 00:00:00', 'Medan', '0810882554', 0, 'SHS', 1, 1, 1, 846, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(88, 'Dimas Manullang', 'Jl. Kalikepiting No.111, Surabaya', 'M', '2003-04-16 00:00:00', 'Serang', '0827453163', 0, 'SHS', 1, 2, 4, 861, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(89, 'Candra Thamrin', 'Jl. Kalikepiting No.111, Surabaya', 'M', '1988-04-03 00:00:00', 'Lhokseumawe', '0872363668', 0, 'SHS', 1, 1, 1, 575, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(90, 'Mustofa Maheswara', 'Jl. Hang Lekir No.55, Batam', 'M', '1968-05-23 00:00:00', 'Padangpanjang', '0837760302', 0, 'COL', 6, 7, 15, 941, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(91, 'Balangga Nurdiyanti', 'Jl. Nagoya No.3, Batam', 'M', '1976-01-29 00:00:00', 'Payakumbuh', '0824136368', 0, 'COL', 6, 7, 14, 385, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(92, 'Mila Kurniawan', 'Jl. Mastrip No.8, Jember', 'F', '1979-03-02 00:00:00', 'Ambon', '0886529555', 0, 'SHS', 3, 4, 7, 230, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(93, 'Jamal Waskita', 'Jl. Raya Darmo No.56, Surabaya', 'M', '1982-10-22 00:00:00', 'Kota Administrasi Jakarta Selatan', '0858051612', 0, 'SHS', 1, 1, 2, 653, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(94, 'Novi Prasasta', 'Jl. Raya Darmo No.56, Surabaya', 'F', '1977-12-06 00:00:00', 'Subulussalam', '0834898896', 0, 'SHS', 1, 1, 2, 399, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(95, 'Ganda Wibowo', 'Jl. Dhoho No.17, Kediri', 'M', '2006-02-27 00:00:00', 'Payakumbuh', '0842208748', 0, 'SHS', 4, 5, 9, 901, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(96, 'Cahyono Maryadi', 'Jl. Engku Putri No.2, Batam', 'M', '1987-09-25 00:00:00', 'Sorong', '0846494046', 0, 'COL', 6, 7, 14, 802, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(97, 'Waluyo Purwanti', 'Jl. Udayana No.6, Mataram', 'M', '1962-08-18 00:00:00', 'Meulaboh', '0822625039', 0, 'COL', 5, 6, 13, 881, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(98, 'Wani Situmorang', 'Jl. Dhoho No.17, Kediri', 'F', '1986-09-25 00:00:00', 'Lubuklinggau', '0854431605', 0, 'SHS', 4, 5, 10, 784, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(99, 'Hari Wastuti', 'Jl. Ijen Boulevard No.45, Malang', 'M', '1987-09-20 00:00:00', 'Tidore Kepulauan', '0860114931', 0, 'SHS', 2, 3, 5, 440, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10'),
(100, 'Calista Melani', 'Jl. Dhoho No.17, Kediri', 'F', '1971-08-19 00:00:00', 'Payakumbuh', '0899016704', 0, 'SHS', 4, 5, 9, 483, 'Admin', '2024-11-20 07:11:10', 'Admin', '2024-11-20 07:11:10');

-- --------------------------------------------------------

--
-- Table structure for table `memberinstitutionhist`
--

CREATE TABLE `memberinstitutionhist` (
  `id` bigint(20) NOT NULL,
  `member_id` bigint(20) NOT NULL,
  `institution_id` bigint(20) NOT NULL,
  `faculty_id` bigint(20) DEFAULT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `membermarriage`
--

CREATE TABLE `membermarriage` (
  `id` bigint(20) NOT NULL,
  `member_id_husband` bigint(20) NOT NULL,
  `member_id_wife` bigint(20) NOT NULL,
  `married_date` datetime DEFAULT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_07_11_063249_add_role_as_users_table', 1),
(6, '2024_07_11_073046_create_report_table', 1),
(7, '2024_11_12_093707_discipleship_target', 2);

-- --------------------------------------------------------

--
-- Table structure for table `outbox`
--

CREATE TABLE `outbox` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `destination` varchar(200) NOT NULL,
  `title` varchar(100) NOT NULL,
  `message` varchar(500) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `usr_crt` varchar(50) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(50) NOT NULL,
  `dtm_upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`email`, `token`, `created_at`) VALUES
('admin@gmail.com', '$2y$10$mG57x/uY1YyR78eoRGlXveuPmHW4L2zFAkIu2amMmoHHmleDAlqZS', '2024-09-17 00:17:55');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` mediumtext NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `meta_title` varchar(255) NOT NULL,
  `meta_description` text NOT NULL,
  `meta_keyword` text NOT NULL,
  `navbar_status` tinyint(4) NOT NULL DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` bigint(20) NOT NULL,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `member_id` bigint(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `password_web` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL,
  `accept_term` tinyint(4) NOT NULL DEFAULT 1,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userdevice`
--

CREATE TABLE `userdevice` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `device_id` varchar(200) NOT NULL,
  `is_logged_in` int(11) NOT NULL,
  `is_stay_logged_in` int(11) NOT NULL,
  `last_login_dt` datetime NOT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userrole`
--

CREATE TABLE `userrole` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL,
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role_as` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role_as`) VALUES
(1, 'Admin', 'admin@gmail.com', NULL, '$2y$10$ApZfKce5u9NGWydNhuvHkuuFt.ibsNv8vTY4c4HSTbSELC0jx.wrW', 'BtgFF78iZNAEjy4wbkmEbXLncmiSBaHfaluKXSY9UGxqtT6Gvn8OE2caogy3', '2024-07-15 23:15:48', '2024-07-15 23:15:48', 1),
(2, 'Peter', 'peter@gmail.com', NULL, '$2y$10$j2Y4MkJ0bjxkI66Rz0f1lOO/w7XeERCcixrYA0A4U8WAZzgd7cHC6', NULL, '2024-07-17 02:07:44', '2024-07-17 02:08:32', 0),
(3, 'Peter Sanjaya', 'c14210117@john.petra.ac.id', NULL, '$2y$10$e22jSp5bWoMFQVtFmBpoIOgouN632svBWljkGUXXhF2bHnv6x9qQi', 'DXk9tqaBjRdRCbqT6lAjq3jXa98SaNNQVaTsCpcKD69v2HXYqSwkIMVRtO5i', '2024-09-01 19:30:06', '2024-09-17 00:19:43', 0);

-- --------------------------------------------------------

--
-- Table structure for table `version`
--

CREATE TABLE `version` (
  `id` bigint(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `version_no` varchar(20) NOT NULL,
  `usr_crt` varchar(100) NOT NULL,
  `dtm_crt` datetime NOT NULL DEFAULT current_timestamp(),
  `usr_upd` varchar(100) NOT NULL,
  `dtm_upd` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `credential`
--
ALTER TABLE `credential`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discipleship_target`
--
ALTER TABLE `discipleship_target`
  ADD PRIMARY KEY (`id`),
  ADD KEY `city_id` (`city_id`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`id`),
  ADD KEY `institution_id` (`institution_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `institution`
--
ALTER TABLE `institution`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ktb`
--
ALTER TABLE `ktb`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ktbhistory`
--
ALTER TABLE `ktbhistory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ktb_id` (`ktb_id`),
  ADD KEY `material_id` (`material_id`);

--
-- Indexes for table `ktbhistorymember`
--
ALTER TABLE `ktbhistorymember`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ktb_history_id` (`ktb_history_id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `ktbmember`
--
ALTER TABLE `ktbmember`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ktb_id` (`ktb_id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `old_ktb_id` (`old_ktb_id`);

--
-- Indexes for table `logapi`
--
ALTER TABLE `logapi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`),
  ADD KEY `institution_id` (`institution_id`),
  ADD KEY `faculty_id` (`faculty_id`),
  ADD KEY `member_ibfk_3_idx` (`city_id`);

--
-- Indexes for table `memberinstitutionhist`
--
ALTER TABLE `memberinstitutionhist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `institution_id` (`institution_id`),
  ADD KEY `faculty_id` (`faculty_id`);

--
-- Indexes for table `membermarriage`
--
ALTER TABLE `membermarriage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id_husband` (`member_id_husband`),
  ADD KEY `member_id_wife` (`member_id_wife`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `outbox`
--
ALTER TABLE `outbox`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `userdevice`
--
ALTER TABLE `userdevice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `userrole`
--
ALTER TABLE `userrole`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `version`
--
ALTER TABLE `version`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3068;

--
-- AUTO_INCREMENT for table `credential`
--
ALTER TABLE `credential`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `discipleship_target`
--
ALTER TABLE `discipleship_target`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `institution`
--
ALTER TABLE `institution`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `ktb`
--
ALTER TABLE `ktb`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `ktbhistory`
--
ALTER TABLE `ktbhistory`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- AUTO_INCREMENT for table `ktbhistorymember`
--
ALTER TABLE `ktbhistorymember`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `ktbmember`
--
ALTER TABLE `ktbmember`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `logapi`
--
ALTER TABLE `logapi`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43757;

--
-- AUTO_INCREMENT for table `material`
--
ALTER TABLE `material`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `memberinstitutionhist`
--
ALTER TABLE `memberinstitutionhist`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `outbox`
--
ALTER TABLE `outbox`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `userdevice`
--
ALTER TABLE `userdevice`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `userrole`
--
ALTER TABLE `userrole`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `version`
--
ALTER TABLE `version`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `faculty`
--
ALTER TABLE `faculty`
  ADD CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`institution_id`) REFERENCES `institution` (`id`);

--
-- Constraints for table `ktbhistory`
--
ALTER TABLE `ktbhistory`
  ADD CONSTRAINT `ktbhistory_ibfk_1` FOREIGN KEY (`ktb_id`) REFERENCES `ktb` (`id`),
  ADD CONSTRAINT `ktbhistory_ibfk_3` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`);

--
-- Constraints for table `ktbhistorymember`
--
ALTER TABLE `ktbhistorymember`
  ADD CONSTRAINT `ktbhistorymember_ibfk_1` FOREIGN KEY (`ktb_history_id`) REFERENCES `ktbhistory` (`id`),
  ADD CONSTRAINT `ktbhistorymember_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`);

--
-- Constraints for table `ktbmember`
--
ALTER TABLE `ktbmember`
  ADD CONSTRAINT `ktbmember_ibfk_1` FOREIGN KEY (`ktb_id`) REFERENCES `ktb` (`id`),
  ADD CONSTRAINT `ktbmember_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  ADD CONSTRAINT `ktbmember_ibfk_3` FOREIGN KEY (`old_ktb_id`) REFERENCES `ktb` (`id`);

--
-- Constraints for table `member`
--
ALTER TABLE `member`
  ADD CONSTRAINT `member_ibfk_1` FOREIGN KEY (`institution_id`) REFERENCES `institution` (`id`),
  ADD CONSTRAINT `member_ibfk_2` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`),
  ADD CONSTRAINT `member_ibfk_3` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`);

--
-- Constraints for table `memberinstitutionhist`
--
ALTER TABLE `memberinstitutionhist`
  ADD CONSTRAINT `memberinstitutionhist_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  ADD CONSTRAINT `memberinstitutionhist_ibfk_2` FOREIGN KEY (`institution_id`) REFERENCES `institution` (`id`),
  ADD CONSTRAINT `memberinstitutionhist_ibfk_3` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`);

--
-- Constraints for table `membermarriage`
--
ALTER TABLE `membermarriage`
  ADD CONSTRAINT `membermarriage_ibfk_1` FOREIGN KEY (`member_id_husband`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `membermarriage_ibfk_2` FOREIGN KEY (`member_id_wife`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `outbox`
--
ALTER TABLE `outbox`
  ADD CONSTRAINT `outbox_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`);

--
-- Constraints for table `userdevice`
--
ALTER TABLE `userdevice`
  ADD CONSTRAINT `userdevice_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `userrole`
--
ALTER TABLE `userrole`
  ADD CONSTRAINT `userrole_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `userrole_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
