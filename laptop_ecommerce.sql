-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 08, 2025 lúc 05:58 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `laptop_ecommerce`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `created_at`) VALUES
(1, 'Laptop AI', 'laptop-ai', NULL, '2025-11-30 06:06:48'),
(2, 'Laptop Gaming', 'laptop-gaming', NULL, '2025-11-30 06:06:48'),
(3, 'Laptop Sinh Viên', 'laptop-sinh-vien', NULL, '2025-11-30 06:06:48'),
(4, 'Laptop Văn Phòng', 'laptop-van-phong', NULL, '2025-11-30 06:06:48'),
(5, 'Laptop Nhập Khẩu', 'laptop-nhap-khau', NULL, '2025-11-30 06:06:48');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `total_money` decimal(10,2) NOT NULL,
  `status` enum('pending','processing','shipping','delivered','cancelled') DEFAULT 'pending',
  `note` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `full_name`, `phone_number`, `address`, `total_money`, `status`, `note`, `created_at`) VALUES
(1, 1, 'Nguyễn Văn A', '0909123456', '123 Đường ABC, Đà Nẵng', 53000000.00, 'cancelled', 'Giao giờ hành chính', '2025-11-24 07:08:51'),
(2, 1, 'Bao Truong', '0819033106', '99 Nguyễn chí thanh - ', 15111600.00, 'processing', '', '2025-12-07 16:57:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, 2, 2, 26500000.00),
(2, 2, 14, 1, 15111600.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `brand` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` longtext DEFAULT NULL,
  `specs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`specs`)),
  `stock_quantity` int(11) DEFAULT 0,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `category_id` int(11) DEFAULT NULL,
  `old_price` decimal(10,2) DEFAULT NULL,
  `discount_percentage` int(11) DEFAULT 0,
  `badge` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `slug`, `brand`, `price`, `description`, `specs`, `stock_quantity`, `thumbnail_url`, `created_at`, `category_id`, `old_price`, `discount_percentage`, `badge`) VALUES
