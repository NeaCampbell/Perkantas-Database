<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\MemberController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [UserController::class, 'Index']);
Route::get('/login', [UserController::class, 'Login']);
Route::post('/login-submit', [UserController::class, 'SubmitLogin']);
Route::get('/logout', [UserController::class, 'Logout']);

Route::get('/dashboard', [DashboardController::class, 'Index']);

Route::get('/city', [CityController::class, 'Index']);
Route::get('/city/getcities', [CityController::class, 'GetIndexData']);
Route::get('/city/getcities-ref', [CityController::class, 'LazyGetActiveData']);
Route::get('/city/add', [CityController::class, 'Create']);
Route::post('/city/save', [CityController::class, 'Store']);
Route::get('/city/edit', [CityController::class, 'Edit']);
Route::patch('/city/update', [CityController::class, 'Update']);
Route::delete('/city/delete', [CityController::class, 'Destroy']);

Route::get('/institution', [InstitutionController::class, 'Index']);
Route::get('/institution/getinstitutions', [InstitutionController::class, 'GetIndexData']);
Route::get('/institution/getinstitutions-ref', [InstitutionController::class, 'LazyGetActiveData']);
Route::get('/institution/getinstitutions-fac-ref', [InstitutionController::class, 'LazyGetActiveDataFaculty']);
Route::get('/institution/add', [InstitutionController::class, 'Create']);
Route::post('/institution/save', [InstitutionController::class, 'Store']);
Route::get('/institution/edit', [InstitutionController::class, 'Edit']);
Route::patch('/institution/update', [InstitutionController::class, 'Update']);
Route::delete('/institution/delete', [InstitutionController::class, 'Destroy']);

Route::get('/faculty', [FacultyController::class, 'Index']);
Route::get('/faculty/getfaculties', [FacultyController::class, 'GetIndexData']);
Route::get('/faculty/getfaculties-ref', [FacultyController::class, 'LazyGetActiveData']);
Route::get('/faculty/add', [FacultyController::class, 'Create']);
Route::post('/faculty/save', [FacultyController::class, 'Store']);
Route::get('/faculty/edit', [FacultyController::class, 'Edit']);
Route::patch('/faculty/update', [FacultyController::class, 'Update']);
Route::delete('/faculty/delete', [FacultyController::class, 'Destroy']);

Route::get('/member', [MemberController::class, 'Index']);
Route::get('/member/getmembers', [MemberController::class, 'GetIndexData']);
Route::get('/member/getmembers-ref', [MemberController::class, 'LazyGetActiveData']);
Route::get('/member/add', [MemberController::class, 'Create']);
Route::post('/member/save', [MemberController::class, 'Store']);
Route::get('/member/edit', [MemberController::class, 'Edit']);
Route::patch('/member/update', [MemberController::class, 'Update']);
Route::delete('/member/delete', [MemberController::class, 'Destroy']);
