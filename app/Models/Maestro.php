<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Maestro extends Model
{
    use HasFactory;

    protected $fillable = [
        'maestrosName',
        'status',
        'descripcion',
        'calificacion',
        'FK_Usuario',
    ];

    /**
     * Get the user that owns the maestro record.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'FK_Usuario');
    }
}