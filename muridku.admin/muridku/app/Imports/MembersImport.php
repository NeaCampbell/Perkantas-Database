<?php

namespace App\Imports;

use App\Models\Member;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class MembersImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        try {
            $existingMember = Member::where('mobile_phn', $row['mobile_phn'])->first();

            if ($existingMember) {
                $existingMember->update([
                    'name' => $row['name'],
                    'address' => $row['address'],
                    'gender' => $row['gender'],
                    'birth_dt' => $row['birth_dt'] ? Carbon::parse($row['birth_dt']) : null,
                    'birth_place' => $row['birth_place'],
                    'status' => $row['status'],
                    'inst_type' => $row['inst_type'],
                    'city_id' => $row['city_id'],
                    'institution_id' => $row['institution_id'],
                    'faculty_id' => $row['faculty_id'],
                    'usr_upd' => Auth::check() ? Auth::user()->name : 'Anonymous',
                    'dtm_upd' => now(),
                ]);
                return null;
            }

            return new Member([
                'name' => $row['name'],
                'address' => $row['address'],
                'gender' => $row['gender'],
                'birth_dt' => $row['birth_dt'] ? Carbon::parse($row['birth_dt']) : null,
                'birth_place' => $row['birth_place'],
                'mobile_phn' => $row['mobile_phn'],
                'status' => $row['status'],
                'inst_type' => $row['inst_type'],
                'city_id' => $row['city_id'],
                'institution_id' => $row['institution_id'],
                'faculty_id' => $row['faculty_id'],
                'usr_crt' => Auth::check() ? Auth::user()->name : 'Anonymous',
                'dtm_crt' => now(),
                'usr_upd' => Auth::check() ? Auth::user()->name : 'Anonymous',
                'dtm_upd' => now(),
            ]);
        } catch (\Exception $e) {
            Log::error('Error processing row: ' . json_encode($row) . ' - ' . $e->getMessage());
            return null;
        }
    }
}
