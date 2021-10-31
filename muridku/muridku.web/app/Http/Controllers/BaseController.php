<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\Model;

abstract class BaseController extends Controller
{
    abstract protected function GetTableName();
    abstract protected function GetIndexUrl(): string;
    abstract protected function GetIndexPage(): string;
    abstract protected function GetData(Request $request, string $searchkey, int $rowperpage, int $pagenum): object;
    abstract protected function GetDataCount(Request $request, string $searchkey): int;
    abstract protected function GetActionIndex(): string;
    abstract protected function GetInputPage(): string;
    abstract protected function GetInsertValidation(Request $request): array;
    abstract protected function CustomInsertValidation(Request $request): array;
    abstract protected function SetInsertData(Request $request, string $user): Model;
    abstract protected function GetSingleDataById(int $id, bool $forupdate): Model;
    abstract protected function GetUpdateValidation(Request $request, Model $data): array;
    abstract protected function CustomUpdateValidation(Request $request, Model $data): array;
    abstract protected function SetUpdateData(Request $request, Model $data, string $user): Model;

    protected function GetAdditionalList()
    {
        return null;
    }

    protected function GetActiveData(Request $request, string $searchkey, int $rowperpage, int $pagenum): object
    {
        return $this->GetData($request, $searchkey, $rowperpage, $pagenum);
    }

    protected function GetActiveDataCount(Request $request, string $searchkey): int
    {
        return $this->GetDataCount($request, $searchkey);
    }

    protected function GenericReturnPage(): bool
    {
        return true;
    }

    protected function CustomIndex(Request $request): object
    {
        return null;
    }

    protected function SetInsertDataOthers(Request $request, Model $data): array
    {
        return [];
    }

    protected function CustomInsertProcess(Request $request, Model $data)
    {

    }

    protected function SetUpdateDataOthers(Request $request, Model $data): array
    {
        return [];
    }

    protected function CustomUpdateProcess(Request $request, Model $data)
    {

    }

    protected $viewtitle;

    public function Index(Request $request)
    {
        if(!Auth::check())
            return back()->withErrors([
                'error' => 'Authentication error.',
            ]);

        $rowperpage = 10;

        if($request->rowperpage)
            $rowperpage = $request->rowperpage;

        if(!$this->GenericReturnPage())
            return $this->CustomIndex($request);

        return view($this->GetIndexPage())
                ->with('rowperpage', $rowperpage)
                ->with('selectedmenu', $this->GetTableName());
    }

    public function GetIndexData(Request $request)
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

        $data = $this->GetData($request, $searchkey, $rowperpage, $pagenum);
        $datacount = $this->GetDataCount($request, $searchkey);

        return datatables()
                ->of($data)
                ->addIndexColumn()
                ->addColumn('action', $this->GetActionIndex())
                ->rawColumns(['action'])
                ->setTotalRecords($datacount)
                ->make(true);
    }

    public function LazyGetActiveData(Request $request)
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

        $data = $this->GetActiveData($request, $searchkey, $rowperpage, $pagenum);
        $datacount = $this->GetActiveDataCount($request, $searchkey);
        $result = [
            "count" => $datacount,
            "data" => $data
        ];

        return $result;
    }

    public function Create()
    {
        if(!Auth::check())
            return back()->withErrors([
                'error' => 'Authentication error.',
            ]);

        $additionalList = $this->GetAdditionalList();

        return view($this->GetInputPage())
                ->with('additional', $additionalList)
                ->with('indexurl', $this->GetIndexUrl())
                ->with('selectedmenu', $this->GetTableName());
    }

    public function Store(Request $request)
    {
        if(!Auth::check())
            return back()->withErrors([
                'error' => 'Authentication error.',
            ]);

        $validation = $this->GetInsertValidation($request);
        $customvalidation = $this->CustomInsertValidation($request);

        if(!$customvalidation["result"])
            return back()->withErrors([
                'error' => $customvalidation["message"],
            ])
            ->withInput()
            ->with('selectedmenu', $this->GetTableName());

        $usr_crt = auth()->user()->email;
        $data = $this->SetInsertData($request, $usr_crt);

        DB::transaction(function() use ($request, $data) {
            $data->save();
            $ins_data_oth = $this->SetInsertDataOthers($request, $data);

            foreach($ins_data_oth as $key=>$oth_data)
                $oth_data->save();
        });

        $this->CustomInsertProcess($request, $data);

        return redirect($this->GetIndexUrl())
                ->with('success', $this->viewtitle . ' berhasil dibuat.')
                ->with('selectedmenu', $this->GetTableName());
    }

    public function Show(Request $request)
    {
        //
    }

    public function Edit(Request $request)
    {
        if(!Auth::check())
            return back()->withErrors([
                'error' => 'Authentication error.',
            ]);

        $validation = $request->validate([
            'id' => ['required', 'numeric']
        ]);

        $id = $request->id;

        $data = $this->GetSingleDataById($id, false);
        $additionalList = $this->GetAdditionalList();

        return view($this->GetInputPage())
                ->with('data', $data)
                ->with('additional', $additionalList)
                ->with('indexurl', $this->GetIndexUrl())
                ->with('selectedmenu', $this->GetTableName());
    }

    public function Update(Request $request)
    {
        if(!Auth::check())
            return back()->withErrors([
                'error' => 'Authentication error.',
            ]);

        $idvalidation = $request->validate([
            'id' => ['required', 'numeric']
        ]);

        $data = $this->GetSingleDataById($request->id, true);
        $validation = $this->GetUpdateValidation($request, $data);
        $customvalidation = $this->CustomUpdateValidation($request, $data);

        if(!$customvalidation["result"])
            return back()
                    ->withErrors([
                        'error' => $customvalidation["message"],
                    ])
                    ->withInput()
                    ->with('selectedmenu', $this->GetTableName());

        $usr_crt = auth()->user()->email;
        $data = $this->SetUpdateData($request, $data, $usr_crt);

        DB::transaction(function() use ($request, $data) {
            $data->save();
            $upd_data_oth = $this->SetUpdateDataOthers($request, $data);

            foreach($upd_data_oth as $key=>$oth_data)
                $oth_data->save();
        });

        $this->CustomUpdateProcess($request, $data);

        return redirect($this->GetIndexUrl())
                ->with('success', $this->viewtitle . ' berhasil diperbaharui.')
                ->with('selectedmenu', $this->GetTableName());
    }

    public function Destroy(Request $request)
    {
        //
    }
}
