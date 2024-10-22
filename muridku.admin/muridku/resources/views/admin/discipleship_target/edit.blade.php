@extends('layouts.master')

@section('title', 'Target Pemuridan')

@section('content')

<div class="container-fluid px-4">
    <div class="card mt-4">
        <div class="card-header">
            <h4 class="">Edit Target Pemuridan
                <a href="{{ url('admin/discipleship_target') }}" class="btn btn-primary btn-sm float-end">Kembali</a>
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

            <form action="{{ url('admin/update-discipleship_target/'.$discipleship_target->id) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                <div class="mb-3">
                    <label for="city_id" class="form-label">Pilih Kota</label>
                    <select class="form-control select2" id="city_id" name="city_id" required>
                        <option value="">-- Pilih Kota --</option>
                        @foreach($city as $city)
                            <option value="{{ $city->id }}">{{ $city->name }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="mb-3">
                    <label>Tahun Periode</label>
                    <input type="text" name="period_year" value="{{ $discipleship_target->period_year }}" class="form-control">
                </div>
                <div class="mb-3">
                    <label>Jumlah Target Penginjilan</label>
                    <input type="text" name="evangelism_target" value="{{ $discipleship_target->evangelism_target }}" class="form-control">
                </div>
                <div class="mb-3">
                    <label>Jumlah Target Kegerakan Penginjilan</label>
                    <input type="text" name="evangelism_movement_target" value="{{ $discipleship_target->evangelism_movement_target }}" class="form-control">
                </div>
                <div class="mb-3">
                    <label>Jumlah Target Pemimpin KTB</label>
                    <input type="text" name="ktb_leader_target" value="{{ $discipleship_target->ktb_leader_target }}" class="form-control">
                </div>
                <div class="mb-3">
                    <label>Jumlah Target Kelompok KTB</label>
                    <input type="text" name="ktb_group_target" value="{{ $discipleship_target->ktb_group_target }}" class="form-control">
                </div>
                <div class="float-end">
                    <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection
