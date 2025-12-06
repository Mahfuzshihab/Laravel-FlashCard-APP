<?php

use App\Http\Controllers\Api\NameColorController;
use App\Http\Controllers\Api\FavouriteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('name-colors', NameColorController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/savefavword', [FavouriteController::class, 'saveFavourite']);
Route::post('/deletefavword', [FavouriteController::class, 'removeFavourite']);
