<?php

// define('DB_USER', 'ora_antongri');
// define('DB_PASS', 'a53096566');
// define('DB_CONN', 'dbhost.students.cs.ubc.ca:1522/stu');

// 1. grant permission to php file before running using: chmod 755 ~/public_html/connection.php
// 2. add request header Content-Type: application/json, Accept: application/json
// 3. send request to https://www.students.cs.ubc.ca/~kkimmdao/index.php

$db_conn = NULL;
$show_debug_alert_messages = False;

function debugAlertMessage($message) {
    global $show_debug_alert_messages;

    if ($show_debug_alert_messages) {
        echo "<script type='text/javascript'>alert('" . $message . "');</script>";
    }
}

function connectToDB() {
    global $db_conn;

    $db_conn = OCILogon("ora_antongri", "a53096566", "dbhost.students.cs.ubc.ca:1522/stu");

    if ($db_conn) {
        debugAlertMessage("Database is Connected");
        return true;
    } else {
        debugAlertMessage("Cannot connect to Database");
        $e = OCI_Error();
        echo htmlentities($e['message']);
        return false;
    }
}

function disconnectFromDB() {
    global $db_conn;

    debugAlertMessage("Disconnect from Database");
    OCILogoff($db_conn);
}
?>