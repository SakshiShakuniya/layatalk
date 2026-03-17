<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\AdminPageController;

// 1. Temporary route to clear server cache (Visit layatalk.com/clear)
Route::get('/clear', function() {
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    Artisan::call('cache:clear');
    Artisan::call('view:clear');
    try {
        Artisan::call('storage:link');
        return "All caches cleared and storage linked successfully! <br><br> <a href='/'>Go to Home</a>";
    } catch (\Exception $e) {
        return "All caches cleared, but storage link failed: " . $e->getMessage() . " <br><br> <a href='/'>Go to Home</a>";
    }
});

// 2. Main route to serve Next.js Frontend from public_html
Route::get('/', function () {
    // This tells Laravel to look in the exact same folder where index.php is running
    $path = $_SERVER['DOCUMENT_ROOT'] . '/index.html';
    
    if (File::exists($path)) {
        return File::get($path);
    }

    // Fallback if not found in DOCUMENT_ROOT
    $fallbackPath = public_path('index.html');
    if (File::exists($fallbackPath)) {
        return File::get($fallbackPath);
    }

    return "Next.js index.html not found. <br><br> 
            Please ensure index.html is uploaded to: <br> 
            <b>$path</b>";
});

Route::prefix('admin')->group(function () {
    Route::get('/login', [AdminPageController::class, 'login'])->name('admin.login');
    Route::get('/dashboard', [AdminPageController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/blogs', [AdminPageController::class, 'blogs'])->name('admin.blogs');
    Route::get('/blogs/create', [AdminPageController::class, 'createBlog'])->name('admin.blogs.create');
    Route::get('/blogs/{id}/edit', [AdminPageController::class, 'editBlog'])->name('admin.blogs.edit');
});

// Serve files from the public storage disk
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

// Fallback for Next.js client-side routing
Route::fallback(function () {
    $path = $_SERVER['DOCUMENT_ROOT'] . '/index.html';
    if (File::exists($path)) {
        return File::get($path);
    }
    abort(404);
});
