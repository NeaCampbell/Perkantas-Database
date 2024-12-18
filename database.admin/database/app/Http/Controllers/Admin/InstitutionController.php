<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Institution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Http\Requests\Admin\InstitutionFormRequest;

class InstitutionController extends Controller
{
    public function index()
    {
        $institution = Institution::all();
        return view('admin.institution.index', compact('institution'));
    }

    public function store(InstitutionFormRequest $request)
    {
        $data = $request->validated();

        $institution = new Institution;
        $institution->code = $data['code'];
        $institution->name = $data['name'];
        $institution->type = $data['type'];
        $institution->address = $data['address'];

        if (Auth::check()) {
            $institution->usr_crt = Auth::user()->name;
        } else {
            $institution->usr_crt = 'Anonymous';
        }

        $institution->dtm_crt = now();
        $institution->usr_upd = $institution->usr_crt;
        $institution->dtm_upd = now();
        $institution->save();

        return redirect('admin/institution')->with('message', 'Instansi Berhasil di Tambah');
    }

    public function update(InstitutionFormRequest $request, $institution_id)
    {
        $data = $request->validated();

        $institution = Institution::find($institution_id);
        $institution->code = $data['code'];
        $institution->name = $data['name'];
        $institution->type = $data['type'];
        $institution->address = $data['address'];
        if (Auth::check()) {
            $institution->usr_upd = Auth::user()->name;
        } else {
            $institution->usr_upd = 'Anonymous';
        }
        $institution->dtm_upd = now();
        $institution->update();

        return redirect('admin/institution')->with('message', 'Instansi Berhasil di Ubah');
    }

    public function edit($institution_id)
    {
        $institution = Institution::find($institution_id);
        return view('admin.institution.edit', compact('institution'));
    }

    public function delete($institution_id)
    {
        $institution = Institution::find($institution_id);
        if($institution)
        {
            $destination = 'upload/institution/'.$institution->image;
            if(File::exists($destination)){
                File::delete($destination);
            }
            $institution->delete();
            return redirect('admin/institution')->with('message', 'Instansi Berhasil di Hapus');
        }
        else
        {
            return redirect('admin/institution')->with('message', 'Instansi Tidak Ditemukan');
        }
    }
}
