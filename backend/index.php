<?php
    require "cors.php";
    require "connection.php";
    include_once("getHandlers.php");
    include_once("postHandlers.php");
    include_once("deleteHandlers.php");
    include_once("putHandlers.php");
    $OP_CODE_KEY = "opCode";

    $supportedGetReqs = array(
        "loadServers",
        "loadChannels",
        "loadMessages",
        "searchServers",
        "searchChannels",
        "searchMessages",
        "countUserInServer",
        "countUserInChannel",
        "getServerSize",
        "filterChannelsBySize",
        "getUsersWhoAreInAllChannels",
        "searchMessagesDemo",
        "loadMessagesDemo",
        "loadMessagesProjectionDemo"
    );
    $supportedPostReqs = array( 
        "insertUser", 
        "insertServer", 
        "insertChannel",
        "insertGroupChannel",
        "insertDirectMessage",
        "insertThread",
        "insertMessage",
        "insertJoinsServer",
        "insertJoinsChannel",
        "insertModerates",
        "insertEmoji",
        "insertReact",
        "userLogin"
    );
    $supportedDeleteReqs = array(
        "leaveJoinedServer",
        "leaveJoinedChannel",
        "deleteSentMessage"
    );
    $supportedPutReqs = array(
        "editMessage"
    );

    $reqIsSupported = false;
    
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        parse_str(parse_url($_SERVER["REQUEST_URI"], PHP_URL_QUERY), $queryParams);
        $opCode = $queryParams[$OP_CODE_KEY];
        
        if (in_array($opCode, $supportedGetReqs)) {
            http_response_code(200);
            handleGETRequest($opCode, $queryParams);
            $reqIsSupported = true;
        }
    } else if ($_SERVER["REQUEST_METHOD"] == "POST") {
        parse_str(parse_url($_SERVER["REQUEST_URI"], PHP_URL_QUERY), $queryParams);
        $reqOpCode = $queryParams[$OP_CODE_KEY];
        
        if (in_array($reqOpCode, $supportedDeleteReqs)) {
            http_response_code(200);
            handleDELETERequest($reqOpCode, $queryParams);
            $reqIsSupported = true;
        } else {
            $req = file_get_contents("php://input");
            $_POST = json_decode($req, true);
            
            if (in_array($_POST[$OP_CODE_KEY], $supportedPutReqs)) {
                http_response_code(200);
                handlePUTRequest($_POST[$OP_CODE_KEY]);
                $reqIsSupported = true;
            } else {
                foreach ($supportedPostReqs as $supportedPostReq) {
                    if (isset($_POST[$supportedPostReq])) {
                        http_response_code(200);
                        handlePOSTRequest($supportedPostReq);
                        $reqIsSupported = true;
                        break;
                    }
                }
            }  
        }
    }

    if (!$reqIsSupported) {
        http_response_code(400);
        echo json_encode(
            [
                "handled" => false,
                "message" => "Request is not supported. Note: Only GET and POST is supported"
            ]
        );
    }
?>