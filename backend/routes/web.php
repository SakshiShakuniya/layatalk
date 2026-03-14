<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\AdminPageController;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('admin')->group(function () {
    Route::get('/login', [AdminPageController::class, 'login'])->name('admin.login');
    Route::get('/dashboard', [AdminPageController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/blogs', [AdminPageController::class, 'blogs'])->name('admin.blogs');
    Route::get('/blogs/create', [AdminPageController::class, 'createBlog'])->name('admin.blogs.create');
    Route::get('/blogs/{id}/edit', [AdminPageController::class, 'editBlog'])->name('admin.blogs.edit');
});

// Serve files from the public storage disk even if the storage symlink is missing.
Route::get('/storage/{path}', function (string $path) {
    $path = ltrim($path, '/');
    $filePath = storage_path('app/public/' . $path);
    if (!file_exists($filePath)) {
        abort(404);
    }
    $mime = @mime_content_type($filePath) ?: 'application/octet-stream';
    return response()->file($filePath, [
        'Content-Type' => $mime,
        'Cache-Control' => 'public, max-age=31536000',
    ]);
})->where('path', '.*');
