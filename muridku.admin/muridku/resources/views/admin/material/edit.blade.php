@extends('layouts.master')

@section('title', 'Bahan KTB')

@section('content')

<div class="container-fluid px-4">
    <div class="card mt-4">
        <div class="card-header">
            <h4 class="">Edit Bahan KTB
                <a href="{{ url('admin/material') }}" class="btn btn-primary btn-sm float-end">Kembali</a>
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

            <form action="{{ url('admin/update-material/'.$material->id) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                <div class="mb-3">
                    <label>Kode Bahan KTB</label>
                    <input type="text" name="code" value="{{ $material->code }}" class="form-control" maxlength="3" placeholder="Masukkan kode dengan maksimal 3 karakter">
                </div>
                <div class="mb-3">
                    <label>Nama Bahan KTB</label>
                    <input type="text" name="name" value="{{ $material->name }}" class="form-control">
                </div>
                <div class="mb-3">
                    <label>Jumlah Chapter Bahan KTB</label>
                    <input type="text" name="address" value="{{ $material->chapter_count }}" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="type" class="form-label">Tipe Bahan KTB</label>
                    <select class="form-select" id="type" name="type" required>
                        <option value="">Pilih Tipe Bahan KTB</option>
                        <option value="0" {{ $material->type == '0' ? 'selected' : '' }}>Pra-KTB</option>
                        <option value="1" {{ $material->type == '1' ? 'selected' : '' }}>KTB</option>
                    </select>
                </div>
                <div class="float-end">
                    <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection
