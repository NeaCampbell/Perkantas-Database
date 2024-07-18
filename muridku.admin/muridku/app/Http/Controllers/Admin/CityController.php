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
    public function index()
    {
        $city = City::all();
        return view('admin.city.index', compact('city'));
    }

    public function store(CityFormRequest $request)
    {
        $data = $request->validated();

        $city = new City;
        $city->code = $request->code;
        $city->name = $request->name;

        if (Auth::check()) {
            $city->usr_crt = Auth::user()->name;
        } else {
            $city->usr_crt = 'Anonymous';
        }

        $city->dtm_crt = now();
        $city->usr_upd = $city->usr_crt;
        $city->dtm_upd = now();
        $city->save();

        return redirect('admin/city')->with('message', 'City Added Successfully');
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
