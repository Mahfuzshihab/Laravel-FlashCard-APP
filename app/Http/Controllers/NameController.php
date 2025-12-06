<?php
namespace App\Http\Controllers;

use App\Models\NameColor;
use Illuminate\Http\Request;

class NameController extends Controller
{
    public function index()
    {
        // Fetch all name and color data
        $nameColors = NameColor::all();
        
        // Return the 'name' view with the name and color data
        return view('name', ['nameColors' => $nameColors]);
    }

    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:50',
        ]);

        // Create a new NameColor record using the validated data
        NameColor::create($validated);

        // Redirect to the name index route with a success message
        return redirect()->route('name.index')->with('success', 'Name and color added successfully!');
    }

    public function edit($id)
    {
        // Find the NameColor record by ID or fail with a 404 error
        $nameColor = NameColor::findOrFail($id);

        // Return the 'name_edit' view with the existing name and color data
        return view('name_edit', ['nameColor' => $nameColor]);
    }

    public function update(Request $request, $id)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:50',
        ]);

        // Find the NameColor record by ID or fail with a 404 error
        $nameColor = NameColor::findOrFail($id);

        // Update the NameColor record with the validated data
        $nameColor->update($validated);

        // Redirect to the name index route with a success message
        return redirect()->route('name.index')->with('success', 'Name and color updated successfully!');
    }


    public function destroy($id)
    {
        $nameColor = NameColor::findOrFail($id);
        $nameColor->delete();
    
        return redirect()->route('name.index')->with('success', 'Entry deleted successfully.');
    }
    
    
    


}
