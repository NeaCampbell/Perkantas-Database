<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::prefix('admin')->middleware(['auth', 'isAdmin'])->group(function () {
    
    Route::get('/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index']);

    Route::get('report', [App\Http\Controllers\Admin\ReportController::class, 'index']);
    Route::get('add-report', [App\Http\Controllers\Admin\ReportController::class, 'create']);
    Route::post('add-report', [App\Http\Controllers\Admin\ReportController::class, 'store']);
    Route::get('edit-report/{report_id}', [App\Http\Controllers\Admin\ReportController::class, 'edit']);
    Route::put('update-report/{report_id}', [App\Http\Controllers\Admin\ReportController::class, 'update']);
    Route::get('delete-report/{report_id}', [App\Http\Controllers\Admin\ReportController::class, 'delete']);

    Route::get('users', [App\Http\Controllers\Admin\UserController::class, 'index']);
    Route::get('user/{user_id}', [App\Http\Controllers\Admin\UserController::class, 'edit']);
    Route::put('update-user/{user_id}', [App\Http\Controllers\Admin\UserController::class, 'update']);
});
