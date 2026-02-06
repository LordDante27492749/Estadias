import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        password_confirmation: '',
        rol: 'alumno',
        NumeroTelefonico: '',
        FechaNacimiento: '',
        CodigoPostal: '',
        maestrosName: '',
        status: 'activo',
        descripcion: '',
        calificacion: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:8000/api/register', formData);
            setSuccessMessage(response.data.message);
            // Optionally reset form
            setFormData({
                name: '',
                lastName: '',
                email: '',
                password: '',
                password_confirmation: '',
                rol: 'alumno',
                NumeroTelefonico: '',
                FechaNacimiento: '',
                CodigoPostal: '',
                maestrosName: '',
                status: 'activo',
                descripcion: '',
                calificacion: '',
            });
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data);
            } else {
                setErrors({ general: 'An unexpected error occurred.' });
            }
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                {/* General User Fields */}
                <div style={{ marginBottom: '10px' }}>
                    <label>Nombre:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}/>
                    {errors.name && <p style={{ color: 'red' }}>{errors.name[0]}</p>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Apellido:</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}/>
                    {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName[0]}</p>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}/>
                    {errors.email && <p style={{ color: 'red' }}>{errors.email[0]}</p>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Contraseña:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}/>
                    {errors.password && <p style={{ color: 'red' }}>{errors.password[0]}</p>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Confirmar Contraseña:</label>
                    <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}/>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Número de Teléfono:</label>
                    <input type="text" name="NumeroTelefonico" value={formData.NumeroTelefonico} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}/>
                    {errors.NumeroTelefonico && <p style={{ color: 'red' }}>{errors.NumeroTelefonico[0]}</p>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Fecha de Nacimiento:</label>
                    <input type="date" name="FechaNacimiento" value={formData.FechaNacimiento} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}/>
                    {errors.FechaNacimiento && <p style={{ color: 'red' }}>{errors.FechaNacimiento[0]}</p>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Código Postal:</label>
                    <input type="text" name="CodigoPostal" value={formData.CodigoPostal} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}/>
                    {errors.CodigoPostal && <p style={{ color: 'red' }}>{errors.CodigoPostal[0]}</p>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Rol:</label>
                    <select name="rol" value={formData.rol} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
                        <option value="alumno">Alumno</option>
                        <option value="aspirante">Aspirante</option>
                        <option value="maestro">Maestro</option>
                        <option value="administrador">Administrador</option>
                    </select>
                </div>

                {/* Teacher Specific Fields */}
                {formData.rol === 'maestro' && (
                    <>
                        <h3>Información de Maestro</h3>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Nombre de Maestro:</label>
                            <input type="text" name="maestrosName" value={formData.maestrosName} onChange={handleChange} style={{ width: '100%', padding: '8px' }}/>
                            {errors.maestrosName && <p style={{ color: 'red' }}>{errors.maestrosName[0]}</p>}
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Status:</label>
                            <select name="status" value={formData.status} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
                                <option value="activo">Activo</option>
                                <option value="retirado">Retirado</option>
                            </select>
                            {errors.status && <p style={{ color: 'red' }}>{errors.status[0]}</p>}
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Descripción:</label>
                            <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} style={{ width: '100%', padding: '8px' }}/>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Calificación:</label>
                            <input type="number" name="calificacion" value={formData.calificacion} onChange={handleChange} style={{ width: '100%', padding: '8px' }}/>
                        </div>
                    </>
                )}

                <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Registrar</button>

                {errors.general && <p style={{ color: 'red', marginTop: '10px' }}>{errors.general}</p>}
                {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
            </form>
        </div>
    );
};

export default Register;
