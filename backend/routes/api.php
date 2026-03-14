<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\AdminAuthController;

Route::get('/blogs', [BlogController::class, 'indexPublic']);
Route::get('/blog/{slug}', [BlogController::class, 'showBySlug']);

Route::post('/admin/login', [AdminAuthController::class, 'login']);

Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('/blogs', [BlogController::class, 'indexAdmin']);
    Route::post('/blog', [BlogController::class, 'store']);
    Route::put('/blog/{id}', [BlogController::class, 'update']);
    // Allow POST for updates to ensure file uploads work reliably from SPAs
    Route::post('/blog/{id}', [BlogController::class, 'update']);
    Route::delete('/blog/{id}', [BlogController::class, 'destroy']);
});
