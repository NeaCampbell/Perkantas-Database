<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Member extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'member';
    const CREATED_AT = 'dtm_crt';
    const UPDATED_AT = 'dtm_upd';

    protected $fillable = [
        'name',
        'address',
        'gender',
        'birth_dt',
        'birth_place',
        'mobile_phn',
        'inst_type',
    ];

    protected $hidden = [
        'city_id',
        'institution_id',
        'faculty_id',
        'dtm_crt',
        'usr_crt',
        'dtm_upd',
        'usr_upd'
    ];
}
