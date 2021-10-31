@extends('templates.layout-dashboard')
@section('inner-content')
    <div class="w-100">&nbsp;</div>
    <div class="w-100">&nbsp;</div>
    <div class="w-100">&nbsp;</div>
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                @isset($data)
                    <h4>Ubah @yield('form-name')</h4>
                @else
                    <h4>Tambah @yield('form-name') Baru</h4>
                @endisset
                <div class="pull-left">
                    @hassection('custom-return-page')
                    <a class="btn btn-outline-danger btn-sm" href="{{ url('test') }}">Kembali</a>
                    @else
                    <a class="btn btn-outline-danger btn-sm" href="{{ url($indexurl) }}">Kembali</a>
                    @endif
                </div>
            </div>
        </div>
    </div>
    <div class="w-100">&nbsp;</div>

    @if ($errors->any())
        <div class="alert alert-danger">
            Ada <strong>kesalahan</strong> pada data yang di-input.<br><br>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <input type="hidden" id="rowperpage_select" name="rowperpage_select" value="5" />
    <input type="hidden" id="rowperpage_listbox" name="rowperpage_listbox" value="10" />

    @yield('form-content')
    @yield('additional-scripts')
    <div class="row">&nbsp;</div>
    <div class="row">&nbsp;</div>
@endsection
