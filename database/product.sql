-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 31, 2023 at 01:34 AM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `festivalbuy`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `price` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `imageurl` varchar(300) DEFAULT NULL,
  `description` text,
  `is_stock` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `title`, `price`, `category_id`, `imageurl`, `description`, `is_stock`) VALUES
(1, '御品鮑魚佛跳牆', 2999, 1, 'product1.jpg', '■除夕圍爐桌上必備的重要主角\r\n■清朝流傳下來的閩南經典名餚\r\n■豬軟骨切塊汆燙、雞肉上粉炸至金黃色為基底\r\n■蹄筋、鮑魚、干貝、筍片入盅，雞高湯燉煮3小時\r\n■最後以芋頭、紅棗、香菇持續燉煮而成\r\n■成品料多味美、香氣濃郁\r\n', 1),
(2, '開運醉蝦12尾-500公克', 699, 1, 'product2.jpg', '✔蝦料理盛名的百家班推出海味年菜\r\n✔譜出優雅醉人濃郁精釀醇香\r\n✔圍爐時刻分享鮮蝦盛宴\r\n', 1),
(3, '如意櫻花蝦米糕-600g', 799, 1, 'product3.jpg', '✔步步高升吉祥寓意，年節餐桌要角之一\r\n✔Q彈口感，麻油飄香，融匯鹹香海味\r\n✔米粒彈牙、粒粒分明不軟爛\r\n', 1),
(4, '狀元鰻魚油飯(1020g/盒)', 699, 1, 'product4.jpg', '＊以整片鰻魚醃製烘烤\r\n＊狀元油飯強打品牌\r\n＊在家吃方便菜\r\n＊料理方便，加熱即食\r\n', 1),
(5, '富貴梅干筍絲蹄膀-1000g', 799, 1, 'product5.jpg', '✔熬煮入味香Q軟嫩，外皮Q彈有嚼勁\r\n✔客家梅干筍吸附豬肉油脂凸顯梅干菜香氣濃醇\r\n✔些許微辣口感，更加意猶未盡\r\n', 1),
(6, '黑糖糕x4盒(12塊/盒)', 499, 2, 'product6.jpg', '澎湖黑妞招牌人氣甜點王\r\n外島直送黑糖糕\r\n淡淡的黑糖香氣與綿密的口感完美結合\r\n', 1),
(7, '進口鮮凍莓果 草莓/桑椹/紅櫻桃(1000g/包)', 1599, 2, 'product7.jpg', '給自已一個天然不加工的產品\r\n濃郁的莓果香氣，微酸又甜的好滋味。\r\n含有最豐富的花青素成份。\r\nDIY果汁、烘焙的最佳食材。\r\n置放常溫3分鐘後可即食、搭沙拉、優格、鬆餅更好吃。\r\nIQF急速冷凍技術，不需再清洗\r\n一公斤大包裝。\r\n', 1),
(8, '鳳凰酥(12入)*5盒', 1711, 2, 'product8.jpg', '鳳凰酥：加入蛋黃的鳳梨酥－甜中帶點鹹　酥酥的，一口即化\r\nPS.此販售為每顆採獨立包裝，不用擔心吃不完', 1),
(9, '屏東九如．四季檸檬(3kg/箱)', 800, 2, 'product9.jpg', '·汁多、酸香濃郁，具有耐存放特性\r\n·果肉帶淡淡黃色，有些許籽粒\r\n·果皮變得較軟、酸度也會略降，呈現另一番風味\r\n·百變多用，飲品調製或是料理調味都適宜\r\n', 1),
(10, '豐春蔬菜箱', 899, 2, 'product10.jpg', '1. 青江菜 - 1包(250g ±10%)\r\n2. 油菜 - 1包(250g ±10%)\r\n3. 小白菜 - 1包(250g ±10%)\r\n4. 紅蘿蔔 - 1包(400g ±10%)\r\n5. 大漢非基改超嫩豆腐 - 1盒(300g ±10%)\r\n', 1),
(11, '台灣金目鱸魚切片(200g)', 180, 3, 'product11.jpg', '★金目鱸魚含豐富蛋白質\r\n★肉質細緻，味道鮮美\r\n★細刺少，方便好料理\r\n★適合乾煎、清蒸或煮湯\r\n', 1),
(12, '特選超爆卵母香魚 (3-7尾/500g/包)', 499, 3, 'product12.jpg', '★ 輕鬆燒烤就能吃到最棒的美味\r\n★ 讓您在家裡就能品嚐到原汁原味\r\n★ 高級料理店專用等級ˋ急速冷凍處理\r\n★ 堅持品質，篩選最新鮮\r\n', 1),
(13, '熟凍爆蛋紅蟳1隻(180-200g±10%)', 289, 3, 'product13.jpg', '熟凍紅蟳，把新鮮螃蟹蒸煮熟後，再立即零下20度冷凍，這樣就能鎖住螃蟹的水份。\r\n蟹肉中的蛋白質、菸鹼素、維生素B12含量都很豐富，其他還有維生素A、維生素C、脂肪、碳水化合物、鐵、磷等營養成份。\r\n紅蟳多半當作滋補珍品看待。濃縮精華於一身的紅蟳，競爭優勢則在於「卵」啦！\r\n', 1),
(14, '比目魚厚切片(350g/包)x3', 799, 3, 'product14.jpg', '★肉質鮮美嫩滑、肉身紮實不潰散\r\n★入口綿細、清甜可口\r\n★產地:北極格陵蘭鱈魚\r\n', 1),
(15, '特大無刺白帶魚捲(500g/包)', 299, 3, 'product15.jpg', '★激厚實超大片鮮嫩，便當菜最常見的白帶魚\r\n★肉質細緻，便脂肪低，便營養豐富\r\n★加上細刺不多，全家都愛吃！\r\n★火烤、乾煎、紅燒等多變化讓孩子也愛上吃魚！\r\n', 1),
(16, '郭元益 醇蛋捲禮盒', 350, 4, 'product16.jpg', '◆醇濃心意 自然好滋味\r\n◆純天然雞蛋原味烘焙，不含人工香精、色素\r\n◆特別添加法國庇里牛斯山溫泉鹽提味\r\n', 1),
(17, '《紅豆食府》團圓原味雪花酥100g/盒', 138, 4, 'product17.jpg', '濃濃牛奶香、酥脆不黏牙\r\n紅豆食府美食甜品\r\n年節送禮的最佳選擇\r\n', 1),
(18, '黃日香滷味豆乾 130G±4.5%x3包', 175, 4, 'product18.jpg', '*本廠自先祖黃屋創立至今已九十餘年\r\n*以經驗及信譽確保商品之品質和口味\r\n*用最新科學方法精選優良黃豆,和漢方香料\r\n精製出一系列美味可口的豆乾\r\n', 1),
(19, '【新東陽】原味牛肉乾230g', 285, 4, 'product19.jpg', '★慢火熬煮焙炒\r\n★蟬聯10年 NO.1肉乾★\r\n★肉片完整且厚實\r\n★獨家滷汁熬煮，誘人香氣破表！\r\n★慢火熬煮焙炒，肉質軟而不爛\r\n★風味獨特，咬勁十足又大塊\r\n★經典台灣味，送禮自用兩相宜\r\n', 1),
(20, '《盛香珍》春之頌經典餅乾禮盒575g/盒-附提把', 299, 4, 'product20.jpg', '★2022新品-季節限定禮盒\r\n★寓意春暖花開，花開富貴！\r\n★集結了6款盛香珍經典餅乾\r\n★超大一盒~送禮既好看又大方!\r\n', 1),
(21, '麥香紅茶 300ml(24入/箱)', 240, 5, 'product21.jpg', '★熟悉的麥香，最對味\r\n★獨特的大麥香味，讓人回味無窮\r\n', 1),
(22, '【innocent天真】 100%椰子水 1000mlx6入/箱x2箱', 654, 5, 'product22.jpg', '椰很清爽、椰很低卡\r\n日常補水少負擔\r\n100%天然椰子水\r\n', 1),
(23, '美粒果蘋果蘇打 寶特瓶500ml(24入/箱)x2箱', 938, 5, 'product23.jpg', '★ 使用真實蘋果汁，帶給您絕佳的蘋果氣泡飲用口感。\r\n★ 新型態蘋果氣泡飲，微甜超清爽\r\n★ 清爽少負擔\r\n', 1),
(24, '金車 伯朗黃金特選咖啡240ml(24罐)*2共48瓶', 878, 5, 'product24.jpg', '★選用100%精選ARABICA豆與牛奶\r\n★黃金比例調配而成\r\n★呈現全新柔順奢華的豐富口感\r\n', 1),
(25, '每朝健康 無糖紅茶650ml(24入x2箱)', 1099, 5, 'product25.jpg', '嚴選斯里蘭卡康堤產區的錫蘭紅茶，\r\n搭配阿薩姆等紅茶，多層次的口感清新醇厚、圓潤不苦澀。\r\n', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id_idx` (`category_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
