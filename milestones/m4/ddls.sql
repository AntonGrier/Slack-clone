DROP TABLE joins_channel;
DROP TABLE joins_server;
DROP TABLE moderates;
DROP TABLE reacts;
DROP TABLE emoji;
DROP TABLE "message";
DROP TABLE thread;
DROP TABLE direct_message;
DROP TABLE group_channel;
DROP TABLE channel;
DROP TABLE "server"; 
DROP TABLE "profile";
DROP TABLE "user";

CREATE TABLE "server" (
    ID                  raw(16) DEFAULT sys_guid(),
    ServerName          VARCHAR(50),
    ServerDescription   VARCHAR(200),
    PRIMARY KEY (ID)
);

grant ALL PRIVILEGES on "server" to public;

CREATE TABLE channel (
    ChannelName         VARCHAR(50),
    ServerID            raw(16),
    PRIMARY KEY (ServerID, ChannelName),
    FOREIGN KEY (ServerID) REFERENCES "server"(ID)
        ON DELETE CASCADE
);

grant ALL PRIVILEGES on channel to public;

CREATE TABLE group_channel (
    ChannelName         VARCHAR(50),
    ServerID            raw(16),
    ChannelDescription  VARCHAR(200),
    PRIMARY KEY (ServerID, ChannelName),
    FOREIGN KEY (ServerID, ChannelName) REFERENCES channel(ServerID, ChannelName)
        ON DELETE CASCADE
);

grant ALL PRIVILEGES on group_channel to public;

CREATE TABLE direct_message (
    ChannelName         VARCHAR(50),
    ServerID            raw(16),
    PRIMARY KEY (ServerID, ChannelName),
    FOREIGN KEY (ServerID, ChannelName) REFERENCES channel(ServerID, ChannelName)
        ON DELETE CASCADE
);

grant ALL PRIVILEGES on group_channel to public;

CREATE TABLE "user" (
    ID                  raw(16) DEFAULT sys_guid(),
    UserEmail           VARCHAR(50) UNIQUE NOT NULL,
    UserPassword        VARCHAR(50) NOT NULL,
    PRIMARY KEY (ID)
);

grant ALL PRIVILEGES on "user" to public;

CREATE TABLE "profile" (
    ID                  raw(16) DEFAULT sys_guid(),
    UserID              raw(16) UNIQUE NOT NULL,
    FirstName           VARCHAR(20),
    LastName            VARCHAR(20),
    ProfilePicture      VARCHAR(50),
    TimezoneOffset      Integer,
    MoodStatus          VARCHAR(20),
    FOREIGN KEY (UserID) REFERENCES "user"(ID)
);

grant ALL PRIVILEGES on "profile" to public;

CREATE TABLE thread (
    ID                  raw(16) DEFAULT sys_guid(),
    PRIMARY KEY (ID)
);

grant ALL PRIVILEGES on thread to public;

CREATE TABLE "message" (
    ID                  raw(16) DEFAULT sys_guid(),
    UserID              raw(16) NOT NULL,
    MessageContent      VARCHAR(500),
    TimePosted          INTEGER NOT NULL,
    ServerID            raw(16) NOT NULL,
    ChannelName         VARCHAR(50) NOT NULL,
    ThreadID            raw(16),
    PRIMARY KEY (ID),
    FOREIGN KEY (UserID) REFERENCES "user"(ID),
    FOREIGN KEY (ServerID) REFERENCES "server"(ID)
        ON DELETE CASCADE,
    FOREIGN KEY (ServerID, ChannelName) REFERENCES channel(ServerID, ChannelName)
        ON DELETE CASCADE,
    FOREIGN KEY (ThreadID) REFERENCES thread(ID)
);

grant ALL PRIVILEGES on "message" to public;

CREATE TABLE joins_server (
    UserID              raw(16),
    ServerID            raw(16),
    PRIMARY KEY (UserID, ServerID),
    FOREIGN KEY (UserID) REFERENCES "user"(ID)
        ON DELETE CASCADE,
    FOREIGN KEY (ServerID) REFERENCES "server"(ID)
        ON DELETE CASCADE
);

grant ALL PRIVILEGES on joins_server to public;

