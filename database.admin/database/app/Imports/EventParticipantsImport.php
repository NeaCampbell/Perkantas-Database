<?php

namespace App\Imports;

use App\Models\EventParticipant;
use App\Models\Event;
use App\Models\Member;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\Log;

class EventParticipantsImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        try {
            Log::info('Processing row: ' . json_encode($row));

            $event = Event::where('name', $row['event_name'])->first();
            $participant = Member::where('mobile_phn', $row['participant_phone'])->first();

            if ($event && $participant) {
                Log::info('Found event and participant: Event ID - ' . $event->id . ', Participant ID - ' . $participant->id);

                $eventParticipant = new EventParticipant([
                    'event_id' => $event->id,
                    'participant_id' => $participant->id,
                ]);
            
                if ($eventParticipant->save()) {
                    Log::info('EventParticipant successfully saved: ' . json_encode($eventParticipant));
                } else {
                    Log::error('Failed to save EventParticipant: ' . json_encode($eventParticipant));
                }
            } else {
                Log::warning('Event or participant not found for row: ' . json_encode($row));
            }
        } catch (\Exception $e) {
            Log::error('Error processing row: ' . json_encode($row) . ' - ' . $e->getMessage());
        }

        return null;
    }
}
