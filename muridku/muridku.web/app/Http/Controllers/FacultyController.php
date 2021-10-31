<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\Model;

use App\Models\Faculty;

class FacultyController extends BaseController
{
    protected $viewtitle = 'Fakultas';

    protected function GetTableName()
    {
        $table = new Faculty;
        return $table->getTable();
    }

    protected function GetIndexUrl(): string
    {
        return '/faculty';
    }

    protected function GetIndexPage(): string
    {
        return 'faculty.index';
    }

    protected function GetData(Request $request, string $searchkey, int $rowperpage, int $pagenum): object
    {
        return Faculty::join('institution', 'institution.id', '=', 'faculty.institution_id')
                    ->orderBy('faculty.id')
                    ->whereRaw('lower(institution.name) like \'' . $searchkey . '\'')
                    ->orWhereRaw('lower(faculty.code) like \'' . $searchkey . '\'')
                    ->orWhereRaw('lower(faculty.name) like \'' . $searchkey . '\'')
                    ->take($rowperpage * $pagenum)
                    ->selectRaw('institution.name as institution_name, faculty.*')
                    ->get();
    }

    protected function GetDataCount(Request $request, string $searchkey): int
    {
        return Faculty::orderBy('id')
                    ->whereRaw('lower(code) like \'' . $searchkey . '\'')
                    ->orWhereRaw('lower(name) like \'' . $searchkey . '\'')
                    ->count();
    }

    protected function GetActionIndex(): string
    {
        return 'templates.action.action-index-master';
    }

    protected function GetInputPage(): string
    {
        return 'faculty.input';
    }

    protected function GetInsertValidation(Request $request): array
    {
        return $request->validate([
                    'code' => ['required', 'unique:' . $this->GetTableName(), 'max:255'],
                    'name' => ['required', 'unique:' . $this->GetTableName(), 'max:255']
                ]);
    }

    protected function CustomInsertValidation(Request $request): array
    {
        return [
            "result" => true,
            "message" => ''
        ];
    }

    protected function SetInsertData(Request $request, string $user): Model
    {
        $data = new Faculty;
        $data->code = $request->code;
        $data->name = $request->name;
        $data->usr_crt = $user;
        $data->usr_upd = $user;
        return $data;
    }

    protected function GetSingleDataById(int $id, bool $forupdate): Model
    {
        return Faculty::join('institution', 'institution.id', '=', 'faculty.institution_id')
                    ->where('faculty.id', $id)
                    ->selectRaw('institution.code as institution_code, institution.name as institution_name, institution.type as institution_type, faculty.*')
                    ->first();
    }

    protected function GetUpdateValidation(Request $request, Model $data): array
    {
        return $request->validate([
                    'code' => ['required', 'max:255', Rule::unique($this->GetTableName())->ignore($data->id)],
                    'name' => ['required', 'max:255', Rule::unique($this->GetTableName())->ignore($data->id)]
                ]);
    }

    protected function CustomUpdateValidation(Request $request, Model $data): array
    {
        return [
            "result" => true,
            "message" => ''
        ];
    }

    protected function SetUpdateData(Request $request, Model $data, string $user): Model
    {
        $data->code = $request->code;
        $data->name = $request->name;
        $data->usr_upd = $user;

        return $data;
    }
}
