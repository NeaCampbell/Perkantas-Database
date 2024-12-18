<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\EventParticipantsImport;

class ReportEventController extends Controller
{
    public function index()
    {
        $report = DB::table('event_participant')
        ->join('event', 'event.id', '=', 'event_participant.event_id')
        ->join('member', 'member.id', '=', 'event_participant.participant_id')
        ->select(
            'event.name as event_name',
            'event.date as event_date',
            'member.name as participant_name',
            'member.mobile_phn as participant_phone'
        )
        ->orderBy('event.date', 'desc')
        ->get();


        return view('admin.report_event.index', compact('report'));
    }

    // public function filter(Request $request)
    // {
    //     $validatedData = $request->validate([
    //         'start_date' => 'nullable|date',
    //         'end_date' => 'nullable|date|after_or_equal:start_date',
    //         'event_name' => 'nullable|string',
    //     ]);

    //     $query = DB::table('event_participant')
    //         ->join('events', 'events.id', '=', 'event_participant.event_id')
    //         ->join('members', 'members.id', '=', 'event_participant.participant_id');

    //     // Filter by event name
    //     if ($request->filled('event_name')) {
    //         $query->where('events.name', 'like', '%' . $request->input('event_name') . '%');
    //     }

    //     // Filter by date range
    //     if ($request->filled('start_date') && $request->filled('end_date')) {
    //         $query->whereBetween('events.event_date', [$request->input('start_date'), $request->input('end_date')]);
    //     }

    //     $report = $query->select(
    //         'events.name as event_name',
    //         'events.event_date',
    //         'members.name as participant_name',
    //         'members.mobile_phn as participant_phone'
    //     )
    //     ->orderBy('events.event_date', 'desc')
    //     ->get();

    //     return view('admin.report_event.index', compact('report'));
    // }

    public function importEventParticipants(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv',
        ]);

        try {
            Excel::import(new EventParticipantsImport, $request->file('file'));
            return redirect()->back()->with('message', 'Data berhasil diimport.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
