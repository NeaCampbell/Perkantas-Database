<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDiscipleshipTargetTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('discipleship_target', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('city_id')->index();
            $table->string('period_year', 4);
            $table->integer('evangelism_target')->default(0);
            $table->integer('evangelism_movement_target')->default(0);
            $table->integer('ktb_leader_target')->default(0);
            $table->integer('ktb_group_target')->default(0);
            $table->string('notes', 255)->nullable();
            $table->string('usr_crt', 100);
            $table->dateTime('dtm_crt');
            $table->string('usr_upd', 100);
            $table->dateTime('dtm_upd');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('discipleship_target');
    }
}
