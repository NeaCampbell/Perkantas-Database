<a href="javascript:void(0);" id="editlistitem" data-toggle="tooltip" onClick="editdata({{ $id }})" data-original-title="Edit" class="edit btn btn-outline-info btn-sm">
    Edit
</a>
<a href="javascript:void(0);" id="deletelistitem" data-toggle="tooltip" onClick="deletedata({{ $id }})" data-original-title="Delete" class="delete btn btn-outline-danger btn-sm">
    Delete
</a>
@yield('other-action')
