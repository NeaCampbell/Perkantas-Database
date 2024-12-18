@extends('layouts.master')

@section('title', 'Acara')

@section('content')

<div class="container-fluid px-4">
    <div class="card mt-4">
        <div class="card-header">
            <h4 class="">Edit Acara
                <a href="{{ url('admin/event') }}" class="btn btn-primary btn-sm float-end">Kembali</a>
            </h4>
        </div>
        <div class="card-body">

            @if ($errors->any())
            <div class="alert alert-danger ">
                @foreach ($errors->all() as $error)
                    <div>{{ $error }}</div>
                @endforeach
            </div>
            @endif

            <form action="{{ url('admin/update-event/'.$event->id) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                <div class="mb-3">
                    <label>Nama Acara</label>
                    <input type="text" name="name" value="{{ $event->name }}" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="type" class="form-label">Tipe Acara</label>
                    <select class="form-select" id="type" name="type" required>
                        <option value="">Pilih Tipe Acara</option>
                        <option value="SHS" {{ $event->type == 'SHS' ? 'selected' : '' }}>SMA</option>
                        <option value="COL" {{ $event->type == 'COL' ? 'selected' : '' }}>Kuliah</option>
                        <option value="WORK" {{ $event->type == 'WORK' ? 'selected' : '' }}>Kerja</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label>Tanggal Acara</label>
                    <input type="date" name="date" value="{{ $event->address }}" class="form-control">
                </div>
                <div class="float-end">
                    <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection
