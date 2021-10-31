<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'user';
    const CREATED_AT = 'dtm_crt';
    const UPDATED_AT = 'dtm_upd';

    protected $fillable = [
        'email',
        'password_web',
    ];

    protected $hidden = [
        'member_id',
        'password',
        'password_web',
        'remember_token',
        'is_active',
        'accept_term',
        'dtm_crt',
        'usr_crt',
        'dtm_upd',
        'usr_upd'
    ];

    public function getAuthPassword()
    {
        return $this->password_web;
    }
}