CREATE TABLE joins_channel (
    UserID              raw(16),
    ServerID            raw(16),
    ChannelName         VARCHAR(50),
    PRIMARY KEY (UserID, ServerID, ChannelName),
    FOREIGN KEY (UserID) REFERENCES "user"(ID)
        ON DELETE CASCADE,
    FOREIGN KEY (ServerID) REFERENCES "server"(ID)
        ON DELETE CASCADE,
    FOREIGN KEY (ServerID, ChannelName) REFERENCES channel(ServerID, ChannelName)
        ON DELETE CASCADE,
    FOREIGN KEY (UserID, ServerID) REFERENCES joins_server(UserID, ServerID)
        ON DELETE CASCADE
);

grant ALL PRIVILEGES on joins_channel to public;

CREATE TABLE moderates (
    UserID              raw(16),
    ServerID            raw(16),
    PRIMARY KEY (UserID, ServerID),
    FOREIGN KEY (UserID) REFERENCES "user"(ID)
        ON DELETE CASCADE,
    FOREIGN KEY (ServerID) REFERENCES "server"(ID)
        ON DELETE CASCADE
);

grant ALL PRIVILEGES on moderates to public;

CREATE TABLE emoji (
    EmojiName           VARCHAR(50),
    Link                VARCHAR(50) NOT NULL,
    PRIMARY KEY (EmojiName)
);

grant ALL PRIVILEGES on emoji to public;

CREATE TABLE reacts (
    UserID              raw(16),
    MessageID           raw(16),
    EmojiName           VARCHAR(50),
    PRIMARY KEY (UserID, MessageID, EmojiName),
    FOREIGN KEY (UserID) REFERENCES "user"(ID),
    FOREIGN KEY (MessageID) REFERENCES "message"(ID),
    FOREIGN KEY (EmojiName) REFERENCES emoji(EmojiName)
);

grant ALL PRIVILEGES on reacts to public;


-- DATA INSERTION

INSERT ALL
    INTO "server" (ID, ServerName, ServerDescription) VALUES ('001', 'UBC CPSC', 'A place for UBC CPSC students to cry')
    INTO "server" (ID, ServerName, ServerDescription) VALUES ('002', 'UBC', 'Unite!')
    INTO "server" (ID, ServerName, ServerDescription) VALUES ('003', 'Gregor''s Fanbois', 'Eh')
    INTO "server" (ID, ServerName, ServerDescription) VALUES ('004', 'Minescraft Nerds', 'Let''s build something here')
    INTO "server" (ID, ServerName, ServerDescription) VALUES ('005', 'Call of Duty Gamers', 'Breh')
SELECT * FROM dual;

INSERT ALL
    INTO channel (ChannelName, ServerID) VALUES ('cry-hall', '001')
    INTO channel (ChannelName, ServerID) VALUES ('general', '001')
    INTO channel (ChannelName, ServerID) VALUES ('general', '002')
    INTO channel (ChannelName, ServerID) VALUES ('memes', '003')
    INTO channel (ChannelName, ServerID) VALUES ('ahnaf-and-kim', '004')
    INTO channel (ChannelName, ServerID) VALUES ('ahnaf-and-anton', '001')
    INTO channel (ChannelName, ServerID) VALUES ('kim-and-anton', '005')
    INTO channel (ChannelName, ServerID) VALUES ('coca-and-cola', '004')
    INTO channel (ChannelName, ServerID) VALUES ('cat-and-dog', '003')
    INTO channel (ChannelName, ServerID) VALUES ('are-you-failing-110', '003')
    INTO channel (ChannelName, ServerID) VALUES ('are-you-passing-311', '003')
    INTO channel (ChannelName, ServerID) VALUES ('general', '004')
    INTO channel (ChannelName, ServerID) VALUES ('general', '005')
SELECT * FROM dual;

INSERT ALL
    INTO group_channel (ChannelName, ServerID, ChannelDescription) VALUES ('general', '001', 'A place for everything')
    INTO group_channel (ChannelName, ServerID, ChannelDescription) VALUES ('cry-hall', '001', 'A place to cry')
    INTO group_channel (ChannelName, ServerID, ChannelDescription) VALUES ('general', '002', 'A place for everything')
    INTO group_channel (ChannelName, ServerID, ChannelDescription) VALUES ('memes', '003', 'Try your best')
    INTO group_channel (ChannelName, ServerID, ChannelDescription) VALUES ('are-you-failing-110', '003', NULL)
    INTO group_channel (ChannelName, ServerID, ChannelDescription) VALUES ('general', '004', 'A place for everything')
    INTO group_channel (ChannelName, ServerID, ChannelDescription) VALUES ('general', '005', 'A place for everything')
SELECT * FROM dual;

