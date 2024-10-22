@extends('layouts.master')

@section('title', 'Target Pemuridan')

@section('content')

<div class="container-fluid px-4">

    <div class="card mt-4">
        <div class="card-header">
            <h4>Daftar Target Pemuridan
                <a href="#" class="btn btn-primary btn-sm float-end" data-bs-toggle="modal" data-bs-target="#addDiscipleshipTargetModal">Tambah Target Pemuridan</a>
            </h4>
        </div>
        <div class="card-body">
            @if (session('message'))
            <div class="alert alert-success">{{ session('message') }}</div>
            @endif

            <table id="dataTable" class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Kota</th>
                        <th>Tahun Periode</th>
                        <th>Jumlah Target Penginjilan</th>
                        <th>Jumlah Target Kegerakan Penginjilan</th>
                        <th>Jumlah Target Pemimpin KTB</th>
                        <th>Jumlah Target Kelompok KTB</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($discipleship_target as $item)
                    <tr>
                        <td>{{ $item->id }}</td>
                        <td>{{ $item->city->name ?? 'N/A' }}</td>
                        <td>{{ $item->period_year }}</td>
                        <td>{{ $item->evangelism_target }}</td>
                        <td>{{ $item->evangelism_movement_target }}</td>
                        <td>{{ $item->ktb_leader_target }}</td>
                        <td>{{ $item->ktb_group_target }}</td>
                        <td>
                            <a href="{{ url('admin/edit-discipleship_target/'.$item->id) }}" class="btn btn-success"><i class="fas fa-edit"></i></a>
                            <a href="{{ url('admin/delete-discipleship_target/'.$item->id) }}" class="btn btn-danger"><i class="fas fa-trash"></i></a>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- The Modal -->
<div class="modal fade" id="addDiscipleshipTargetModal">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Tambah Target Pemuridan</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <form action="{{ url('admin/add-discipleship_target') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="mb-3">
                        <label for="city_id" class="form-label">Pilih Kota</label>
                        <br>
                        <select class="form-select select2" id="city_id" name="city_id" required>
                            <option value="">-- Pilih Kota --</option>
                            @foreach($city as $city)
                                <option value="{{ $city->id }}">{{ $city->name }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="period_year" class="form-label">Tahun Periode</label>
                        <input type="text" class="form-control" id="period_year" name="period_year" required>
                    </div>
                    <div class="mb-3">
                        <label for="evangelism_target" class="form-label">Jumlah Target Penginjilan</label>
                        <input type="text" class="form-control" id="evangelism_target" name="evangelism_target" required>
                    </div>
                    <div class="mb-3">
                        <label for="evangelism_movement_target" class="form-label">Jumlah Target Kegerakan Penginjilan</label>
                        <input type="text" class="form-control" id="evangelism_movement_target" name="evangelism_movement_target" required>
                    </div>
                    <div class="mb-3">
                        <label for="ktb_leader_target" class="form-label">Jumlah Target Pemimpin KTB</label>
                        <input type="text" class="form-control" id="ktb_leader_target" name="ktb_leader_target" required>
                    </div>
                    <div class="mb-3">
                        <label for="ktb_group_target" class="form-label">Jumlah Target Kelompok KTB</label>
                        <input type="text" class="form-control" id="ktb_group_target" name="ktb_group_target" required>
                    </div>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Simpan</button>
                </form>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Tutup</button>
            </div>

        </div>
    </div>
</div>

@endsection
