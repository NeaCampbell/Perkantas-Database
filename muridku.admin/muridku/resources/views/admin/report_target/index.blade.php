@extends('layouts.master')

@section('title', 'Laporan Target Pemuridan')

@section('content')

<div class="container-fluid px-4">
    <div class="card mt-4">
        <div class="card-header">
            <h4>Laporan Target Pemuridan</h4>
        </div>
        <div class="card-body">
            @if (session('message'))
                <div class="alert alert-success">{{ session('message') }}</div>
            @endif

            <form action="{{ url('admin/filter-periode') }}" method="POST" enctype="multipart/form-data">
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
                        <button type="submit" class="btn btn-primary">Filter</button>
                    </div>
                </div>
            </form>

            <table id="dataTableReportTarget_1" class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID Kota</th>
                        <th>Nama Kota</th>
                        <th>Jumlah P-KTB</th>
                        <th>Target P-KTB</th>
                    </tr>
                    <tr>
                        <th>ID Kota</th>
                        <th>Nama Kota</th>
                        <th>Jumlah P-KTB</th>
                        <th>Target P-KTB</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($report_target as $item)
                    <tr>
                        <td>
                            {{ $item->city_id }}
                        </td>
                        <td>
                            {{ $item->city_name }}
                        </td>
                        <td>
                            {{ $item->new_pktb_count }}
                        </td>
                        <td>
                            {{ $item->ktb_leader_target }}
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>


            <table id="dataTableReportTarget_2" class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID Kota</th>
                        <th>Nama Kota</th>
                        <th>Jumlah P-KTB Baru</th>
                        <th>Target P-KTB Lama</th>
                    </tr>
                    <tr>
                        <th>ID Kota</th>
                        <th>Nama Kota</th>
                        <th>Jumlah P-KTB Baru</th>
                        <th>Target P-KTB Lama</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($old_new_ktb as $item)
                    <tr>
                        <td>
                            {{ $item->city_id }}
                        </td>
                        <td>
                            {{ $item->city_name }}
                        </td>
                        <td>
                            {{ $item->new_pktb }}
                        </td>
                        <td>
                            {{ $item->old_pktb }}
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>

@endsection