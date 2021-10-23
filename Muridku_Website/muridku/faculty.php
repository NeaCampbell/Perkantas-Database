<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Faculty</title>

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

<body id="page-top" onload="facultyLoad()">

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
                        <h1 class="h3 mb-0 text-gray-800">Faculty</h1>
                        <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" data-toggle="modal" data-target="#addedModal">
                            <i class="fas fa-plus-circle fa-sm text-white-50"></i> Add New</a>
                    </div>

                    <!-- DataTales Example -->
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Faculty Data Tables</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Faculty Name</th>
                                            <th>Institution Name</th>
                                            <th>Address</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Faculty Name</th>
                                            <th>Institution Name</th>
                                            <th>Address</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr>
                                            <td>Fakultas Ilmu Komputer</td>
                                            <td>Universitas Brawijaya</td>
                                            <td>Jalan Veteran</td>
                                            <td>
                                                <a href='#' class='btn btn-primary btn-circle btn-sm editFacultyModal' data-toggle='modal' data-target='#editModal' data-id='2'>
                                                    <i class='far fa-edit'></i>
                                                </a>
                                                <a href='#' class='btn btn-danger btn-circle btn-sm'>
                                                    <i class='fas fa-trash'></i>
                                                </a>
                                            </td>
                                        </tr>
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
        function facultyLoad() {
            document.getElementById("dashboard").classList.remove("active");
            document.getElementById("institution").classList.remove("active");
            document.getElementById("faculty").classList.add("active");
            document.getElementById("material").classList.remove("active");
            document.getElementById("report").classList.remove("active");
            document.getElementById("generalsetting").classList.remove("active");
        }

        $('.editFacultyModal').click(function(){
            var id = $(this).attr('data-id');
            $.ajax({url:"editFacultyModal.php?id=" + id,
                    cache:false,
                    success:
                        function(result){
                            $(".modal-content").html(result);
                        }
                    });
        });
    </script> 

</body>

</html>