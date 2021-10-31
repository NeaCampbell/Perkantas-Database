@extends('templates.layout-input')
@section('form-content')
    <form method="POST" action="{{isset($data) ? url('/faculty/update?id=' . $data->id) : url('/faculty/save')}}">
        @csrf
        @method(isset($data) ? 'PATCH': 'POST')
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Institusi :</strong>
                    <div class="input-group">
                        <select class="form-control form-control-custom select2 select2-custom" name="institution_id" id="institution_id">
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Kode :</strong>
                    <input type="text" name="code" class="form-control" placeholder="Kode Fakultas" autofocus value="{{isset($data) && is_null(old('code')) ? $data->code : old('code')}}"/>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Nama :</strong>
                    <input type="text" name="name" class="form-control" placeholder="Nama Fakultas" value="{{isset($data) && is_null(old('name')) ? $data->name : old('name')}}">
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
Fakultas
@endsection
@section('additional-scripts')
    <script src="{{ asset('/js/form-input-custom.js') }}"></script>
    <script type="text/javascript">
        $(document).ready( function () {
            let data = null;
            let institution_id = {{ isset($data) ? $data->institution_id : 0 }};
            let institution_text = "{{ isset($data) ? $data->institution_code . ' - ' . $data->institution_name : null }}";

            if(institution_id !== 0)
            {
                data = {
                    id: institution_id,
                    text: institution_text
                }
            }

            let rowperpage = $('#rowperpage_select').val();
            LoadSelectOptions('{{ url("/institution/getinstitutions-fac-ref") }}', '#institution_id', data, rowperpage, 'Pilih institusi...');
        });
    </script>
@endsection
