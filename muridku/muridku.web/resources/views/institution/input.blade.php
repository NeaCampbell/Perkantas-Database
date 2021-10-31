@extends('templates.layout-input')
@section('form-content')
    <form method="POST" action="{{isset($data) ? url('/institution/update?id=' . $data->id) : url('/institution/save')}}">
        @csrf
        @method(isset($data) ? 'PATCH': 'POST')
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Kode :</strong>
                    <input type="text" name="code" class="form-control" placeholder="Kode Institusi" autofocus value="{{isset($data) && is_null(old('code')) ? $data->code : old('code')}}"/>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Nama :</strong>
                    <input type="text" name="name" class="form-control" placeholder="Nama Institusi" value="{{isset($data) && is_null(old('name')) ? $data->name : old('name')}}">
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Tipe :</strong>
                    <select class="form-control" name="type" id="type">
                        @foreach($additional as $key=>$value)
                            <option value="{{$key}}"
                                @if((isset($data) && is_null(old('type')) && isset($data->type) && $data->type === $key) || (!is_null(old('type')) && old('type') === $key))
                                    selected
                                @endif
                            >
                                {{$value}}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Alamat :</strong>
                    <input type="text" name="address" class="form-control" placeholder="Alamat Institusi" value="{{isset($data) && is_null(old('address')) ? $data->address : old('address')}}">
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 text-center">
                <button type="submit" class="btn btn-primary btn-block">Save</button>
            </div>
        </div>
        <input type="hidden" name="id" value="{{$data->id ?? 0}}" />
    </form>
@endsection
@section('form-name')
Institusi
@endsection
