@extends('layouts.master')

@section('title', 'Laporan Acara')

@section('content')

<div class="container-fluid px-4">
    <div class="card mt-4">
        <div class="card-header">
            <h4>Laporan Acara
                <a href="#" class="btn btn-success btn-sm float-end ms-2" data-bs-toggle="modal" data-bs-target="#importEventParticipantsModal">Import Peserta Event</a>
            </h4>
        </div>
        <div class="card-body">
            @if (session('message'))
                <div class="alert alert-success">{{ session('message') }}</div>
            @endif

            {{-- <!-- Filter Form -->
            <form action="{{ url('admin/filter-event') }}" method="GET">
                <div class="row align-items-end">
                    <div class="col-md-3">
                        <label for="event_name">Nama Acara:</label>
                        <input type="text" id="event_name" name="event_name" class="form-control" value="{{ request('event_name') }}" placeholder="Nama Acara">
                    </div>
                    <div class="col-md-3">
                        <label for="start_date">Tanggal Awal:</label>
                        <input type="date" id="start_date" name="start_date" class="form-control" value="{{ request('start_date') }}">
                    </div>
                    <div class="col-md-3">
                        <label for="end_date">Tanggal Akhir:</label>
                        <input type="date" id="end_date" name="end_date" class="form-control" value="{{ request('end_date') }}">
                    </div>
                    <div class="col-md-3">
                        <button type="submit" class="btn btn-primary">Filter</button>
                    </div>
                </div>
            </form> --}}

            <!-- Data Table -->
            <table id="dataTableWithFilter" class="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th>Nama Acara</th>
                        <th>Tanggal Acara</th>
                        <th>Nama Peserta</th>
                        <th>No. Telepon Peserta</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($report as $item)
                    <tr>
                        <td>{{ $item->event_name }}</td>
                        <td>{{ $item->event_date }}</td>
                        <td>{{ $item->participant_name }}</td>
                        <td>{{ $item->participant_phone }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Modal Import -->
<div class="modal fade" id="importEventParticipantsModal" tabindex="-1" aria-labelledby="importEventParticipantsModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="importEventParticipantsModalLabel">Import Peserta Event</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form action="{{ route('admin.report_event.import') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="mb-3">
                        <label for="file" class="form-label">Pilih File Excel</label>
                        <input type="file" name="file" id="file" class="form-control" accept=".xlsx, .xls, .csv" required>
                    </div>
            </div>
            <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Import</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
