<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class MemberInstitutionHist extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'memberinstitutionhist';
    const CREATED_AT = 'dtm_crt';
    const UPDATED_AT = 'dtm_upd';

    protected $hidden = [
        'member_id',
        'institution_id',
        'faculty_id',
        'dtm_crt',
        'usr_crt',
        'dtm_upd',
        'usr_upd'
    ];
}
