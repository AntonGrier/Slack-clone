INSERT INTO "server"
    (ID, ServerName, ServerDescription)
VALUES 
    (001, 'UBC CPSC', 'A place for UBC CPSC students to cry'),
    (002, 'UBC', 'Unite!'),
    (003, 'Gregor''s Fanbois', 'Eh'),
    (004, 'Minescraft Nerds', 'Let''s build something here'),
    (005, 'Call of Duty Gamers', 'Breh');

INSERT INTO channel
    (ChannelName, ServerID)
VALUES 
    ('general', 001),
    ('cry-hall', 001),
    ('general', 002),
    ('memes', 003),
    ('ahnaf-and-kim', 004),
    ('ahnaf-and-anton', 001),
    ('kim-and-anton', 005),
    ('coca-and-cola', 004),
    ('cat-and-dog', 003);

INSERT INTO group_channel
    (ChannelName, ServerID, ChannelDescription)
VALUES 
    ('general', 001, 'A place for everything'),
    ('cry-hall', 001, 'A place to cry'),
    ('general', 002, 'A place for everything'),
    ('memes', 003, 'Try your best'),
    ('are-you-failing-110', 003, NULL),
    ('general', 004, 'A place for everything'),
    ('general', 005, 'A place for everything');

INSERT INTO direct_message
    (ChannelName, ServerID)
VALUES
    ('ahnaf-and-kim', 004),
    ('ahnaf-and-anton', 001),
    ('kim-and-anton', 005),
    ('coca-and-cola', 004),
    ('cat-and-dog', 003);

INSERT INTO users
    (ID)
VALUES 
    (00001),
    (00002),
    (00003),
    (00004),
    (00005);

INSERT INTO profile
    (ID, UserID, FirstName, LastName, ProfilePicture, MoodStatus, Timezone) 
VALUES 
    (00001, 00001, 'Alan', 'Ahaha', 'https://localhost:8080/dp/kt4n47y2z6bc8', 'On Vacay', '‎UTC−07:00'),
    (00002, 00002, 'Rob', 'Banks', 'https://localhost:8080/dp/lg4n47y2z6bc8', 'Om nom', '‎UTC−07:00'),
    (00003, 00003, 'Alina', 'Chowder', 'https://localhost:8080/dp/kt4n49y2z6bc8', NULL, '‎UTC−07:00'),
    (00004, 00004, 'Chika', 'Wowwow', 'https://localhost:8080/dp/kt4n47y2z6bc8', 'Day dreaming', '‎UTC−07:00'),
    (00005, 00005, 'Buttercup', 'Anderson', 'https://localhost:8080/dp/kt8n47y2z6on8', NULL, '‎UTC−04:00');

INSERT INTO message
    (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID)
VALUES 
    (000001, 00005, 'Yo', 1635094932, 004, 'coca-and-cola', NULL),
    (000002, 00005, 'Wanna start a game?', 1635094935, 004, 'coca-and-cola', NULL),
    (000003, 00005, 'I''m so bored pls say yes', 1635094940, 004, 'coca-and-cola', NULL),
    (000004, 00004, 'Sure', 1635094960, 004, 'coca-and-cola', NULL),
    (000005, 00004, 'Send the invite', 1635095001, 004, 'coca-and-cola', NULL),
    (000006, 00001, 'Announcement', 1635095001, 001, 'general', 00001),
    (000007, 00001, 'Stuff is happening.', 1635095009, 001, 'general', 00001),
    (000008, 00002, 'Eh', 1635095001, 003, 'memes', 00002),
    (000009, 00003, 'Eh', 1635095002, 003, 'memes', 00002),
    (000010, 00004, 'Eh', 1635098406, 003, 'are-you-failing-110', 00003),
    (000011, 00004, 'Eh', 1635098500, 003, 'are-you-failing-110', 00003),
    (000012, 00004, 'Eh', 1635095001, 004, 'general', 00004),
    (000013, 00004, 'Eh', 1635095001, 004, 'general', 00004),
    (000014, 00004, 'Eh', 1635095001, 005, 'general', 00005),
    (000015, 00004, 'Eh', 1635095001, 005, 'general', 00005);

INSERT INTO thread
    (ID)
VALUES 
    (00001),
    (00002),
    (00003),
    (00004),
    (00005);

INSERT INTO joins_server
    (UserID, ServerID)
VALUES 
    (00001, 001),
    (00001, 002),
    (00001, 003),
    (00002, 003),
    (00003, 003),
    (00004, 003),
    (00004, 004),
    (00005, 004),
    (00004, 005);

INSERT INTO joins_channel
    (UserID, ServerID, ChannelName)
VALUES 
    (00001, 001, 'general'),
    (00001, 003, 'memes'),
    (00002, 003, 'memes'),
    (00003, 003, 'memes'),
    (00004, 003, 'are-you-failing-110'),
    (00004, 004, 'general'),
    (00004, 004, 'coca-and-cola'),
    (00005, 004, 'coca-and-cola'),
    (00004, 005, 'general');

INSERT INTO moderates
    (UserID, ServerID)
VALUES 
    (00001, 001),
    (00001, 002),
    (00003, 003),
    (00004, 004),
    (00004, 005);

INSERT INTO emoji
    (EmojiName, Link)
VALUES 
    ('cry', 'https://localhost:8080/emoji/cry'),
    ('smile', 'https://localhost:8080/emoji/smile'),
    ('laugh', 'https://localhost:8080/emoji/laugh'),
    ('think', 'https://localhost:8080/emoji/think'),
    ('angry', 'https://localhost:8080/emoji/angry'),
    ('heart', 'https://localhost:8080/emoji/heart');

INSERT INTO reacts
    (UserID, MessageID, EmojiName)
VALUES 
    (00001, 000008, 'laugh'),
    (00002, 000008, 'laugh'),
    (00003, 000008, 'laugh'),
    (00002, 000008, 'heart'),
    (00003, 000008, 'heart');