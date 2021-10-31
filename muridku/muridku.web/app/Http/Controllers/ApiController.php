<?php

namespace App\Http\Controllers;

class ApiController
{
    public static function RequestPasswordValidation($email, $pass)
    {
        $url = Constants::MURIDKU_IP_ADDRESS . ':' . Constants::MURIDKU_PORT . '/user/validatewebpassword?email=' . $email .
            '&password=' . $pass;
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Token: ' . Constants::MURIDKU_TOKEN,
            'Version: ' . Constants::MURIDKU_API_VERSION,
            'Content-Type: application/json',
        ));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($curl);
        return json_decode($result);
    }

    public static function RequestEncryptedPassword($pass)
    {
        $url = Constants::MURIDKU_IP_ADDRESS . ':' . Constants::MURIDKU_PORT . '/user/encryptdata?data=' . $pass;
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Token: ' . Constants::MURIDKU_TOKEN,
            'Version: ' . Constants::MURIDKU_API_VERSION,
            'Content-Type: application/json',
        ));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($curl);
        return json_decode($result);
    }
}
