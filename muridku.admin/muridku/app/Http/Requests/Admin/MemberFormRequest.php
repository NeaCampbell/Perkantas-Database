<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class MemberFormRequest extends FormRequest
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
            'name' => [
                'required',
                'string',
                'max:100'
            ],
            'address' => [
                'nullable',
                'string',
                'max:200'
            ],
            'gender' => [
                'nullable',
                'string',
                'in:M,F'
            ],
            'birth_dt' => [
                'nullable',
                'date',
                'before:today'
            ],
            'birth_place' => [
                'nullable',
                'string',
                'max:100'
            ],
            'mobile_phn' => [
                'nullable',
                'string',
                'max:20',
                'regex:/^[0-9+()-]*$/'
            ],
            'status' => [
                'required',
                'integer',
                'in:0,1'
            ],
            'inst_type' => [
                'nullable',
                'string',
                'max:5'
            ],
            'city_id' => [
                'required',
                'exists:city,id'
            ],
            'institution_id' => [
                'nullable',
                'exists:institution,id'
            ],
            'faculty_id' => [
                'nullable',
                'exists:faculty,id'
            ],
            'alpha_member_id' => [
                'nullable',
                'integer'
            ]
        ];

        return $rules;
    }
}
