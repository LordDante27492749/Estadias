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
        Schema::create('maestros', function (Blueprint $table) {
            $table->id('PK_Maestro');
            $table->string('maestrosName')->nullable();
            $table->enum('status', ['activo', 'retirado']);
            $table->text('descripcion')->nullable();
            $table->integer('calificacion')->nullable();
            $table->foreignId('FK_Usuario')->nullable()->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maestros');
    }
};