INSERT ALL
    INTO direct_message (ChannelName, ServerID) VALUES ('ahnaf-and-kim', '004')
    INTO direct_message (ChannelName, ServerID) VALUES ('ahnaf-and-anton', '001')
    INTO direct_message (ChannelName, ServerID) VALUES ('kim-and-anton', '005')
    INTO direct_message (ChannelName, ServerID) VALUES ('coca-and-cola', '004')
    INTO direct_message (ChannelName, ServerID) VALUES ('cat-and-dog', '003')
SELECT * FROM dual;

INSERT ALL
    INTO "user" (ID, UserEmail, UserPassword) VALUES ('00001', 'a@email.com', 'password')
    INTO "user" (ID, UserEmail, UserPassword) VALUES ('00002', 'b@email.com', 'password')
    INTO "user" (ID, UserEmail, UserPassword) VALUES ('00003', 'c@email.com', 'password')
    INTO "user" (ID, UserEmail, UserPassword) VALUES ('00004', 'd@email.com', 'password')
    INTO "user" (ID, UserEmail, UserPassword) VALUES ('00005', 'e@email.com', 'password')
SELECT * FROM dual;

INSERT ALL
    INTO "profile" (ID, UserID, FirstName, LastName, ProfilePicture, TimezoneOffset, MoodStatus) VALUES ('00001', '00001', 'Alan', 'Ahaha', 'https://localhost:8080/dp/kt4n47y2z6bc8', 420, 'On Vacay')
    INTO "profile" (ID, UserID, FirstName, LastName, ProfilePicture, TimezoneOffset, MoodStatus) VALUES ('00002', '00002', 'Rob', 'Banks', 'https://localhost:8080/dp/lg4n47y2z6bc8', 420, 'Om nom')
    INTO "profile" (ID, UserID, FirstName, LastName, ProfilePicture, TimezoneOffset, MoodStatus) VALUES ('00003', '00003', 'Alina', 'Chowder', 'https://localhost:8080/dp/kt4n49y2z6bc8', 420, 'Yahoo')
    INTO "profile" (ID, UserID, FirstName, LastName, ProfilePicture, TimezoneOffset, MoodStatus) VALUES ('00004', '00004', 'Chika', 'Wowwow', 'https://localhost:8080/dp/kt4n47y2z6bc8', 420, 'Day dreaming')
    INTO "profile" (ID, UserID, FirstName, LastName, ProfilePicture, TimezoneOffset, MoodStatus) VALUES ('00005', '00005', 'Buttercup', 'Anderson', 'https://localhost:8080/dp/kt8n47y2z6on8', 240, 'Spaghetti')
SELECT * FROM dual;

INSERT ALL
    INTO thread (ID) VALUES  ('00001')
    INTO thread (ID) VALUES  ('00002')
    INTO thread (ID) VALUES  ('00003')
    INTO thread (ID) VALUES  ('00004')
    INTO thread (ID) VALUES  ('00005')
SELECT * FROM dual;

INSERT ALL
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000001', '00005', 'Yo', 1635094932, '004', 'coca-and-cola', NULL)
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000002', '00005', 'Wanna start a game?', 1635094935, '004', 'coca-and-cola', NULL)
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000003', '00005', 'I''m so bored pls say yes', 1635094940, '004', 'coca-and-cola', NULL)
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000004', '00004', 'Sure', 1635094960, '004', 'coca-and-cola', NULL)
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000005', '00004', 'Send the invite', 1635095001, '004', 'coca-and-cola', NULL)
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000006', '00001', 'Announcement', 1635095001, '001', 'general', '00001')
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000007', '00001', 'Stuff is happening.', 1635095009, '001', 'general', '00001')
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000008', '00002', 'WAHAHAHA', 1635095001, '003', 'memes', '00002')
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000009', '00003', 'This is an exciting point in my life sir', 1635095002, '003', 'memes', '00002')
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000010', '00004', 'Would you like a reference letter?', 1635098406, '003', 'are-you-failing-110', '00003')
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000011', '00004', 'Im failing my assignment boss', 1635098500, '003', 'are-you-failing-110', '00003')
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000012', '00004', 'Hey can you help me here for a sec?', 1635095001, '004', 'general', '00004')
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000013', '00004', 'Yo sir', 1635095001, '004', 'general', '00004')
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000014', '00004', 'I would like to present to you my most recent findings', 1635095001, '005', 'general', '00005')
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000015', '00004', 'Eh', 1635095001, '005', 'general', '00005')
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000016', '00002', 'Once again im asking for your support', 1635095010, '003', 'memes', NULL)
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000017', '00002', 'Is this a meme', 1635095020, '003', 'memes', NULL)
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000018', '00002', 'Meme cat', 1635095031, '003', 'memes', NULL)
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000019', '00002', 'Kermit the frog', 1635095051, '003', 'memes', NULL)
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000020', '00002', 'Distracted guy and girlfriend', 1635095071, '003', 'memes', NULL)
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000021', '00003', 'Hello!', 1635095071, '003', 'cat-and-dog', NULL)
    INTO "message" (ID, UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) VALUES ('000022', '00004', 'Hi!', 1635095081, '003', 'cat-and-dog', NULL)
