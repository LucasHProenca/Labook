-- Active: 1690555662088@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL
);

CREATE TABLE posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY(creator_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY(post_id) REFERENCES posts(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO users (id, name, email, password, role)
VALUES
("u001", "Fulano", "fulano@email.com", "fulano123", "NORMAL"),
("u002", "Beltrana", "beltrana@email.com", "beltrana00", "NORMAL"),
("u003", "astrodev", "astrodev@email.com", "astrodev99", "ADMIN");

SELECT * FROM users;

INSERT INTO posts(id, creator_id, content, likes, dislikes)
VALUES
("p001", "u001", "será que ta certo?", 2, 1),
("p002", "u002", "será que ta certo agora?", 1, 3),
("p003", "u003", "eee acertei", 10, 1);

SELECT * FROM posts;

INSERT INTO likes_dislikes(user_id, post_id, like)
VALUES
("u001", "p001", 5),
("u002", "p002", 7),
("u003", "p003", 2);

SELECT * FROM likes_dislikes;

DROP TABLE posts;

