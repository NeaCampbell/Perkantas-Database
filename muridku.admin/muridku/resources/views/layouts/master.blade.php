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

    <link rel="stylesheet" href="//cdn.datatables.net/2.1.4/css/dataTables.dataTables.min.css">
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
    <script src="//cdn.datatables.net/2.1.4/js/dataTables.min.js"></script>
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
            var table = $('#dataTableWithFilter').DataTable({
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
                        $(input).click(function(e) {
                            e.stopPropagation();
                        });
                    });
                },
                // "bFilter": false,
                scrollX: true,
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
            var dataTableWithoutFilters = $('#dataTable').DataTable({
                // responsive: true,
            });
        });
    </script>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const yearSelect = document.getElementById('year');
        const currentYear = new Date().getFullYear();
        // Mengisi pilihan tahun dari tahun saat ini sampai 10 tahun yang lalu
        for (let year = currentYear; year >= currentYear - 10; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }
        lockYear(); // Panggil fungsi untuk mengatur tahun secara otomatis setelah pilihan diisi

        // Menambahkan event listener untuk perubahan tahun
        yearSelect.addEventListener('change', function() {
            lockYear(); // Fungsi ini dipanggil setiap kali tahun berubah
        });
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
