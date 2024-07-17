@extends('layouts.master')

@section('title', 'Users')

@section('content')

<div class="container-fluid px-4">

    <div class="card mt-4">
        <div class="card-header">
            <h4>View Users</h4>
        </div>
        <div class="card-body">
            @if (session('message'))
            <div class="alert alert-success">{{ session('message') }}</div>
            @endif

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($users as $item)
                    <tr>
                        <td>{{ $item->id }}</td>
                        <td>{{ $item->name }}</td>
                        <td>{{ $item->email }}</td>
                        <td>{{ $item->role_as == '1' ? 'Admin':'User' }}</td>
                        <td>
                            <a href="{{ url('admin/user/'.$item->id) }}" class="btn btn-success"><i class="fas fa-edit"></i></a>  
                        </td>
                        <td>
                            <a href="{{ url('admin/user/'.$item->id) }}" class="btn btn-danger"><i class="fas fa-trash"></i></a>  
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>

@endsection