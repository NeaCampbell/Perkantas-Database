@extends('layouts.master')

@section('title', 'Acara')

@section('content')

<div class="container-fluid px-4">

    <div class="card mt-4">
        <div class="card-header">
            <h4>Daftar Acara
                <a href="#" class="btn btn-primary btn-sm float-end" data-bs-toggle="modal" data-bs-target="#addEventModal">Tambah Acara</a>
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
                        <th>Nama</th>
                        <th>Tipe</th>
                        <th>Tanggal</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($event as $item)
                    <tr>
                        <td>{{ $item->id }}</td>
                        <td>{{ $item->name }}</td>
                        <td>{{ $item->getTypeName() }}</td>
                        <td>{{ $item->date }}</td>
                        <td>
                            <a href="{{ url('admin/edit-event/'.$item->id) }}" class="btn btn-success"><i class="fas fa-edit"></i></a>
                            {{-- <a href="#" class="btn btn-success"><i class="fas fa-toggle-on"></i></a> --}}
                            <a href="{{ url('admin/delete-event/'.$item->id) }}" class="btn btn-danger"><i class="fas fa-trash"></i></a>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- The Modal -->
<div class="modal fade" id="addEventModal">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Tambah Acara</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <form action="{{ url('admin/add-event') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="mb-3">
                        <label for="name" class="form-label">Nama Acara</label>
                        <input type="text" class="form-control" id="name" name="name" required>
                    </div>
                    <div class="mb-3">
                        <label for="type" class="form-label">Tipe Acara</label>
                        <select class="form-select" id="type" name="type" required>
                            <option value="">Pilih Tipe Acara</option>
                            <option value="SHS">SMA</option>
                            <option value="COL">Kampus</option>
                            <option value="WORK">Kerja</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="date" class="form-label">Tanggal Acara</label>
                        <input type="date" class="form-control" id="date" name="date" required>
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
