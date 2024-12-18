<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $table = 'event';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'type',
        'date'
    ];

    public function getTypeName()
    {
        $typename = [
            'SHS' => 'SMA',
            'COL'  => 'Kampus',
            'WORK' => 'Kerja',
        ];

        return $typename[$this->type] ?? 'Tipe Tidak Diketahui';
    }
}
