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
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>

    <!-- Styles -->
    <link href="{{ asset('assets/css/styles.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.datatables.net/2.1.6/css/dataTables.dataTables.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/rowreorder/1.5.0/css/rowReorder.dataTables.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/3.0.3/css/responsive.dataTables.css">
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

    <script src="{{ asset('assets/js/scripts.js') }}"></script>
    <script src="{{ asset('assets/js/bootstrap.bundle.min.js') }}"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="https://cdn.datatables.net/2.1.6/js/dataTables.js"></script>
    <script src="https://cdn.datatables.net/rowreorder/1.5.0/js/dataTables.rowReorder.js"></script>
    <script src="https://cdn.datatables.net/responsive/3.0.3/js/dataTables.responsive.js"></script>
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
    <script>
        $(document).ready(function() {
            // //error
            // const urllist = $('#dataTable').attr('class').split(' ')
            // const urlraw = urllist.filter(u=>u.includes('data-'))[0]
            // const urlfixlist = urlraw.split('-');
            // let urlfix = '';

            // for (let i = 1; i < urlfixlist.length; i++) {
            //     urlfix += urlfixlist[i];
            //     if (i < urlfixlist.length - 1) urlfix += '/';
            // }
            // const urlfunc = '{{route("dummy")}}';
            // const url = urlfunc.replace('dummy', urlfix);
            // // console.log({urllist, urlraw, urlfix, urlfunc, url});
            // var pagenumber = 0;
            // var pagesize = 10;

            var table = $('#dataTableWithFilter').DataTable({
                responsive: true,
                rowReorder: {
                    selector: 'td:nth-child(2)'
                },
                initComplete: function() {
                    var api = this.api();
                    api.columns().every(function() {
                        var column = this;
                        var title = $(column.header()).text();
                        var input = $('<input type="text" placeholder="Search ' + title + '" />')
                            .appendTo($(column.header()).empty())
                            .on('keyup change clear', function() {
                                if (column.search() !== this.value) {
                                    column.search(this.value).draw();
                                }
                            });
                    });
                },
                "columnDefs": [
                    { className: "dt-head-left", "targets": "_all" },
                    {
                        "targets": 3, // Assuming the date is in the fourth column (0-indexed)
                        "render": function(data, type, row) {
                            var date = new Date(data);
                            var day = date.getDate();
                            var month = date.getMonth() + 1; // January is 0
                            var year = date.getFullYear();
                            return (day < 10 ? '0' + day : day) + '-' + (month < 10 ? '0' + month : month) + '-' + year;
                        }
                    }
                ],
            });

            var table = $('table[id^="dataTableReportTarget"]').DataTable({
                responsive: true,
                rowReorder: {
                    selector: 'td:nth-child(2)'
                },
                initComplete: function() {
                    var api = this.api();
                    api.columns().every(function() {
                        var column = this;
                        var title = $(column.header()).text();
                        var input = $('<input type="text" placeholder="Search ' + title + '" />')
                            .appendTo($(column.header()).empty())
                            .on('keyup change clear', function() {
                                if (column.search() !== this.value) {
                                    column.search(this.value).draw();
                                }
                            });
                    });
                }
            });

            var dataTableWithoutFilters = $('#dataTable').DataTable({
                responsive: true,
                processing:true,
                serverSide: true,
                rowReorder: {
                    selector: 'td:nth-child(2)'
                },
                // //error
                // ajax: {
                //     url: url,
                //     type: "GET",
                //     data: function (data) {
                //         // data.search = $('input[type="search"]').val();
                //         console.log({data});
                //     }
                // },
                columns: [
                    { data: 'id', name: 'id' },
                    { data: 'code', name: 'code' },
                    { data: 'name', name: 'name' },
                    { data: 'created_at', name: 'created_at' },
                    { data: 'updated_at', name: 'updated_at' },
                    { data: 'action', name: 'action', orderable: false, searchable: false }
                ]
            });
            // $('#dataTable').on('page.dt', function () {
            //     const info = dataTableWithoutFilters.page.info();
            //     console.log({info});
            //     pagenumber = info.page;
            //     pagesize = info.length;
            // })
        });
    </script>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
            const yearSelect = document.getElementById('year');
            const currentYear = new Date().getFullYear();
            for (let year = currentYear; year >= currentYear - 10; year--) {
                let option = new Option(year, year);
                yearSelect.add(option);
            }
            lockYear();
            yearSelect.addEventListener('change', lockYear);
    });

    function lockYear() {
        const year = document.getElementById('year').value;
        const startDate = document.getElementById('start_date');
        const endDate = document.getElementById('end_date');

        startDate.value = ''; // Kosongkan nilai saat ini
        endDate.value = ''; // Kosongkan nilai saat ini

        startDate.min = year + '-01-01'; // Setel tanggal minimum
        startDate.max = year + '-12-31'; // Setel tanggal maksimum

        endDate.min = year + '-01-01'; // Setel tanggal minimum
        endDate.max = year + '-12-31'; // Setel tanggal maksimum
    }
    </script>
</body>
</html>
