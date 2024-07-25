<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Http\Requests\Admin\MaterialFormRequest;

class MaterialController extends Controller
{
    public function index()
    {
        $material = Material::all();
        return view('admin.material.index', compact('material'));
    }

    public function store(MaterialFormRequest $request)
    {
        $data = $request->validated();

        $material = new Material;
        $material->code = $data['code'];
        $material->name = $data['name'];
        $material->chapter_count = $data['chapter_count'];

        if (Auth::check()) {
            $material->usr_crt = Auth::user()->name;
        } else {
            $material->usr_crt = 'Anonymous';
        }

        $material->dtm_crt = now();
        $material->usr_upd = $material->usr_crt;
        $material->dtm_upd = now();
        $material->save();

        return redirect('admin/material')->with('message', 'Bahan KTB Berhasil di Tambah');
    }

    public function update(MaterialFormRequest $request, $material_id)
    {
        $data = $request->validated();

        $material = Material::find($material_id);
        $material->code = $data['code'];
        $material->name = $data['name'];
        $material->chapter_count = $data['chapter_count'];
        if (Auth::check()) {
            $material->usr_upd = Auth::user()->name;
        } else {
            $material->usr_upd = 'Anonymous';
        }
        $material->dtm_upd = now();
        $material->update();

        return redirect('admin/material')->with('message', 'Bahan KTB Berhasil di Ubah');
    }

    public function edit($material_id)
    {
        $material = Material::find($material_id);
        return view('admin.material.edit', compact('material'));
    }

    public function delete($material_id)
    {
        $material = Material::find($material_id);
        if($material)
        {
            $destination = 'upload/material/'.$material->image;
            if(File::exists($destination)){
                File::delete($destination);
            }
            $material->delete();
            return redirect('admin/material')->with('message', 'Bahan KTB Berhasil di Hapus');
        }
        else
        {
            return redirect('admin/material')->with('message', 'Bahan KTB Tidak Ditemukan');
        }
    }
}
