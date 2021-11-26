@extends('templates.layout-index')
@section('title')
    Data Bahan
@endsection
@section('new-url')
    {{url('/material/add')}}
@endsection
@section('new-button')
    Tambah Bahan Baru
@endsection
@section('table-header')
    <th width="50px">No</th>
    <th width="100px">Kode</th>
    <th width="180px">Nama</th>
    <th width="180px">Jumlah Bab</th>
    <th width="120px">Action</th>
@endsection
@section('additional-scripts')
    <script type="text/javascript">
        $(document).ready( function () {
            loadData();
        });

        function loadData()
        {
            var rowperpage = $('#rowperpage').val();
            var pagenum = $('#pagenum').val();
            var columns = [
                    { data: 'DT_RowIndex', name: 'DT_RowIndex' },
                    { data: 'code', name: 'code' },
                    { data: 'name', name: 'name' },
                    { data: 'chapter_count', name: 'chapter_count' },
                    { data: 'action', name: 'action', orderable: false, searchable: false },
                ];
            var orders = [[0, 'asc']];
            var basicurl = "{{ url('/material/getmaterials?') }}";
            var table = loadDatatable(basicurl, '#main-table', rowperpage, pagenum, columns, orders);
        }

        function editdata(id)
        {
            window.location.href = "{{url('/material/edit?id=')}}" + id;
        }

        function deletedata(id)
        {
            if(!confirm("Apakah anda yakin data akan dihapus?"))
                return;

            $("#main-table_processing").show();
            $.ajax({
                url: "{{url('/material/delete?id=')}}" + id,
                type: "DELETE",
                success: function(result) {
                    if(result.result)
                    {
                        location.reload();
                        return;
                    }

                    $("#main-table_processing").hide();
                    $("#error-delete").html(result.message);

                    if($("#error-delete.d-none").length)
                        $("#error-delete").toggleClass("d-none");
                },
                error: function(error) {
                    $("#main-table_processing").hide();
                    $("#error-delete").html(error.responseJSON.message);

                    if($("#error-delete.d-none").length)
                        $("#error-delete").toggleClass("d-none");
                }
            });
        }
    </script>
@endsection
