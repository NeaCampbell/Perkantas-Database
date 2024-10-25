<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ktb;
use App\Models\Member;
use App\Models\KtbMember;
use App\Models\KtbHistory;
use App\Models\DiscipleshipTarget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;

class ReportTargetController extends Controller
{
    public function index()
    {
        $filterTahunPeriode = $filterTahunPeriode ?? date('Y');;

        $report_target = Ktb::leftJoin('ktbhistory', 'ktbhistory.ktb_id', '=', 'ktb.id')
            ->whereRaw('YEAR(ktbhistory.meet_dt) = ?', [$filterTahunPeriode])
            ->join('ktbmember', 'ktbmember.ktb_id', '=', 'ktb.id')
                ->where('ktbmember.is_pktb', '=', 1)
                // ->where('ktbmember.is_active', '=', 1)
            ->join('member', 'member.id', '=', 'ktbmember.member_id')
            ->join('discipleship_target', 'discipleship_target.city_id', '=', 'member.city_id')
                ->where('discipleship_target.period_year', '=', $filterTahunPeriode)
            ->join('city', 'city.id', '=', 'member.city_id')
            ->select('city.id as city_id', 'city.name as city_name', DB::raw('count(*) as new_pktb_count'), 'discipleship_target.ktb_leader_target as ktb_leader_target')
            ->groupBy('city.id', 'city.name', 'discipleship_target.ktb_leader_target')
            ->get();

        return view('admin.report_target.index', compact('report_target'));
    }

    public function filter_periode(Request $request)
    {
        $validatedData = $request->validate([
            'year' => 'nullable|integer',
        ]);

        $filterTahunPeriode = $validatedData['year'];


        $report_target = Ktb::leftJoin('ktbhistory', 'ktbhistory.ktb_id', '=', 'ktb.id')
        ->whereRaw('YEAR(ktbhistory.meet_dt) = ?', [$filterTahunPeriode])
        ->join('ktbmember', 'ktbmember.ktb_id', '=', 'ktb.id')
            ->where('ktbmember.is_pktb', '=', 1)
            // ->where('ktbmember.is_active', '=', 1)
        ->join('member', 'member.id', '=', 'ktbmember.member_id')
        ->join('discipleship_target', 'discipleship_target.city_id', '=', 'member.city_id')
            ->where('discipleship_target.period_year', '=', $filterTahunPeriode)
        ->join('city', 'city.id', '=', 'member.city_id')
        ->select('city.id as city_id', 'city.name as city_name', DB::raw('count(*) as new_pktb_count'), 'discipleship_target.ktb_leader_target as ktb_leader_target')
        ->groupBy('city.id', 'city.name', 'discipleship_target.ktb_leader_target')
        ->get();

        return view('admin.report_target.index', compact('report_target'));
    }
}
