<?php

function createSession()
{
    session_start();
}

function deleteSession()
{
    $_SESSION = null;
    session_destroy();
}

createSession();
