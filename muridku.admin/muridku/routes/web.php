<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::prefix('admin')->middleware(['auth', 'isAdmin'])->group(function () {

    Route::get('/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index']);

    Route::get('users', [App\Http\Controllers\Admin\UserController::class, 'index']);
    Route::get('user/{user_id}', [App\Http\Controllers\Admin\UserController::class, 'edit']);
    Route::put('update-user/{user_id}', [App\Http\Controllers\Admin\UserController::class, 'update']);

    Route::get('report', [App\Http\Controllers\Admin\ReportController::class, 'index']);
    Route::get('filter-periode', [App\Http\Controllers\Admin\ReportController::class, 'filter_periode']);
    Route::post('filter-tanggal', [App\Http\Controllers\Admin\ReportController::class, 'filter_tanggal']);
    Route::get('edit-report/{report_id}', [App\Http\Controllers\Admin\ReportController::class, 'edit']);
    Route::put('update-report/{report_id}', [App\Http\Controllers\Admin\ReportController::class, 'update']);
    Route::get('delete-report/{report_id}', [App\Http\Controllers\Admin\ReportController::class, 'delete']);

    Route::get('report_target', [App\Http\Controllers\Admin\ReportTargetController::class, 'index']);
    Route::post('filter-periode', [App\Http\Controllers\Admin\ReportTargetController::class, 'filter_periode']);

    Route::get('city', [App\Http\Controllers\Admin\CityController::class, 'index']);
    Route::post('add-city', [App\Http\Controllers\Admin\CityController::class, 'store']);
    Route::get('edit-city/{city_id}', [App\Http\Controllers\Admin\CityController::class, 'edit']);
    Route::put('update-city/{city_id}', [App\Http\Controllers\Admin\CityController::class, 'update']);
    Route::get('delete-city/{city_id}', [App\Http\Controllers\Admin\CityController::class, 'delete']);

    Route::get('institution', [App\Http\Controllers\Admin\InstitutionController::class, 'index']);
    Route::post('add-institution', [App\Http\Controllers\Admin\InstitutionController::class, 'store']);
    Route::get('edit-institution/{institution_id}', [App\Http\Controllers\Admin\InstitutionController::class, 'edit']);
    Route::put('update-institution/{institution_id}', [App\Http\Controllers\Admin\InstitutionController::class, 'update']);
    Route::get('delete-institution/{institution_id}', [App\Http\Controllers\Admin\InstitutionController::class, 'delete']);

    Route::get('faculty', [App\Http\Controllers\Admin\FacultyController::class, 'index']);
    Route::post('add-faculty', [App\Http\Controllers\Admin\FacultyController::class, 'store']);
    Route::get('edit-faculty/{faculty_id}', [App\Http\Controllers\Admin\FacultyController::class, 'edit']);
    Route::put('update-faculty/{faculty_id}', [App\Http\Controllers\Admin\FacultyController::class, 'update']);
    Route::get('delete-faculty/{faculty_id}', [App\Http\Controllers\Admin\FacultyController::class, 'delete']);

    Route::get('material', [App\Http\Controllers\Admin\MaterialController::class, 'index']);
    Route::post('add-material', [App\Http\Controllers\Admin\MaterialController::class, 'store']);
    Route::get('edit-material/{material_id}', [App\Http\Controllers\Admin\MaterialController::class, 'edit']);
    Route::put('update-material/{material_id}', [App\Http\Controllers\Admin\MaterialController::class, 'update']);
    Route::get('delete-material/{material_id}', [App\Http\Controllers\Admin\MaterialController::class, 'delete']);

    Route::get('discipleship_target', [App\Http\Controllers\Admin\DiscipleshipTargetController::class, 'index']);
    Route::post('add-discipleship_target', [App\Http\Controllers\Admin\DiscipleshipTargetController::class, 'store']);
    Route::get('edit-discipleship_target/{discipleship_target_id}', [App\Http\Controllers\Admin\DiscipleshipTargetController::class, 'edit']);
    Route::put('update-discipleship_target/{discipleship_target_id}', [App\Http\Controllers\Admin\DiscipleshipTargetController::class, 'update']);
    Route::get('delete-discipleship_target/{discipleship_target_id}', [App\Http\Controllers\Admin\DiscipleshipTargetController::class, 'delete']);
});
