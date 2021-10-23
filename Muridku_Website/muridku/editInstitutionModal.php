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
  <form class="editInstitution">
    

    <div class='form-group'>
    <input type='text' class='form-control form-control-user' id='codeInstitutionEdit' Value='BRAW'>
    </div>
    <div class='form-group'>
    <input type='text' class='form-control form-control-user' id='nameInstitutionEdit' Value='Universitas Brawijaya'>
    </div>
    <div class='form-group'>
            <select class='form-control form-control-user' id='typeInstitutionEdit'>
              <option value='CLG'>University</option>
              <option value='SCH'>School</option>
            </select>
          </div>
    <div class='form-group'>
    <input type='text' class='form-control form-control-user' id='addressInstitutionEdit' Value='Jalan Veteran'>
    </div>
  </form>
</div>
<div class="modal-footer">
  <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
  <a class="btn btn-primary" href="institution.html">Edit</a>
</div>