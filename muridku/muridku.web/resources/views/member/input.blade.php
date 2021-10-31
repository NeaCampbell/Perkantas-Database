@extends('templates.layout-input')
@section('form-content')
    <form method="POST" action="{{isset($data) ? url('/member/update?id=' . $data->id) : url('/member/save')}}">
        @csrf
        @method(isset($data) ? 'PATCH': 'POST')
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Nama :</strong>
                    <div class="input-group">
                        <input type="text" name="name" class="form-control" placeholder="Nama Member" value="{{isset($data) && is_null(old('name')) ? $data->name : old('name')}}">
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Email :</strong>
                    <div class="input-group">
                        <input type="email" name="email" class="form-control" placeholder="Email Member" value="{{isset($data) && is_null(old('email')) ? $data->email : old('email')}}">
                        <input type="hidden" name="user_id" value="{{isset($data) ? $data->user_id : null}}">
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Kota :</strong>
                    <div class="input-group">
                        <select class="form-control form-control-custom select2 select2-custom" name="city_id" id="city_id">
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Alamat :</strong>
                    <div class="input-group">
                        <input type="text" name="address" class="form-control" placeholder="Alamat Member" value="{{isset($data) && is_null(old('address')) ? $data->address : old('address')}}">
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Gender :</strong>
                    <select class="form-control" name="gender" id="gender">
                        @foreach($additional['gender'] as $key=>$value)
                            <option value="{{$key}}"
                                @if((isset($data) && is_null(old('gender')) && isset($data->gender) && $data->gender === $key) || (!is_null(old('gender')) && old('gender') === $key))
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
                    <strong>Tanggal Lahir (tahun-bulan-tanggal) :</strong>
                    <input type="text" data-provide="datepicker" name="birth_dt" id="birth_dt" class="form-control datepicker" placeholder="Tanggal Lahir Member" value="{{isset($data) && is_null(old('birth_dt')) ? $data->birth_dt_formatted : old('birth_dt')}}" autofocus>
                    <div class="input-group-addon">
                        <span class="glyphicon glyphicon-th"></span>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Tempat Lahir :</strong>
                    <div class="input-group">
                        <input type="text" name="birth_place" class="form-control" placeholder="Tempat Lahir Member" value="{{isset($data) && is_null(old('birth_place')) ? $data->birth_place : old('birth_place')}}">
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>No. HP :</strong>
                    <div class="input-group">
                        <input type="text" name="mobile_phn" class="form-control" placeholder="Nomor HP Member" value="{{isset($data) && is_null(old('mobile_phn')) ? $data->mobile_phn : old('mobile_phn')}}">
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Komponen :</strong>
                    <select class="form-control" name="inst_type" id="inst_type">
                        @foreach($additional['inst_type'] as $key=>$value)
                            <option value="{{$key}}"
                                @if((isset($data) && is_null(old('inst_type')) && isset($data->inst_type) && $data->inst_type === $key) || (!is_null(old('inst_type')) && old('inst_type') === $key))
                                    selected
                                @endif
                            >
                                {{$value}}
                            </option>
                        @endforeach
                    </select>
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
Member
@endsection
@section('additional-scripts')
    <script src="{{ asset('/js/form-input-custom.js') }}"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            $('.datepicker').datepicker({
                format: 'yyyy-mm-dd'
            });

            let data = null;
            let city_id = {{ isset($data) ? $data->city_id : 0 }};
            let city_text = "{{ isset($data) ? $data->city_code . ' - ' . $data->city_name : null }}";

            if(city_id !== 0)
            {
                data = {
                    id: city_id,
                    text: city_text
                }
            }

            let rowperpage = $('#rowperpage_select').val();
            LoadSelectOptions('{{ url("/city/getcities-ref") }}', '#city_id', data, rowperpage, 'Pilih kota...');
        });
    </script>
@endsection
