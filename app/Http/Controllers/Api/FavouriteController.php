<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favourite;
use Illuminate\Http\Request;

class FavouriteController extends Controller
{
    public function saveFavourite(Request $request)
    {
        // return $request;
        $data = $request->validate([
            'wordFi' => 'required',
            'wordEn' => 'required',
            'exampleFi' => 'required',
            'exampleEn' => 'required',
        ]);
        // return $data;
        $insert = Favourite::create($data);
        if ($insert) {
            return "SUccess, Saved";
        } else {
            return 'Failed successfully';
        }
    }
    public function removeFavourite(Request $request)
    {
        // return $request;
        // return "Gonna delete";
        $data = $request->validate([
            'wordFi' => 'required',
            'wordEn' => 'required',
            'exampleFi' => 'required',
            'exampleEn' => 'required',
        ]);
        // return $data;
        $delete = Favourite::where('wordFi', $data['wordFi'])->where('wordEn', $data['wordEn'])->where('exampleFi', $data['exampleFi'])->where('exampleEn', $data['exampleEn'])->delete();
        if ($delete) {
            return "Deleted successfully";
        } else {
            return 'Failed successfully';
        }
    }
}
