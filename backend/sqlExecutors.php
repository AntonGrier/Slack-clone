<?php
$success = True; //keep track of errors so it redirects the page only if there are no errors

function executePlainSQL($cmdstr) { //takes a plain (no bound variables) SQL command and executes it
    // echo "running " . $cmdstr . "\n"; // use this to debug the query string
    global $db_conn, $success;

    $statement = oci_parse($db_conn, $cmdstr); 

    if (!$statement) {
        echo "<br>Cannot parse the following command: " . $cmdstr . "<br>";
        $e = OCI_Error($db_conn); // For OCIParse errors pass the connection handle
        echo htmlentities($e['message']);
        $success = False;
    }

    $r = oci_execute($statement, OCI_DEFAULT);
    if (!$r) {
        echo "<br>Cannot execute the following command: " . $cmdstr . "<br>";
        $e = oci_error($statement);
        echo htmlentities($e['message']);
        $success = False;
    }

    // echo $statement;
    return $statement;
}

function executeBoundSQL($cmdstr, $list) {
/* Sometimes the same statement will be executed several times with different values for the variables involved in the query.
In this case you don't need to create the statement several times. Bound variables cause a statement to only be
parsed once and you can reuse the statement. This is also very useful in protecting against SQL injection. 
See the sample code below for how this function is used */

    global $db_conn, $success;
    $statement = oci_parse($db_conn, $cmdstr);

    if (!$statement) {
        echo "<br>Cannot parse the following command: " . $cmdstr . "<br>";
        $e = OCI_Error($db_conn);
        echo htmlentities($e['message']);
        $success = False;
    }

    foreach ($list as $tuple) {
        foreach ($tuple as $bind => $val) {
            OCIBindByName($statement, $bind, $val);
            unset ($val); //make sure you do not remove this. Otherwise $val will remain in an array object wrapper which will not be recognized by Oracle as a proper datatype
        }

        $r = oci_execute($statement, OCI_DEFAULT);
        if (!$r) {
            echo "<br>Cannot execute the following command: " . $cmdstr . "<br>";
            $e = OCI_Error($statement); // For OCIExecute errors, pass the statementhandle
            echo htmlentities($e['message']);
            echo "<br>";
            $success = False;
        }
        return $statement;
    }
}

function parseResultAsJson($result, $properties) {
    $parsedResult = array();
    while (($row = oci_fetch_array($result, OCI_BOTH)) != false) {
        $entry = array();
        foreach ($properties as $prop => $type) {
            $entry[$prop] = $type ? bin2hex($row[strtoupper($prop)]) : $row[strtoupper($prop)];
        }
        array_push($parsedResult, (object) $entry);
        // echo var_dump($row); // use this to test/debug $row
    }
    return $parsedResult;
}
?>