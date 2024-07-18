<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Http\Requests\Admin\ReportFormRequest;

class ReportController extends Controller
{
    public function index()
    {
        $report = Report::all();
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
