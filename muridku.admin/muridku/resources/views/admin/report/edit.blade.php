@extends('layouts.master')

@section('title', 'Laporan')

@section('content')

<div class="container-fluid px-4">
    <div class="card mt-4">
        <div class="card-header">
            <h4 class="">Tambah Laporan</h4>
        </div>
        <div class="card-body">

            @if ($errors->any())
            <div class="alert alert-danger ">
                @foreach ($errors->all() as $error)
                    <div>{{ $error }}</div>
                @endforeach
            </div>
            @endif

            <form action="{{ url('admin/update-report/'.$report->id) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                <div class="mb-3">
                    <label>Report Name</label>
                    <input type="text" name="name" value="{{ $report->name }}" class="form-control">
                </div>
                <div class="mb-3">
                    <label>Slug</label>
                    <input type="text" name="slug" value="{{ $report->slug }}" class="form-control">
                </div>
                <div class="mb-3">
                    <label>Description</label>
                    <textarea name="description" rows="5" class="form-control">{{ $report->description }}</textarea>
                </div>
                <div class="mb-3">
                    <label>Image</label>
                    <input type="file" name="image" class="form-control">
                </div>

                <h6>SEO Tags</h6>
                <div class="mb-3">
                    <label>Meta Title</label>
                    <input type="text" name="meta_title" value="{{ $report->meta_title }}" class="form-control">
                </div>
                <div class="mb-3">
                    <label>Meta Description</label>
                    <textarea name="meta_description" rows="3" class="form-control">{{ $report->meta_description }}</textarea>
                </div>
                <div class="mb-3">
                    <label>Meta Keyword</label>
                    <textarea name="meta_keyword" rows="3" class="form-control">{{ $report->meta_keyword }}</textarea>
                </div>

                <h6>Status Mode</h6>
                <div class="row">
                    <div class="col-md-3 mb-3">
                        <label>Navbar Status</label>
                        <input type="checkbox" name="navbar_status" {{ $report->navbar_status == '1' ? 'checked':'' }} />
                    </div>
                    <div class="col-md-3 mb-3">
                        <label>Status</label>
                        <input type="checkbox" name="status" {{ $report->status == '1' ? 'checked':'' }} />
                    </div>
                    <div class="col-md-6">
                        <button type="submit" class="btn btn-primary">Update Report</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection
