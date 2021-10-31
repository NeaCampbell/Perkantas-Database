@extends('templates.layout-dashboard')
@section('inner-content')
    <div class="row" style="margin-top: 5rem;">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h4>@yield('title')</h4>
                @hassection('new-button')
                <div class="pull-left">
                    <a class="btn btn-outline-success"
                        href="@yield('new-url')">
                        @yield('new-button')
                    </a>
                </div>
                @endif
            </div>
        </div>
        <div>&nbsp;</div>
    </div>

    @if ($message = Session::get('success'))
        <div class="alert alert-success">
            <p>{{ $message }}</p>
        </div>
    @endif

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

    <div class="card-body" style="width: 85vw;">
        <table id="main-table" class="table table-hover" style="table-layout: fixed; word-wrap: break-word;">
        <!-- <table id="main-table" class="table table-hover"> -->
            <thead>
                <tr>
                    @yield('table-header')
                </tr>
            </thead>
            <tbody>
                @yield('table-value')
            </tbody>
        </table>
        <input type="hidden" id="rowperpage" name="rowperpage" value="{{ isset($rowperpage) ? $rowperpage : 10 }}" />
        <input type="hidden" id="pagenum" name="pagenum" value="1" />
    </div>
    <div class="d-flex justify-content-center">&nbsp;</div>
    <script src="{{asset('/js/datatable-custom.js')}}"></script>
    @yield('additional-scripts')
@endsection
