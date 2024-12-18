<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{
    use HasFactory;

    protected $table = 'institution';
    public $timestamps = false;

    protected $fillable = [
        'code',
        'name',
        'type',
        'address'
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
