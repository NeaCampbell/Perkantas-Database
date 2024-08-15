<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ktb;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\Admin\ReportFormRequest;

class ReportController extends Controller
{
    public function index()
    {
        // $report = Ktb::with([
        //     'member' => function($query) {
        //         $query->join('memberinstitutionhist', 'member.id', '=', 'memberinstitutionhist.member_id')
        //               ->select('member.id', 'member.name', 'memberinstitutionhist.institution_id');
        //     },
        //     'ktbHistory' => function($query) {
        //         $query->latest('meet_dt');
        //     }
        // ])->get();

        $report = Ktb::join('ktbmember', 'ktbmember.ktb_id', '=', 'ktb.id')
            ->join('member', 'member.id', '=', 'ktbmember.member_id')
            ->leftJoin('institution', 'institution.id', '=', 'member.institution_id')
            ->leftJoin('ktbhistory', 'ktbhistory.ktb_id', '=', 'ktb.id')
            ->select('ktbmember.member_id', 'ktb.name', 'member.name as member_name', 'institution.name as institution_name',
                DB::raw('MAX(ktbhistory.meet_dt) as last_meet_dt'),
                DB::raw('CASE
                    WHEN TIMESTAMPDIFF(MONTH, MAX(ktbhistory.meet_dt), CURRENT_DATE()) > 6 THEN "Mati"
                    WHEN TIMESTAMPDIFF(MONTH, MAX(ktbhistory.meet_dt), CURRENT_DATE()) > 3 AND TIMESTAMPDIFF(MONTH, MAX(ktbhistory.meet_dt), CURRENT_DATE()) <= 6 THEN "Vakum"
                    WHEN TIMESTAMPDIFF(MONTH, MAX(ktbhistory.meet_dt), CURRENT_DATE()) <= 3 THEN "Aktif"
                    ELSE "undefined"
                END AS status'))
            ->groupBy('ktbmember.member_id', 'ktb.name', 'member.name', 'institution.name')
            ->get();

        return view('admin.report.index', compact('report'));
    }

    public function filter_periode()
    {
        $currentYear = date('Y');
        $startDate = $currentYear . '-01-01';
        $endDate = date('Y-m-d');

        $report = Ktb::join('ktbmember', 'ktbmember.ktb_id', '=', 'ktb.id')
            ->join('member', 'member.id', '=', 'ktbmember.member_id')
            ->leftJoin('institution', 'institution.id', '=', 'member.institution_id')
            ->leftJoin('ktbhistory', 'ktbhistory.ktb_id', '=', 'ktb.id')
            ->whereBetween('ktbhistory.meet_dt', [$startDate, $endDate])
            ->select('ktbmember.member_id', 'ktb.name', 'member.name as member_name', 'institution.name as institution_name',
                DB::raw('MAX(ktbhistory.meet_dt) as last_meet_dt'),
                DB::raw('CASE
                    WHEN TIMESTAMPDIFF(MONTH, MAX(ktbhistory.meet_dt), CURRENT_DATE()) > 6 THEN "Mati"
                    WHEN TIMESTAMPDIFF(MONTH, MAX(ktbhistory.meet_dt), CURRENT_DATE()) > 3 AND TIMESTAMPDIFF(MONTH, MAX(ktbhistory.meet_dt), CURRENT_DATE()) <= 6 THEN "Vakum"
                    WHEN TIMESTAMPDIFF(MONTH, MAX(ktbhistory.meet_dt), CURRENT_DATE()) <= 3 THEN "Aktif"
                    ELSE "undefined"
                END AS status'))
            ->groupBy('ktbmember.member_id', 'ktb.name', 'member.name', 'institution.name')
            ->get();

        return view('admin.report.index', compact('report'));
    }


    public function filter_tanggal(Request $request)
    {
        $validatedData = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $startDate = $validatedData['start_date'];
        $endDate = $validatedData['end_date'];

        $report = Ktb::join('ktbmember', 'ktbmember.ktb_id', '=', 'ktb.id')
            ->join('member', 'member.id', '=', 'ktbmember.member_id')
            ->leftJoin('institution', 'institution.id', '=', 'member.institution_id')
            ->leftJoin('ktbhistory', 'ktbhistory.ktb_id', '=', 'ktb.id')
            ->whereBetween('ktbhistory.meet_dt', [$startDate, $endDate])
            ->select('ktbmember.member_id', 'ktb.name', 'member.name as member_name', 'institution.name as institution_name',
                DB::raw('MAX(ktbhistory.meet_dt) as last_meet_dt'),
                DB::raw('CASE
                    WHEN TIMESTAMPDIFF(MONTH, MAX(ktbhistory.meet_dt), CURRENT_DATE()) > 6 THEN "Mati"
                    WHEN TIMESTAMPDIFF(MONTH, MAX(ktbhistory.meet_dt), CURRENT_DATE()) > 3 AND TIMESTAMPDIFF(MONTH, MAX(ktbhistory.meet_dt), CURRENT_DATE()) <= 6 THEN "Vakum"
                    WHEN TIMESTAMPDIFF(MONTH, MAX(ktbhistory.meet_dt), CURRENT_DATE()) <= 3 THEN "Aktif"
                    ELSE "undefined"
                END AS status'))
            ->groupBy('ktbmember.member_id', 'ktb.name', 'member.name', 'institution.name')
            ->get();

        return view('admin.report.index', compact('report'));
    }

    public function create()
    {
        return view('admin.report.create');
    }

    public function store(ReportFormRequest $request)
    {
        $data = $request->validated();

        $report = new Report;
        $report->name = $data['name'];
        $report->slug = $data['slug'];
        $report->description = $data['description'];
        if($request->hasFile('image')){
            $file = $request->file('image');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move('upload/report/', $filename);
            $report->image = $filename;
        }

        $report->meta_title = $data['meta_title'];
        $report->meta_description = $data['meta_description'];
        $report->meta_keyword = $data['meta_keyword'];

        $report->navbar_status = $request->navbar_status == true ? '1':'0';
        $report->status = $request->status == true ? '1':'0';
        $report->created_by = Auth::user()->id;
        $report->save();

        return redirect('admin/report')->with('message', 'Report Added Successfully');
    }

    public function edit($report_id)
    {
        $report = Report::find($report_id);
        return view('admin.report.edit', compact('report'));
    }

    public function update(ReportFormRequest $request, $report_id)
    {
        $data = $request->validated();

        $report = Report::find($report_id);
        $report->name = $data['name'];
        $report->slug = $data['slug'];
        $report->description = $data['description'];
        if($request->hasFile('image')){
            $destination = 'upload/report/'.$report->image;
            if(File::exists($destination)){
                File::delete($destination);
            }

            $file = $request->file('image');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move('upload/report/', $filename);
            $report->image = $filename;
        }

        $report->meta_title = $data['meta_title'];
        $report->meta_description = $data['meta_description'];
        $report->meta_keyword = $data['meta_keyword'];

        $report->navbar_status = $request->navbar_status == true ? '1':'0';
        $report->status = $request->status == true ? '1':'0';
        $report->created_by = Auth::user()->id;
        $report->update();

        return redirect('admin/report')->with('message', 'Report Updated Successfully');
    }

    public function delete($report_id)
    {
        $report = Report::find($report_id);
        if($report)
        {
            $destination = 'upload/report/'.$report->image;
            if(File::exists($destination)){
                File::delete($destination);
            }
            $report->delete();
            return redirect('admin/report')->with('message', 'Report Deleted Successfully');
        }
        else
        {
            return redirect('admin/report')->with('message', 'No Report Id Found');
        }
    }
}