(2, 'MacBook Air M2 Midnight', 'macbook-air-m2-midnight-1764777986218', 'Apple', 19900000.00, '<p>Laptop siêu mỏng nhẹ...</p>', '{\"cpu\":\"Apple M2 8-core\",\"ram\":\"8GB Unified\",\"vga\":\"\",\"ssd\":\"\",\"screen\":\"13.6 inch Liquid Retina\"}', 8, 'https://example.com/macbook.jpg', '2025-11-19 07:50:02', 4, 19900000.00, 0, 1),
(5, 'Acer Nitro 5 Tiger AN515-58-52SP', 'acer-nitro-5-tiger-an515-58-52sp-1764857064144', 'Acer', 22990800.00, '<p>Chiến thần Laptop Gaming quốc dân, tản nhiệt cực mát, hiệu năng mạnh mẽ với RTX 3050.</p>', '{\"cpu\":\"Intel Core i5-12500H\",\"ram\":\"8GB DDR4 3200MHz\",\"vga\":\"NVIDIA GeForce RTX 3050 4GB\",\"ssd\":\"512GB NVMe\",\"screen\":\"15.6 inch FHD 144Hz IPS\"}', 3, 'http://localhost:5000/uploads/image-1764776435332-256533232.jpg', '2025-11-30 06:31:48', 2, 24990000.00, 8, 1),
(6, 'Asus ROG Strix G16 G614JU-N3135W', 'asus-rog-strix-g16-g614ju-n3135w-1764777169976', 'Asus', 39120900.00, '<p>Thiết kế đậm chất game thủ, màn hình chuẩn ROG Nebula Display tuyệt đẹp.</p>', '{\"cpu\":\"Intel Core i7-13650HX\",\"ram\":\"16GB DDR5 4800MHz\",\"vga\":\"NVIDIA GeForce RTX 4050 6GB\",\"ssd\":\"512GB NVMe Gen4\",\"screen\":\"16 inch FHD+ 165Hz\"}', 20, 'http://localhost:5000/uploads/image-1764777168628-686288381.jpg', '2025-11-30 06:31:48', 2, 42990000.00, 9, 1),
(7, 'MSI Katana 15 B13VFK-676VN', 'msi-katana-15-b13vfk-676vn-1764777184832', 'MSI', 30020900.00, '<p>Sức mạnh từ thanh kiếm Katana, trang bị RTX 4060 cân mọi game AAA.</p>', '{\"cpu\":\"Intel Core i7-13620H\",\"ram\":\"16GB DDR5\",\"vga\":\"NVIDIA GeForce RTX 4060 8GB\",\"ssd\":\"1TB NVMe\",\"screen\":\"15.6 inch FHD 144Hz\"}', 15, 'https://product.hstatic.net/200000722513/product/laptop_msi_gaming_katana_15_b13vfk_676vn_e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8_medium.png', '2025-11-30 06:31:48', 2, 32990000.00, 9, 1),
(8, 'MacBook Air M2 13.6 inch 2022', 'macbook-air-m2-midnight', 'Apple', 26490000.00, '<p>Thiết kế siêu mỏng nhẹ, chip M2 mạnh mẽ, thời lượng pin lên đến 18 tiếng.</p>', '{\"cpu\": \"Apple M2 8-core\", \"ram\": \"8GB Unified\", \"ssd\": \"256GB SSD\", \"vga\": \"Apple 8-core GPU\", \"screen\": \"13.6 inch Liquid Retina\"}', 100, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_air_m2_1.jpg', '2025-11-30 06:31:48', 4, 28990000.00, 8, 1),
(9, 'LG Gram 2023 14Z90R-G.AH75A5', 'lg-gram-2023-14z90r', 'LG', 32990000.00, '<p>Laptop 14 inch nhẹ nhất thế giới, độ bền chuẩn quân đội, màn hình chuẩn màu đồ họa.</p>', '{\"cpu\": \"Intel Core i7-1360P\", \"ram\": \"16GB LPDDR5\", \"ssd\": \"512GB NVMe\", \"vga\": \"Intel Iris Xe Graphics\", \"screen\": \"14 inch WUXGA IPS 99% DCI-P3\"}', 10, 'https://product.hstatic.net/200000722513/product/lg_gram_2023_14z90r_1_8b3b6b6b6b6b6b6b6b6b6b6b6b6b6b6b_medium.png', '2025-11-30 06:31:48', 4, 38990000.00, 15, 0),
(10, 'Dell XPS 13 Plus 9320', 'dell-xps-13-plus-9320', 'Dell', 45990000.00, '<p>Tuyệt tác công nghệ với thanh touch bar ẩn và thiết kế tương lai.</p>', '{\"cpu\": \"Intel Core i7-1260P\", \"ram\": \"16GB LPDDR5\", \"ssd\": \"512GB NVMe\", \"vga\": \"Intel Iris Xe Graphics\", \"screen\": \"13.4 inch 3.5K OLED Touch\"}', 5, 'https://hanoicomputercdn.com/media/product/67448_laptop_dell_xps_13_plus_9320_71013325_1.jpg', '2025-11-30 06:31:48', 4, 49990000.00, 8, 1),
(11, 'MSI Prestige 16 AI Studio B1VFG', 'msi-prestige-16-ai-studio', 'MSI', 54990000.00, '<p>Laptop AI đầu tiên trang bị chip Core Ultra, hỗ trợ NPU xử lý tác vụ AI chuyên sâu.</p>', '{\"cpu\": \"Intel Core Ultra 7 155H\", \"ram\": \"32GB LPDDR5x\", \"ssd\": \"1TB NVMe Gen4\", \"vga\": \"NVIDIA GeForce RTX 4060 8GB\", \"screen\": \"16 inch QHD+ IPS 240Hz\"}', 8, 'https://product.hstatic.net/200000722513/product/msi_prestige_16_ai_studio_1_8b3b6b6b6b6b6b6b6b6b6b6b6b6b6b6b_medium.png', '2025-11-30 06:31:48', 1, 59990000.00, 8, 1),
(12, 'ASUS Zenbook 14 OLED UX3405MA', 'asus-zenbook-14-oled-ai', 'Asus', 28990000.00, '<p>Mỏng nhẹ, màn hình OLED rực rỡ, tích hợp AI Boost tăng tốc độ làm việc.</p>', '{\"cpu\": \"Intel Core Ultra 5 125H\", \"ram\": \"16GB LPDDR5x\", \"ssd\": \"512GB NVMe\", \"vga\": \"Intel Arc Graphics\", \"screen\": \"14 inch 3K OLED 120Hz\"}', 25, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/s/asus_zenbook_14_oled_ux3405ma_1.jpg', '2025-11-30 06:31:48', 1, 31990000.00, 9, 1),
(13, 'Lenovo IdeaPad Slim 3 15IAH8', 'lenovo-ideapad-slim-3', 'Lenovo', 12490000.00, '<p>Lựa chọn kinh tế cho sinh viên, hiệu năng ổn định cho Office và Web.</p>', '{\"cpu\": \"Intel Core i5-12450H\", \"ram\": \"16GB LPDDR5\", \"ssd\": \"512GB NVMe\", \"vga\": \"Intel UHD Graphics\", \"screen\": \"15.6 inch FHD IPS\"}', 50, 'https://product.hstatic.net/200000722513/product/lenovo_ideapad_slim_3_15iah8_1_8b3b6b6b6b6b6b6b6b6b6b6b6b6b6b6b_medium.png', '2025-11-30 06:31:48', 3, 14990000.00, 16, 0),
(14, 'Acer Aspire 7 Gaming A715-76G-5132', 'acer-aspire-7-gaming', 'Acer', 15111600.00, '<h2 style=\"line-height: 1.38; margin-top: 12pt; margin-bottom: 12pt;\"><strong><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">Đánh Giá </span></strong><a style=\"text-decoration: none;\" href=\"https://www.tncstore.vn/laptop-hp-omnibook-x-flip-14-fm0088tu-bz7q2pa.html\" target=\"_blank\"><strong><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #ff9900; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">Laptop HP OmniBook X Flip 14-fm0088TU</span></strong></a></h2>\n<p style=\"line-height: 1.38; margin-top: 12pt; margin-bottom: 12pt;\"><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">Trong thế giới </span><a style=\"text-decoration: none;\" href=\"https://www.tncstore.vn/lap-top.html\" target=\"_blank\"><strong><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #ff9900; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">Laptop - Máy tính xách tay hiện đại</span></strong></a><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">, người dùng không chỉ cần một thiết bị mạnh mẽ mà còn mong muốn sự linh hoạt và tinh tế trong thiết kế. Laptop HP OmniBook X Flip 14-fm0088TU (BZ7Q2PA) chính là lựa chọn hoàn hảo đáp ứng cả hai yếu tố này. Sở hữu cấu hình mới với chip Intel Core Ultra 5-226V, màn hình cảm ứng 2K xoay gập 360 độ, đi kèm bút cảm ứng tiện lợi, đây là mẫu laptop lý tưởng cho người dùng sáng tạo, học tập và làm việc chuyên nghiệp.</span></p>\n<p style=\"line-height: 1.38; margin-top: 12pt; margin-bottom: 12pt;\"><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\"><iframe style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"//www.youtube.com/embed/bcMDIeQAwZ8\" width=\"700\" height=\"350\"></iframe></span></p>\n<h3 style=\"line-height: 1.38; margin-top: 14pt; margin-bottom: 4pt;\"><strong><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">Thiết Kế Laptop HP OmniBook X Flip 14 Sang Trọng, Linh Hoạt Cho Mọi Tình Huống</span></strong></h3>\n<p style=\"line-height: 1.38; margin-top: 12pt; margin-bottom: 12pt;\"><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">Laptop HP dòng OmniBook X Flip mang phong cách hiện đại, mỏng nhẹ và tinh tế với màu xanh nổi bật. Thiết kế bản lề 360 độ cho phép máy dễ dàng chuyển đổi giữa các chế độ: laptop, máy tính bảng, hoặc dựng lều để thuyết trình, xem phim. Trọng lượng nhẹ giúp người dùng mang theo dễ dàng trong mọi chuyến đi, phục vụ tốt cho công việc di động và học tập.</span></p>\n<p style=\"line-height: 1.38; margin-top: 12pt; margin-bottom: 12pt;\"><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\"><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"/media/product/250-13244-laptop-hp-omnibook-x-flip-14-fm0088tu-bz7q2pa--5-.png\" alt=\"\" width=\"500\"></span></p>\n<h3 style=\"line-height: 1.38; margin-top: 14pt; margin-bottom: 4pt;\"><strong><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">Hiệu Năng Ổn Định Với Intel Core Ultra 5</span></strong></h3>\n<p style=\"line-height: 1.38; margin-top: 12pt; margin-bottom: 12pt;\"><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">Trang bị vi xử lý Intel Core Ultra 5-226V thế hệ mới, kết hợp GPU tích hợp mạnh mẽ, OmniBook X Flip đảm bảo khả năng xử lý đa nhiệm nhanh chóng và tiết kiệm năng lượng tối ưu. RAM 16GB và ổ cứng SSD 512GB giúp hệ thống vận hành mượt mà, mở ứng dụng tức thì và lưu trữ dữ liệu thoải mái.</span></p>\n<p style=\"line-height: 1.38; margin-top: 12pt; margin-bottom: 12pt;\"><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\"><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"/media/product/250-13244-laptop-hp-omnibook-x-flip-14-fm0088tu-bz7q2pa--3-.png\" alt=\"\" width=\"500\"></span></p>\n<p style=\"line-height: 1.38; margin-top: 12pt; margin-bottom: 12pt;\"><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">Dù không phải là </span><a style=\"text-decoration: none;\" href=\"https://www.tncstore.vn/gaming-laptop.html\" target=\"_blank\"><strong><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #ff9900; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">Laptop Gaming</span></strong></a><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">, nhưng máy vẫn có thể đáp ứng tốt các tác vụ đồ họa cơ bản, chỉnh sửa ảnh, video nhẹ, hoặc chơi các tựa game eSports phổ thông nhờ sức mạnh từ dòng chip Intel Ultra mới.</span></p>\n<h3 style=\"line-height: 1.38; margin-top: 14pt; margin-bottom: 4pt;\"><strong><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">Màn Hình 2K Cảm Ứng – Trải Nghiệm Hình Ảnh Sống Động</span></strong></h3>\n<p style=\"line-height: 1.38; margin-top: 12pt; margin-bottom: 12pt;\"><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">Điểm nổi bật của sản phẩm chính là màn hình 14 inch độ phân giải 2K, mang lại hình ảnh sắc nét, chi tiết và màu sắc trung thực. Tính năng cảm ứng đa điểm giúp người dùng thao tác trực quan, nhanh chóng, đặc biệt khi kết hợp cùng bút cảm ứng đi kèm – công cụ hữu ích cho designer, sinh viên thiết kế, hoặc người làm sáng tạo nội dung.</span></p>\n<p style=\"line-height: 1.38; margin-top: 12pt; margin-bottom: 12pt;\"><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\"><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"/media/product/250-13244-laptop-hp-omnibook-x-flip-14-fm0088tu-bz7q2pa--1-.png\" alt=\"\" width=\"500\"></span></p>\n<h3 style=\"line-height: 1.38; margin-top: 14pt; margin-bottom: 4pt;\"><strong><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">Tính Năng Tiện Ích – Tối Ưu Trải Nghiệm Người Dùng</span></strong></h3>\n<p style=\"line-height: 1.38; margin-top: 12pt; margin-bottom: 12pt;\"><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">HP trang bị cho OmniBook X Flip hệ thống bàn phím êm, hành trình phím hợp lý cùng touchpad lớn, hỗ trợ thao tác nhanh chóng. Kết nối đa dạng gồm USB-C, HDMI, jack âm thanh, và Wi-Fi 6E đảm bảo hiệu suất kết nối ổn định trong mọi hoàn cảnh. Ngoài ra, máy chạy sẵn Windows 11 bản quyền, tối ưu giao diện và bảo mật cho người dùng hiện đại.</span></p>\n<p style=\"line-height: 1.38; margin-top: 12pt; margin-bottom: 12pt;\"><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\"><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"/media/product/250-13244-laptop-hp-omnibook-x-flip-14-fm0088tu-bz7q2pa--4-.png\" alt=\"\" width=\"500\"></span></p>\n<h2 style=\"line-height: 1.38; margin-top: 14pt; margin-bottom: 6pt;\"><strong><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">Kết Luận</span></strong></h2>\n<p style=\"line-height: 1.38; margin-top: 12pt; margin-bottom: 12pt;\"><a style=\"text-decoration: none;\" href=\"https://www.tncstore.vn/laptop-hp.html\" target=\"_blank\"><strong><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #ff9900; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">Laptop HP</span></strong></a><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\"> OmniBook X Flip 14-fm0088TU là lựa chọn lý tưởng cho người dùng cần một Laptop - Máy tính xách tay gọn nhẹ, linh hoạt, hiệu năng ổn định và khả năng sáng tạo đa dạng. Để sở hữu chiếc Laptop HP chính hãng cùng nhiều ưu đãi hấp dẫn, hãy đến </span><a style=\"text-decoration: none;\" href=\"https://www.tncstore.vn/\" target=\"_blank\"><strong><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #ff9900; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">TNC Store</span></strong></a><span style=\"font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\"> – nơi cung cấp đa dạng dòng Laptop - Máy tính xách tay chất lượng, bảo hành uy tín và dịch vụ chăm sóc khách hàng hàng đầu.</span></p>\n<div id=\"mttContainer\" class=\"bootstrapiso notranslate\" style=\"transform: translate(172px, 334px);\" title=\"\" data-original-title=\"\">&nbsp;</div>\n                          </div>', '{\"cpu\":\"Intel Core i5-12450H\",\"ram\":\"8GB DDR4\",\"vga\":\"NVIDIA GeForce GTX 1650 4GB\",\"ssd\":\"512GB NVMe\",\"screen\":\"15.6 inch FHD IPS 144Hz\"}', 29, 'http://localhost:5000/uploads/image-1765038118411-437199843.jpg', '2025-11-30 06:31:48', 3, 17990000.00, 16, 0),
(15, 'ThinkPad X1 Carbon Gen 10 (Nhập Mỹ)', 'thinkpad-x1-carbon-gen-10-us', 'Lenovo', 31500000.00, '<p>Hàng nhập khẩu Like New 99%, bàn phím gõ sướng nhất thế giới, siêu bền.</p>', '{\"cpu\": \"Intel Core i7-1260P\", \"ram\": \"16GB LPDDR5\", \"ssd\": \"512GB NVMe\", \"vga\": \"Intel Iris Xe\", \"screen\": \"14 inch WUXGA IPS Low Power\"}', 5, 'https://product.hstatic.net/200000722513/product/thinkpad_x1_carbon_gen_10_1_8b3b6b6b6b6b6b6b6b6b6b6b6b6b6b6b_medium.png', '2025-11-30 06:31:48', 5, 35000000.00, 10, 0),
(16, 'Dell Precision 5560 Mobile Workstation', 'dell-precision-5560-workstation', 'Dell', 28900000.00, '<p>Máy trạm di động mỏng nhẹ, chuyên render đồ họa nặng, hàng nhập khẩu nguyên bản.</p>', '{\"cpu\": \"Intel Core i7-11800H\", \"ram\": \"32GB DDR4\", \"ssd\": \"512GB NVMe\", \"vga\": \"NVIDIA RTX A2000 4GB\", \"screen\": \"15.6 inch FHD+ IGZO\"}', 3, 'https://product.hstatic.net/200000722513/product/dell_precision_5560_1_8b3b6b6b6b6b6b6b6b6b6b6b6b6b6b6b_medium.png', '2025-11-30 06:31:48', 5, 32000000.00, 9, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `display_order`, `created_at`) VALUES
(11, 14, 'http://localhost:5000/uploads/image-1765038136736-409003092.jpg', 0, '2025-12-06 16:22:20'),
(12, 14, 'http://localhost:5000/uploads/image-1765038136736-409003092.jpg', 2, '2025-12-06 17:39:35'),
(13, 14, 'http://localhost:5000/uploads/image-1763974645209-37304282.jpg', 3, '2025-12-06 17:39:35'),
(14, 14, 'http://localhost:5000/uploads/image-1765038136736-409003092.jpg', 1, '2025-12-06 17:39:35');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `rating` tinyint(4) NOT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `product_id`, `rating`, `comment`, `created_at`) VALUES
(1, 1, 2, 5, 'Máy đẹp, chạy rất mượt, giao hàng nhanh!', '2025-11-24 07:21:57');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `role` enum('customer','staff','admin') NOT NULL DEFAULT 'customer',
  `is_verified` tinyint(1) DEFAULT 0,
  `auth_provider` enum('local','google','facebook') DEFAULT 'local',
  `provider_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_locked` tinyint(1) DEFAULT 0,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `email`, `password_hash`, `full_name`, `phone_number`, `address`, `avatar_url`, `role`, `is_verified`, `auth_provider`, `provider_id`, `created_at`, `updated_at`, `is_locked`, `is_deleted`) VALUES
