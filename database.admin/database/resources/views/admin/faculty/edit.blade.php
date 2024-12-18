@extends('layouts.master')

@section('title', 'Fakultas')

@section('content')

<div class="container-fluid px-4">
    <div class="card mt-4">
        <div class="card-header">
            <h4 class="">Edit Fakultas
                <a href="{{ url('admin/faculty') }}" class="btn btn-primary btn-sm float-end">Kembali</a>
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

            <form action="{{ url('admin/update-faculty/'.$faculty->id) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                <div class="mb-3">
                    <label for="institution_id" class="form-label">Pilih Instansi</label>
                    <select class="form-control select2" id="institution_id" name="institution_id" required>
                        <option value="">-- Pilih Instansi --</option>
                        @foreach($institution as $institution)
                            <option value="{{ $institution->id }}">{{ $institution->name }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="mb-3">
                    <label>Kode Fakultas</label>
                    <input type="text" name="code" value="{{ $faculty->code }}" class="form-control" maxlength="3">
                </div>
                <div class="mb-3">
                    <label>Nama Fakultas</label>
                    <input type="text" name="name" value="{{ $faculty->name }}" class="form-control">
                </div>
                <div class="float-end">
                    <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection
