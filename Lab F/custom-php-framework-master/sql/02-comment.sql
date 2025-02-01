CREATE TABLE comment
(
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    author  TEXT    NOT NULL,
    content TEXT    NOT NULL,
    post_id INTEGER NOT NULL,
    FOREIGN KEY (post_id) REFERENCES post (id)
);