<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;

    protected $table = 'material';
    public $timestamps = false;

    protected $fillable = [
        'code',
        'name',
        'chapter_count'
    ];

    public function getTypeKTB()
    {
        $typename = [
            '0' => 'Pra-KTB',
            '1'  => 'KTB',
        ];

        return $typename[$this->is_pra_ktb] ?? 'Tipe Tidak Diketahui';
    }
}
