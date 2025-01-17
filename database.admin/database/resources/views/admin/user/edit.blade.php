@extends('layouts.master')

@section('title', 'Users')

@section('content')

<div class="container-fluid px-4">

    <div class="card mt-4">
        <div class="card-header">
            <h4>Edit Users
                <a href="{{ url('admin/users') }}" class="btn btn-danger float-end">Back</a>
            </h4>
        </div>
        <div class="card-body">
            <div class="mb-3">
                <label>Full Name</label>
                <p class="form-control">{{ $user->name }}</p>
            </div>
            <div class="mb-3">
                <label>Email</label>
                <p class="form-control">{{ $user->email }}</p>
            </div>
            <div class="mb-3">
                <label>Created At</label>
                <p class="form-control">{{ $user->created_at->format('d/m/Y') }}</p>
            </div>

            <form action="{{ url('admin/update-user/'.$user->id) }}" method="POST">
                @csrf
                @method('PUT')
                <div class="mb-3">
                    <label>Role</label>
                    <select name="role_as" class="form-control">
                        <option value="1" {{ $user->role_as == '1'? 'Selected':'' }}>Admin</option>
                        <option value="0" {{ $user->role_as == '0'? 'Selected':'' }}>User</option>
                    </select>
                </div>

                <div class="mb-3">
                    <button type="submit" class="btn btn-primary">Update User Role</button> 
                </div>
            </form>

        </div>
    </div>
</div>

@endsection