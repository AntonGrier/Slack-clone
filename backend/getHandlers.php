<?php
// test case: send GET to https://www.students.cs.ubc.ca/~kkimmdao/index.php?UserID=000001
function handleLoadServers($queryParams) {
    $UserID = $queryParams["UserID"];
    $st = "SELECT js.ServerID, s.ServerName, s.ServerDescription 
                  FROM joins_server js, \"server\" s 
                  WHERE js.UserID = '" . $UserID . "' AND js.ServerID = s.ID";
    $result = executePlainSQL($st);

    $parsedResult = parseResultAsJson($result, ['ServerID' => 1, 'ServerName' => 0, 'ServerDescription' => 0]);
    echo json_encode($parsedResult);
    
    oci_free_statement($result);
}

// test case: send GET to https://www.students.cs.ubc.ca/~kkimmdao/index.php?UserID=000004&ServerID=0003
function handleLoadChannels($queryParams) {
    $UserID = $queryParams["UserID"];
    $ServerID = $queryParams["ServerID"];
    $st1 = "SELECT gc.ChannelName, gc.ChannelDescription
            FROM joins_channel jc, channel c
            INNER JOIN group_channel gc
            ON c.ServerID = gc.ServerID AND c.ChannelName = gc.ChannelName
            WHERE jc.ServerID = c.ServerID AND jc.ChannelName = c.ChannelName AND jc.UserID = '" . $UserID . "' AND jc.ServerID = '" . $ServerID . "'";
            
    $st2 = "SELECT dc.ChannelName
            FROM joins_channel jc, channel c
            INNER JOIN direct_message dc
            ON c.ServerID = dc.ServerID AND c.ChannelName = dc.ChannelName
            WHERE jc.ServerID = c.ServerID AND jc.ChannelName = c.ChannelName AND jc.UserID = '" . $UserID . "' AND jc.ServerID = '" . $ServerID . "'";
    
    $resultGroups = executePlainSQL($st1);
    $resultDirects = executePlainSQL($st2);
    
    $parsedGroups = parseResultAsJson($resultGroups, ['channelName' => 0, 'channelDescription' => 0]);
    $parsedDirects = parseResultAsJson($resultDirects, ['channelName' => 0]);
    echo json_encode(array(
        "groupChannels" => $parsedGroups,
        "directMessages" => $parsedDirects
    ));

    oci_free_statement($resultGroups);
    oci_free_statement($resultDirects);
}

// test case: send GET to https://www.students.cs.ubc.ca/~kkimmdao/index.php?UserID=000004&ServerID=0004&ChannelName=coca-and-cola
// request body: { "loadMessages": true }
function handleLoadMessages($queryParams) {
    $ServerID = $queryParams["ServerID"];
    $ChannelName = $queryParams["ChannelName"];
    $st = "SELECT m.ID as MessageID, m.UserID, m.MessageContent, m.TimePosted, m.ServerID, m.ChannelName, m.ThreadID, p.FirstName, p.LastName, p.ProfilePicture
            FROM \"message\" m
            INNER JOIN \"profile\" p
            ON p.UserID = m.UserID
            WHERE m.ServerID = '" . $ServerID . "' AND m.ChannelName = '" . $ChannelName . "'
            ORDER BY TimePosted";
    $result = executePlainSQL($st);

    $parsedResult = parseResultAsJson($result, ['MessageID' => 1, 'UserID' => 1, 'MessageContent' => 0, 'TimePosted' => 0, 'ServerID' => 1, 'ChannelName' => 0, 'ThreadID' => 1, 'FirstName' => 0, 'LastName' => 0, 'ProfilePicture' => 0]);
    echo json_encode($parsedResult);

    oci_free_statement($result);
}

function handleLoadMessagesProjectionDemo($queryParams) {
    $st = "SELECT m.MessageContent, m.TimePosted, m.ChannelName, m.ThreadID, m.UserID FROM \"message\" m WHERE m.ChannelName='memes'";

    $result = executePlainSQL($st);

    $parsedResult = parseResultAsJson($result, ['MessageContent' => 0, 'TimePosted' => 0, 'ChannelName' => 0, 'ThreadID' => 1, 'UserID' => 1]);
    echo json_encode($parsedResult);

    oci_free_statement($result);
}
//handleLoadMessagesProjectionDemo
function handleLoadMessagesDemo($queryParams) {
    
    $TimePosted = $queryParams["TimePosted"];
    $ChannelName = $queryParams["ChannelName"];
    $st="";
    if($ChannelName === '-1') {
        $st = "SELECT m.MessageContent,  m.ThreadID
            FROM \"message\" m
            WHERE m.TimePosted = '" . $TimePosted . "'";
    } else {
        $st = "SELECT m.MessageContent,  m.ThreadID FROM \"message\" m
            WHERE m.ChannelName = '" . $ChannelName . "'";
    }
    

    $result = executePlainSQL($st);

    $parsedResult = parseResultAsJson($result, ['MessageContent' => 0,'ThreadID' => 1]);
    echo json_encode($parsedResult);

    oci_free_statement($result);
}

