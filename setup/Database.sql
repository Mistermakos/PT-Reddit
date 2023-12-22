CREATE TABLE `ratings` (
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `site_id` bigint(20) UNSIGNED DEFAULT NULL,
  `rate` tinyint(3) UNSIGNED DEFAULT NULL
);

CREATE TABLE `sites` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `icon` blob DEFAULT NULL,
  `link` text DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `author_id` bigint(20) UNSIGNED DEFAULT NULL,
  `creation_date` date DEFAULT NULL
);

CREATE TABLE `super_users` (
  `user_id` bigint(20) UNSIGNED DEFAULT NULL
);

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `login` varchar(100) NOT NULL,
  `password` char(128) NOT NULL
);

ALTER TABLE `ratings`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `site_id` (`site_id`);

ALTER TABLE `sites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

ALTER TABLE `super_users`
  ADD KEY `user_id` (`user_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`site_id`) REFERENCES `sites` (`id`);

ALTER TABLE `sites`
  ADD CONSTRAINT `sites_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`);

ALTER TABLE `super_users`
  ADD CONSTRAINT `super_users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;