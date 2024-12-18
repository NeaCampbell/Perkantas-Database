<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventParticipant extends Model
{
    use HasFactory;

    protected $table = 'event_participant';
    public $timestamps = false;

    protected $fillable = [
        'event_id',
        'participant_id',
    ];

    // Relasi ke tabel Event
    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

    // Relasi ke tabel Member
    public function participant()
    {
        return $this->belongsTo(Member::class, 'participant_id');
    }
}