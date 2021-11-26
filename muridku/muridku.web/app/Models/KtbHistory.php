<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class KtbHistory extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'ktbhistory';
    const CREATED_AT = 'dtm_crt';
    const UPDATED_AT = 'dtm_upd';

    protected $fillable = [
        'meet_dt',
        'material_name',
        'material_chapter',
    ];

    protected $hidden = [
        'ktb_id',
        'material_id',
        'is_active',
        'dtm_crt',
        'usr_crt',
        'dtm_upd',
        'usr_upd'
    ];
}
