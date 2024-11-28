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
    public function index(Request $request)
    {
        $filterTahunPeriode = $request->get('year', date('Y'));

        // Tabel Jumlah Realisasi PKK 2024
        $report_target = DB::table('city')
        ->leftJoin('discipleship_target', 'discipleship_target.city_id', '=', 'city.id')
        ->leftJoin('member', 'member.city_id', '=', 'city.id')
        ->leftJoin('ktbmember', function ($join) {
            $join->on('ktbmember.member_id', '=', 'member.id')
                 ->where('ktbmember.is_pktb', '=', 1);
        })
        ->leftJoin('ktb', 'ktb.id', '=', 'ktbmember.ktb_id')
        ->leftJoin(DB::raw("(select ktb_id, MIN(meet_dt) as first_meet_dt from ktbhistory group by ktb_id) as ktbhistory"), 'ktbhistory.ktb_id', '=', 'ktb.id')
        ->where(function ($query) use ($filterTahunPeriode) {
            $query->whereNull('ktbhistory.first_meet_dt')
                  ->orWhere(DB::raw('YEAR(ktbhistory.first_meet_dt)'), '=', $filterTahunPeriode);
        })
        ->where('discipleship_target.period_year', '=', $filterTahunPeriode)
        ->select(
            'city.id as city_id',
            'city.name as city_name',
            DB::raw('COUNT(DISTINCT ktb.id) as new_pktb_count'),
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
        $distributed_pktb = DB::table('ktb')
        ->join('ktbmember', function ($join) {
            $join->on('ktbmember.ktb_id', '=', 'ktb.id')
                ->where('ktbmember.is_pktb', '=', 1)
                ->where('ktbmember.is_active', '=', 1);
        })
        ->join('member', 'member.id', '=', 'ktbmember.member_id')
        ->join('city', 'city.id', '=', 'member.city_id')
        // SHS History
        ->leftJoin(DB::raw("
            (SELECT ktbhistory.ktb_id, MIN(ktbhistory.meet_dt) AS first_meet_dt
            FROM ktbhistory
            JOIN ktbmember ON ktbmember.ktb_id = ktbhistory.ktb_id AND ktbmember.is_pktb = 1
            JOIN member ON member.id = ktbmember.member_id
            JOIN institution ON institution.id = member.institution_id AND institution.type = 'SHS'
            GROUP BY ktbhistory.ktb_id
            HAVING MIN(ktbhistory.meet_dt) >= '2024-01-01' AND MIN(ktbhistory.meet_dt) <= '2024-12-31'
            ) AS ktb_history_shs
        "), 'ktb_history_shs.ktb_id', '=', 'ktb.id')
        ->leftJoin(DB::raw("
            (SELECT ktbhistory.ktb_id, MIN(ktbhistory.meet_dt) AS first_meet_dt, MAX(ktbhistory.meet_dt) AS last_meet_dt
            FROM ktbhistory
            JOIN ktbmember ON ktbmember.ktb_id = ktbhistory.ktb_id AND ktbmember.is_pktb = 1
            JOIN member ON member.id = ktbmember.member_id
            JOIN institution ON institution.id = member.institution_id AND institution.type = 'SHS'
            GROUP BY ktbhistory.ktb_id
            HAVING MIN(ktbhistory.meet_dt) < '2024-01-01' AND MAX(ktbhistory.meet_dt) >= '2024-01-01'
            ) AS ktb_history_shs_old
        "), 'ktb_history_shs_old.ktb_id', '=', 'ktb.id')
        // COL History
        ->leftJoin(DB::raw("
            (SELECT ktbhistory.ktb_id, MIN(ktbhistory.meet_dt) AS first_meet_dt
            FROM ktbhistory
            JOIN ktbmember ON ktbmember.ktb_id = ktbhistory.ktb_id AND ktbmember.is_pktb = 1
            JOIN member ON member.id = ktbmember.member_id
            JOIN institution ON institution.id = member.institution_id AND institution.type = 'COL'
            GROUP BY ktbhistory.ktb_id
            HAVING MIN(ktbhistory.meet_dt) >= '2024-01-01' AND MIN(ktbhistory.meet_dt) <= '2024-12-31'
            ) AS ktb_history_col
        "), 'ktb_history_col.ktb_id', '=', 'ktb.id')
        ->leftJoin(DB::raw("
            (SELECT ktbhistory.ktb_id, MIN(ktbhistory.meet_dt) AS first_meet_dt, MAX(ktbhistory.meet_dt) AS last_meet_dt
            FROM ktbhistory
            JOIN ktbmember ON ktbmember.ktb_id = ktbhistory.ktb_id AND ktbmember.is_pktb = 1
            JOIN member ON member.id = ktbmember.member_id
            JOIN institution ON institution.id = member.institution_id AND institution.type = 'COL'
            GROUP BY ktbhistory.ktb_id
            HAVING MIN(ktbhistory.meet_dt) < '2024-01-01' AND MAX(ktbhistory.meet_dt) >= '2024-01-01'
            ) AS ktb_history_col_old
        "), 'ktb_history_col_old.ktb_id', '=', 'ktb.id')
        // WORK History
        ->leftJoin(DB::raw("
            (SELECT ktbhistory.ktb_id, MIN(ktbhistory.meet_dt) AS first_meet_dt
            FROM ktbhistory
            JOIN ktbmember ON ktbmember.ktb_id = ktbhistory.ktb_id AND ktbmember.is_pktb = 1
            JOIN member ON member.id = ktbmember.member_id
            JOIN institution ON institution.id = member.institution_id AND institution.type = 'WORK'
            GROUP BY ktbhistory.ktb_id
            HAVING MIN(ktbhistory.meet_dt) >= '2024-01-01' AND MIN(ktbhistory.meet_dt) <= '2024-12-31'
            ) AS ktb_history_work
        "), 'ktb_history_work.ktb_id', '=', 'ktb.id')
        ->leftJoin(DB::raw("
            (SELECT ktbhistory.ktb_id, MIN(ktbhistory.meet_dt) AS first_meet_dt, MAX(ktbhistory.meet_dt) AS last_meet_dt
            FROM ktbhistory
            JOIN ktbmember ON ktbmember.ktb_id = ktbhistory.ktb_id AND ktbmember.is_pktb = 1
            JOIN member ON member.id = ktbmember.member_id
            JOIN institution ON institution.id = member.institution_id AND institution.type = 'WORK'
            GROUP BY ktbhistory.ktb_id
            HAVING MIN(ktbhistory.meet_dt) < '2024-01-01' AND MAX(ktbhistory.meet_dt) >= '2024-01-01'
            ) AS ktb_history_work_old
        "), 'ktb_history_work_old.ktb_id', '=', 'ktb.id')
        ->select(
            'city.id AS city_id',
            'city.name AS city_name',
            DB::raw('SUM(CASE WHEN ktb_history_shs.ktb_id IS NOT NULL THEN 1 ELSE 0 END) + SUM(CASE WHEN ktb_history_shs_old.ktb_id IS NOT NULL THEN 1 ELSE 0 END) AS pktb_shs'),
            DB::raw('SUM(CASE WHEN ktb_history_col.ktb_id IS NOT NULL THEN 1 ELSE 0 END) + SUM(CASE WHEN ktb_history_col_old.ktb_id IS NOT NULL THEN 1 ELSE 0 END) AS pktb_col'),
            DB::raw('SUM(CASE WHEN ktb_history_work.ktb_id IS NOT NULL THEN 1 ELSE 0 END) + SUM(CASE WHEN ktb_history_work_old.ktb_id IS NOT NULL THEN 1 ELSE 0 END) AS pktb_work')
        )
        ->groupBy('city.id', 'city.name')
        ->get();

        //Realisasi Grup KTB
        $ktb_realization = DB::table('discipleship_target as dt')
        ->join('city', 'city.id', '=', 'dt.city_id')
        ->leftJoin('member', 'member.city_id', '=', 'dt.city_id')
        ->leftJoin('ktbmember', function ($join) {
            $join->on('ktbmember.member_id', '=', 'member.id')
                 ->where('ktbmember.is_pktb', '=', 1)
                 ->where('ktbmember.is_active', '=', 1);
        })
        ->leftJoin(DB::raw("
            (SELECT ktbhistory.ktb_id, MIN(ktbhistory.meet_dt) AS first_meet_dt
            FROM ktbhistory
            JOIN ktbmember ON ktbmember.ktb_id = ktbhistory.ktb_id AND ktbmember.is_pktb = 1
            JOIN member ON member.id = ktbmember.member_id
            JOIN institution ON institution.id = member.institution_id
            GROUP BY ktbhistory.ktb_id
            HAVING YEAR(MIN(ktbhistory.meet_dt)) = $filterTahunPeriode
            ) AS ktb_history
        "), 'ktb_history.ktb_id', '=', 'ktbmember.ktb_id')
        ->select(
            'city.id AS city_id',
            'city.name AS city_name',
            'dt.ktb_group_target',
            DB::raw('SUM(CASE WHEN ktb_history.ktb_id IS NOT NULL THEN 1 ELSE 0 END) AS ktb_group_realization')
        )
        ->where('dt.period_year', '=', $filterTahunPeriode)
        ->groupBy('city.id', 'city.name', 'dt.ktb_group_target')
        ->get();


        return view('admin.report_target.index', compact('report_target', 'old_new_ktb', 'new_pkk_before_to_now', 'distributed_pktb', 'ktb_realization', 'filterTahunPeriode'));
    }

    public function filter_periode(Request $request)
    {
        $validatedData = $request->validate([
            'year' => 'required|integer',
        ]);

        $filterTahunPeriode = $validatedData['year'];

        return redirect()->route('admin.report_target.index', ['year' => $filterTahunPeriode]);
    }
}
