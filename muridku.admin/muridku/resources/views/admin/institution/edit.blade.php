@extends('layouts.master')

@section('title', 'Instansi')

@section('content')

<div class="container-fluid px-4">
    <div class="card mt-4">
        <div class="card-header">
            <h4 class="">Edit Instansi
                <a href="{{ url('admin/institution') }}" class="btn btn-primary btn-sm float-end">Kembali</a>
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

            <form action="{{ url('admin/update-institution/'.$institution->id) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                <div class="mb-3">
                    <label>Kode Instansi</label>
                    <input type="text" name="code" value="{{ $institution->code }}" class="form-control" maxlength="3" placeholder="Masukkan kode dengan maksimal 3 karakter">
                </div>
                <div class="mb-3">
                    <label>Nama Instansi</label>
                    <input type="text" name="name" value="{{ $institution->name }}" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="type" class="form-label">Tipe Instansi</label>
                    <select class="form-select" id="type" name="type" required>
                        <option value="">Pilih Tipe Instansi</option>
                        <option value="SHS" {{ $institution->type == 'SHS' ? 'selected' : '' }}>SMA</option>
                        <option value="COL" {{ $institution->type == 'COL' ? 'selected' : '' }}>Kuliah</option>
                        <option value="WORK" {{ $institution->type == 'WORK' ? 'selected' : '' }}>Kerja</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label>Alamat Instansi</label>
                    <input type="text" name="address" value="{{ $institution->address }}" class="form-control">
                </div>
                <div class="float-end">
                    <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection
