<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\Model;

use App\Models\City;
use App\Models\Member;

class CityController extends BaseController
{
    protected $viewtitle = 'Kota';

    protected function GetTableName()
    {
        $table = new City;
        return $table->getTable();
    }

    protected function GetIndexUrl(): string
    {
        return '/city';
    }

    protected function GetIndexPage(): string
    {
        return 'city.index';
    }

    protected function GetData(Request $request, string $searchkey, int $rowperpage, int $pagenum): object
    {
        return City::orderBy('id')
                    ->whereRaw('lower(code) like \'' . $searchkey . '\'')
                    ->orWhereRaw('lower(name) like \'' . $searchkey . '\'')
                    ->take($rowperpage * $pagenum)
                    ->get();
    }

    protected function GetDataCount(Request $request, string $searchkey): int
    {
        return City::orderBy('id')
                    ->whereRaw('lower(code) like \'' . $searchkey . '\'')
                    ->orWhereRaw('lower(name) like \'' . $searchkey . '\'')
                    ->count();
    }

    protected function GetActiveData(Request $request, string $searchkey, int $rowperpage, int $pagenum): object
    {
        return City::orderBy('id')
                    ->whereRaw('lower(code) like \'' . $searchkey . '\'')
                    ->orWhereRaw('lower(name) like \'' . $searchkey . '\'')
                    ->skip($rowperpage * ($pagenum - 1))
                    ->take($rowperpage * $pagenum)
                    ->get();
    }

    protected function GetActiveDataCount(Request $request, string $searchkey): int
    {
        return City::whereRaw('lower(code) like \'' . $searchkey . '\'')
                    ->orWhereRaw('lower(name) like \'' . $searchkey . '\'')
                    ->count();
    }

    protected function GetActionIndex(): string
    {
        return 'templates.action.action-index-master';
    }

    protected function GetInputPage(): string
    {
        return 'city.input';
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
        $data = new City;
        $data->code = $request->code;
        $data->name = $request->name;
        $data->usr_crt = $user;
        $data->usr_upd = $user;
        return $data;
    }

    protected function GetSingleDataById(int $id, bool $forupdate): Model
    {
        return City::where('id', $id)->first();
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

    protected function GetDeleteValidation(Request $request, Model $data): array
    {
        $memberCount = Member::where('city_id', $request->id)->count();

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
