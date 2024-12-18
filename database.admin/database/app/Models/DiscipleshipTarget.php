<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiscipleshipTarget extends Model
{
    use HasFactory;

    protected $table = 'discipleship_target';
    public $timestamps = false;

    protected $fillable = [
        'period_year',
        'evangelism_target',
        'evangelism_movement_target',
        'ktb_leader_target',
        'ktb_group_target'
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }


}
