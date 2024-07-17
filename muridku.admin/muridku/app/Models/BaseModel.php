<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Http\Controllers\Constants\Common as CommonConstants;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\API\BaseController;

class BaseModel extends Model
{
    use HasFactory;

    protected $hidden = [
        'created_by',
        'created_at',
    ];
    protected $keyType = 'string';
    protected $primaryKey = 'ucode';
    protected $modelType;
    protected $tableCode;
    protected $strictCodeGeneration = true;
    public $incrementing = false;
    public $uuid;

    protected $casts = [
        "sts" => "boolean",
        "aktif" => "boolean",
        "is_external" => "boolean",
    ];

    public function save(array $options = [])
    {
        $mode = $options["mode"];
        $username = $options["request"]->header("sender", "SYSTEM");
        $division_code = array_key_exists("div_code", $options) ? $options["div_code"] : $options["request"]->header("div", "");
        $timestamp = gmdate(DATE_ATOM);

        if ($mode === CommonConstants::DATA_NEW)
        {
            $this->created_by = $username;
            $this->created_at = $timestamp;
            $ucodeObj = DB::select("select UUID() as ucode")[0];
            $this->ucode = BaseController::composeQueryUcodeToBinary($ucodeObj->ucode);
            $this->uuid = $ucodeObj->ucode;

            switch ($this->modelType) {
                case CommonConstants::MODEL_TYPE_MASTER:
                    if ($this->strictCodeGeneration || empty($this->kode))
                        $this->kode = DB::select("CALL st_Generatekode('" . $this->table . "', 'kode', '" . $this->tableCode . "', " . CommonConstants::MODEL_NO_DIGIT_COUNT . ")")[0]->genkode;
                    break;
                case CommonConstants::MODEL_TYPE_TRANSACTION:
                    if ($this->strictCodeGeneration || empty($this->no_transaksi))
                    {
                        $generate_result = DB::select("CALL st_GenerateNoDok('" . $this->table . "', 'no_transaksi', '" . $this->tableCode . "', '" . $this->tanggal_transaksi . "', '" . CommonConstants::MODEL_NO_SEPARATOR . "', " . CommonConstants::MODEL_NO_DIGIT_COUNT . ", '" . $division_code . "')")[0];
                        $this->no_transaksi = $generate_result->NoDok;
                    }
                    break;
                default:
                    break;
            }
        }

        $this->updated_by = $username;
        $this->updated_at = $timestamp;

        return parent::save();
    }
}
