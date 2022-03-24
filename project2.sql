-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2021 at 10:51 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project2`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `brand_id` int(11) NOT NULL,
  `brand_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`brand_id`, `brand_name`) VALUES
(1, 'Apple'),
(2, 'SamSung'),
(3, 'Vsmart'),
(4, 'Xiaomi'),
(5, 'Nokia '),
(6, 'Huawei');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(2, 'Tablet'),
(3, 'Watch'),
(6, 'Phone'),
(15, 'accessories');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `customer_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `customer_lastname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `customer_firstname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `customer_phone` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `customer_mail` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `customer_street` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `customer_city` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `customer_state` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `customer_name`, `customer_lastname`, `customer_firstname`, `customer_phone`, `customer_mail`, `customer_street`, `customer_city`, `customer_state`) VALUES
(1, 'Trang', 'Le', 'Thi Trang', '0329880288', 'letrangthi@gmail.com', '5/123 Ly Thuong Kiet', 'Ho Chi Minh', 'Sai Gon'),
(2, 'Tong', 'Tran', 'Nhan Tong', '0986425123', 'tongtrannhan321@gmail.com', '331/Nguyen Van Hoa', 'Bien Hoa', 'Dong Nai'),
(3, 'Thanh', 'Tong', 'Nguyen Ngoc Thanh', '01629770288', 'tranthanhngoctong0312@gmail.com', '10/56 DinhBoLinh ', 'Hai Phong', 'Hai Duong'),
(4, 'Tung ', 'Nguyen', ' Huy Tung', '0983724512', 'huytungnguyen@gmail.com', '199/55 CMT8', 'Ho Chi Minh', 'Sai Gon'),
(5, 'Mai', 'Ngo', 'Phuong Mai ', '0394245456', 'ngophuongmai312@gmail.com', '323/53 Dinh Tien Hoang', 'Quy Nho', 'Binh Dinh '),
(6, 'Khoa', 'Mac', 'Van Khoa', '0944241421', 'khoamacvan324@gmail.com', '234/54 Tran Hung Dao', 'Da Nang', 'Quang Nam'),
(7, 'Trang', 'Le', 'Thi Trang', '0329880288', 'letrangthi@gmail.com', '5/123 Ly Thuong Kiet', 'Ho Chi Minh', 'Sai Gon'),
(8, 'Tong', 'Tran', 'Nhan Tong', '0986425123', 'tongtrannhan321@gmail.com', '331/Nguyen Van Hoa', 'Bien Hoa', 'Dong Nai'),
(9, 'Thanh', 'Tong', 'Nguyen Ngoc Thanh', '01629770288', 'tranthanhngoctong0312@gmail.com', '10/56 DinhBoLinh ', 'Hai Phong', 'Hai Duong'),
(10, 'Tung ', 'Nguyen', ' Huy Tung', '0983724512', 'huytungnguyen@gmail.com', '199/55 CMT8', 'Ho Chi Minh', 'Sai Gon'),
(11, 'Mai', 'Ngo', 'Phuong Mai ', '0394245456', 'ngophuongmai312@gmail.com', '323/53 Dinh Tien Hoang', 'Quy Nho', 'Binh Dinh '),
(12, 'Khoa', 'Mac', 'Van Khoa', '0944241421', 'khoamacvan324@gmail.com', '234/54 Tran Hung Dao', 'Da Nang', 'Quang Nam');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `order_date` date NOT NULL,
  `order_status` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `order_payment` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `customer_id`, `order_date`, `order_status`, `order_payment`) VALUES
(1, 12, '2020-10-03', 'Processing ', 3),
(2, 11, '2020-11-10', 'Moving and packaging time ', 2),
(3, 9, '2021-04-08', 'Queue time in finished goods stocks', 3),
(4, 7, '2020-12-09', 'Successful delivery', 3),
(5, 4, '2021-02-09', 'Successful delivery', 2),
(6, 12, '2020-11-20', 'Processing ', 2),
(7, 11, '2020-11-13', 'Moving and packaging time ', 3),
(8, 9, '2021-01-06', 'Queue time in finished goods stocks', 2),
(9, 7, '2021-01-07', 'Successful delivery', 3),
(10, 4, '2020-12-11', 'Successful delivery', 2),
(11, 1, '2021-01-14', 'Processing ', 2),
(12, 2, '2021-01-14', 'Moving and packaging time ', 2),
(13, 3, '2020-12-16', 'Queue time in finished goods stocks', 3),
(14, 5, '2021-02-11', 'Successful delivery', 2),
(15, 6, '2021-01-13', 'Successful delivery', 3),
(16, 8, '2021-03-02', 'Moving and packaging time ', 3),
(17, 10, '2020-09-23', 'Moving and packaging time ', 2),
(18, 1, '2021-01-07', 'Processing ', 2),
(19, 2, '2021-01-13', 'Moving and packaging time ', 2),
(20, 3, '2020-11-26', 'Queue time in finished goods stocks', 3),
(21, 5, '2021-03-16', 'Successful delivery', 2),
(22, 6, '2021-04-09', 'Successful delivery', 3),
(23, 8, '2021-01-12', 'Moving and packaging time ', 3),
(24, 10, '2020-08-05', 'Moving and packaging time ', 2);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`order_id`, `product_id`, `quantity`) VALUES
(1, 1, 2),
(1, 79, 2),
(2, 79, 1),
(2, 84, 1),
(3, 10, 1),
(3, 78, 1),
(3, 81, 1),
(4, 22, 2),
(4, 34, 2),
(6, 4, 1),
(6, 7, 2),
(7, 7, 2),
(7, 10, 1),
(8, 22, 1),
(9, 6, 2),
(9, 12, 2),
(10, 77, 1),
(10, 81, 2),
(11, 2, 2),
(12, 80, 1),
(13, 27, 2),
(14, 28, 2),
(15, 28, 1),
(16, 5, 1),
(17, 81, 2),
(18, 21, 1),
(19, 4, 1),
(20, 80, 1),
(21, 6, 2),
(22, 7, 2),
(23, 23, 1),
(24, 77, 2);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `payment_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `payment_name`) VALUES
(2, 'Visa/ Mastercard'),
(3, 'COD');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `product_price` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `product_description` varchar(159) COLLATE utf8_unicode_ci NOT NULL,
  `product_brand_id` int(11) NOT NULL,
  `product_category_id` int(11) NOT NULL,
  `product_quantity` int(11) NOT NULL,
  `product_storage` int(11) NOT NULL,
  `product_image` varchar(150) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_price`, `product_description`, `product_brand_id`, `product_category_id`, `product_quantity`, `product_storage`, `product_image`) VALUES
(0, 'Samsung Galaxy Tab S7', '18990000', 'The Samsung Galaxy Tab S7 Wifi tablet raises entertainment to a new level. The narrow-edged 120Hz display offers a first-class viewing experience, and with the', 2, 2, 5, 5, 'samsung-tabs7.jpg'),
(1, 'iPhone 12 64GB', '21490000', 'Apple iPhone 12 has 64GB, 128GB, 256GB of built-in memory. This device has a Apple A14 Bionic (5 nm) chipset. The main screen size is 6.1 inches, 90.2 cm2 with', 1, 6, 2, 3, 'iphone-12-black.jpg'),
(2, 'Samsung Galaxy S20+ ', '13990000', 'Samsung Galaxy S20 is powered by a 2GHz octa-core Samsung Exynos 990 processor that features 2 cores clocked at 2.73GHz, 2 cores clocked at 2.5GHz and 4 cores ', 2, 6, 3, 5, 'SamsungGalaxy-S20+.jfif'),
(3, 'Samsung Galaxy A72', '11490000', 'Samsung Galaxy A72 is powered by a 1.8GHz octa-core Qualcomm Snapdragon 720G processor that features 2 cores clocked at 2.3GHz and 6 cores clocked at 1.8GHz. ', 2, 6, 4, 5, 'samsunggalaxy-a72.jpg'),
(4, 'iPhone SE 128GB (2020)', '11790000\r\n', 'The phone is powered by Hexa Core (2.65 GHz, Dual core, Lightning + 1.8 GHz, Quad core, Thunder) ', 1, 6, 5, 6, 'Iphone-SE.jpg'),
(5, ' iPhone 12 mini 128GB', '20590000', 'Apple iPhone 12 Mini 128GB has 5.4 inches (13.72 cm) display, 12 MP + 12 MPcamera, undefined battery. It has a All‑screen OLED Super Retina XDR Screen with a r', 1, 6, 4, 5, 'iPhone-12..jfif'),
(6, 'iPad 10.2 2020 Wi-Fi + Cellular 32GB', '\r\n12990000', 'Apple iPad 10.2 (2020) is officially announced on September 15, 2020. ... It runs on iPadOS 14 and powered by an Apple A12 Bionic Hexa-core processor. It is pa', 1, 2, 4, 5, 'iPad-10.2.jpg'),
(7, 'iPad Mini 5 7.9 Wi-Fi 64GB', '10990000', 'The Apple iPad mini 5 is pack with 2 GB RAM and 64GB and 256 GB of internal storage. The screen of the phone is using the technology of IPS which great.', 1, 2, 4, 5, 'ipad-mini.jpeg'),
(8, 'Samsung Galaxy Tab S7', '18990000', 'The Samsung Galaxy Tab S7 Wifi tablet raises entertainment to a new level. The narrow-edged 120Hz display offers a first-class viewing experience.', 2, 2, 3, 2, 'tab-s7.jpg'),
(9, 'Samsung Galaxy Tab A7 (2020) ', '7190000', 'Browse, watch, read and play to your heart\'s content on your Samsung Galaxy Tab A7 tablet. The high-quality Full HD display provides a very detailed image.', 2, 2, 9, 2, 'tab-a7.jpg'),
(10, 'Huawei MediaPad T5 10', '4990000', 'Huawei MediaPad T5 is a thin and lightweight tablet with a 10.1\" Full HD display that is ideal for network and entertainment use. ', 6, 2, 3, 5, 'huawei-tablet-T5.jpg'),
(11, 'Vsmart Aris Pro 8GB-128GB ', '7790000\r\n', 'Aris Pro is one of the world\'s first commercial smartphones that provide the most accurate definition of absolute infinity display.', 3, 6, 4, 6, 'vsmart-arispro.jpg'),
(12, 'Vsmart Joy 4 3GB-64GB', '3290000', 'Surpassing popular screen standards, Joy 4 offers an impeccable visual experience thanks to the 6.53” borderless screen and trendy hole-punch camera design. ', 3, 6, 4, 3, 'vsmart-joy4.jpg'),
(13, 'Vsmart Live 4 6GB-64GB', '4290000', 'The screen of Live 4 is enlarged to 6.5\" with an elegant hole-punch design, which helps to maximize the display.', 3, 6, 4, 5, 'vsmart-live4.jfif'),
(14, 'Vsmart Active 3 6GB-64GB', '3390000', 'VSmart Active 3 is the latest smartphone from VSmart Mobility, launched in Vietnam for the month of January, 2020. ', 3, 6, 3, 5, 'vsmart-active3.jfif'),
(15, 'Xiaomi Redmi Note 10 Pro 8GB-128GB', '7490000', 'Xiaomi Redmi Note 10 Pro Max 128GB 8GB RAM smartphone runs on Android v11 operating system. ... Xiaomi Redmi Note 10 Pro Max 128GB 8GB RAM smartphone has a FHD', 4, 6, 3, 5, 'xiaomi-10pro.jfif'),
(16, 'Xiaomi Redmi Note 10 6GB-128GB', '5490000', 'Xiaomi Mi Note10 smartphone comes with a 6.47-inch touchscreen AMOLED display with a resolution of 2340x1080 pixels. ', 4, 6, 3, 5, 'xiaomi-note-10.jpg'),
(17, 'Xiaomi Mi 10T Lite 5G 6GB-128GB ', '6990000\r\n', 'The Xiaomi Mi 10T Lite 5G in pearl grey color is a Dual SIM smartphone with 5G technology, 128GB of storage and 6GB of RAM, 6.67-inch FHD+ screen at 120Hz, 64+', 4, 6, 3, 5, 'xiaomi-10lite.jfif'),
(18, 'Xiaomi Mi 10T Pro 5G 8GB-256GB', '11990000', 'The Xiaomi Mi 10T Pro 5G smartphone is equipped with a high-speed Snapdragon 865 eight-core processor, a 6.67-inch 144Hz touchscreen, and a 108+13+5 megapixel ', 4, 6, 4, 5, 'Xiaomi-10tpro.jfif'),
(19, 'iPhone 12 64GB', '21490000', 'Apple iPhone 12 has 64GB, 128GB, 256GB of built-in memory. This device has a Apple A14 Bionic (5 nm) chipset. ', 1, 6, 3, 4, 'iphone-12-black.jpg'),
(20, 'Samsung Galaxy S20', '10990000', 'Samsung Galaxy S20 is powered by a 2GHz octa-core Samsung Exynos 990 processor that features 2 cores clocked at 2.73GHz, 2 cores clocked at 2.5GHz and 4 cores.', 2, 6, 5, 3, 'samsung-s20.jfif'),
(21, 'Huawei Nova 7i', '3490000', 'Huawei Nova 7i is powered by a 2GHz octa-core Samsung Exynos 990 processor that features 2 cores clocked at 2.73GHz, 2 cores clocked at 2.5GHz and 4 cores.', 6, 6, 4, 6, 'huawei-nova7i.png'),
(22, 'Huawei Y6p ', '2490000', 'Huawei Y6p comes with a 6.3-inch screen with a screen resolution 720 x 1600 pixel. The phone offers an immersive viewing experience. The phone has 88.4% screen', 6, 6, 3, 4, 'huawei-y6p.jpg'),
(23, 'Nokia 5.4 4GB -128GB', '3690000\r\n', 'Capture great photos and motion shots with the 48MP Quad camera, 16 MP punch hole selfie camera, 60fps video recording and cinematic recording with colour grad', 5, 6, 5, 6, 'nokia-5.4.jpg'),
(27, 'Samsung Galaxy Tab A7 (2020) ', '7190000', 'Browse, watch, read and play to your heart\'s content on your Samsung Galaxy Tab A7 tablet. The high-quality Full HD display provides a very detailed image, and', 2, 2, 4, 3, 'tab-a7.jpg'),
(28, 'Huawei MediaPad T5 10', '4990000', 'Huawei MediaPad T5 is a thin and lightweight tablet with a 10.1\" Full HD display that is ideal for network and entertainment use. Thanks to the children\'s spac', 6, 2, 12, 12, 'huawei-tablet-T5.jpg'),
(29, 'Vsmart Aris Pro 8GB-128GB ', '7790000', 'Aris Pro is one of the world\'s first commercial smartphones that provide the most accurate definition of absolute infinity display. With the camera hidden unde', 3, 6, 2, 3, 'vsmart-arispro.jpg'),
(30, 'Vsmart Joy 4 3GB-64GB', '3290000', 'Surpassing popular screen standards, Joy 4 offers an impeccable visual experience thanks to the 6.53” borderless screen and trendy hole-punch camera design. Le', 3, 6, 3, 4, 'vsmart-joy4.jpg'),
(31, 'Vsmart Live 4 6GB-64GB', '4290000', 'The screen of Live 4 is enlarged to 6.5\" with an elegant hole-punch design, which helps to maximize the display. Get ready for strikingly great combats or sati', 3, 6, 4, 4, 'vsmart-live4.jfif'),
(32, 'Vsmart Active 3 6GB-64GB', '3390000', 'VSmart Active 3 is the latest smartphone from VSmart Mobility, launched in Vietnam for the month of January, 2020. ... Starting from the display, the Active 3 ', 3, 6, 4, 2, 'vsmart-active3.jfif'),
(33, 'Xiaomi Redmi Note 10 Pro 8GB-128GB', '7490000', 'Xiaomi Redmi Note 10 Pro Max 128GB 8GB RAM smartphone runs on Android v11 operating system. ... Xiaomi Redmi Note 10 Pro Max 128GB 8GB RAM smartphone has a FHD', 4, 6, 5, 3, 'xiaomi-10pro.jfif'),
(34, 'Xiaomi Redmi Note 10 6GB-128GB', '5490000', 'Xiaomi Mi Note10 smartphone comes with a 6.47-inch touchscreen AMOLED display with a resolution of 2340x1080 pixels. It\'s powered by an octa-core Qualcomm Snap', 4, 6, 4, 4, 'xiaomi-note-10.jpg'),
(35, 'Xiaomi Mi 10T Lite 5G 6GB-128GB ', '6990000\r\n', 'The Xiaomi Mi 10T Lite 5G in pearl grey color is a Dual SIM smartphone with 5G technology, 128GB of storage and 6GB of RAM, 6.67-inch FHD+ screen at 120Hz, 64+', 4, 6, 4, 3, 'xiaomi-10lite.jfif'),
(36, 'Xiaomi Mi 10T Pro 5G 8GB-256GB', '11.990.000đ\r\n', 'The Xiaomi Mi 10T Pro 5G smartphone is equipped with a high-speed Snapdragon 865 eight-core processor, a 6.67-inch 144Hz touchscreen, and a 108+13+5 megapixel ', 4, 6, 4, 4, 'Xiaomi-10tpro.jpg'),
(77, 'Nokia 8.3 5G ', '8990000', 'The Nokia 8.3 5G is a Nokia-branded smartphone released by HMD Global Oy, running Android One', 5, 6, 5, 5, 'nokia-8.3.jfif'),
(78, 'Nokia 2.4', '2390000', 'Nokia 2.4 specs include a 6.5-inch HD+ display, Helio P22 processor, 2GB RAM, and 32GB expandable storage. ', 5, 6, 3, 4, 'nokia2.4.png'),
(79, 'Apple Watch SE GPS 40mm', '7641000', 'Apple Watch SE 40mm GPS Space Grey Aluminium Anthracite Black Description The Apple Watch SE has a similarly larger Retina display than the Series 6, so you ca', 1, 3, 4, 5, 'Apple-Watch-SE-GPS-40mm.jpg'),
(80, 'Galaxy Watch Active 2 Under Armour 44mm', '8490000', 'Choose your look and your comfort for a wellness partner you’ll want to keep on your wrist 24/7. Galaxy Watch Active2 comes customised from day one, starting w', 2, 3, 3, 4, 'Galaxy-Watch-Active-2.jpg'),
(81, 'Mi Band 4C ', '390000', 'The Mi Band 4C features a 0.95 inches AMOLED 2.5D colorful touchscreen that is protected by 2.5D scratch-resistant tempered glass. ', 4, 3, 3, 4, 'Xiaomi-Mi-Band-4C.png'),
(82, 'AirPods Max', '13990000', 'From cushion to canopy, AirPods Max are designed to create an optimal acoustic seal for many different head shapes — delivering a listening experience that is ', 1, 15, 4, 4, 'airpods-max.jfif'),
(83, 'AirPods 2 ', '4990000', 'The second-generation AirPods, or AirPods 2, have an updated H1 chip instead of a W1 chip', 1, 15, 3, 4, 'apple-airpods-2.jpg'),
(84, 'AirPods Max', '13990000', 'From cushion to canopy, AirPods Max are designed to create an optimal acoustic seal for many different head shapes — delivering a listening experience that is ', 1, 15, 4, 4, 'airpods-max.jfif'),
(85, 'AirPods 2 ', '4990000', 'The second-generation AirPods, or AirPods 2, have an updated H1 chip instead of a W1 chip', 1, 15, 3, 4, 'apple-airpods-2.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(254) COLLATE utf8_unicode_ci NOT NULL,
  `staff_name` varchar(254) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `staff_name`) VALUES
(6, 'admin', '$2b$10$bTQPEozJu0dWGlbZwGJreOEkvYwyooy3y7.yjhEMa/Ge5kYCiv/sK', 'admin'),
(7, 'dangkhoa', '$2b$10$T0xFzyt64GZrOsIn393VD.5DcfUZISOaN.lc416kmoiXil0YMEcZ2', 'Dang Khoa');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `FK_Order_Customer` (`customer_id`),
  ADD KEY `FK_Order_Payment` (`order_payment`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `FK_OrderItem_Product` (`product_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `FK_Product_Brand` (`product_brand_id`),
  ADD KEY `FK_Product_Category` (`product_category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK_Order_Customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  ADD CONSTRAINT `FK_Order_Payment` FOREIGN KEY (`order_payment`) REFERENCES `payments` (`payment_id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `FK_OrderItem_Order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_OrderItem_Product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK_Product_Brand` FOREIGN KEY (`product_brand_id`) REFERENCES `brands` (`brand_id`),
  ADD CONSTRAINT `FK_Product_Category` FOREIGN KEY (`product_category_id`) REFERENCES `categories` (`category_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
