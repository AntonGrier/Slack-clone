<?php
// test case: send POST to https://www.students.cs.ubc.ca/~kkimmdao/index.php?opCode=leaveJoinedServer&UserID=000004&ServerID=0004
function handleLeaveJoinedServer($queryParams) {
    global $db_conn;

    $UserID = $queryParams["UserID"];
    $ServerID = $queryParams["ServerID"];
    
    $preSt1 = "SELECT COUNT(*)
                FROM joins_server js
                WHERE js.UserID = '" . $UserID . "' AND js.ServerID = '" . $ServerID . "'";
    $preResult1 = executePlainSQL($preSt1);
    
    $preSt2 = "SELECT COUNT(*)
                FROM joins_channel jc
                WHERE jc.UserID = '" . $UserID . "' AND jc.ServerID = '" . $ServerID . "'";
    $preResult2 = executePlainSQL($preSt2);
    
    if (($row1 = oci_fetch_row($preResult1)) != false) {
        echo "Left " . $row1[0] . " server(s).\n";
    }
    
    if (($row2 = oci_fetch_row($preResult2)) != false) {
        echo "Left " . $row2[0] . " channels(s).\n";
    }    
    
    $st = "DELETE FROM joins_server js
           WHERE js.UserID = '" . $UserID . "' AND js.ServerID = '" . $ServerID . "'";
    $result = executePlainSQL($st);
    
    oci_commit($db_conn);
    
    oci_free_statement($result);
    oci_free_statement($preResult1);
    oci_free_statement($preResult2);
}

// test case: https://www.students.cs.ubc.ca/~kkimmdao/index.php?opCode=leaveJoinedChannel&UserID=000004&ServerID=0005&ChannelName=general
function handleLeaveJoinedChannel($queryParams) {
    global $db_conn;

    $UserID = $queryParams["UserID"];
    $ServerID = $queryParams["ServerID"];
    $ChannelName = $queryParams["ChannelName"];

    $preSt = "SELECT COUNT(*) 
              FROM joins_channel jc
              WHERE jc.UserID = '" . $UserID . "' AND jc.ServerID = '" . $ServerID . "' AND jc.ChannelName = '" . $ChannelName . "'";
    $preResult = executePlainSQL($preSt);

    if (($row = oci_fetch_row($preResult)) != false) {
        $st = "DELETE FROM joins_channel jc
                WHERE jc.UserID = '" . $UserID . "' AND jc.ServerID = '" . $ServerID . "' AND jc.ChannelName = '" . $ChannelName . "'";
        $result = executePlainSQL($st);
        
        echo json_encode("Left " . $row[0] . " channel(s).");

        oci_commit($db_conn);
        oci_free_statement($result);
    }

    oci_free_statement($preResult);
}

// test case: https://www.students.cs.ubc.ca/~kkimmdao/index.php?opCode=deleteSentMessage&UserID=000004&MessageID=000015
function handleDeleteSentMessage($queryParams) {
    global $db_conn;

    $UserID = $queryParams["UserID"];
    $MessageID = $queryParams["MessageID"];

    $preSt = "SELECT COUNT(*) 
              FROM \"message\" m 
              WHERE m.UserID = '" . $UserID . "' AND m.ID = '" . $MessageID . "'";
    $preResult = executePlainSQL($preSt);

    if (($row = oci_fetch_row($preResult)) != false) {
        $st = "DELETE FROM \"message\" m 
               WHERE m.UserID = '" . $UserID . "' AND m.ID = '" . $MessageID . "'";
        $result = executePlainSQL($st);
        
        echo json_encode("Deleted " . $row[0] . " message(s).");

        oci_commit($db_conn);
        oci_free_statement($result);
    }

    oci_free_statement($preResult);
}

function handleDELETERequest($opCode, $queryParams) {
    if (connectToDB()) {
        switch ($opCode) {
            case "leaveJoinedServer":
                handleLeaveJoinedServer($queryParams);
                break;
            case "leaveJoinedChannel":
                handleLeaveJoinedChannel($queryParams);
                break;
            case "deleteSentMessage":
                handleDeleteSentMessage($queryParams);
                break;
            default:
        }
        disconnectFromDB();
    }
}
?>