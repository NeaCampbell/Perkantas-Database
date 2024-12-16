@extends('layouts.master')

@section('title', 'Binaan')

@section('content')

<div class="container-fluid px-4">
    <div class="card mt-4">
        <div class="card-header">
            <h4>Daftar Binaan
                <a href="#" class="btn btn-primary btn-sm float-end" data-bs-toggle="modal" data-bs-target="#addMemberModal">Tambah Binaan</a>
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
                        <th>Alamat</th>
                        <th>Jenis Kelamin</th>
                        <th>Tanggal Lahir</th>
                        <th>Nomor Telepon</th>
                        <th>Status</th>
                        <th>Tipe</th>
                        <th>Kota</th>
                        <th>Instansi</th>
                        <th>Fakultas</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($member as $item)
                    <tr>
                        <td>{{ $item->id }}</td>
                        <td>{{ $item->name }}</td>
                        <td>{{ $item->address }}</td>
                        <td>{{ $item->gender }}</td>
                        <td>{{ $item->birth_dt }}</td>
                        <td>{{ $item->mobile_phn }}</td>
                        <td>{{ $item->status }}</td>
                        <td>{{ $item->getTypeName() }}</td>
                        <td>{{ $item->city->name ?? '-' }}</td>
                        <td>{{ $item->institution->name ?? '-' }}</td>
                        <td>{{ $item->faculty->name ?? '-' }}</td>
                        <td>
                            <a href="{{ url('admin/edit-member/'.$item->id) }}" class="btn btn-success"><i class="fas fa-edit"></i></a>
                            {{-- <a href="#" class="btn btn-success"><i class="fas fa-toggle-on"></i></a> --}}
                            <a href="{{ url('admin/delete-member/'.$item->id) }}" class="btn btn-danger"><i class="fas fa-trash"></i></a>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- The Modal -->
<div class="modal fade" id="addMemberModal" tabindex="-1" aria-labelledby="addMemberModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title" id="addMemberModalLabel">Tambah Binaan</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <form action="{{ url('admin/add-member') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <!-- Nama Binaan -->
                    <div class="mb-3">
                        <label for="name" class="form-label">Nama Binaan</label>
                        <input type="text" class="form-control" id="name" name="name" required placeholder="Masukkan nama binaan">
                    </div>

                    <!-- Tipe Binaan -->
                    <div class="mb-3">
                        <label for="type" class="form-label">Tipe Binaan</label>
                        <select class="form-select" id="type" name="inst_type" required>
                            <option value="">Pilih Tipe Binaan</option>
                            <option value="SHS">SMA</option>
                            <option value="COL">Kampus</option>
                            <option value="WORK">Kerja</option>
                        </select>
                    </div>

                    <!-- Alamat -->
                    <div class="mb-3">
                        <label for="address" class="form-label">Alamat</label>
                        <textarea class="form-control" id="address" name="address" rows="2" placeholder="Masukkan alamat"></textarea>
                    </div>

                    <!-- Jenis Kelamin -->
                    <div class="mb-3">
                        <label for="gender" class="form-label">Jenis Kelamin</label>
                        <select class="form-select" id="gender" name="gender" required>
                            <option value="">Pilih Jenis Kelamin</option>
                            <option value="L">Laki-Laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                    </div>

                    <!-- Tanggal Lahir -->
                    <div class="mb-3">
                        <label for="birth_dt" class="form-label">Tanggal Lahir</label>
                        <input type="date" class="form-control" id="birth_dt" name="birth_dt" required>
                    </div>

                    <!-- Nomor Telepon -->
                    <div class="mb-3">
                        <label for="mobile_phn" class="form-label">Nomor Telepon</label>
                        <input type="text" class="form-control" id="mobile_phn" name="mobile_phn" maxlength="13" placeholder="Masukkan nomor telepon">
                    </div>

                    <!-- Kota -->
                    <div class="mb-3">
                        <label for="city_id" class="form-label">Kota</label>
                        <select class="form-select" id="city_id" name="city_id" required>
                            <option value="">Pilih Kota</option>
                            @foreach($city as $city)
                                <option value="{{ $city->id }}">{{ $city->name }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="institution_id" class="form-label">Instansi</label>
                        <select class="form-select" id="institution_id" name="institution_id" required>
                            <option value="">Pilih Instansi</option>
                            @foreach($institution as $institution)
                                <option value="{{ $institution->id }}">{{ $institution->name }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="faculty_id" class="form-label">Fakultas</label>
                        <select class="form-select" id="faculty_id" name="faculty_id" required>
                            <option value="">Pilih Fakultas</option>
                        </select>
                    </div>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Simpan</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                </form>
            </div>

        </div>
    </div>
</div>


@endsection
