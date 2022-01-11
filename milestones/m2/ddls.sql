DROP TABLE joins_server;
DROP TABLE joins_channel;
DROP TABLE moderates;
DROP TABLE reacts;
DROP TABLE emoji;
DROP TABLE "message";
DROP TABLE thread;
DROP TABLE direct_message;
DROP TABLE group_channel;
DROP TABLE channel;
DROP TABLE "server"; 
DROP TABLE horoscopes;
DROP TABLE "profile";
DROP TABLE "location";
DROP TABLE "user";


CREATE TABLE "server" (
    ID                  INTEGER,
    ServerName          VARCHAR(50),
    ServerDescription   VARCHAR(200),
    PRIMARY KEY (ID)
);

grant select on "server" to public;

CREATE TABLE channel (
    ChannelName         VARCHAR(50),
    ServerID            INTEGER NOT NULL,
    PRIMARY KEY (ServerID, ChannelName),
    FOREIGN KEY (ServerID) REFERENCES "server"(ID)
        ON DELETE CASCADE
);

grant select on channel to public;

CREATE TABLE group_channel (
    ChannelName         VARCHAR(50),
    ServerID            INTEGER,
    ChannelDescription  VARCHAR(200),
    PRIMARY KEY (ServerID, ChannelName),
    FOREIGN KEY (ServerID, ChannelName) REFERENCES channel(ServerID, ChannelName)
        ON DELETE CASCADE
);

grant select on group_channel to public;

CREATE TABLE direct_message (
    ChannelName         VARCHAR(50),
    ServerID            INTEGER,
    PRIMARY KEY (ServerID, ChannelName),
    FOREIGN KEY (ServerID, ChannelName) REFERENCES channel(ServerID, ChannelName)
        ON DELETE CASCADE
);

grant select on group_channel to public;

CREATE TABLE "user" (
    ID                  INTEGER,
    BirthDay            INTEGER,
    BirthMonth          INTEGER,
    BirthYear           INTEGER,
    PRIMARY KEY (ID)
);

grant select on "user" to public;

CREATE TABLE horoscopes (
    BirthDay            INTEGER, 
    BirthMonth          INTEGER,
    Horoscope           VARCHAR(20),
    PRIMARY KEY (BirthDay, BirthMonth)
);

grant select on horoscopes to public;

CREATE TABLE "profile" (
    ID                  INTEGER,
    UserID              INTEGER UNIQUE NOT NULL,
    FirstName           VARCHAR(20),
    LastName            VARCHAR(20),
    ProfilePicture      VARCHAR(50),
    Zipcode             VARCHAR(10),
    MoodStatus          VARCHAR(20),
    FOREIGN KEY (UserID) REFERENCES "user"(ID)
);

grant select on "profile" to public;

CREATE TABLE "location" (
    Zipcode             VARCHAR(10),
    Timezone            Varchar(20),
    PRIMARY KEY (Zipcode)
);

grant select on "location" to public;

CREATE TABLE thread (
    ID                  INTEGER,
    PRIMARY KEY (ID)
);

grant select on thread to public;

CREATE TABLE "message" (
    ID                  INTEGER,
    UserID              INTEGER NOT NULL,
    MessageContent      VARCHAR(500),
    TimePosted          INTEGER NOT NULL,
    ServerID            INTEGER NOT NULL,
    ChannelName         VARCHAR(50) NOT NULL,
    ThreadID            INTEGER,
    PRIMARY KEY (ID),
    FOREIGN KEY (UserID) REFERENCES "user"(ID),
    FOREIGN KEY (ServerID) REFERENCES "server"(ID)
        ON DELETE CASCADE,
    FOREIGN KEY (ServerID, ChannelName) REFERENCES channel(ServerID, ChannelName)
        ON DELETE CASCADE,
    FOREIGN KEY (ThreadID) REFERENCES thread(ID)
);

grant select on "message" to public;

CREATE TABLE joins_server (
    UserID              INTEGER,
    ServerID            INTEGER,
    PRIMARY KEY (UserID, ServerID),
    FOREIGN KEY (UserID) REFERENCES "user"(ID)
        ON DELETE CASCADE,
    FOREIGN KEY (ServerID) REFERENCES "server"(ID)
        ON DELETE CASCADE
);

grant select on joins_server to public;

CREATE TABLE joins_channel (
    UserID              INTEGER,
    ServerID            INTEGER,
    ChannelName         VARCHAR(50),
    PRIMARY KEY (UserID, ServerID, ChannelName),
    FOREIGN KEY (UserID) REFERENCES "user"(ID)
        ON DELETE CASCADE,
    FOREIGN KEY (ServerID) REFERENCES "server"(ID)
        ON DELETE CASCADE,
    FOREIGN KEY (ServerID, ChannelName) REFERENCES channel(ServerID, ChannelName)
        ON DELETE CASCADE
);

grant select on joins_channel to public;

CREATE TABLE moderates (
    UserID              INTEGER,
    ServerID            INTEGER,
    PRIMARY KEY (UserID, ServerID),
    FOREIGN KEY (UserID) REFERENCES "user"(ID)
        ON DELETE CASCADE,
    FOREIGN KEY (ServerID) REFERENCES "server"(ID)
        ON DELETE CASCADE
);

grant select on moderates to public;

CREATE TABLE emoji (
    EmojiName           VARCHAR(50),
    Link                VARCHAR(50) NOT NULL,
    PRIMARY KEY (EmojiName)
);

grant select on emoji to public;

CREATE TABLE reacts (
    UserID              INTEGER,
    MessageID           INTEGER,
    EmojiName           VARCHAR(50),
    PRIMARY KEY (UserID, MessageID, EmojiName),
    FOREIGN KEY (UserID) REFERENCES "user"(ID),
    FOREIGN KEY (MessageID) REFERENCES "message"(ID),
    FOREIGN KEY (EmojiName) REFERENCES emoji(EmojiName)
);

grant select on reacts to public;
