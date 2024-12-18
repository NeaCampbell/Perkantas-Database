<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use App\Models\Institution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Http\Requests\Admin\FacultyFormRequest;

class FacultyController extends Controller
{
    public function index()
    {
        $faculty = Faculty::all();
        $institution = Institution::all();
        return view('admin.faculty.index', compact('faculty', 'institution'));
    }

    public function store(FacultyFormRequest $request)
    {
        $data = $request->validated();

        $faculty = new Faculty;
        $faculty->institution_id = $data['institution_id'];
        $faculty->code = $data['code'];
        $faculty->name = $data['name'];

        if (Auth::check()) {
            $faculty->usr_crt = Auth::user()->name;
        } else {
            $faculty->usr_crt = 'Anonymous';
        }

        $faculty->dtm_crt = now();
        $faculty->usr_upd = $faculty->usr_crt;
        $faculty->dtm_upd = now();
        $faculty->save();

        return redirect('admin/faculty')->with('message', 'Fakultas Berhasil di Tambah');
    }

    public function update(FacultyFormRequest $request, $faculty_id)
    {
        $data = $request->validated();

        $faculty = Faculty::find($faculty_id);
        $faculty->institution_id = $data['institution_id'];
        $faculty->code = $data['code'];
        $faculty->name = $data['name'];
        if (Auth::check()) {
            $faculty->usr_upd = Auth::user()->name;
        } else {
            $faculty->usr_upd = 'Anonymous';
        }
        $faculty->dtm_upd = now();
        $faculty->update();

        return redirect('admin/faculty')->with('message', 'Fakultas Berhasil di Ubah');
    }

    public function edit($faculty_id)
    {
        $faculty = Faculty::find($faculty_id);
        $institution = Institution::all();
        return view('admin.faculty.edit', compact('faculty', 'institution'));
    }

    public function delete($faculty_id)
    {
        $faculty = Faculty::find($faculty_id);
        if($faculty)
        {
            $destination = 'upload/faculty/'.$faculty->image;
            if(File::exists($destination)){
                File::delete($destination);
            }
            $faculty->delete();
            return redirect('admin/faculty')->with('message', 'Fakultas Berhasil di Hapus');
        }
        else
        {
            return redirect('admin/faculty')->with('message', 'Fakultas Tidak Ditemukan');
        }
    }
}
