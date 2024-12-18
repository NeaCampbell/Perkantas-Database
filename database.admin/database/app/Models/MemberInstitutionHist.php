<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MemberInstitutionHist extends Model
{
    use HasFactory;

    protected $table = 'memberinstitutionhist';
    public $timestamps = false;
}
