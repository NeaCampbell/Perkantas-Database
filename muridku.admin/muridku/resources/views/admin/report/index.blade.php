@extends('layouts.master')

@section('title', 'Dashboard')

@section('content')

<div class="container-fluid px-4">
    <div class="card mt-4">
        <div class="card-header">
            <h4>View Report</h4>
        </div>
        <div class="card-body">
            @if (session('message'))
                <div class="alert alert-success">{{ session('message') }}</div>
            @endif

            <form action="{{ url('admin/filter-tanggal') }}" method="POST" enctype="multipart/form-data">
                <div class="row align-items-end">
                    @csrf
                    <!-- Bagian Pilih Tahun -->
                    <div class="col-md-3">
                        <label for="year">Pilih Tahun:</label>
                        <select id="year" name="year" class="form-control">
                            <!-- Opsi tahun akan ditambahkan di sini -->
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="start_date">Tanggal Awal:</label>
                        <input type="date" id="start_date" name="start_date" class="form-control">
                    </div>
                    <div class="col-md-3">
                        <label for="end_date">Tanggal Akhir:</label>
                        <input type="date" id="end_date" name="end_date" class="form-control">
                    </div>
                    <div class="col-md-3">
                        <button type="submit" class="btn btn-primary">Filter</button>
                    </div>
                </div>
            </form>

            <table id="dataTableWithFilter" class="table table-bordered">
                <thead>
                    <tr>
                        <th>Nama KTB</th>
                        <th>Nama Peserta KTB</th>
                        <th>Instansi Peserta KTB</th>
                        <th>Tanggal Pertemuan Terakhir</th>
                        <th>Status Keaktifan</th>
                    </tr>
                    <tr>
                        <th>Nama KTB</th>
                        <th>Nama Peserta KTB</th>
                        <th>Instansi Peserta KTB</th>
                        <th>Tanggal Pertemuan Terakhir</th>
                        <th>Status Keaktifan</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($report as $item)
                    <tr>
                        <td>
                            {{ $item->name }}
                        </td>
                        <td>
                            {{ $item->member_name }}
                        </td>
                        <td>
                            {{ $item->institution_name }}
                        </td>
                        <td>
                            {{ $item->last_meet_dt }}
                        </td>
                        <td>
                            {{ $item->status }}
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>

@endsection
