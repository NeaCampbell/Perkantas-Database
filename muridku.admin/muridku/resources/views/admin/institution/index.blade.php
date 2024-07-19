@extends('layouts.master')

@section('title', 'Instansi')

@section('content')

<div class="container-fluid px-4">

    <div class="card mt-4">
        <div class="card-header">
            <h4>Daftar Instansi
                <a href="#" class="btn btn-primary btn-sm float-end" data-bs-toggle="modal" data-bs-target="#addInstitutionModal">Tambah Instansi</a>
            </h4>
        </div>
        <div class="card-body">
            @if (session('message'))
            <div class="alert alert-success">{{ session('message') }}</div>
            @endif

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Kode</th>
                        <th>Nama</th>
                        <th>Tipe</th>
                        <th>Alamat</th>
                        <th>Edit</th>
                        <th>Hapus</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($institution as $item)
                    <tr>
                        <td>{{ $item->id }}</td>
                        <td>{{ $item->code }}</td>
                        <td>{{ $item->name }}</td>
                        <td>{{ $item->type }}</td>
                        <td>{{ $item->address }}</td>
                        <td>
                            <a href="{{ url('admin/edit-institution/'.$item->id) }}" class="btn btn-success"><i class="fas fa-edit"></i></a>
                        </td>
                        <td>
                            <a href="{{ url('admin/delete-institution/'.$item->id) }}" class="btn btn-danger"><i class="fas fa-trash"></i></a>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- The Modal -->
<div class="modal fade" id="addInstitutionModal">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Tambah Instansi</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <form action="{{ url('admin/add-institution') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="mb-3">
                        <label for="code" class="form-label">Kode Instansi</label>
                        <input type="text" class="form-control" id="code" name="code" maxlength="3" required>
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">Nama Instansi</label>
                        <input type="text" class="form-control" id="name" name="name" required>
                    </div>
                    <div class="mb-3">
                        <label for="type" class="form-label">Tipe Instansi</label>
                        <input type="text" class="form-control" id="type" name="type" maxlength="5" required>
                    </div>
                    <div class="mb-3">
                        <label for="address" class="form-label">Alamat Instansi</label>
                        <input type="text" class="form-control" id="address" name="address" required>
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
