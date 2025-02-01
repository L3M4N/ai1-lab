<?php require 'templates/layout.html.php'; ?>

<h1>Komentarz</h1>

<p><strong>ID:</strong> <?= htmlspecialchars($comment->getId()) ?></p>
<p><strong>Autor:</strong> <?= htmlspecialchars($comment->getAuthor()) ?></p>
<p><strong>Treść:</strong> <?= htmlspecialchars($comment->getContent()) ?></p>
<p><strong>ID Posta:</strong> <?= htmlspecialchars($comment->getPostId()) ?></p>

<a href="<?= $router->generatePath('comment-index') ?>">Powrót do listy</a>