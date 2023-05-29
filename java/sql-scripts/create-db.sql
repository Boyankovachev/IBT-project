CREATE TABLE survey(
    survey_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE question(
    question_id INTEGER PRIMARY KEY AUTOINCREMENT,
    survey_id INTEGER NOT NULL,
    question_text TEXT,
    FOREIGN KEY (survey_id)
        REFERENCES survey(survey_id)
);

CREATE TABLE answer(
    answer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER NOT NULL,
    answer_text TEXT,
    votes INTEGER DEFAULT (0),
    FOREIGN KEY (question_id)
        REFERENCES question(question_id)
)