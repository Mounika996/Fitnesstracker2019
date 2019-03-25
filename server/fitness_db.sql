/*
 Navicat Premium Data Transfer

 Source Server         : New Connection
 Source Server Type    : MySQL
 Source Server Version : 100138
 Source Host           : localhost:3306
 Source Schema         : fitness_db

 Target Server Type    : MySQL
 Target Server Version : 100138
 File Encoding         : 65001

 Date: 21/03/2019 22:34:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_calories
-- ----------------------------
DROP TABLE IF EXISTS `tbl_calories`;
CREATE TABLE `tbl_calories`  (
  `idx` int(20) NOT NULL AUTO_INCREMENT,
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `calories_burnt` int(20) NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`idx`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for tbl_friends
-- ----------------------------
DROP TABLE IF EXISTS `tbl_friends`;
CREATE TABLE `tbl_friends`  (
  `idx` int(20) NOT NULL AUTO_INCREMENT,
  `following` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `follower` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`idx`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tbl_friends
-- ----------------------------
INSERT INTO `tbl_friends` VALUES (1, 'admin', 'user2', '2019-03-20 12:49:39');
INSERT INTO `tbl_friends` VALUES (2, 'admin', 'user1', '2019-03-20 12:58:39');
INSERT INTO `tbl_friends` VALUES (3, 'admin', 'Jhon', '2019-03-21 21:02:54');

-- ----------------------------
-- Table structure for tbl_heartbeats
-- ----------------------------
DROP TABLE IF EXISTS `tbl_heartbeats`;
CREATE TABLE `tbl_heartbeats`  (
  `idx` int(20) NOT NULL AUTO_INCREMENT,
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `heartbeats` int(20) NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`idx`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for tbl_period
-- ----------------------------
DROP TABLE IF EXISTS `tbl_period`;
CREATE TABLE `tbl_period`  (
  `idx` int(20) NOT NULL AUTO_INCREMENT,
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `period` int(20) NULL DEFAULT NULL COMMENT 'second',
  `created_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`idx`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for tbl_slept_time
-- ----------------------------
DROP TABLE IF EXISTS `tbl_slept_time`;
CREATE TABLE `tbl_slept_time`  (
  `idx` int(20) NOT NULL AUTO_INCREMENT,
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `slept_time` int(20) NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`idx`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tbl_slept_time
-- ----------------------------
INSERT INTO `tbl_slept_time` VALUES (1, 'admin', 50, '2019-03-21 22:30:35');

-- ----------------------------
-- Table structure for tbl_steps
-- ----------------------------
DROP TABLE IF EXISTS `tbl_steps`;
CREATE TABLE `tbl_steps`  (
  `idx` int(20) NOT NULL AUTO_INCREMENT,
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `steps` int(20) NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`idx`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for tbl_users
-- ----------------------------
DROP TABLE IF EXISTS `tbl_users`;
CREATE TABLE `tbl_users`  (
  `idx` int(20) NOT NULL AUTO_INCREMENT,
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `firstname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `lastname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `birthday` date NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `height` double NULL DEFAULT NULL,
  `weight` double NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`idx`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tbl_users
-- ----------------------------
INSERT INTO `tbl_users` VALUES (1, 'admin', 'Xu', 'Hao', '1994-03-25', '*514FC2971F3E94BB16F25C396219DFDF01D02443', 179, 78, '2019-03-21 22:33:01');
INSERT INTO `tbl_users` VALUES (2, 'user1', 'Yates', 'Jhon', '1969-02-01', '*514FC2971F3E94BB16F25C396219DFDF01D02443', 191, 89, '2019-03-20 12:58:06');
INSERT INTO `tbl_users` VALUES (3, 'user2', 'George', 'sphere', '1979-05-07', '*514FC2971F3E94BB16F25C396219DFDF01D02443', 183, 72, '2019-03-20 13:00:15');

SET FOREIGN_KEY_CHECKS = 1;
