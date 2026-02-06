<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('lastName', 100);
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('rol', ['alumno', 'aspirante', 'maestro', 'administrador']);
            $table->string('NumeroTelefonico', 15);
            $table->date('FechaNacimiento');
            $table->string('CodigoPostal', 10);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
