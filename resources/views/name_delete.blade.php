<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Delete Name</title>
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>

<body>
  <main class="container">
    <h1>Delete Name and Color</h1>

    <form method="POST" action="{{ route('name.destroy', $nameColor->id) }}" style="display:inline;">
    @csrf
    @method('DELETE')
    <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this item?');">
        Delete
    </button>
</form>

  </main>
</body>

</html>