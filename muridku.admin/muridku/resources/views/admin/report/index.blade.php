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

            <table class="table table-bordered">
                <thead>
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
