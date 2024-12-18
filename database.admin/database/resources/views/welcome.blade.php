@extends('layouts.app')

@section('content')
    <style>
        html, body {
            height: 100%;
            margin: 0;
        }
        .full-height {
            height: 70vh; /* 100% of the viewport height */
        }
        .center-content {
            display: flex;
            align-items: center; /* Aligns vertically center */
            justify-content: center; /* Aligns horizontally center */
        }
    </style>

    <div class="full-height center-content">
        <h1 class="text-gray-700 text-4xl font-bold">Selamat Datang di Perkantas Database</h1>
    </div>
@endsection