SELECT * FROM dual;

INSERT ALL
    INTO joins_server (UserID, ServerID) VALUES ('00001', '001')
    INTO joins_server (UserID, ServerID) VALUES ('00001', '002')
    INTO joins_server (UserID, ServerID) VALUES ('00001', '003')
    INTO joins_server (UserID, ServerID) VALUES ('00002', '001')
    INTO joins_server (UserID, ServerID) VALUES ('00002', '003')
    INTO joins_server (UserID, ServerID) VALUES ('00003', '001')
    INTO joins_server (UserID, ServerID) VALUES ('00003', '003')
    INTO joins_server (UserID, ServerID) VALUES ('00004', '003')
    INTO joins_server (UserID, ServerID) VALUES ('00004', '004')
    INTO joins_server (UserID, ServerID) VALUES ('00005', '004')
    INTO joins_server (UserID, ServerID) VALUES ('00004', '005')
SELECT * FROM dual;

INSERT ALL
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00001', '001', 'general')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00001', '002', 'general')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00001', '001', 'cry-hall')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00001', '001', 'ahnaf-and-anton')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00002', '001', 'general')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00002', '001', 'cry-hall')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00002', '001', 'ahnaf-and-anton')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00003', '001', 'general')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00003', '001', 'cry-hall')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00003', '001', 'ahnaf-and-anton')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00001', '003', 'memes')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00002', '003', 'memes')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00003', '003', 'memes')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00001', '003', 'are-you-failing-110')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00002', '003', 'are-you-failing-110')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00003', '003', 'are-you-failing-110')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00004', '003', 'are-you-failing-110')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00001', '003', 'are-you-passing-311')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00003', '003', 'cat-and-dog')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00004', '003', 'cat-and-dog')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00004', '004', 'general')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00004', '004', 'coca-and-cola')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00005', '004', 'coca-and-cola')
    INTO joins_channel (UserID, ServerID, ChannelName) VALUES ('00004', '005', 'general')
SELECT * FROM dual;

INSERT ALL
    INTO moderates (UserID, ServerID) VALUES ('00001', '001')
    INTO moderates (UserID, ServerID) VALUES ('00001', '002')
    INTO moderates (UserID, ServerID) VALUES ('00003', '003')
    INTO moderates (UserID, ServerID) VALUES ('00004', '004')
    INTO moderates (UserID, ServerID) VALUES ('00004', '005')
SELECT * FROM dual;

INSERT ALL
    INTO emoji (EmojiName, Link) VALUES ('cry', 'https://localhost:8080/emoji/cry')
    INTO emoji (EmojiName, Link) VALUES ('smile', 'https://localhost:8080/emoji/smile')
    INTO emoji (EmojiName, Link) VALUES ('laugh', 'https://localhost:8080/emoji/laugh')
    INTO emoji (EmojiName, Link) VALUES ('think', 'https://localhost:8080/emoji/think')
    INTO emoji (EmojiName, Link) VALUES ('angry', 'https://localhost:8080/emoji/angry')
    INTO emoji (EmojiName, Link) VALUES ('heart', 'https://localhost:8080/emoji/heart')
SELECT * FROM dual;

INSERT ALL
    INTO reacts (UserID, MessageID, EmojiName) VALUES ('00001', '000008', 'laugh')
    INTO reacts (UserID, MessageID, EmojiName) VALUES ('00002', '000008', 'laugh')
    INTO reacts (UserID, MessageID, EmojiName) VALUES ('00003', '000008', 'laugh')
    INTO reacts (UserID, MessageID, EmojiName) VALUES ('00002', '000008', 'heart')
    INTO reacts (UserID, MessageID, EmojiName) VALUES ('00003', '000008', 'heart')
SELECT * FROM dual;

COMMIT WORK;