(1, 'truykichpro1995@gmail.com', '$2b$10$ImBF5fvu.xmFggu8M3r5j.88SXl1lqi6.c5Tlfcy2ICcddaK6eSjC', 'Bao Truong', NULL, NULL, NULL, 'admin', 1, 'local', NULL, '2025-11-17 16:51:07', '2025-12-04 15:59:45', 0, 0),
(2, 'admin@gmail.com', '$2b$10$2Ka6/uNMUKwFPnQRnrJq/.Hc0zedAMI62dysgaX3yjt07nb.fth.y', 'Võ Văn Khánh', NULL, NULL, NULL, 'admin', 1, 'local', NULL, '2025-12-04 15:52:08', '2025-12-06 13:24:47', 0, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `verification_codes`
--

CREATE TABLE `verification_codes` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `code` varchar(6) NOT NULL,
  `type` enum('register','reset_password') NOT NULL DEFAULT 'register',
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `verification_codes`
--

INSERT INTO `verification_codes` (`id`, `email`, `code`, `type`, `expires_at`, `created_at`) VALUES
(2, 'vvankhanh022@gmail.com', '437137', 'register', '2025-11-17 13:12:27', '2025-11-17 13:07:27'),
(3, 'thonghk.24ite@vku.udn.vn', '167690', 'register', '2025-11-17 13:14:44', '2025-11-17 13:09:44');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `verification_codes`
--
ALTER TABLE `verification_codes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `verification_codes`
--
ALTER TABLE `verification_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
