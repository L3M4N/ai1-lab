<?php require 'templates/layout.html.php'; ?>

<h1>Komentarze</h1>

<a href="<?= $router->generatePath('comment-create') ?>">Dodaj nowy komentarz</a>

<table>
    <thead>
    <tr>
        <th>ID</th>
        <th>Autor</th>
        <th>Treść</th>
        <th>Akcje</th>
    </tr>
    </thead>
    <tbody>
    <?php foreach ($comments as $comment): ?>
        <tr>
            <td><?= htmlspecialchars($comment->getId()) ?></td>
            <td><?= htmlspecialchars($comment->getAuthor()) ?></td>
            <td><?= htmlspecialchars($comment->getContent()) ?></td>
            <td>
                <a href="<?= $router->generatePath('comment-show', ['commentId' => $comment->getId()]) ?>">Pokaż</a>
                <a href="<?= $router->generatePath('comment-edit', ['commentId' => $comment->getId()]) ?>">Edytuj</a>
                <form action="<?= $router->generatePath('comment-delete', ['commentId' => $comment->getId()]) ?>" method="POST" style="display: inline;">
                    <button type="submit">Usuń</button>
                </form>
            </td>
        </tr>
    <?php endforeach; ?>
    </tbody>
</table>