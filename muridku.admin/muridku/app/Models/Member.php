<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;

    protected $table = 'member';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'address',
        'gender',
        'birth_dt',
        'birth_place',
        'mobile_phn',
        'status',
        'inst_type',
        'city_id',
        'institution_id',
        'faculty_id',
        'alpha_member_id',
        'usr_crt', 
        'dtm_crt', 
        'usr_upd', 
        'dtm_upd',
    ];

    public function getTypeName()
    {
        $typename = [
            'SHS' => 'SMA',
            'COL'  => 'Kampus',
            'WORK' => 'Kerja',
        ];

        return $typename[$this->inst_type] ?? 'Tipe Tidak Diketahui';
    }

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id', 'id');
    }

    public function institution()
    {
        return $this->belongsTo(Institution::class, 'institution_id', 'id');
    }

    public function faculty()
    {
        return $this->belongsTo(Faculty::class, 'faculty_id', 'id');
    }
}
