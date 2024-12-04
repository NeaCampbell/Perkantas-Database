<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Http\Requests\Admin\EventFormRequest;

class EventController extends Controller
{
    public function index()
    {
        $event = Event::all();
        return view('admin.event.index', compact('event'));
    }

    public function store(EventFormRequest $request)
    {
        $data = $request->validated();

        $event = new Event;
        $event->name = $data['name'];
        $event->type = $data['type'];
        $event->date = $data['date'];

        if (Auth::check()) {
            $event->usr_crt = Auth::user()->name;
        } else {
            $event->usr_crt = 'Anonymous';
        }

        $event->dtm_crt = now();
        $event->usr_upd = $event->usr_crt;
        $event->dtm_upd = now();
        $event->save();

        return redirect('admin/event')->with('message', 'Acara Berhasil di Tambah');
    }

    public function update(EventFormRequest $request, $event_id)
    {
        $data = $request->validated();

        $event = Event::find($event_id);
        $event->name = $data['name'];
        $event->type = $data['type'];
        $event->date = $data['date'];
        if (Auth::check()) {
            $event->usr_upd = Auth::user()->name;
        } else {
            $event->usr_upd = 'Anonymous';
        }
        $event->dtm_upd = now();
        $event->update();

        return redirect('admin/event')->with('message', 'Acara Berhasil di Ubah');
    }

    public function edit($event_id)
    {
        $event = Event::find($event_id);
        return view('admin.event.edit', compact('event'));
    }

    public function delete($event_id)
    {
        $event = Event::find($event_id);
        if($event)
        {
            $destination = 'upload/event/'.$event->image;
            if(File::exists($destination)){
                File::delete($destination);
            }
            $event->delete();
            return redirect('admin/event')->with('message', 'Acara Berhasil di Hapus');
        }
        else
        {
            return redirect('admin/event')->with('message', 'Acara Tidak Ditemukan');
        }
    }
}
