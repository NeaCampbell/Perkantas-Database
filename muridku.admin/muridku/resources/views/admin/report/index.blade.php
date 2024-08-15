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

            <a href="{{ url('admin/filter-periode') }}" class="btn btn-primary btn-sm">Filter Periode</a>
            <a href="#" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#filterTanggalModal">Filter Tanggal</a>

            <div class="table-responsive">
                <table id="dataTableWithFilters" class="table table-bordered">
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
</div>

<!-- The Modal -->
<div class="modal fade" id="filterTanggalModal">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Filter Tanggal</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <form action="{{ url('admin/filter-tanggal') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="col-md-3">
                        <label> Tanggal Awal: </label>
                        <input type="date" name="start_date" class="form-control">
                    </div>
                    <div class="col-md-3">
                        <label> Tanggal Akhir: </label>
                        <input type="date" name="end_date" class="form-control">
                    </div>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Filter</button>
                </form>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Tutup</button>
            </div>
        </div>
    </div>
</div>

@endsection
