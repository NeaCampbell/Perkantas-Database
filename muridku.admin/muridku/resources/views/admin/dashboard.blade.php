@extends('layouts.master')

@section('title', 'Dashboard')

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

<div class="container-fluid px-4">
    <div class="row">
        <div class="full-height center-content">
            <h1 class="text-gray-700 text-4xl font-bold">Selamat Datang {{ Auth::user()->name }} di Perkantas Database</h1>
        </div>
    </div>
</div>

@endsection
