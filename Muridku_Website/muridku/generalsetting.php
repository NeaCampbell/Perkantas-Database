<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>General Setting</title>

    <!-- Custom fonts for this template -->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/sb-admin-2.min.css" rel="stylesheet">

    <!-- Custom styles for this page -->
    <link href="vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">

</head>

<body id="page-top" onload="generalsettingLoad()">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <?php
            include 'sidebar.html';
        ?>

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <?php
                    include 'topbar.html';
                ?>

                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <!-- Page Heading -->
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800">General Setting</h1>
                        <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" data-toggle="modal" data-target="#addedModal">
                            <i class="fas fa-plus-circle fa-sm text-white-50"></i> Add New</a>
                    </div>

                    <!-- DataTales Example -->
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">General Setting Data Tables</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <?php
                                            $url = "https://ojk-invest-api.vercel.app/api/apps";
                                            //$json = json_decode(file_get_contents($url), true);

                                            $example = '{"data":{"apps":[{"id":1,"name":"Universitas Brawijaya","address":"Jalan Trunojoyo no 19"},{"id":2,"name":"Universitas Negeri Malang","address":"Jalan Veteran no 1"},{"id":3,"name":"Universitas Ma Chung","address":"Villa Puncak Tidak N-01"},{"id":4,"name":"Institut Teknologi Nasional","address":"Jalan Sigura-gura no 19"},{"id":5,"name":"SMAK St. Albertus Malang","address":"Jalan Talang no 1"},{"id":6,"name":"SMAN 1 Malang","address":"Jalan Kahuripan no 11"},{"id":7,"name":"SMAN 2 Malang","address":"Jalan Panderman no 23"},{"id":8,"name":"SMAN 3 Malang","address":"Jalan Ijen no 191"},{"id":9,"name":"SMAN 4 Malang","address":"Jalan Lokon no 231"},{"id":10,"name":"SMAN 5 Malang","address":"Jalan Basuki Rachmat no 121"},{"id":11,"name":"SMAN 9 Malang","address":"Jalan Permata Jingga no 23"}],"version":"8/10/2021"},"error":null}';
                                            $json = json_decode($example, true);

                                            $balance = $json['data']['apps'];

                                            foreach ($balance as $test) {
                                                echo "<tr>
                                                        <td>{$test['name']}</td>
                                                        <td>{$test['address']}</td>
                                                        <td>
                                                            <a href='#' class='btn btn-primary btn-circle btn-sm'>
                                                                <i class='far fa-edit'></i>
                                                            </a>
                                                            <a href='#' class='btn btn-danger btn-circle btn-sm'>
                                                                <i class='fas fa-trash'></i>
                                                            </a>
                                                        </td>
                                                    </tr>";
                                            };
                                        ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

            <?php
                include 'footer.html';
            ?>

        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->

    <?php
        include 'topButton.html';
        include 'Modal.html';
    ?>

    <!-- Bootstrap core JavaScript-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin-2.min.js"></script>

    <!-- Page level plugins -->
    <script src="vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <!-- Page level custom scripts -->
    <script src="js/demo/datatables-demo.js"></script>

    <!-- Script to add class name -->        
    <script> 
        function generalsettingLoad() {
            document.getElementById("dashboard").classList.remove("active");
            document.getElementById("institution").classList.remove("active");
            document.getElementById("faculty").classList.remove("active");
            document.getElementById("material").classList.remove("active");
            document.getElementById("report").classList.remove("active");
            document.getElementById("generalsetting").classList.add("active");
        }
    </script> 

</body>

</html>