<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Http\Requests\Admin\CityFormRequest;

class CityController extends Controller
{
    public function index(Request $request)
    {
        // //error
        // if ($request->ajax()) {
        //     $city = City::query();
        //     return DataTables::of($city)
        //         ->addIndexColumn()
        //         ->make(true);
        // }
        return view('admin.city.index', compact('city'));
    }

    public function store(CityFormRequest $request)
    {
        $data = $request->validated();

        $city = new City;
        $city->code = $data['code'];
        $city->name = $data['name'];

        if (Auth::check()) {
            $city->usr_crt = Auth::user()->name;
        } else {
            $city->usr_crt = 'Anonymous';
        }

        $city->dtm_crt = now();
        $city->usr_upd = $city->usr_crt;
        $city->dtm_upd = now();
        $city->save();

        return redirect('admin/city')->with('message', 'Berhasil di Tambah');
    }

    public function update(CityFormRequest $request, $city_id)
    {
        $data = $request->validated();

        $city = City::find($city_id);
        $city->code = $data['code'];
        $city->name = $data['name'];
        if (Auth::check()) {
            $city->usr_upd = Auth::user()->name;
        } else {
            $city->usr_upd = 'Anonymous';
        }
        $city->dtm_upd = now();
        $city->update();

        return redirect('admin/city')->with('message', 'City Berhasil di Ubah');
    }

    public function edit($city_id)
    {
        $city = City::find($city_id);
        return view('admin.city.edit', compact('city'));
    }

    public function delete($city_id)
    {
        $city = City::find($city_id);
        if($city)
        {
            $destination = 'upload/city/'.$city->image;
            if(File::exists($destination)){
                File::delete($destination);
            }
            $city->delete();
            return redirect('admin/city')->with('message', 'Kota Berhasil di Hapus');
        }
        else
        {
            return redirect('admin/city')->with('message', 'Kota Tidak Ditemukan');
        }
    }
}
