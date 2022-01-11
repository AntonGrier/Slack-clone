<?php
require 'sqlExecutors.php';

function generateID() {
    $result = executePlainSQL("SELECT sys_guid() FROM dual");
    
    if (oci_fetch($result)) {
        $id = bin2hex(oci_result($result, 1));
        oci_free_statement($result);
        return $id;
    } else {
        oci_free_statement($result);
        return null;
    }
}

function getUserID($userEmail, $userPassword) {
    $userTuple = array (
        ":bind1" => $userEmail,
        ":bind2" => $userPassword
    );
    $result = executeBoundSQL("SELECT ID FROM \"user\" WHERE UserEmail = :bind1 and UserPassword = :bind2", array($userTuple));
    
    if (oci_fetch($result)) {
        return bin2hex(oci_result($result, 1));
    } else {
        return null;
    }
}

function handleInsertUser() {
    global $db_conn;
    global $success;

    $userEmail = $_POST['UserEmail'];
    $userPassword = $_POST['UserPassword'];

    $userID = getUserID($userEmail, $userPassword);
    if ($userID) {
        http_response_code(400);
        return;
    }

    $userTuple = array(
        ":bind1" => $userEmail,
        ":bind2" => $userPassword
    );

    executeBoundSQL("insert into \"user\" (UserEmail, UserPassword) values (:bind1, :bind2)", array($userTuple));
    $userID = getUserID($userEmail, $userPassword);
    if (!$userID) {
        http_response_code(400);
        return;
    }
    $firstName = $_POST['FirstName'];
    $lastName = $_POST['LastName'];
    $profilePicture = $_POST['ProfilePicture'];
    $timezoneOffset = $_POST['TimezoneOffset'];
    $moodStatus = $_POST['MoodStatus'];

    $profileTuple = array (
        ":bind1" => $userID,
        ":bind2" => $firstName,
        ":bind3" => $lastName,
        ":bind4" => $profilePicture,
        ":bind5" => $timezoneOffset,
        ":bind6" => $moodStatus
    );
    executeBoundSQL("insert into \"profile\" (UserID, FirstName, LastName, ProfilePicture, TimezoneOffset, MoodStatus) values (:bind1, :bind2, :bind3, :bind4, :bind5, :bind6)", array($profileTuple));
    oci_commit($db_conn);
    echo json_encode($userID);
}

function handleInsertServer() {
    global $db_conn;

    $serverID = generateID();
    $userID = $_POST['UserID'];
    $serverName = $_POST['ServerName']; 
    $serverDescription = $_POST['ServerDescription'];

    $tuple = array (
        ":bind1" => $serverID,
        ":bind2" => $serverName,
        ":bind3" => $serverDescription
    );
    $tupleJoin = array (
        ":bind1" => $userID,
        ":bind2" => $serverID
    );

    executeBoundSQL("insert into \"server\" (ID, ServerName, ServerDescription) values (:bind1, :bind2, :bind3)", array($tuple));
    executeBoundSQL("insert into joins_server (UserID, ServerID) values (:bind1, :bind2)", array($tupleJoin));
    executeBoundSQL("insert into moderates (UserID, ServerID) values (:bind1, :bind2)", array($tupleJoin));
    oci_commit($db_conn);
}

function handleInsertChannel() {
    global $db_conn;

    $channelName = $_POST['ChannelName']; 
    $serverID = $_POST['ServerID'];

    $tuple = array (
        ":bind1" => $channelName,
        ":bind2" => $serverID
    );
    $alltuples = array (
        $tuple
    );

    executeBoundSQL("insert into channel (ChannelName, ServerID) values (:bind1, :bind2)", $alltuples);
    oci_commit($db_conn);
}

function handleInsertGroupChannel() {
    global $db_conn;

    $userID = $_POST['UserID'];
    $channelName = $_POST['ChannelName']; 
    $serverID = $_POST['ServerID'];
    $channelDescription = $_POST['ChannelDescription'];

    $tupleChannel = array (
        ":bind1" => $channelName,
        ":bind2" => $serverID
    );
    $tupleGroup = array (
        ":bind1" => $channelName,
        ":bind2" => $serverID,
        ":bind3" => $channelDescription
    );
    $tupleUser = array (
        ":bind1" => $userID,
        ":bind2" => $serverID,
        ":bind3" => $channelName
    );

    executeBoundSQL("insert into channel (ChannelName, ServerID) values (:bind1, :bind2)", array($tupleChannel));
    executeBoundSQL("insert into group_channel (ChannelName, ServerID, ChannelDescription) values (:bind1, :bind2, :bind3)", array($tupleGroup));
    executeBoundSQL("insert into joins_channel values (:bind1, :bind2, :bind3)", array($tupleUser));

    oci_commit($db_conn);
}

function handleInsertDirectMessage() {
    global $db_conn;

    $userID1 = $_POST['UserID1'];
    $userID2 = $_POST['UserID2'];
    $channelName = $_POST['ChannelName']; 
    $serverID = $_POST['ServerID'];

    $tuple = array (
        ":bind1" => $channelName,
        ":bind2" => $serverID
    );
    $alltuples = array (
        $tuple
    );

    executeBoundSQL("insert into direct_message (ChannelName, ServerID) values (:bind1, :bind2)", $alltuples);
    oci_commit($db_conn);
}

