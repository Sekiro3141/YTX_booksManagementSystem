/*
 Navicat MySQL Data Transfer

 Source Server         : WEB
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : book

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 18/05/2021 18:24:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book`  (
  `book_id` int(0) NOT NULL AUTO_INCREMENT,
  `book_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `book_author` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `book_pub` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `book_img` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `book_sort_id` int(0) NULL DEFAULT NULL,
  `publicationTime` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `is_on` int(0) NULL DEFAULT 1,
  `book_price` double NULL DEFAULT NULL,
  `pagination` int(0) NULL DEFAULT NULL,
  `subhead` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `conter` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`book_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 101 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES (1, '《醉酒的植物学家——创造了世界名》', '艾米·斯图尔特', '商务印书馆', 'https://s1.ax1x.com/2020/05/09/YloxpR.jpg', 1, '2017-1', 1, 28.9, 404, '创造了世界名酒的植物', '这是图书简介');
INSERT INTO `book` VALUES (2, '《探寻自然的秩序——从林奈到E.O》', '美)保罗·劳伦斯·法伯', '商务印书馆', 'https://s1.ax1x.com/2020/05/09/YlTJ9s.jpg', 1, '2010-3', 1, 36.9, 105, '探寻自然的秘密', '这是图书简介');
INSERT INTO `book` VALUES (3, '《羽毛》', '格兰特•艾伦', '商务印书馆', 'https://s1.ax1x.com/2020/05/09/YlT1Ag.jpg', 1, '2008-9-10', 1, 28.9, 287, '观察那最初的羽毛', '这是图书简介');
INSERT INTO `book` VALUES (4, '《可装裱的中国博物艺术》', '朱迪斯·玛吉', '商务印书馆', 'https://s1.ax1x.com/2020/05/09/YlTY3n.jpg', 1, '2012-7-8', 1, 36.9, 198, '寻找最古朴的艺术', '这是图书简介');
INSERT INTO `book` VALUES (5, '《天堂鸟》', '黛安娜·阿布杰比', '四川文艺出版社', 'https://s1.ax1x.com/2020/05/09/YlT3NQ.jpg', 1, '2010-3', 1, 28.9, 198, '鸟儿的世界其实很美妙', '这是图书简介');
INSERT INTO `book` VALUES (6, '《理想国》', '柏拉图', '广西师范大学出版社', 'https://s1.ax1x.com/2020/05/09/YlTMB8.jpg', 2, '2008-9-10', 1, 32.8, 287, '何为理想？何为国？', '这是图书简介');
INSERT INTO `book` VALUES (7, '《温故》', ' 刘瑞琳', '广西师范大学出版社', 'https://s1.ax1x.com/2020/05/09/YlT8hj.jpg', 3, '2012-7-8', 1, 28.9, 198, '温故而知新可以为师矣', '这是图书简介');
INSERT INTO `book` VALUES (8, '《读库》', '张立宪', '同心出版社', 'https://s1.ax1x.com/2020/05/09/YlTtcq.jpg', 3, '2008-9-10', 1, 36.9, 105, '阅读的快乐，这里有丰富的书籍指导', '这是图书简介');
INSERT INTO `book` VALUES (9, '《论语译注》', '杨伯峻', '中华书局', 'https://s1.ax1x.com/2020/05/09/YlTNj0.jpg', 3, '2010-3', 1, 32.8, 590, '论语有道乎', '这是图书简介');
INSERT INTO `book` VALUES (10, '《给孩子100本最棒的书》', '(美)安妮塔•西尔维', '湖南少年儿童出版社', 'https://s1.ax1x.com/2020/05/09/YlTauV.jpg', 4, '2008-9-10', 1, 28.9, 287, '你本来就很棒', '这是图书简介');
INSERT INTO `book` VALUES (11, '《新工具》', '培根', '商务印书馆', 'https://s1.ax1x.com/2020/05/09/YlTBEF.jpg', 2, '2008-9-10', 1, 28.9, 198, '用新工具发现新世界', '这是图书简介');
INSERT INTO `book` VALUES (12, '《政府论》', '洛克', '中华书局', 'https://s1.ax1x.com/2020/05/09/YlTdBT.jpg', 2, '2008-9-10', 1, 32.8, 105, '政府论', '这是图书简介');
INSERT INTO `book` VALUES (13, '《论法的精神》', '孟德斯鸠', '同心出版社', 'https://s1.ax1x.com/2020/05/09/YlTwHU.jpg', 2, '2008-9-10', 1, 28.9, 105, '论法的精神', '这是图书简介');
INSERT INTO `book` VALUES (14, '《社会契约论》', '卢梭', '商务印书馆', 'https://s1.ax1x.com/2020/05/09/YlTDN4.jpg', 2, '2010-3', 1, 32.8, 105, '社会契约论', '这是图书简介');
INSERT INTO `book` VALUES (15, '《常识》', '潘恩', '同心出版社', 'https://s1.ax1x.com/2020/05/09/YlTr4J.jpg', 2, '2012-7-8', 1, 28.9, 198, '你所不知道的常识', '这是图书简介');
INSERT INTO `book` VALUES (16, '《战争论》', '克劳塞维茨', '商务印书馆', 'https://s1.ax1x.com/2020/05/09/YlT63R.jpg', 2, '2016-5-26', 1, 32.8, 376, '战争精神', '这是图书简介');
INSERT INTO `book` VALUES (17, '《追风筝的人》', '[美] 卡勒德·胡赛尼', '上海人民出版社', 'https://s1.ax1x.com/2020/05/09/YlTcg1.jpg', 3, '2012-7-8', 1, 28.9, 287, '爱你千千万万遍', '这是图书简介');
INSERT INTO `book` VALUES (18, '《解忧杂货店》', '[日] 东野圭吾', '南海出版社', 'https://s1.ax1x.com/2020/05/09/YlTyC9.jpg', 3, '2010-3', 0, 32.8, 376, '一个可以解决所有忧愁的小铺子', '这是图书简介');
INSERT INTO `book` VALUES (19, '《小王子》', ' [法] 圣埃克苏佩里', ' 人民出版社', 'https://s1.ax1x.com/2020/05/09/YlTgjx.jpg', 3, '2012-7-8', 1, 45.9, 105, '你所守护的那颗玫瑰是怎么样的呢？', '这是图书简介');
INSERT INTO `book` VALUES (20, '《白夜行》', ' [日] 东野圭吾', '南海出版社', 'https://s1.ax1x.com/2020/05/09/YlTRu6.jpg', 3, '2018-1-1', 1, 32.8, 238, '原来他竟是凶手', '这是图书简介');
INSERT INTO `book` VALUES (21, '《围城》', '銭锺书', '商务印书馆', 'https://s1.ax1x.com/2020/05/09/YlTWDK.jpg', 3, '2016-5-26', 1, 28.9, 287, '外面的人想进去，里面的人想出来', '这是图书简介');
INSERT INTO `book` VALUES (22, '《三体Ⅰ》', '刘慈欣', '四川科学技术出版社', 'https://s1.ax1x.com/2020/05/09/YlTfHO.jpg', 3, '2016-5-26', 1, 45.9, 105, '荣获诺贝尔文学奖', '这是图书简介');
INSERT INTO `book` VALUES (23, '《嫌疑人X的献身》', ' [日] 东野圭吾', '南海出版社', 'https://s1.ax1x.com/2020/05/09/YlTTCd.jpg', 3, '2010-3', 1, 32.8, 105, '嫌疑人是谁？', '这是图书简介');
INSERT INTO `book` VALUES (24, '《挪威的森林》', ' [日] 村上春树', '上海译文出版社', 'https://s1.ax1x.com/2020/05/09/YlT4ED.jpg', 3, '2018-1-1', 1, 45.9, 287, '挪威是迷雾还是森林', '这是图书简介');
INSERT INTO `book` VALUES (25, '《活着》', '余华', '作家出版社', 'https://s1.ax1x.com/2020/05/09/YlTI4H.jpg', 3, '2018-1-1', 1, 36.9, 105, '活着便是最大的幸福', '这是图书简介');
INSERT INTO `book` VALUES (26, '《草房子》', '曹文轩', '江苏少年儿童出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 4, '2016-5-26', 1, 41.8, 376, '我们家住在一个很豪华的草房子里', '这是图书简介');
INSERT INTO `book` VALUES (27, '《如何阅读一本书》', '莫提默·艾德勒', ' 人民出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 3, '2010-3', 0, 45.9, 287, '怎样高校的阅读一本书', '这是图书简介');
INSERT INTO `book` VALUES (28, '《平凡的世界》', '路遥', ' 人民出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 3, '2018-1-1', 1, 41.8, 105, '世界不平凡的你', '这是图书简介');
INSERT INTO `book` VALUES (29, '《十年一觉电影梦--李安传》', '张靓蓓', ' 人民出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 2, '2016-5-26', 1, 36.9, 238, '常识', '这是图书简介');
INSERT INTO `book` VALUES (30, '《太空步--迈克尔·杰克逊自传》', '迈克尔·杰克逊', ' 人民出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 3, '2018-1-1', 1, 41.8, 287, '太空步-', '这是图书简介');
INSERT INTO `book` VALUES (31, '《万水千山：三毛》', '刘兰芳', '中华书局', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 3, '2010-3', 1, 45.9, 105, '万水千山', '这是图书简介');
INSERT INTO `book` VALUES (32, '《目送》', '龙应台', '作家出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 3, '2016-5-26', 1, 41.8, 376, '目送着你，目送着山，目送千千万物', '这是图书简介');
INSERT INTO `book` VALUES (33, '《人间词话》', '王国维', '中华书局', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 3, '2018-1-1', 1, 36.9, 105, '最美不过人间词话', '这是图书简介');
INSERT INTO `book` VALUES (34, '《红与黑》', '司汤达', '作家出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 3, '2018-1-1', 1, 45.9, 238, '红与黑红与黑', '这是图书简介');
INSERT INTO `book` VALUES (35, '《雪国》', '川端康成', ' 人民出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 2, '2016-5-26', 1, 39.9, 287, '日本的雪国', '这是图书简介');
INSERT INTO `book` VALUES (36, '《风雨哈佛路》', '莉丝·默里', '中华书局', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 3, '2010-3', 1, 39.9, 105, '风雨哈佛路，历经艰难险阻', '这是图书简介');
INSERT INTO `book` VALUES (37, '《菊花与刀》', '鲁思·本尼迪克特', ' 人民出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 2, '2016-5-26', 1, 45.9, 238, '菊花与刀', '这是图书简介');
INSERT INTO `book` VALUES (38, '《老人与海》', '海明威', '中华书局', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 4, '2018-1-1', 1, 39.9, 376, '老人与海', '这是图书简介');
INSERT INTO `book` VALUES (39, '《当幸福来敲门》', '李春雷', '作家出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 2, '2012-7-8', 1, 39.9, 238, '当幸福来敲门', '这是图书简介');
INSERT INTO `book` VALUES (40, '《追寻生命的意义》', '维克多·E·弗兰克尔', ' 人民出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 3, '2010-3', 1, 45.9, 287, '追寻生命的意义', '这是图书简介');
INSERT INTO `book` VALUES (41, '《圣经的故事》', '房龙', '作家出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 3, '2012-7-8', 1, 41.8, 238, '圣经', '这是图书简介');
INSERT INTO `book` VALUES (42, '《人类的艺术》', '房龙', '中华书局', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 4, '2018-1-1', 1, 39.9, 238, '人类的艺术是什么呢？', '这是图书简介');
INSERT INTO `book` VALUES (43, '《人性的弱点》', '戴尔·卡耐基', '作家出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 1, '2012-7-8', 1, 45.9, 376, '教你如何成为万人所爱戴的', '这是图书简介');
INSERT INTO `book` VALUES (44, '《世界科学技术通史》', '麦克莱伦第三', '中华书局', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 3, '2010-3', 1, 39.9, 287, '世界科学技术通史', '这是图书简介');
INSERT INTO `book` VALUES (45, '《万物简史》', '比尔·布莱森', ' 人民出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 3, '2012-7-8', 1, 41.8, 590, '万物简史', '这是图书简介');
INSERT INTO `book` VALUES (46, '《爱的艺术》', '埃里希·弗洛姆', '中华书局', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 1, '2012-7-8', 1, 39.9, 590, '爱本身就是中艺术', '这是图书简介');
INSERT INTO `book` VALUES (47, '《苏菲的世界》', '乔斯坦·贾德', ' 人民出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 3, '2012-7-8', 1, 41.8, 376, '苏菲的世界', '这是图书简介');
INSERT INTO `book` VALUES (48, '《中国哲学史》', '冯友兰', ' 人民出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 1, '2010-3', 1, 41.8, 287, '中国的哲学史历史悠久', '这是图书简介');
INSERT INTO `book` VALUES (49, '《激荡三十年》', '吴晓波', '作家出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 3, '2012-7-8', 1, 41.8, 590, '激荡的这20年，激动的人，但是精神亻在', '这是图书简介');
INSERT INTO `book` VALUES (50, '《鲁迅自传》', '鲁迅', '作家出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 2, '2012-7-8', 1, 39.9, 376, '鲁迅的生活经历', '这是图书简介');
INSERT INTO `book` VALUES (51, '《孔子传》', '钱穆', ' 人民出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 3, '2012-7-8', 1, 41.8, 590, '孔子的生活经历', '这是图书简介');
INSERT INTO `book` VALUES (52, '《夏天烟花和我的尸体》', '(日)乙一', '当代世界出版社', 'https://s1.ax1x.com/2020/05/09/YlT8hj.jpg', 3, '2010-3', 1, 39.9, 287, '来自13岁小朋友的自述', '这是图书简介');
INSERT INTO `book` VALUES (53, '《云边有个小卖部》', '张嘉佳', '湖南文艺出版社', 'https://s1.ax1x.com/2020/05/09/YlT8hj.jpg', 3, '2012-7-8', 1, 39.9, 590, '云边有个小卖部', '这是图书简介');
INSERT INTO `book` VALUES (67, '《血殇》', '[美] 理查德 ·普雷斯顿', '上海译文出版社', 'https://s1.ax1x.com/2020/05/09/YlT63R.jpg', 3, '2020-5', 1, 49, 376, '埃博拉的过去、现在和未来', '这是图书简介');
INSERT INTO `book` VALUES (68, '《十宗罪6》', '蜘蛛', '中华工商联合出版社', 'https://s1.ax1x.com/2020/05/09/YlT63R.jpg', 3, '2018-1-1', 1, 45, 288, '十宗罪', '这是图书简介');
INSERT INTO `book` VALUES (69, '《股市阴阳线法则》', '曹新', '学林出版社', 'https://s1.ax1x.com/2020/05/09/YlT63R.jpg', 2, '2012-7-8', 1, 36.9, 376, '万水千山', '这是图书简介');
INSERT INTO `book` VALUES (70, '《日落碗窑》', '迟子建', '人民文学出版社', 'https://s1.ax1x.com/2020/05/09/YlT63R.jpg', 4, '2012-7-8', 1, 36.9, 345, '鲁迅的生活经历', '这是图书简介');
INSERT INTO `book` VALUES (71, '《细说三国》', '黎东方', '商务印书馆', 'https://s1.ax1x.com/2020/05/09/YlT63R.jpg', 2, '2010-3', 1, 41.8, 590, '万水千山', '这是图书简介');
INSERT INTO `book` VALUES (72, '《图说日本服饰史》', '高桥健自', '清华大学出版社', 'https://s1.ax1x.com/2020/05/09/YlT63R.jpg', 4, '2012-7-8', 1, 36.9, 376, '鲁迅的生活经历', '这是图书简介');
INSERT INTO `book` VALUES (73, '《中国话剧史》', '宋宝珍', '生活·读书·新知三联书店,', 'https://s1.ax1x.com/2020/05/09/YlT63R.jpg', 4, '2018-1-1', 1, 38.5, 345, '教你如何成为万人所爱戴的', '这是图书简介');
INSERT INTO `book` VALUES (74, '《阿甲论戏曲表导演艺术》', '阿甲', '文化艺术出版社', 'https://s1.ax1x.com/2020/05/09/YlT63R.jpg', 2, '2012-7-8', 1, 36.9, 376, '世界科学技术通史', '这是图书简介');
INSERT INTO `book` VALUES (75, '《大塚绚子毛绒绒的立体刺绣》', '[日本]大塚绚子;宋菲娅', '中国纺织出版社', 'https://s1.ax1x.com/2020/05/09/YlT63R.jpg', 4, '2018-1-1', 1, 41.8, 590, '世界科学技术通史', '这是图书简介');
INSERT INTO `book` VALUES (76, '《戏剧萌芽》', '[爱尔兰]朱莉·梅根', '文化艺术出版社', 'https://s1.ax1x.com/2020/05/09/YlT63R.jpg', 3, '2016-5-26', 1, 39.9, 376, '万水千山', '这是图书简介');
INSERT INTO `book` VALUES (77, '《困扰与重返》', '尚辉', '湖南美术出版社', 'https://s1.ax1x.com/2020/05/09/YlT63R.jpg', 1, '2010-3', 1, 36.9, 376, '教你如何成为万人所爱戴的', '这是图书简介');
INSERT INTO `book` VALUES (78, '《演员自我修养》', '[俄]斯坦尼斯拉夫斯基;', '广西师范大学出版社', 'https://s1.ax1x.com/2020/05/09/YlT63R.jpg', 4, '2018-1-1', 1, 45, 345, '万水千山', '这是图书简介');
INSERT INTO `book` VALUES (79, '《寻找桂林历史文化的力量》', '文丰义', '广西师范大学出版社', 'https://s1.ax1x.com/2020/05/09/YlT63R.jpg', 2, '2012-7-8', 1, 41.8, 590, '鲁迅的生活经历', '这是图书简介');
INSERT INTO `book` VALUES (80, '《新中国戏剧高等教育史》', '厉震林', '高等教育出版社', 'https://s1.ax1x.com/2020/05/09/YlT63R.jpg', 1, '2018-1-1', 1, 39.9, 238, '中国的哲学史历史悠久', '这是图书简介');
INSERT INTO `book` VALUES (81, '《重庆抗战剧坛纪事》', '石曼', '中国戏剧出版社,', 'https://s1.ax1x.com/2020/05/09/YlTJ9s.jpg', 2, '2012-7-8', 1, 39.9, 376, '教你如何成为万人所爱戴的', '这是图书简介');
INSERT INTO `book` VALUES (82, '《中国抗战话剧图史》', '胡传敏', '文化艺术出版社', 'https://s1.ax1x.com/2020/05/09/YlTJ9s.jpg', 1, '2010-3', 1, 36.9, 345, '风雨哈佛路，历经艰难险阻', '这是图书简介');
INSERT INTO `book` VALUES (83, '《阿甲戏剧论集》', '阿甲', '中国戏剧出版社', 'https://s1.ax1x.com/2020/05/09/YlTJ9s.jpg', 2, '2018-1-1', 1, 39.9, 590, '中国的哲学史历史悠久', '这是图书简介');
INSERT INTO `book` VALUES (84, '《演员创造角色》', '[俄]斯坦尼斯拉夫斯基', '中国电影出版社', 'https://s1.ax1x.com/2020/05/09/YlTJ9s.jpg', 1, '2010-3', 1, 41.8, 238, '世界科学技术通史', '这是图书简介');
INSERT INTO `book` VALUES (85, '《传媒与当代艺术》', '徐沛君', '江西美术出版社', 'https://s1.ax1x.com/2020/05/09/YlTJ9s.jpg', 2, '2018-1-1', 1, 36.9, 376, '教你如何成为万人所爱戴的', '这是图书简介');
INSERT INTO `book` VALUES (86, '《艺术社会学》', '[英]维多利亚·D·亚历山大', '江苏美术出版社', 'https://s1.ax1x.com/2020/05/09/YlTJ9s.jpg', 1, '2012-7-8', 1, 39.9, 345, '爱本身就是中艺术', '这是图书简介');
INSERT INTO `book` VALUES (87, '《郑君里全集》', '李镇', '上海文化出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 5, '2016-5-26', 1, 36.9, 376, '风雨哈佛路，历经艰难险阻', '这是图书简介');
INSERT INTO `book` VALUES (88, '《日本手工艺》', '柳宗悦', '广西师范大学出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 5, '2016-5-26', 1, 45, 345, '中国的哲学史历史悠久', '这是图书简介');
INSERT INTO `book` VALUES (89, '《抗战戏剧》', '田本相', '河南大学出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 5, '2016-5-26', 1, 45, 287, '教你如何成为万人所爱戴的', '这是图书简介');
INSERT INTO `book` VALUES (90, '《剧与思》', '戏剧艺术编辑部', '上海书店出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 1, '2010-3', 1, 39.9, 590, '目送着你，目送着山，目送千千万物', '这是图书简介');
INSERT INTO `book` VALUES (91, '《场景模型制作与涂装技术指南》', '[西] 鲁本·冈萨雷斯 ', '机械工业出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 2, '2016-5-26', 1, 45, 287, '爱本身就是中艺术', '这是图书简介');
INSERT INTO `book` VALUES (92, '《解放区戏剧研究》', '贾冀川', '人民出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 5, '2016-5-26', 1, 39.9, 345, '目送着你，目送着山，目送千千万物', '这是图书简介');
INSERT INTO `book` VALUES (93, '《插图中国话剧史》', '郭富民', '济南出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 2, '2010-3', 1, 39.9, 376, '中国的哲学史历史悠久', '这是图书简介');
INSERT INTO `book` VALUES (94, '《郭沫若研究资料》', '王训昭', '中国社会科学出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 5, '2016-5-26', 1, 45, 590, '目送着你，目送着山，目送千千万物', '这是图书简介');
INSERT INTO `book` VALUES (95, '《影响研究》', '范方俊', '北京大学出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 2, '2010-3', 1, 36.9, 287, '爱本身就是中艺术', '这是图书简介');
INSERT INTO `book` VALUES (96, '《宠儿》', '[美]托妮·莫里森;潘岳', '南海出版公司', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 5, '2010-3', 1, 39.9, 345, '风雨哈佛路，历经艰难险阻', '这是图书简介');
INSERT INTO `book` VALUES (97, '《刀尖》', '麦家', '京华出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 2, '2018-1-1', 1, 39.9, 376, '目送着你，目送着山，目送千千万物', '这是图书简介');
INSERT INTO `book` VALUES (98, '《西方悲剧学说史》', '程孟辉', '商务印书馆国际有限公司', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 1, '2016-5-26', 1, 45, 590, '风雨哈佛路，历经艰难险阻', '这是图书简介');
INSERT INTO `book` VALUES (99, '《林纾冤案事件簿》', '[日]樽本照雄', '商务印书馆', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 5, '2016-5-26', 1, 36.9, 376, '目送着你，目送着山，目送千千万物', '这是图书简介');
INSERT INTO `book` VALUES (100, '《风语》', '麦家', '金城出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 1, '2016-5-26', 1, 45, 345, '爱本身就是中艺术', '这是图书简介');
INSERT INTO `book` VALUES (101, '《胡风论》', '支克坚', '广西教育出版社', 'https://s1.ax1x.com/2020/05/09/YlT78A.jpg', 1, '2016-5-26', 1, 39.9, 590, '目送着你，目送着山，目送千千万物', '这是图书简介');

-- ----------------------------
-- Table structure for book_sort
-- ----------------------------
DROP TABLE IF EXISTS `book_sort`;
CREATE TABLE `book_sort`  (
  `sort_id` int(0) NOT NULL AUTO_INCREMENT,
  `sort_name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`sort_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book_sort
-- ----------------------------
INSERT INTO `book_sort` VALUES (1, '博物自然');
INSERT INTO `book_sort` VALUES (2, '政治历史');
INSERT INTO `book_sort` VALUES (3, '文学经典');
INSERT INTO `book_sort` VALUES (4, '儿童文学');
INSERT INTO `book_sort` VALUES (5, '111111');

-- ----------------------------
-- Table structure for borrow
-- ----------------------------
DROP TABLE IF EXISTS `borrow`;
CREATE TABLE `borrow`  (
  `student_id` int(0) NOT NULL,
  `book_id` int(0) NULL DEFAULT NULL,
  `borrow_id` int(0) NOT NULL AUTO_INCREMENT,
  `borrow_date` date NULL DEFAULT NULL,
  `expect_return_date` date NULL DEFAULT NULL,
  `ApplicationStatus` int(0) NULL DEFAULT 0,
  PRIMARY KEY (`borrow_id`) USING BTREE,
  INDEX `student_id`(`student_id`) USING BTREE,
  INDEX `book_id`(`book_id`) USING BTREE,
  CONSTRAINT `borrow_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`stu_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `borrow_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of borrow
-- ----------------------------
INSERT INTO `borrow` VALUES (2018080371, 4, 1, '2020-01-12', '2020-05-12', 0);
INSERT INTO `borrow` VALUES (2018080371, 3, 6, '2020-03-01', '2020-07-01', 0);
INSERT INTO `borrow` VALUES (2018080371, 18, 7, '2019-11-14', '2020-03-14', 2);
INSERT INTO `borrow` VALUES (2018080371, 10, 14, '2020-06-15', '2020-10-16', 0);
INSERT INTO `borrow` VALUES (2018080371, 27, 17, '2020-06-17', '2020-11-17', 3);
INSERT INTO `borrow` VALUES (2018080371, 20, 18, '2020-06-17', '2020-10-17', 0);
INSERT INTO `borrow` VALUES (2018080371, 6, 19, '2020-06-28', '2020-10-28', 0);

-- ----------------------------
-- Table structure for forum
-- ----------------------------
DROP TABLE IF EXISTS `forum`;
CREATE TABLE `forum`  (
  `bookId` int(0) NOT NULL,
  `student_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `student_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `grade` double(10, 2) NULL DEFAULT NULL,
  `releaseTime` date NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `container` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `studentId` int(0) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of forum
-- ----------------------------
INSERT INTO `forum` VALUES (1, NULL, NULL, 4.50, NULL, NULL, NULL, 2018080371);
INSERT INTO `forum` VALUES (1, 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', '李楚璇', NULL, '2020-06-25', '第一个标题', '第一条撒下的评论!', 2018080371);
INSERT INTO `forum` VALUES (1, NULL, NULL, 3.00, NULL, NULL, NULL, 2018080189);
INSERT INTO `forum` VALUES (1, 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', 'daixu', NULL, '2020-06-25', '我来测试评论啦', '哒哒哒哒哒', 2018080189);
INSERT INTO `forum` VALUES (1, NULL, NULL, 4.00, NULL, NULL, NULL, 2018080404);
INSERT INTO `forum` VALUES (49, NULL, NULL, 2.50, NULL, NULL, NULL, 2018080406);
INSERT INTO `forum` VALUES (49, 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', '对对', NULL, '2020-06-29', '啊啊啊啊', '是否超时加防腐剂', 2018080406);
INSERT INTO `forum` VALUES (2, 'upload_eeb13476570ff6080ea870355cbacfde.jpg', '李楚璇', NULL, '2020-11-18', '1123', '21321', 2018080371);
INSERT INTO `forum` VALUES (6, NULL, NULL, 3.50, NULL, NULL, NULL, 2018080371);

-- ----------------------------
-- Table structure for manager
-- ----------------------------
DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager`  (
  `manager_id` int(0) NOT NULL AUTO_INCREMENT,
  `manager_name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `manager_age` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `manager_phone` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `manager_img` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `manager_book_id` int(0) NULL DEFAULT NULL,
  `manager_zh` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `manager_ma` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `manager_time` date NULL DEFAULT NULL,
  PRIMARY KEY (`manager_id`) USING BTREE,
  UNIQUE INDEX `manager_phone`(`manager_phone`) USING BTREE,
  UNIQUE INDEX `manager_zh`(`manager_zh`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of manager
-- ----------------------------
INSERT INTO `manager` VALUES (1, '王大仙', '39', '19087654367', 'https://s1.ax1x.com/2020/05/09/YlqPxA.jpg', 1, 'admin', '123456', '2018-09-10');
INSERT INTO `manager` VALUES (2, '王小小', '41', '1876543267', 'https://s1.ax1x.com/2020/05/09/YlqC2d.jpg', 2, '234567', 'wxx234567', '2018-07-10');
INSERT INTO `manager` VALUES (3, '李子子', '28', '18858007077', 'https://s1.ax1x.com/2020/05/09/YlqpPe.jpg', 3, '345678', 'lzz345678', '2019-09-10');
INSERT INTO `manager` VALUES (4, '朱天天', '25', '13767877178', 'https://s1.ax1x.com/2020/05/09/Ylbz5D.jpg', 4, '456789', 'ztt456789', '2018-10-10');

-- ----------------------------
-- Table structure for return_table
-- ----------------------------
DROP TABLE IF EXISTS `return_table`;
CREATE TABLE `return_table`  (
  `student_id` int(0) NOT NULL,
  `book_id` int(0) NULL DEFAULT NULL,
  `borrow_id` int(0) NULL DEFAULT NULL,
  `return_date` date NULL DEFAULT NULL,
  INDEX `student_id`(`student_id`) USING BTREE,
  INDEX `book_id`(`book_id`) USING BTREE,
  INDEX `borrow_id`(`borrow_id`) USING BTREE,
  CONSTRAINT `return_table_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`stu_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `return_table_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `return_table_ibfk_3` FOREIGN KEY (`borrow_id`) REFERENCES `borrow` (`borrow_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of return_table
-- ----------------------------
INSERT INTO `return_table` VALUES (2018080371, 4, 1, '2020-05-24');
INSERT INTO `return_table` VALUES (2018080371, 3, 6, '2020-06-17');
INSERT INTO `return_table` VALUES (2018080371, 10, 14, '2020-06-14');
INSERT INTO `return_table` VALUES (2018080371, 20, 18, '2020-06-17');
INSERT INTO `return_table` VALUES (2018080371, 6, 19, '2020-06-28');

-- ----------------------------
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students`  (
  `stu_id` int(0) NOT NULL AUTO_INCREMENT,
  `stu_name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `stu_sex` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1',
  `stu_age` int(0) NULL DEFAULT NULL,
  `stu_pro` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `stu_grade` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `stu_img` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg',
  `stu_integrity` int(0) NULL DEFAULT 1,
  `stu_ma` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '123456',
  PRIMARY KEY (`stu_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2018080406 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of students
-- ----------------------------
INSERT INTO `students` VALUES (1234567891, '王大仙', '1', NULL, '计算机科学', NULL, 'upload_fc42900a0fad2f4f35a418f693523782.jpg', 1, '123456asd');
INSERT INTO `students` VALUES (2018080189, 'daixu', '1', 18, '人工智能', '20级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', 1, '123456');
INSERT INTO `students` VALUES (2018080371, '李楚璇', '1', 21, '移动应用开发', '18级', 'upload_eeb13476570ff6080ea870355cbacfde.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080372, '朱天伦', '0', 20, '移动应用开发', '19级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080373, '王建炜', '0', 21, '移动应用开发', '18级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080374, '冯驰煜', '0', 20, '移动应用开发', '20级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080375, '王意', '0', 19, '数字媒体', '18级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080376, '朱创文', '0', 18, '移动应用开发', '20级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080377, '陈磊', '0', 19, '数字媒体', '18级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080378, '王磊', '0', 22, '移动应用开发', '18级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080379, '何洁', '0', 21, '信息管理', '18级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080380, '王颖', '0', 20, '信息管理', '20级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080381, '金斌', '0', 20, '移动应用开发', '18级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080382, '张晋辉', '0', 20, '移动应用开发', '18级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080383, '张妮可', '0', 21, '信息管理', '19级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080384, '邱龙涛', '0', 21, '信息管理', '18级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080385, '章国阳', '0', 21, '移动应用开发', '19级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080386, '方飞铖', '0', 20, '数字媒体', '18级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080387, '方飞铖', '0', 20, '数字媒体', '18级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080388, '赵双一', '0', 20, '信息管理', '19级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080389, '汪可', '0', 20, '信息管理', '18级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080390, '方佳晨', '0', 21, '移动应用开发', '20级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080391, '葛科炜', '0', 21, '数字媒体', '18级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080392, '谢雨', '0', 21, '移动应用开发', '18级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080393, '吕依莉', '0', 21, '移动应用开发', '20级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080394, '罗智伟', '0', 20, '移动应用开发', '18级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080395, '邵加煊', '0', 21, '移动应用开发', '19级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080396, '叶凡', '0', 21, '动漫设计', '20级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080397, '施畅', '0', 21, '移动应用开发', '20级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080398, '卫晓雯', '0', 21, '移动应用开发', '19级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080399, '赵晨淞', '0', 21, '数字媒体', '18级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080400, '励诗磊', '0', 20, '移动应用开发', '18级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080401, '童诗琴', '0', 21, '数字媒体', '18级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080402, '吴潇翔', '0', 20, '动漫设计', '18级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080403, '郑小倩', '0', 21, '移动应用开发', '18级', 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', NULL, '123456');
INSERT INTO `students` VALUES (2018080406, '对对', '0', NULL, '啊啊', NULL, 'https://s1.ax1x.com/2020/05/09/Ylb3ND.jpg', 1, '1234567as');

-- ----------------------------
-- Table structure for ticket
-- ----------------------------
DROP TABLE IF EXISTS `ticket`;
CREATE TABLE `ticket`  (
  `student_id` int(0) NOT NULL,
  `book_id` int(0) NOT NULL,
  `over_date` int(0) NULL DEFAULT NULL,
  `ticket_price` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  INDEX `student_id`(`student_id`) USING BTREE,
  INDEX `book_id`(`book_id`) USING BTREE,
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`stu_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ticket
-- ----------------------------
INSERT INTO `ticket` VALUES (2018080371, 4, 12, '6');

SET FOREIGN_KEY_CHECKS = 1;
