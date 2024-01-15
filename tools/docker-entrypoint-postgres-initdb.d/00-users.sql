CREATE TABLE IF NOT EXISTS USERS(
    id serial PRIMARY KEY,
    role VARCHAR (255) NOT NULL,
    firstName VARCHAR (255) NOT NULL,
    lastName VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL,
    lasttestdate VARCHAR (255),
    score INTEGER,
    questans VARCHAR[]
);

CREATE TABLE IF NOT EXISTS QUESTIONS(
    id serial PRIMARY KEY,
    questions VARCHAR[] NOT NULL,
    answer1 INTEGER NOT NULL,
    variants1 VARCHAR[] NOT NULL,
    answer2 INTEGER NOT NULL,
    variants2 VARCHAR[] NOT NULL,
    answer3 INTEGER[] NOT NULL,
    variants3 VARCHAR[] NOT NULL,
    answer4 VARCHAR (255) NOT NULL,
    answer5 VARCHAR (255) NOT NULL,
    answer6 VARCHAR (255) NOT NULL
);

CREATE TABLE IF NOT EXISTS TEXTS(
    id serial PRIMARY KEY,
    text VARCHAR (1000) NOT NULL
);