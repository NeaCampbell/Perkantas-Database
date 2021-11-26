<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Material extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'material';
    const CREATED_AT = 'dtm_crt';
    const UPDATED_AT = 'dtm_upd';

    protected $fillable = [
        'code',
        'name',
        'chapter_count',
    ];

    protected $hidden = [
        'dtm_crt',
        'usr_crt',
        'dtm_upd',
        'usr_upd'
    ];
}
