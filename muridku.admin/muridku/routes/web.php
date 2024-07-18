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
    Route::get('add-report', [App\Http\Controllers\Admin\ReportController::class, 'create']);
    Route::post('add-report', [App\Http\Controllers\Admin\ReportController::class, 'store']);
    Route::get('edit-report/{report_id}', [App\Http\Controllers\Admin\ReportController::class, 'edit']);
    Route::put('update-report/{report_id}', [App\Http\Controllers\Admin\ReportController::class, 'update']);
    Route::get('delete-report/{report_id}', [App\Http\Controllers\Admin\ReportController::class, 'delete']);

    Route::get('city', [App\Http\Controllers\Admin\CityController::class, 'index']);
    Route::post('add-city', [App\Http\Controllers\Admin\CityController::class, 'store']);
    Route::get('edit-city/{city_id}', [App\Http\Controllers\Admin\CityController::class, 'edit']);
    Route::put('update-city/{city_id}', [App\Http\Controllers\Admin\CityController::class, 'update']);
    Route::get('delete-city/{city_id}', [App\Http\Controllers\Admin\CityController::class, 'delete']);
});