function handleInsertThread() {
    global $db_conn;

    $tuple = array (
        ":bind1" => "sys_guid()"
    );
    $alltuples = array (
        $tuple
    );

    executeBoundSQL("insert into thread values (:bind1)", $alltuples);
    oci_commit($db_conn);
}

function handleInsertMessage() {
    global $db_conn;

    $userID = $_POST['UserID']; 
    $messageContent = $_POST['MessageContent'];
    $timePosted = $_POST['TimePosted'];
    $serverID = $_POST['ServerID']; 
    $channelName = $_POST['ChannelName'];
    $threadID = $_POST['ThreadID'];

    $tuple = array (
        ":bind1" => $userID,
        ":bind2" => $messageContent,
        ":bind3" => $timePosted,
        ":bind4" => $serverID,
        ":bind5" => $channelName,
        ":bind6" => $threadID
    );
    $alltuples = array (
        $tuple
    );

    executeBoundSQL("insert into \"message\" (UserID, MessageContent, TimePosted, ServerID, ChannelName, ThreadID) values (:bind1, :bind2, :bind3, :bind4, :bind5, :bind6)", $alltuples);
    oci_commit($db_conn);
}

function handleInsertJoinsServer() {
    global $db_conn;

    $userID = $_POST['UserID']; 
    $serverID = $_POST['ServerID']; 

    $tuple = array (
        ":bind1" => $userID,
        ":bind2" => $serverID
    );
    $alltuples = array (
        $tuple
    );

    executeBoundSQL("insert into joins_server values (:bind1, :bind2)", $alltuples);
    oci_commit($db_conn);
}

function handleInsertJoinsChannel() {
    global $db_conn;

    $userID = $_POST['UserID']; 
    $serverID = $_POST['ServerID']; 
    $channelName = $_POST['ChannelName']; 

    $tuple = array (
        ":bind1" => $userID,
        ":bind2" => $serverID,
        ":bind3" => $channelName
    );
    $alltuples = array (
        $tuple
    );

    executeBoundSQL("insert into joins_channel values (:bind1, :bind2, :bind3)", $alltuples);
    oci_commit($db_conn);
}

function handleInsertModerates() {
    global $db_conn;

    $userID = $_POST['UserID']; 
    $serverID = $_POST['ServerID']; 

    $tuple = array (
        ":bind1" => $userID,
        ":bind2" => $serverID
    );
    $alltuples = array (
        $tuple
    );

    executeBoundSQL("insert into moderates values (:bind1, :bind2)", $alltuples);
    oci_commit($db_conn);
}

function handleInsertEmoji() {
    global $db_conn;

    $emojiName = $_POST['EmojiName']; 
    $link = $_POST['Link']; 

    $tuple = array (
        ":bind1" => $emojiName,
        ":bind2" => $link
    );
    $alltuples = array (
        $tuple
    );

    executeBoundSQL("insert into emoji values (:bind1, :bind2)", $alltuples);
    oci_commit($db_conn);
}

function handleInsertReacts() {
    global $db_conn;

    $userID = $_POST['UserID'];
    $messageID = $_POST['MessageID'];
    $emojiName = $_POST['EmojiName'];

    $tuple = array (
        ":bind1" => $userID,
        ":bind2" => $messageID,
        ":bind3" => $emojiName,
    );
    $alltuples = array (
        $tuple
    );

    executeBoundSQL("insert into reacts values (:bind1, :bind2, :bind3)", $alltuples);
    oci_commit($db_conn);
}

// TODO: handlers for 
// 1. update text message, etc
function handleUpdateRequest() {
    global $db_conn;

    $old_name = $_POST['oldName'];
    $new_name = $_POST['newName'];

    // you need the wrap the old name and new name values with single quotations
    executePlainSQL("UPDATE demoTable SET name='" . $new_name . "' WHERE name='" . $old_name . "'");
    oci_commit($db_conn);
}

function handleUserLogin() {
    $userEmail = $_POST['UserEmail'];
    $userPassword = $_POST['UserPassword'];
    $userID = getUserID($userEmail, $userPassword);

    if ($userID) {
        echo json_encode($userID);
    } else {
        http_response_code(401);
    }
}

function isValidInsertUserRequest() {
    return (array_key_exists('UserEmail', $_POST) && array_key_exists('UserPassword', $_POST));
}

// TODO: implement (this is stub)
// HANDLE ALL POST ROUTES
function handlePOSTRequest($req) {
    if (connectToDB()) {
        switch ($req) {
            case "insertUser":
                handleInsertUser();
                break;
            case "insertServer":
                handleInsertServer();
                break;
            case "insertChannel":
                handleInsertChannel();
                break;
            case "insertGroupChannel":
                handleInsertGroupChannel();
                break;
            case "insertDirectMessage":
                handleInsertDirectMessage();
                break;
            case "insertThread":
                handleInsertThread();
                break;
            case "insertMessage":
                handleInsertMessage();
                break;
            case "insertJoinsServer":
                handleInsertJoinsServer();
                break;
            case "insertJoinsChannel":
                handleInsertJoinsChannel();
                break;
            case "insertModerates":
                handleInsertModerates();
                break;
            case "insertEmoji":
                handleInsertEmoji();
                break;
            case "insertReact":
                handleInsertReacts();
                break;
            case "userLogin":
                handleUserLogin();
                break;
            default:
        }
        disconnectFromDB();
    }
}
?>