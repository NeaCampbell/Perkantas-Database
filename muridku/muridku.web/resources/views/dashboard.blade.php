@extends('templates.layout-dashboard')
@section('inner-content')
    <div class="panel-body">
        @if ($errors->any())
            <div class="alert alert-danger">
                Ada <strong>kesalahan</strong> dalam input yang diberikan.<br><br>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
    </div>
@endsection
