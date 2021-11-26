@extends('templates.layout-input')
@section('form-content')
    <form method="POST" action="{{isset($data) ? url('/material/update?id=' . $data->id) : url('/material/save')}}">
        @csrf
        @method(isset($data) ? 'PATCH': 'POST')
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Kode :</strong>
                    <input type="text" name="code" class="form-control" placeholder="Kode Bahan" autofocus value="{{isset($data) && is_null(old('code')) ? $data->code : old('code')}}"/>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Nama :</strong>
                    <input type="text" name="name" class="form-control" placeholder="Nama Bahan" value="{{isset($data) && is_null(old('name')) ? $data->name : old('name')}}">
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Jumlah Bab :</strong>
                    <input type="number" name="chapter_count" class="form-control" placeholder="Jumlah Bab" value="{{isset($data) && is_null(old('chapter_count')) ? $data->chapter_count : old('chapter_count')}}">
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
Bahan
@endsection
