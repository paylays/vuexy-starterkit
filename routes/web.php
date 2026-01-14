<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route spesifik harus didefinisikan secara eksplisit
Route::get('/login', function () {
    // Pastikan path 'login' sesuai dengan lokasi file: resources/js/pages/login.vue
    // Jika file ada di 'pages/login.vue', tulis 'login' saja (bukan 'auth/login')
    return Inertia::render('auth/login'); 
})->name('login');

Route::get('/dashboard', function() {
    return Inertia::render('index');
})->name('dashboard');

Route::get('/second-page', function() {
    return Inertia::render('second-page');
})->name('second-page');

Route::get('/third-page', function() {
    return Inertia::render('third-page');
})->name('third-page');

// Route Fallback (Opsional, untuk menangani 404)
Route::fallback(function () {
    return Inertia::render('[...error]'); 
});
