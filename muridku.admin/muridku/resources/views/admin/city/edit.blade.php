@extends('layouts.master')

@section('title', 'Kota')

@section('content')

<div class="container-fluid px-4">
    <div class="card mt-4">
        <div class="card-header">
            <h4 class="">Edit Kota
                <a href="{{ url('admin/city') }}" class="btn btn-primary btn-sm float-end">Kembali</a>
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

            <form action="{{ url('admin/update-city/'.$city->id) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                <div class="mb-3">
                    <label>Kode Kota</label>
                    <input type="text" name="code" value="{{ $city->code }}" class="form-control" maxlength="3">
                </div>
                <div class="mb-3">
                    <label>Nama Kota</label>
                    <input type="text" name="name" value="{{ $city->name }}" class="form-control">
                </div>
                <div class="float-end">
                    <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection
