<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title')</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('assets/css/styles.css') }}" rel="stylesheet">
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="//cdn.datatables.net/2.0.8/css/dataTables.dataTables.min.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.dataTables.min.css">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2-bootstrap-theme/0.1.0-beta.10/select2-bootstrap.min.css" rel="stylesheet" />
</head>
<body>

    @include('layouts.include.admin-navbar')

    <div id="layoutSidenav">
        @include('layouts.include.admin-sidebar')

        <div id="layoutSidenav_content">
            <main>
                @yield('content')
            </main>
            @include('layouts.include.admin-footer')
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="crossorigin="anonymous"></script>
    <script src="{{ asset('assets/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('assets/js/scripts.js') }}"></script>
    <script src="//cdn.datatables.net/2.0.8/js/dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.2.9/js/dataTables.responsive.min.js"></script>
    <script>
        $(document).ready(function() {
            var table = $('#dataTableWithFilters').DataTable({
                // responsive: true,
                initComplete: function() {
                    var api = this.api();
                    api.columns().every(function() {
                        var column = this;
                        var title = $(column.header()).text();
                        var input = $('<input type="text" placeholder="Search ' + title + '" />')
                            .appendTo($(column.header()).empty())
                            .on('keyup change clear', function() {
                                // Get the search term
                                if (column.search() !== this.value) {
                                    column.search(this.value).draw();
                                }
                            });
                        $(input).click(function(e) {
                            e.stopPropagation();
                        });
                    });
                }
            });
            var dataTableWithoutFilters = $('#dataTable').DataTable({
                responsive: true,
            });
        });
    </script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script>
        $(document).ready(function() {
            // Periksa jika modal ada di halaman
            if ($('#addFacultyModal').length) {
                $('#institution_id').select2({
                    theme: 'bootstrap',
                    placeholder: "-- Pilih Instansi --",
                    dropdownParent: $("#addFacultyModal")
                });
            } else {
                $('#institution_id').select2({
                    theme: 'bootstrap',
                    placeholder: "-- Pilih Instansi --"
                });
            }
        });
    </script>
</body>
</html>
