@extends('templates.layout-dashboard')
@section('inner-content')
    <div class="panel-body">
        @if ($errors->any())
            <div class="alert alert-danger">
                There were <strong>some problems</strong> with your input.<br><br>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
    </div>
@endsection
