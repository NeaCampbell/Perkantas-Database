@extends('templates.layout-index')
@section('title')
    Data Kota
@endsection
@section('new-url')
    {{url('/city/add')}}
@endsection
@section('new-button')
    Tambah Kota Baru
@endsection
@section('table-header')
    <th width="50px">No</th>
    <th width="100px">Kode</th>
    <th width="180px">Nama</th>
    <th width="120px">Action</th>
@endsection
@section('additional-scripts')
    <script type="text/javascript">
        $(document).ready( function () {
            var rowperpage = $('#rowperpage').val();
            var pagenum = $('#pagenum').val();
            var columns = [
                    { data: 'DT_RowIndex', name: 'DT_RowIndex' },
                    { data: 'code', name: 'code' },
                    { data: 'name', name: 'name' },
                    { data: 'action', name: 'action', orderable: false, searchable: false },
                ];
            var orders = [[0, 'asc']];
            var basicurl = "{{ url('/city/getcities?') }}";
            var table = loadDatatable(basicurl, '#main-table', rowperpage, pagenum, columns, orders);
        });

        function editdata(id)
        {
            window.location.href = "{{url('/city/edit?id=')}}" + id;
        }

        function deletedata(id)
        {
            window.location.href = "{{url('/city/delete?id=')}}" + id;
        }
    </script>
@endsection
