<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Maestro;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'lastName' => 'required|string|max:100',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'rol' => ['required', Rule::in(['alumno', 'aspirante', 'maestro', 'administrador'])],
            'NumeroTelefonico' => 'required|string|max:15',
            'FechaNacimiento' => 'required|date',
            'CodigoPostal' => 'required|string|max:10',

            // Teacher specific fields
            'maestrosName' => 'required_if:rol,maestro|string|max:255',
            'status' => ['required_if:rol,maestro', Rule::in(['activo', 'retirado'])],
            'descripcion' => 'nullable|string',
            'calificacion' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'rol' => $request->rol,
            'NumeroTelefonico' => $request->NumeroTelefonico,
            'FechaNacimiento' => $request->FechaNacimiento,
            'CodigoPostal' => $request->CodigoPostal,
        ]);

        if ($request->rol === 'maestro') {
            Maestro::create([
                'maestrosName' => $request->maestrosName,
                'status' => $request->status,
                'descripcion' => $request->descripcion,
                'calificacion' => $request->calificacion,
                'FK_Usuario' => $user->id,
            ]);
        }

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ], 201);
    }
}