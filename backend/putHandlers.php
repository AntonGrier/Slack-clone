<?php
// test case:
// {
//     "opCode": "editMessage",
//     "UserID": "000001",
//     "MessageID": "000006",
//     "newMessageContent": "I have an announcement!"
// }
function handleEditMessage() {
    global $db_conn;

    $userID = $_POST["UserID"];
    $messageID = $_POST["MessageID"];
    $newMessageContent = $_POST["newMessageContent"];

    $preSt = "SELECT MessageContent
              FROM \"message\" m 
              WHERE m.userID = '" . $userID . "' AND m.ID = '" . $messageID . "'";
    $preResult = executePlainSQL($preSt);

    if (($row = oci_fetch_row($preResult)) != false) { 
        $st = "UPDATE \"message\" m 
               SET m.MessageContent = '" . $newMessageContent . "'
               WHERE m.ID = '" . $messageID . "' AND m.UserID = '" . $userID . "'";
        $result = executePlainSQL($st);
        
        echo "Editted old message: '" . $row[0] . "' to new message: '" . $newMessageContent . "'";

        oci_commit($db_conn);
        oci_free_statement($result);
    }

    oci_free_statement($preResult);
}

function handlePUTRequest($req) {
    if (connectToDB()) {
        switch ($req) {
            case "editMessage":
                handleEditMessage();
                break;
            default:
        }
        disconnectFromDB();
    }
}
?>