// test case: https://www.students.cs.ubc.ca/~antongri/index.php?UserID=000001&QueryStr=UBC
function handleSearchServers($queryParams) {
    $UserID = $queryParams["UserID"];
    $QueryStr = $queryParams["QueryStr"];
    $st = "SELECT js.ServerID, s.ServerName, s.ServerDescription 
                  FROM joins_server js, \"server\" s 
                  WHERE js.UserID = '" . $UserID . "' AND js.ServerID = s.ID AND s.ServerName LIKE '%" . $QueryStr. "%'";
    $result = executePlainSQL($st);
    
    $parsedResult = parseResultAsJson($result, ['ServerID' => 1, 'ServerName' => 0, 'ServerDescription' => 0]);
    echo json_encode($parsedResult);

    oci_free_statement($result);
}

// test case: https://www.students.cs.ubc.ca/~antongri/index.php?UserID=000001&ServerID=0001&QueryStr=general&opCode=searchChannels
function handleSearchChannels($queryParams) {
    $UserID = $queryParams["UserID"];
    $ServerID = $queryParams["ServerID"];
    $QueryStr = $queryParams["QueryStr"];
    $st = "SELECT c.ChannelName 
                  FROM joins_channel jc, channel c 
                  WHERE jc.ServerID = c.ServerID AND jc.ChannelName = c.ChannelName AND jc.UserID = '" . $UserID . "' AND jc.ServerID = '" . $ServerID . "' AND c.ChannelName LIKE '%" . $QueryStr. "%'";
    $result = executePlainSQL($st);
    
    $parsedResult = parseResultAsJson($result, ['ChannelName' => 0]);
    echo json_encode($parsedResult);

    oci_free_statement($result);
}

// test: https://www.students.cs.ubc.ca/~antongri/index.php?opCode=searchMessages&ServerID=0004&QueryStr=Wanna
function handleSearchMessages($queryParams) {
    $ServerID = $queryParams["ServerID"];
    $QueryStr = $queryParams["QueryStr"];
    $st = "SELECT m.ID as MessageID, m.UserID, m.MessageContent, m.TimePosted, m.ServerID, m.ChannelName, m.ThreadID, p.FirstName, p.LastName, p.ProfilePicture
                  FROM \"message\" m
                  INNER JOIN \"profile\" p
                  ON p.UserID = m.UserID
                  WHERE m.ServerID = '" . $ServerID . "' AND m.MessageContent LIKE '%" . $QueryStr . "%'
                  ORDER BY TimePosted";
    $result = executePlainSQL($st);

    $parsedResult = parseResultAsJson($result, ['MessageID' => 1, 'UserID' => 1, 'MessageContent' => 0, 'TimePosted' => 0, 'ServerID' => 1, 'ChannelName' => 0, 'ThreadID' => 1, 'FirstName' => 0, 'LastName' => 0, 'ProfilePicture' => 0]);
    echo json_encode($parsedResult);

    oci_free_statement($result);
}

function handleSearchMessagesDemo($queryParams) {
    $QueryStr = $queryParams["QueryStr"];
    $st = "SELECT p.FirstName, p.LastName, m.MessageContent
                  FROM \"message\" m, \"profile\" p
                  WHERE m.UserID = p.UserID AND m.MessageContent LIKE '%" . $QueryStr . "%'";
    $result = executePlainSQL($st);

    $parsedResult = parseResultAsJson($result, ['FirstName' => 0, 'LastName' => 0, 'MessageContent' => 0]);
    echo json_encode($parsedResult);

    oci_free_statement($result);
}

//TODO: still need to figure out how the php is returning get data
function handleCountUserInServer($queryParams) {
    global $db_conn;

    $userID = $_GET['UserID'];
    $serverID = $_GET['ServerID'];
    $result = executePlainSQL("SELECT COUNT(*) from joins_server WHERE ServerID='" . $serverID . "'");
    oci_commit($db_conn);
    //echo "\n" . $result . "\n";
}
//TODO: still need to figure out how the php is returning get data
function handleCountUserInChannel($queryParams) {
    global $db_conn;

    $userID = $_GET['UserID'];
    $serverID = $_GET['ServerID'];
    $channelName = $_GET['ChannelName'];
    $result = executePlainSQL("SELECT COUNT(*) from joins_channel WHERE ServerID='" . $serverID . "'" . "AND ChannelName='" . $channelName . "'");
    oci_commit($db_conn);
}

