<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Institution;
use App\Models\City;
use App\Models\Faculty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\Admin\MemberFormRequest;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\MembersImport;

class MemberController extends Controller
{
    public function index()
    {
        $member = Member::with(['city', 'institution', 'faculty'])->get();
        $city = City::all();
        $institution = Institution::all();
        $faculty = Faculty::all();

        return view('admin.member.index', compact('member', 'city', 'institution', 'faculty'));
    }

    public function store(MemberFormRequest $request)
    {
        $data = $request->validated();

        $member = new Member;
        $member->name = $data['name'];
        $member->address = $data['address'] ?? null;
        $member->gender = $data['gender'] ?? null;
        $member->birth_dt = $data['birth_dt'] ?? null;
        $member->birth_place = $data['birth_place'] ?? null;
        $member->mobile_phn = $data['mobile_phn'] ?? null;
        $member->status = $data['status'];
        $member->inst_type = $data['inst_type'] ?? null;
        $member->city_id = $data['city_id'];
        $member->institution_id = $data['institution_id'] ?? null;
        $member->faculty_id = $data['faculty_id'] ?? null;
        $member->alpha_member_id = $data['alpha_member_id'] ?? null;
        if (Auth::check()) {
            $member->usr_crt = Auth::user()->name;
        } else {
            $member->usr_crt = 'Anonymous';
        }

        $member->dtm_crt = now();
        $member->usr_upd = $member->usr_crt;
        $member->dtm_upd = now();
        $member->save();

        return redirect('admin/member')->with('message', 'Anggota Berhasil di Tambah');
    }

    public function update(MemberFormRequest $request, $member_id)
    {
        $data = $request->validated();

        $member = Member::find($member_id);
        $member->name = $data['name'];
        $member->address = $data['address'] ?? null;
        $member->gender = $data['gender'] ?? null;
        $member->birth_dt = $data['birth_dt'] ?? null;
        $member->birth_place = $data['birth_place'] ?? null;
        $member->mobile_phn = $data['mobile_phn'] ?? null;
        $member->status = $data['status'];
        $member->inst_type = $data['inst_type'] ?? null;
        $member->city_id = $data['city_id'];
        $member->institution_id = $data['institution_id'] ?? null;
        $member->faculty_id = $data['faculty_id'] ?? null;
        $member->alpha_member_id = $data['alpha_member_id'] ?? null;
        if (Auth::check()) {
            $member->usr_upd = Auth::user()->name;
        } else {
            $member->usr_upd = 'Anonymous';
        }
        $member->dtm_upd = now();
        $member->update();

        return redirect('admin/member')->with('message', 'Anggota Berhasil di Ubah');
    }

    public function edit($member_id)
    {
        $member = Member::findOrFail($member_id);
        $city = City::all();
        $institution = Institution::all();
        $faculty = Faculty::where('institution_id', $member->institution_id)->get();

        return view('admin.member.edit', compact('member', 'city', 'institution', 'faculty'));
    }


    public function delete($member_id)
    {
        $member = Member::find($member_id);
        if($member)
        {
            $destination = 'upload/member/'.$member->image;
            if(File::exists($destination)){
                File::delete($destination);
            }
            $member->delete();
            return redirect('admin/member')->with('message', 'Anggota Berhasil di Hapus');
        }
        else
        {
            return redirect('admin/member')->with('message', 'Anggota Tidak Ditemukan');
        }
    }

    public function getFaculties($institution_id)
    {
        $faculties = Faculty::where('institution_id', $institution_id)->get();
        return response()->json($faculties);
    }

    public function importMembers(Request $request)
    {
        Log::info('importMembers function executed.');
    
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv',
        ]);

        if ($request->hasFile('file')) {
            Log::info('File received: ' . $request->file('file')->getClientOriginalName());
        } else {
            Log::error('No file received.');
        }
    
        try {
            Excel::import(new MembersImport, $request->file('file'));
            return redirect()->back()->with('message', 'Data berhasil diimport.');
        } catch (\Exception $e) {
            Log::error('Error in importMembers: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
