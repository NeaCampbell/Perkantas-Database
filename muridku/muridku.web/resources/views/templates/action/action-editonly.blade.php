<a href="javascript:void(0)" id="edit-task" data-toggle="tooltip" onClick="editdata({{ $id }})" data-original-title="Edit" class="edit btn btn-success edit" style="font-size: 10px;">
    Edit
</a>
@if(!isset($activity_type) || $activity_type != 'main')
    <a href="javascript:void(0);" id="delete-task" onClick="deletedata({{ $id }})" data-toggle="tooltip" data-original-title="Delete" class="delete btn btn-danger" style="font-size: 10px;">
        Delete
    </a>
@endif
