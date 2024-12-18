@extends('layouts.master')

@section('title', 'Binaan')

@section('content')

<div class="container-fluid px-4">
    <div class="card mt-4">
        <div class="card-header">
            <h4 class="">Edit Binaan
                <a href="{{ url('admin/member') }}" class="btn btn-primary btn-sm float-end">Kembali</a>
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

            <form action="{{ url('admin/update-member/'.$member->id) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')

                <!-- Nama Binaan -->
                <div class="mb-3">
                    <label for="name" class="form-label">Nama Binaan</label>
                    <input type="text" class="form-control" id="name" name="name" value="{{ $member->name }}" required>
                </div>

                <!-- Tipe Binaan -->
                <div class="mb-3">
                    <label for="type" class="form-label">Tipe Binaan</label>
                    <select class="form-select" id="type" name="inst_type" required>
                        <option value="">Pilih Tipe Binaan</option>
                        <option value="SHS" {{ $member->inst_type == 'SHS' ? 'selected' : '' }}>SMA</option>
                        <option value="COL" {{ $member->inst_type == 'COL' ? 'selected' : '' }}>Kampus</option>
                        <option value="WORK" {{ $member->inst_type == 'WORK' ? 'selected' : '' }}>Kerja</option>
                    </select>
                </div>

                <!-- Alamat -->
                <div class="mb-3">
                    <label for="address" class="form-label">Alamat</label>
                    <textarea class="form-control" id="address" name="address" rows="2">{{ $member->address }}</textarea>
                </div>

                <!-- Jenis Kelamin -->
                <div class="mb-3">
                    <label for="gender" class="form-label">Jenis Kelamin</label>
                    <select class="form-select" id="gender" name="gender" required>
                        <option value="">Pilih Jenis Kelamin</option>
                        <option value="L" {{ $member->gender == 'L' ? 'selected' : '' }}>Laki-Laki</option>
                        <option value="P" {{ $member->gender == 'P' ? 'selected' : '' }}>Perempuan</option>
                    </select>
                </div>

                <!-- Tanggal Lahir -->
                <div class="mb-3">
                    <label for="birth_dt" class="form-label">Tanggal Lahir</label>
                    <input type="date" class="form-control" id="birth_dt" name="birth_dt" value="{{ $member->birth_dt }}" required>
                </div>

                <!-- Nomor Telepon -->
                <div class="mb-3">
                    <label for="mobile_phn" class="form-label">Nomor Telepon</label>
                    <input type="text" class="form-control" id="mobile_phn" name="mobile_phn" maxlength="13" value="{{ $member->mobile_phn }}">
                </div>

                <!-- Kota -->
                <div class="mb-3">
                    <label for="city_id" class="form-label">Kota</label>
                    <select class="form-select" id="city_id" name="city_id" required>
                        <option value="">Pilih Kota</option>
                        @foreach($city as $city)
                            <option value="{{ $city->id }}" {{ $member->city_id == $city->id ? 'selected' : '' }}>{{ $city->name }}</option>
                        @endforeach
                    </select>
                </div>

                <!-- Instansi -->
                <div class="mb-3">
                    <label for="institution_id" class="form-label">Instansi</label>
                    <select class="form-select" id="institution_id" name="institution_id" required>
                        <option value="">Pilih Instansi</option>
                        @foreach($institution as $institution)
                            <option value="{{ $institution->id }}" {{ $member->institution_id == $institution->id ? 'selected' : '' }}>{{ $institution->name }}</option>
                        @endforeach
                    </select>
                </div>

                <!-- Fakultas -->
                <div class="mb-3">
                    <label for="faculty_id" class="form-label">Fakultas</label>
                    <select class="form-select" id="faculty_id" name="faculty_id" required>
                        <option value="">Pilih Fakultas</option>
                        @foreach($faculty as $faculty)
                            <option value="{{ $faculty->id }}" {{ $member->faculty_id == $faculty->id ? 'selected' : '' }}>{{ $faculty->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="float-end">
                    <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const institutionDropdown = document.getElementById('institution_id');
        const facultyDropdown = document.getElementById('faculty_id');

        institutionDropdown.addEventListener('change', function () {
            const institutionId = this.value;
            facultyDropdown.innerHTML = '<option value="">Loading...</option>';

            if (institutionId) {
                fetch(`/admin/get-faculties/${institutionId}`)
                    .then(response => response.json())
                    .then(data => {
                        facultyDropdown.innerHTML = '<option value="">Pilih Fakultas</option>';
                        data.forEach(faculty => {
                            const option = document.createElement('option');
                            option.value = faculty.id;
                            option.textContent = faculty.name;
                            facultyDropdown.appendChild(option);
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching faculties:', error);
                        facultyDropdown.innerHTML = '<option value="">Error fetching faculties</option>';
                    });
            } else {
                facultyDropdown.innerHTML = '<option value="">Pilih Fakultas</option>';
            }
        });
    });
</script>

@endsection
