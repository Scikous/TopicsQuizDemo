CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password CHAR(60),
  admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE topics (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) UNIQUE
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL
);

CREATE TABLE question_answer_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE
);

CREATE TABLE question_answers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  question_answer_option_id INTEGER REFERENCES question_answer_options(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX ON users((lower(email)));

INSERT INTO users (email, password, admin)
  VALUES ('admin@admin.com','$2a$10$IML8QCf6xA.alRbW.CG5PuvYc3Qs94vJvoTwbsSehs8s515cUMuZa', true);
INSERT INTO users (email, password, admin)
  VALUES ('user@user.com','$2a$10$KYlUJ7c06AjBIRPFhQKjO.OuOVz.EgpqGzj4y.L1nUawuhwUB.rou', false);

INSERT INTO topics (user_id, name)
  VALUES ((SELECT id FROM users WHERE email = 'admin@admin.com'), 'Finnish language');
INSERT INTO questions (user_id, topic_id, question_text)
  VALUES ((SELECT id FROM users WHERE email = 'admin@admin.com'), 1, 'You can create made up words and still be understood fine?');
INSERT INTO question_answer_options (question_id, option_text, is_correct)
  VALUES (1,'Absolutely', TRUE);
INSERT INTO question_answer_options (question_id, option_text, is_correct)
  VALUES (1,'You cannot',FALSE);