// test case: https://www.students.cs.ubc.ca/~kkimmdao/index.php?opCode=getServerSize&ServerID=0003&sizeMeasure=user
// test case: https://www.students.cs.ubc.ca/~kkimmdao/index.php?opCode=getServerSize&ServerID=0003&sizeMeasure=message
function handleGetServerSize($queryParams) {
    $sizeMeasure = $queryParams["sizeMeasure"];
    $serverID = $queryParams["ServerID"];

    $st = "";
    if ($sizeMeasure == "user") {
        $st = "SELECT ChannelName, COUNT(*) 
               FROM joins_channel
               WHERE ServerID = '" . $serverID . "' AND ChannelName NOT IN (SELECT ChannelName from direct_message where ServerID = '" . $serverID . "')
               GROUP BY ChannelName";
    } else if ($sizeMeasure == "message") {
        $st = "SELECT ChannelName, COUNT(*)
               FROM \"message\"
               WHERE ServerID = '" . $serverID . "'
               GROUP BY ChannelName";
    }
    
    $result = executePlainSQL($st);
    $parsedResult = parseResultAsJson($result, ['ChannelName' => 0, 'COUNT(*)' => 0]);
    echo json_encode($parsedResult);

    oci_free_statement($result);
}

// test case: https://www.students.cs.ubc.ca/~kkimmdao/index.php?opCode=filterChannelsBySize&ServerID=0003&sizeMeasure=user&operator=lessThan&size=2
// test case: https://www.students.cs.ubc.ca/~kkimmdao/index.php?opCode=filterChannelsBySize&ServerID=0003&sizeMeasure=message&operator=greaterThan&size=2
function handleFilterChannelsBySize($queryParams) {
    $serverID = $queryParams["ServerID"];
    $sizeMeasure = $queryParams["sizeMeasure"];
    $size = $queryParams["size"];
    $operator = $queryParams["operator"];
    
    switch ($operator) {
        case "greaterThan": 
            $operator = '>'; 
            break;
        case "lesserThan": 
            $operator = '<'; 
            break;
        case "equalTo": 
            $operator = '='; 
            break;
    }
    
    $st = "";
    if ($sizeMeasure == "user") {
        $st = "SELECT ChannelName, COUNT(*) 
               FROM joins_channel
               WHERE ServerID = '" . $serverID . "' AND ChannelName NOT IN (SELECT ChannelName from direct_message where ServerID = '" . $serverID . "')
               GROUP BY ChannelName
               HAVING COUNT(*) " . $operator . " " . $size;
    } else if ($sizeMeasure == "message") {
        $st = "SELECT ChannelName, COUNT(*)
               FROM \"message\"
               WHERE ServerID = '" . $serverID . "'
               GROUP BY ChannelName
               HAVING COUNT(*) " . $operator . " " . $size;
    }

    $result = executePlainSQL($st);
    $parsedResult = parseResultAsJson($result, ['ChannelName' => 0, 'COUNT(*)' => 0]);
    echo json_encode($parsedResult);

    oci_free_statement($result);
}

// test case: https://www.students.cs.ubc.ca/~kkimmdao/index.php?opCode=getUsersWhoAreInAllChannels&ServerID=0001
function handleGetUsersWhoAreInAllChannels($queryParams) {
    $serverID = $queryParams["ServerID"];
    
    $st = "SELECT p.FirstName, p.LastName, u.UserEmail
            FROM \"user\" u, \"profile\" p
            WHERE u.ID = p.UserID AND u.ID IN (SELECT u.ID 
                                                FROM \"user\" u
                                                WHERE NOT EXISTS(
                                                    (SELECT c.ChannelName
                                                    FROM channel c
                                                    WHERE c.ServerID = '" . $serverID . "') 
                                                    MINUS
                                                    (SELECT jc.ChannelName
                                                    FROM joins_channel jc
                                                    WHERE jc.ServerID = '" . $serverID . "' AND u.ID = jc.UserID)))";
    
    $result = executePlainSQL($st);
    $parsedResult = parseResultAsJson($result, ['FirstName' => 0, 'LastName' => 0, 'UserEmail' => 0]);
    echo json_encode($parsedResult);

    oci_free_statement($result);
}

function handleGETRequest($opCode, $queryParams) {
    if (connectToDB()) {
        switch ($opCode) {
            case "loadServers":
                handleLoadServers($queryParams);
                break;
            case "loadChannels": 
                handleLoadChannels($queryParams);
                break;
            case "loadMessages": 
                handleLoadMessages($queryParams);
                break;
            case "searchServers": 
                handleSearchServers($queryParams);
                break;
            case "searchChannels": 
                handleSearchChannels($queryParams);
                break;
            case "searchMessages": 
                handleSearchMessages($queryParams);
                break;
            case "searchMessagesDemo":
                handleSearchMessagesDemo($queryParams);
                break;
            case "countUserInServer": 
                handleCountUserInServer($queryParams);
                break;
            case "countUserInChannel": 
                handleCountUserInChannel($queryParams);
                break;
            case "getServerSize":
                handleGetServerSize($queryParams);
                break;
            case "filterChannelsBySize":
                handleFilterChannelsBySize($queryParams);
                break;
            case "getUsersWhoAreInAllChannels":
                handleGetUsersWhoAreInAllChannels($queryParams);
                break;
            case "loadMessagesDemo":
                    handleLoadMessagesDemo($queryParams);
                    break;
            case "loadMessagesProjectionDemo":
                    handleLoadMessagesProjectionDemo($queryParams);
                    break;
            default:
        }
        disconnectFromDB();
    }
}
