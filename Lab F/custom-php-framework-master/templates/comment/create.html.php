<?php require 'templates/layout.html.php'; ?>

<h1>Dodaj nowy komentarz</h1>

<form action="<?= $router->generatePath('comment-create') ?>" method="POST">
    <div>
        <label for="author">Autor:</label>
        <input type="text" id="author" name="author" value="<?= htmlspecialchars($comment->getAuthor()) ?>">
    </div>
    <div>
        <label for="content">Treść:</label>
        <textarea id="content" name="content"><?= htmlspecialchars($comment->getContent()) ?></textarea>
    </div>
    <div>
        <label for="post_id">ID Posta:</label>
        <input type="number" id="post_id" name="post_id" value="<?= htmlspecialchars($comment->getPostId()) ?>">
    </div>
    <button type="submit">Zapisz</button>
</form>

<a href="<?= $router->generatePath('comment-index') ?>">Powrót do listy</a>