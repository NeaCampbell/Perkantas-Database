<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;

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

    public static function SaveToFinanceApp(Model $member)
    {
        $url = Constants::ALPHA_SOLUTION_API_ADDRESS . '/master/apianggota/tambah';
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_POST, 1);

        $prefix = !isset($member->birth_dt) || empty($member->birth_dt) ? 'Sdr' :
            ((isset($member->gender) && !empty($member->address) ? (($member->gender === 'L') ? 'Bapak' : 'Ibu') : 'Sdr'));

        $inst_type = $member->inst_type === 'CLG' ? 'MAHASISWA' : ($member->inst_type === 'ALM' ? 'ALUMNI' : 'SISWA');

        curl_setopt($curl, CURLOPT_POSTFIELDS,
                    'instansi=2&' .
                    'useremail=apidev@perkantas.id&' .
                    'userpass=apidev&' .
                    'sebutan=' . $prefix . '&' .
                    'namaanggota=' . $member->name . '&' .
                    'alamat=' . (isset($member->address) && !empty($member->address) ? $member->address : '-') . '&' .
                    'kota=' . $member->city_name . '&' .
                    'hp=' . (isset($member->mobile_phn) && !empty($member->mobile_phn) ? $member->mobile_phn : '-') . '&' .
                    'wa=-&' .
                    'email=' . $member->email . '&' .
                    'tempatlahir=' . (isset($member->birth_place) && !empty($member->birth_place) ? $member->birth_place : '-') . '&' .
                    'tgllahir=' . (isset($member->birth_dt) && !empty($member->birth_dt) ? $member->birth_dt : 'null') . '&' .
                    'donaturtetap=0&' .
                    'maudiingatkan=1&' .
                    'amountdonatur=0&' .
                    'jenisanggota=' . $inst_type . '&' .
                    'catatan=-'
                );
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($curl);
        return json_decode($result);
    }
}
