CREATE DATABASE 'task3';

USE 'task3';

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `name` varchar(15) NOT NULL,
  `amount` int(10) NOT NULL,
  `broker_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `broker` (
  `id` int(11) NOT NULL,
  `name` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `customer` (`id`, `name`, `amount`, `broker_id`) VALUES
(1, 'sam', 3000, 4),
(2, 'john', 4000, 2),
(3, 'mack', 5000, 2),
(4, 'test', 3000, 3),
(5, 'june', 2000, 3),
(6, 'mike', 4000, 1),
(7, 'annie', 4000, 2),
(8, 'micheal', 2000, 1),
(9, 'tom', 2000, 4),
(10, 'jason', 6000, 4);

INSERT INTO `broker` (`id`, `name`) VALUES
(1, 'Ted'),
(2, 'Mark'),
(3, 'Aaron'),
(4, 'Luke');

SELECT * FROM `users`;
SELECT * FROM `broker`;

SELECT b.name 'BROKER_NAME', COUNT(DISTINCT c.id) 'NUM_CUSTOMERS'
FROM customer c
INNER JOIN broker b
ON b.id = c.broker_id
GROUP BY c.broker_id
ORDER BY COUNT(DISTINCT c.id) DESC;