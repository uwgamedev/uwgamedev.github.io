<!DOCTYPE html>

<?php
    session_start();
    
    # Just temporarily hardcoding these
    $username = "admin";
    $password = "smashybrick";
    
    #if we're already logged in from a previous session, redirect to admin page
    if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] == true) {
        header("Location: ../admin/"); #replace index2.php with your page for admin stuff
    }
    
    #otherwise, check if the html form below was submitted
    if(isset($_POST['username']) && isset($_POST['password'])) {
        if ($_POST['username'] == $username && $_POST['password'] == $password) {
            $_SESSION['logged_in'] = true;
            header("Location: ../admin/"); #same thing, replace index2.php
        }
    }
?>

<html>
    <head>
        <title>GDC Officer Login</title>
        <link rel="stylesheet" type="text/css" href="login.css">
    </head>

    <body>
        <div id = "login_logo"></div>
        <div id = "login_container">
            <form method="post" action="login.php">
                Username: <br/>
                <input type="text" name="username"><br/>
                Password: <br/>
                <input type="password" name="password"><br/>
                <input id = "submit" type="submit" value="Login">
            </form>
        </div>
    </body>
</html>