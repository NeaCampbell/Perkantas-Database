@extends('layouts.master')

@section('title', 'Bahan KTB')

@section('content')

<div class="container-fluid px-4">

    <div class="card mt-4">
        <div class="card-header">
            <h4>Daftar Bahan KTB
                <a href="#" class="btn btn-primary btn-sm float-end" data-bs-toggle="modal" data-bs-target="#addMaterialModal">Tambah Bahan KTB</a>
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
                        <th>Kode</th>
                        <th>Nama</th>
                        <th>Jumlah Bab</th>
                        <th>Pra-KTB/KTB</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($material as $item)
                    <tr>
                        <td>{{ $item->id }}</td>
                        <td>{{ $item->code }}</td>
                        <td>{{ $item->name }}</td>
                        <td>{{ $item->chapter_count }}</td>
                        <td>{{ $item->getTypeKTB() }}</td>
                        <td>
                            <a href="{{ url('admin/edit-material/'.$item->id) }}" class="btn btn-success"><i class="fas fa-edit"></i></a>
                            <a href="{{ url('admin/delete-material/'.$item->id) }}" class="btn btn-danger"><i class="fas fa-trash"></i></a>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- The Modal -->
<div class="modal fade" id="addMaterialModal">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Tambah Bahan KTB</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <form action="{{ url('admin/add-material') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="mb-3">
                        <label for="code" class="form-label">Kode Bahan KTB</label>
                        <input type="text" class="form-control" id="code" name="code" maxlength="3" required>
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">Nama Bahan KTB</label>
                        <input type="text" class="form-control" id="name" name="name" required>
                    </div>
                    <div class="mb-3">
                        <label for="chapter_count" class="form-label">Jumlah Bab</label>
                        <input type="text" class="form-control" id="chapter_coun" name="chapter_coun" required>
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
