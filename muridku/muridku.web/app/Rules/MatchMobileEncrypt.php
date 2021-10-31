<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Http\Controllers\Constants;
use App\Http\Controllers\ApiController;

class MatchMobileEncrypt implements Rule
{
    private $email;
    private $pass;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($email, $pass)
    {
        $this->email = $email;
        $this->pass = $pass;
    }

    private function RequestPasswordValidation($email, $pass)
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

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $result = ApiController::RequestPasswordValidation($this->email, $this->pass);
        return $result->succeed;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Username/password tidak sesuai.';
    }
}
