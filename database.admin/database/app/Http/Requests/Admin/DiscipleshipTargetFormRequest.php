<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class DiscipleshipTargetFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'city_id' => [
                'required',
                'exists:city,id'
            ],
            'period_year' => [
                'required',
                'integer'
            ],
            'evangelism_target' => [
                'required',
                'integer'
            ],
            'evangelism_movement_target' => [
                'required',
                'integer'
            ],
            'ktb_leader_target' => [
                'required',
                'integer'
            ],
            'ktb_group_target' => [
                'required',
                'integer'
            ],
        ];

        return $rules;
    }
}
