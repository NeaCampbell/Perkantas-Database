<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DiscipleshipTarget;
use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Http\Requests\Admin\DiscipleshipTargetFormRequest;

class DiscipleshipTargetController extends Controller
{
    public function index()
    {
        $discipleship_target = DiscipleshipTarget::all();
        $city = City::all();
        return view('admin.discipleship_target.index', compact('discipleship_target', 'city'));
    }

    public function store(DiscipleshipTargetFormRequest $request)
    {
        $data = $request->validated();

        $discipleship_target = new DiscipleshipTarget;
        $discipleship_target->city_id = $data['city_id'];
        $discipleship_target->period_year = $data['period_year'];
        $discipleship_target->evangelism_target = $data['evangelism_target'];
        $discipleship_target->evangelism_movement_target = $data['evangelism_movement_target'];
        $discipleship_target->ktb_leader_target = $data['ktb_leader_target'];
        $discipleship_target->ktb_group_target = $data['ktb_group_target'];

        if (Auth::check()) {
            $discipleship_target->usr_crt = Auth::user()->name;
        } else {
            $discipleship_target->usr_crt = 'Anonymous';
        }

        $discipleship_target->dtm_crt = now();
        $discipleship_target->usr_upd = $discipleship_target->usr_crt;
        $discipleship_target->dtm_upd = now();
        $discipleship_target->save();

        return redirect('admin/discipleship_target')->with('message', 'Target Pemuridan Berhasil di Tambah');
    }

    public function update(DiscipleshipTargetFormRequest $request, $discipleship_target_id)
    {
        $data = $request->validated();

        $discipleship_target = DiscipleshipTarget::find($discipleship_target_id);
        $discipleship_target->period_year = $data['period_year'];
        $discipleship_target->evangelism_target = $data['evangelism_target'];
        $discipleship_target->evangelism_movement_target = $data['evangelism_movement_target'];
        $discipleship_target->ktb_leader_target = $data['ktb_leader_target'];
        $discipleship_target->ktb_group_target = $data['ktb_group_target'];

        if (Auth::check()) {
            $discipleship_target->usr_upd = Auth::user()->name;
        } else {
            $discipleship_target->usr_upd = 'Anonymous';
        }
        $discipleship_target->dtm_upd = now();
        $discipleship_target->update();

        return redirect('admin/discipleship_target')->with('message', 'Target Pemuridan Berhasil di Ubah');
    }

    public function edit($discipleship_target_id)
    {
        $discipleship_target = DiscipleshipTarget::find($discipleship_target_id);
        return view('admin.discipleship_target.edit', compact('discipleship_target'));
    }

    public function delete($discipleship_target_id)
    {
        $discipleship_target = DiscipleshipTarget::find($discipleship_target_id);
        if($discipleship_target)
        {
            $destination = 'upload/discipleship_target/'.$discipleship_target->image;
            if(File::exists($destination)){
                File::delete($destination);
            }
            $discipleship_target->delete();
            return redirect('admin/discipleship_target')->with('message', 'Target Pemuridan Berhasil di Hapus');
        }
        else
        {
            return redirect('admin/discipleship_target')->with('message', 'Target Pemuridan Tidak Ditemukan');
        }
    }
}
