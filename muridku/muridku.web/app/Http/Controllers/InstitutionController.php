<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\Model;

use App\Models\Institution;
use App\Models\MemberInstitutionHist;

class InstitutionController extends BaseController
{
    protected $viewtitle = 'Institusi';

    private $insttype = [
        Constants::MURIDKU_INST_TYPE_SCH => Constants::MURIDKU_INST_TYPE_SCH_NAME,
        Constants::MURIDKU_INST_TYPE_CLG => Constants::MURIDKU_INST_TYPE_CLG_NAME,
        Constants::MURIDKU_INST_TYPE_ALM => Constants::MURIDKU_INST_TYPE_ALM_NAME,
    ];

    protected function GetAdditionalList()
    {
        return $this->insttype;
    }

    protected function GetTableName()
    {
        $table = new Institution;
        return $table->getTable();
    }

    protected function GetIndexUrl(): string
    {
        return '/institution';
    }

    protected function GetIndexPage(): string
    {
        return 'institution.index';
    }

    protected function GetData(Request $request, string $searchkey, int $rowperpage, int $pagenum): object
    {
        return Institution::orderBy('id')
                    ->whereRaw('lower(code) like \'' . $searchkey . '\'')
                    ->orWhereRaw('lower(name) like \'' . $searchkey . '\'')
                    ->take($rowperpage * $pagenum)
                    ->get();
    }

    protected function GetDataCount(Request $request, string $searchkey): int
    {
        return Institution::orderBy('id')
                    ->whereRaw('lower(code) like \'' . $searchkey . '\'')
                    ->orWhereRaw('lower(name) like \'' . $searchkey . '\'')
                    ->count();
    }

    protected function GetActiveData(Request $request, string $searchkey, int $rowperpage, int $pagenum): object
    {
        $result = Institution::orderBy('id')
                    ->whereRaw('lower(code) like \'' . $searchkey . '\'')
                    ->orWhereRaw('lower(name) like \'' . $searchkey . '\'')
                    ->skip($rowperpage * ($pagenum - 1))
                    ->take($rowperpage * $pagenum)
                    ->get();

        return $result;
    }

    protected function GetActiveDataCount(Request $request, string $searchkey): int
    {
        $data = Institution::whereRaw('lower(code) like \'' . $searchkey . '\'')
                    ->orWhereRaw('lower(name) like \'' . $searchkey . '\'')
                    ->get();

        return $data->count();
    }

    public function LazyGetActiveDataFaculty(Request $request)
    {
        if(!Auth::check())
            return back()->withErrors([
                'error' => 'Authentication error.',
            ]);

        $validation = $request->validate([
            'rowperpage' => ['required', 'integer'],
            'pagenum' => ['required', 'integer']
        ]);

        $rowperpage = $request->rowperpage;
        $pagenum = $request->pagenum;
        $searchkey = '%%';

        if($request->searchkey)
            $searchkey = '%' . $request->searchkey. '%';

        $data = Institution::orderBy('id')
                    ->whereRaw('(lower(code) like \'' . $searchkey . '\' and type = \'CLG\')')
                    ->orWhereRaw('(lower(name) like \'' . $searchkey . '\' and type = \'CLG\')')
                    ->skip($rowperpage * ($pagenum - 1))
                    ->take($rowperpage * $pagenum)
                    ->get();
        $datacount = Institution::whereRaw('(lower(code) like \'' . $searchkey . '\' and type = \'CLG\')')
                    ->orWhereRaw('(lower(name) like \'' . $searchkey . '\' and type = \'CLG\')')
                    ->count();
        $result = [
            "count" => $datacount,
            "data" => $data
        ];

        return $result;
    }

    protected function GetActionIndex(): string
    {
        return 'templates.action.action-index-master';
    }

    protected function GetInputPage(): string
    {
        return 'institution.input';
    }

    protected function GetInsertValidation(Request $request): array
    {
        return $request->validate([
                    'code' => ['required', 'unique:' . $this->GetTableName(), 'max:100'],
                    'name' => ['required', 'unique:' . $this->GetTableName(), 'max:100'],
                    'type' => ['required', 'max:3']
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
        $data = new Institution;
        $data->code = $request->code;
        $data->name = $request->name;
        $data->type = $request->type;
        $data->address = $request->address;
        $data->usr_crt = $user;
        $data->usr_upd = $user;
        return $data;
    }

    protected function GetSingleDataById(int $id, bool $forupdate): Model
    {
        return Institution::where('id', $id)->first();
    }

    protected function GetUpdateValidation(Request $request, Model $data): array
    {
        return $request->validate([
                    'code' => ['required', 'max:100', Rule::unique($this->GetTableName())->ignore($data->id)],
                    'name' => ['required', 'max:100', Rule::unique($this->GetTableName())->ignore($data->id)],
                    'type' => ['required', 'max:3']
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
        $data->type = $request->type;
        $data->address = $request->address;
        $data->usr_upd = $user;

        return $data;
    }

    protected function GetDeleteValidation(Request $request, Model $data): array
    {
        try {
            $memberCount = MemberInstitutionHist::where('faculty_id', $request->id)->count();
        }
        catch(Exception $e)
        {
            return [
                'result' => false,
                'message' => $e->getMessage()
            ];
        }

        if($memberCount > 0)
            return [
                'result' => false,
                'message' => 'Data sudah digunakan pada data member.'
            ];

        return [
            'result' => true,
            'message' => ''
        ];
    }
}
