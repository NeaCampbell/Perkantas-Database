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
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.4.1/css/buttons.dataTables.min.css">
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
    <script src="https://cdn.datatables.net/buttons/2.4.1/js/dataTables.buttons.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.1/js/buttons.html5.min.js"></script>


    <script>
        $(document).ready(function() {
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
                            .appendTo($(column.header()))
                            .on('keyup change clear', function() {
                                if (column.search() !== this.value) {
                                    column.search(this.value).draw();
                                }
                            });
                    });
                },
                headerCallback: function(thead) {
                    $(thead).find('th').css('text-align', 'left');
                },
                createdRow: function(row, data, dataIndex) {
                    $(row).find('td').css('text-align', 'left');
                },
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
                            .appendTo($(column.header()))
                            .on('keyup change clear', function() {
                                if (column.search() !== this.value) {
                                    column.search(this.value).draw();
                                }
                            });
                    });
                },
                headerCallback: function(thead) {
                    $(thead).find('th').css('text-align', 'left');
                },
                createdRow: function(row, data, dataIndex) {
                    $(row).find('td').css('text-align', 'left');
                }
            });

            var table = $('#dataTableReport').DataTable({
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
                            .appendTo($(column.header()))
                            .on('keyup change clear', function() {
                                if (column.search() !== this.value) {
                                    column.search(this.value).draw();
                                }
                            });
                    });
                },
                headerCallback: function(thead) {
                    $(thead).find('th').css('text-align', 'left');
                },
                createdRow: function(row, data, dataIndex) {
                    $(row).find('td').css('text-align', 'left');
                },
                "columnDefs": [
                    { className: "dt-head-left", "targets": "_all" },
                    {
                        "targets": 3, // Kolom tanggal
                        "render": function(data, type, row) {
                            var date = new Date(data);
                            var day = date.getDate();
                            var month = date.getMonth() + 1;
                            var year = date.getFullYear();
                            return (day < 10 ? '0' + day : day) + '-' + (month < 10 ? '0' + month : month) + '-' + year;
                        }
                    }
                ],
            });

            var dataTableWithoutFilters = $('#dataTable').DataTable({
                responsive: true,
                dom: '<"row mb-3"<"col-md-6 d-flex align-items-center"l><"col-md-6 d-flex justify-content-end"Bf>>' +
                    'rtip', // Tabel, Info, Pagination
                buttons: [
                    {
                        extend: 'excel',
                        text: 'Export to Excel',
                        className: 'btn btn-success btn-sm me-2', // Tambahkan margin kanan
                        title: 'Data Export',
                        filename: 'data_export',
                        exportOptions: {
                            columns: ':visible'
                        }
                    }
                ],
                rowReorder: {
                    selector: 'td:nth-child(2)'
                },
            });
        });
    </script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const yearSelect = document.getElementById('year');
            const startDateInput = document.getElementById('start_date');
            const endDateInput = document.getElementById('end_date');

            // Mengambil tahun saat ini dari PHP menggunakan Blade
            const currentYear = {{ date('Y') }};
            const selectedYear = "{{ request('year') ?? date('Y') }}"; // Mengambil tahun dari query parameter atau gunakan tahun saat ini

            // Mengisi opsi tahun dari 10 tahun terakhir hingga tahun saat ini
            for (let year = currentYear; year >= currentYear - 10; year--) {
                const option = new Option(year, year);
                yearSelect.add(option);
            }

            // Mengatur opsi yang dipilih di dropdown year
            yearSelect.value = selectedYear;

            // Mengatur tanggal awal dan akhir berdasarkan tahun yang dipilih
            yearSelect.addEventListener('change', function() {
                const selectedYear = yearSelect.value;
                if (selectedYear) {
                    startDateInput.value = `${selectedYear}-01-01`;
                    endDateInput.value = `${selectedYear}-12-31`;
                    startDateInput.min = `${selectedYear}-01-01`;
                    startDateInput.max = `${selectedYear}-12-31`;
                    endDateInput.min = `${selectedYear}-01-01`;
                    endDateInput.max = `${selectedYear}-12-31`;
                }
            });

            // Mengatur batas tanggal awal dan akhir saat halaman dimuat
            if (selectedYear) {
                startDateInput.min = `${selectedYear}-01-01`;
                startDateInput.max = `${selectedYear}-12-31`;
                endDateInput.min = `${selectedYear}-01-01`;
                endDateInput.max = `${selectedYear}-12-31`;
            }
        });
    </script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const institutionDropdown = document.getElementById('institution_id');
            const facultyDropdown = document.getElementById('faculty_id');

            institutionDropdown.addEventListener('change', function() {
                const institutionId = this.value;
                facultyDropdown.innerHTML = '<option value="">Loading...</option>';

                if (institutionId) {
                    fetch(`/admin/get-faculties/${institutionId}`)
                        .then(response => response.json())
                        .then(data => {
                            facultyDropdown.innerHTML = '<option value="">Pilih Fakultas</option>';
                            data.forEach(faculty => {
                                const option = document.createElement('option');
                                option.value = faculty.id;
                                option.textContent = faculty.name;
                                facultyDropdown.appendChild(option);
                            });
                        })
                        .catch(error => console.error('Error fetching faculties:', error));
                } else {
                    facultyDropdown.innerHTML = '<option value="">Pilih Fakultas</option>';
                }
            });
        });
    </script>
</body>
</html>
