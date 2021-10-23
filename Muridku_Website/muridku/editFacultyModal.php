<?php
  include 'conn.php';
?>

<div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">Edit</h5>
    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">×</span>
    </button>
</div>
<div class="modal-body">
  <!-- isi di sini -->
    <form class="editFaculty">
    

        <div class='form-group'>
            <input type='text' class='form-control form-control-user' id='FacultyNameEdit' Value='Fakultas Ilmu Komputer'>
        </div>
        <div class='form-group'>
            <input type='text' class='form-control form-control-user' id='InstitutionNameEdit' Value='Universitas Brawijaya'>
        </div>
        <div class='form-group'>
            <input type='text' class='form-control form-control-user' id='InstitutionAddressEdit' Value='Jalan Veteran'>
        </div>
    </form>
</div>
<div class="modal-footer">
    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
    <a class="btn btn-primary" href="faculty.html">Edit</a>
</div>