<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\Model;

use App\Models\Member;
use App\Models\User;
use App\Models\City;
use App\Models\Institution;
use App\Models\Faculty;
use App\Http\Controllers\ApiController;

class MemberController extends BaseController
{
    protected $viewtitle = 'Member';

    private $gender = [
        Constants::MURIDKU_GENDER_MALE => Constants::MURIDKU_GENDER_MALE_NAME,
        Constants::MURIDKU_GENDER_FEMALE => Constants::MURIDKU_GENDER_FEMALE_NAME,
    ];

    private $insttype = [
        Constants::MURIDKU_INST_TYPE_SCH => Constants::MURIDKU_INST_TYPE_SCH_NAME_MEMBER,
        Constants::MURIDKU_INST_TYPE_CLG => Constants::MURIDKU_INST_TYPE_CLG_NAME_MEMBER,
        Constants::MURIDKU_INST_TYPE_ALM => Constants::MURIDKU_INST_TYPE_ALM_NAME_MEMBER,
    ];

    protected function GetAdditionalList()
    {
        return [
            'gender' => $this->gender,
            'inst_type' => $this->insttype
        ];
    }

    protected function GetTableName()
    {
        $table = new Member;
        return $table->getTable();
    }

    protected function GetIndexUrl(): string
    {
        return '/member';
    }

    protected function GetIndexPage(): string
    {
        return 'member.index';
    }

    protected function GetData(Request $request, string $searchkey, int $rowperpage, int $pagenum): object
    {
        return Member::join('user', 'user.member_id', '=', 'member.id')
                    ->orderBy('member.id')
                    ->whereRaw('lower(member.name) like lower(\'' . $searchkey . '\')')
                    ->orWhereRaw('lower(member.address) like lower(\'' . $searchkey . '\')')
                    ->orWhereRaw('lower(member.gender) like lower(\'' . $searchkey . '\')')
                    ->orWhereRaw('lower(user.email) like lower(\'' . $searchkey . '\')')
                    ->take($rowperpage * $pagenum)
                    ->select(
                        'member.id',
                        'member.name',
                        'member.address',
                        'member.gender',
                        'user.email'
                    )
                    ->get();
    }

    protected function GetDataCount(Request $request, string $searchkey): int
    {
        return Member::join('user', 'user.member_id', '=', 'member.id')
                    ->whereRaw('lower(member.name) like lower(\'' . $searchkey . '\')')
                    ->orWhereRaw('lower(member.address) like lower(\'' . $searchkey . '\')')
                    ->orWhereRaw('lower(member.gender) like lower(\'' . $searchkey . '\')')
                    ->orWhereRaw('lower(user.email) like lower(\'' . $searchkey . '\')')
                    ->count();
    }

    protected function GetActionIndex(): string
    {
        return 'templates.action.action-index-master';
    }

    protected function GetInputPage(): string
    {
        return 'member.input';
    }

    protected function GetInsertValidation(Request $request): array
    {
        return $request->validate([
                    'name' => ['required', 'unique:' . $this->GetTableName(), 'max:100'],
                    'email' => ['required', 'unique:user', 'max:200', 'email:rfc,dns'],
                    'address' => ['required', 'max:200'],
                    'gender' => ['required', 'max:1'],
                    'inst_type' => ['required', 'max:3'],
                    'city_id' => ['required', 'integer']
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
        $data = new Member;
        $data->name = $request->name;
        $data->address = $request->address;
        $data->gender = $request->gender;
        $data->birth_dt = $request->birth_dt ?? null;
        $data->birth_place = $request->birth_place ?? null;
        $data->mobile_phn = $request->mobile_phn ?? null;
        $data->inst_type = $request->inst_type;
        $data->city_id = $request->city_id;
        $data->usr_crt = $user;
        $data->usr_upd = $user;

        return $data;
    }

    protected function SetInsertDataOthers(Request $request, Model $data): array
    {
        $user = new User;
        $user->member_id = $data->id;
        $user->email = $request->email;
        $user->password = ApiController::RequestEncryptedPassword('password')->result->encryptedValue;
        $user->is_active = 0;
        $user->accept_term = 0;
        $user->usr_crt = $data->usr_crt;
        $user->usr_upd = $data->usr_upd;

        return [
            0 => $user
        ];
    }

    protected function CustomInsertProcess(Request $request, Model $data)
    {

    }

    protected function GetSingleDataById(int $id, bool $forupdate): Model
    {
        return Member::join('user', 'user.member_id', '=', 'member.id')
                    ->join('city', 'city.id', '=', 'member.city_id')
                    ->where('member.id', $id)
                    ->selectRaw('member.*, city.code as city_code, city.name as city_name, date_format(member.birth_dt, \'%Y-%m-%d\') as birth_dt_formatted, user.id as user_id, user.email')
                    ->first();
    }

    protected function GetUpdateValidation(Request $request, Model $data): array
    {
        return $request->validate([
                    'name' => ['required', 'max:100', Rule::unique($this->GetTableName())->ignore($data->id)],
                    'email' => ['required', Rule::unique('user')->ignore($request->user_id), 'max:200', 'email:rfc,dns'],
                    'address' => ['required', 'max:200'],
                    'gender' => ['required', 'max:1'],
                    'inst_type' => ['required', 'max:3'],
                    'city_id' => ['required', 'integer']
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
        $data->name = $request->name;
        $data->address = $request->address;
        $data->gender = $request->gender;
        $data->birth_dt = $request->birth_dt ?? null;
        $data->birth_place = $request->birth_place ?? null;
        $data->mobile_phn = $request->mobile_phn ?? null;
        $data->inst_type = $request->inst_type;
        $data->city_id = $request->city_id;
        $data->usr_upd = $user;

        return $data;
    }

    protected function SetUpdateDataOthers(Request $request, Model $data): array
    {
        $user = User::where('member_id', '=', $data->id)->first();
        $user->email = $request->email;
        $user->usr_upd = $data->usr_upd;

        return [
            0 => $user
        ];
    }

    protected function CustomUpdateProcess(Request $request, Model $data)
    {

    }
}
