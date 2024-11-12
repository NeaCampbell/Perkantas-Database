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
        $filterTahunPeriode = $filterTahunPeriode ?? date('Y');

        // Tabel Jumlah Realisasi PKK 2024
        $report_target = Ktb::from("ktb")
        ->join('ktbmember', 'ktbmember.ktb_id', '=', 'ktb.id')
        ->join('member', 'member.id', '=', 'ktbmember.member_id')
        ->join('discipleship_target', 'discipleship_target.city_id', '=', 'member.city_id')
        ->join('city', 'city.id', '=', 'member.city_id')
        ->join(DB::raw("(select ktb_id, MIN(meet_dt) as first_meet_dt from ktbhistory group by ktb_id) as ktbhistory"), 'ktbhistory.ktb_id', '=', 'ktb.id')
        ->where(DB::raw('YEAR(ktbhistory.first_meet_dt)'), "=", $filterTahunPeriode)
        ->where('ktbmember.is_pktb', '=', 1)
        ->where('discipleship_target.period_year', '=', $filterTahunPeriode)
        ->select(
            'city.id as city_id',
            'city.name as city_name',
            DB::raw('count(*) as new_pktb_count'),
            DB::raw('COALESCE(discipleship_target.ktb_leader_target, 0) as ktb_leader_target')
        )
        ->groupBy('city.id', 'city.name', DB::raw('COALESCE(discipleship_target.ktb_leader_target, 0)'))
        ->get();

        // Tabel Jumlah Realisasi KTB 2024
        $old_new_ktb = Ktb::from("ktb")
        ->join('ktbmember', function($join) {
            $join->on('ktbmember.ktb_id', '=', 'ktb.id')
                 ->where('ktbmember.is_pktb', '=', 1)
                 ->where('ktbmember.is_active', '=', 1);
        })
        ->join('member', 'member.id', '=', 'ktbmember.member_id')
        ->join('discipleship_target as dt', function($join) use ($filterTahunPeriode) {
            $join->on('dt.city_id', '=', 'member.city_id')
                 ->where('dt.period_year', '=', $filterTahunPeriode);
        })
        ->join('city', 'city.id', '=', 'member.city_id')
        ->leftJoin(DB::raw("
            (select ktb_id, MIN(meet_dt) as first_meet_dt
             from ktbhistory
             group by ktb_id
             having MIN(YEAR(meet_dt)) = $filterTahunPeriode
            ) as ktb_history_new"), 'ktb_history_new.ktb_id', '=', 'ktb.id')
        ->leftJoin(DB::raw("
            (select ktb_id, MIN(meet_dt) as first_meet_dt
             from ktbhistory
             group by ktb_id
             having MIN(YEAR(meet_dt)) < $filterTahunPeriode
            ) as ktb_history_old"), 'ktb_history_old.ktb_id', '=', 'ktb.id')
        ->select(
            'city.id as city_id',
            'city.name as city_name',
            DB::raw('SUM(case when ktb_history_new.ktb_id is not null then 1 else 0 end) as new_pktb'),
            DB::raw('SUM(case when ktb_history_old.ktb_id is not null then 1 else 0 end) as old_pktb')
        )
        ->groupBy('city.id', 'city.name')
        ->get();

        // Tabel Jumlah Realisasi PKK Baru di Tahun 2023 dan Yang Masih Bertahan Hingga 2024
        $new_pkk_before_to_now = Ktb::from('ktb')
        ->join('ktbmember', function ($join) {
            $join->on('ktbmember.ktb_id', '=', 'ktb.id')
                ->where('ktbmember.is_pktb', '=', 1)
                ->where('ktbmember.is_active', '=', 1);
        })
        ->join('member', 'member.id', '=', 'ktbmember.member_id')
        ->join('discipleship_target as dt', function ($join) use ($filterTahunPeriode) {
            $join->on('dt.city_id', '=', 'member.city_id')
                ->where('dt.period_year', '=', $filterTahunPeriode - 1);
        })
        ->join('city', 'city.id', '=', 'member.city_id')
        ->leftJoin(DB::raw("(select ktb_id, MIN(meet_dt) as first_meet_dt, MAX(meet_dt) as last_meet_dt from ktbhistory group by ktb_id having DATEDIFF(CONCAT('".$filterTahunPeriode."', '-12-31'), MAX(meet_dt)) < 360 AND YEAR(MIN(meet_dt)) = ".$filterTahunPeriode." - 1) as ktbhistory"), 'ktbhistory.ktb_id', '=', 'ktb.id')
        ->select(
            'city.id as city_id',
            'city.name as city_name',
            DB::raw('SUM(case when ktbhistory.first_meet_dt is not null then 1 else 0 end) as new_pktb_count'),
            DB::raw('COALESCE(dt.ktb_leader_target, 0) as ktb_leader_target')
        )
        ->groupBy('city.id', 'city.name', DB::raw('COALESCE(dt.ktb_leader_target, 0)'))
        ->get();

        // Tabel Distribusi PKK 2024
        $distributed_pktb = Ktb::from('ktb')
        ->join('ktbmember', function ($join) {
            $join->on('ktbmember.ktb_id', '=', 'ktb.id')
                ->where('ktbmember.is_pktb', '=', 1)
                ->where('ktbmember.is_active', '=', 1);
        })
        ->join('member', 'member.id', '=', 'ktbmember.member_id')
        ->join('city', 'city.id', '=', 'member.city_id')
        // Join untuk SHS
        ->leftJoin(DB::raw("
            (select ktbhistory.ktb_id
            from ktbhistory
            join ktbmember on ktbmember.ktb_id = ktbhistory.ktb_id and ktbmember.is_pktb = 1
            join member on member.id = ktbmember.member_id
            join institution on institution.id = member.institution_id and institution.type = 'SHS'
            group by ktbhistory.ktb_id
            having MIN(ktbhistory.meet_dt) = {$filterTahunPeriode}
            ) as ktb_history_shs
        "), 'ktb_history_shs.ktb_id', '=', 'ktb.id')
        ->leftJoin(DB::raw("
            (select ktbhistory.ktb_id
            from ktbhistory
            join ktbmember on ktbmember.ktb_id = ktbhistory.ktb_id and ktbmember.is_pktb = 1
            join member on member.id = ktbmember.member_id
            join institution on institution.id = member.institution_id and institution.type = 'SHS'
            group by ktbhistory.ktb_id
            having MIN(ktbhistory.meet_dt) < {$filterTahunPeriode} and MAX(ktbhistory.meet_dt) = {$filterTahunPeriode}
            ) as ktb_history_shs_old
        "), 'ktb_history_shs_old.ktb_id', '=', 'ktb.id')
        // Join untuk COL
        ->leftJoin(DB::raw("
            (select ktbhistory.ktb_id
            from ktbhistory
            join ktbmember on ktbmember.ktb_id = ktbhistory.ktb_id and ktbmember.is_pktb = 1
            join member on member.id = ktbmember.member_id
            join institution on institution.id = member.institution_id and institution.type = 'COL'
            group by ktbhistory.ktb_id
            having MIN(ktbhistory.meet_dt) = {$filterTahunPeriode}
            ) as ktb_history_col
        "), 'ktb_history_col.ktb_id', '=', 'ktb.id')
        ->leftJoin(DB::raw("
            (select ktbhistory.ktb_id
            from ktbhistory
            join ktbmember on ktbmember.ktb_id = ktbhistory.ktb_id and ktbmember.is_pktb = 1
            join member on member.id = ktbmember.member_id
            join institution on institution.id = member.institution_id and institution.type = 'COL'
            group by ktbhistory.ktb_id
            having MIN(ktbhistory.meet_dt) < {$filterTahunPeriode} and MAX(ktbhistory.meet_dt) = {$filterTahunPeriode}
            ) as ktb_history_col_old
        "), 'ktb_history_col_old.ktb_id', '=', 'ktb.id')
        // Join untuk WORK
        ->leftJoin(DB::raw("
            (select ktbhistory.ktb_id
            from ktbhistory
            join ktbmember on ktbmember.ktb_id = ktbhistory.ktb_id and ktbmember.is_pktb = 1
            join member on member.id = ktbmember.member_id
            join institution on institution.id = member.institution_id and institution.type = 'WORK'
            group by ktbhistory.ktb_id
            having MIN(ktbhistory.meet_dt) = {$filterTahunPeriode}
            ) as ktb_history_work
        "), 'ktb_history_work.ktb_id', '=', 'ktb.id')
        ->leftJoin(DB::raw("
            (select ktbhistory.ktb_id
            from ktbhistory
            join ktbmember on ktbmember.ktb_id = ktbhistory.ktb_id and ktbmember.is_pktb = 1
            join member on member.id = ktbmember.member_id
            join institution on institution.id = member.institution_id and institution.type = 'WORK'
            group by ktbhistory.ktb_id
            having MIN(ktbhistory.meet_dt) < {$filterTahunPeriode} and MAX(ktbhistory.meet_dt) = {$filterTahunPeriode}
            ) as ktb_history_work_old
        "), 'ktb_history_work_old.ktb_id', '=', 'ktb.id')
        ->select(
            'city.id as city_id',
            'city.name as city_name',
            DB::raw('SUM(case when ktb_history_shs.ktb_id is not null then 1 else 0 end) + SUM(case when ktb_history_shs_old.ktb_id is not null then 1 else 0 end) as pktb_shs'),
            DB::raw('SUM(case when ktb_history_col.ktb_id is not null then 1 else 0 end) + SUM(case when ktb_history_col_old.ktb_id is not null then 1 else 0 end) as pktb_col'),
            DB::raw('SUM(case when ktb_history_work.ktb_id is not null then 1 else 0 end) + SUM(case when ktb_history_work_old.ktb_id is not null then 1 else 0 end) as pktb_work')
        )
        ->groupBy('city.id', 'city.name')
        ->get();


        return view('admin.report_target.index', compact('report_target', 'old_new_ktb', 'new_pkk_before_to_now'));
    }

    public function filter_periode(Request $request)
    {
        $validatedData = $request->validate([
            'year' => 'required|string',
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
