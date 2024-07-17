@extends('layouts.master')

@section('title', 'Dashboard')

@section('content')

<div class="container-fluid px-4">

    <div class="card mt-4">
        <div class="card-header">
            <h4>View Report 
                <a href="{{ url('admin/add-report') }}" class="btn btn-primary btn-sm float-end">Add Report</a>
            </h4>
        </div>
        <div class="card-body">
            @if (session('message'))
            <div class="alert alert-success">{{ session('message') }}</div>
            @endif

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Report Name</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($report as $item)
                    <tr>
                        <td>{{ $item->id }}</td>
                        <td>{{ $item->name }}</td>
                        <td>
                            <img src="{{ asset('upload/report/'.$item->image) }}" width="50px" height="50px" alt="img">
                        </td>
                        <td>{{ $item->status == '1' ? 'Hidden':'Shown' }}</td>
                        <td>
                            <a href="{{ url('admin/edit-report/'.$item->id) }}" class="btn btn-success"><i class="fas fa-edit"></i></a>  
                        </td>
                        <td>
                            <a href="{{ url('admin/delete-report/'.$item->id) }}" class="btn btn-danger"><i class="fas fa-trash"></i></a>  
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>

@endsection