#!/usr/bin/python3
import os
import sqlite3
import hashlib
from flask import Flask, request, redirect, render_template, session
from pathlib import Path

app = Flask(__name__, template_folder='/home/miguel/Desktop/Hotel-VII/templates')
app.secret_key = 'tu_clave_secreta_aqui'

def create_table():
    script_dir = Path(__file__).parent
    # esto especifica la ubicación y nombre de tu archivo SQLite3 y soluciona los problemas de windows chicas
    ruta_archivo = script_dir / "hotel_reserva.db"

    conn = sqlite3.connect(ruta_archivo)
    cur = conn.cursor()

    # Crear tabla de usuarios
    cur.execute('''
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )''')

    # Crear tabla de reservas
    cur.execute('''
    CREATE TABLE IF NOT EXISTS reserva (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        email TEXT NOT NULL,
        contacto TEXT NOT NULL,
        tipo_habitacion TEXT NOT NULL,
        fecha_entrada DATE NOT NULL,
        fecha_salida DATE NOT NULL,
        can_may INTEGER NOT NULL,
        can_men INTEGER NOT NULL
    )''')

    conn.commit()
    conn.close()

@app.route('/')
def index():
    return redirect('/login')

@app.route('/registro', methods=['GET', 'POST'])
def registro():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        if password != confirm_password:
            return 'Las contraseñas no coinciden'

        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        conn = sqlite3.connect('hotel_reserva.db')
        cur = conn.cursor()
        cur.execute('SELECT id FROM usuarios WHERE username = ?', (username,))
        if cur.fetchone():
            conn.close()
            return 'El usuario ya existe, por favor inicia sesión'

        try:
            cur.execute('INSERT INTO usuarios (username, password) VALUES (?, ?)', (username, hashed_password))
            conn.commit()
        except sqlite3.IntegrityError:
            return 'El usuario ya existe'
        finally:
            conn.close()

        return redirect('/login')
    else:
        return render_template('registro.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        conn = sqlite3.connect('hotel_reserva.db')
        cur = conn.cursor()

        cur.execute('SELECT id FROM usuarios WHERE username = ? AND password = ?', (username, hashed_password))
        user_id = cur.fetchone()
        conn.close()

        if user_id:
            session['user_id'] = user_id[0]  # Guardar el ID del usuario en la sesión
            return redirect('/reserva') 
        else:
            return 'Usuario o contraseña incorrecta'
    else:
        return render_template('login.html')

@app.route('/reserva')
def reserva():
    return render_template('reserva.html')

@app.route('/submit_reserva', methods=['POST'])
def submit_reserva():
    # Recopilación de datos del formulario
    nombre = request.form['nombre']
    apellido = request.form['apellido']
    email = request.form['email']
    contacto = request.form['contacto']
    tipo_habitacion = request.form['tipo_habitacion']  
    if not tipo_habitacion:
        return 'Error: Campo tipo_habitacion no proporcionado.'
    fecha_entrada = request.form['fecha_entrada']
    fecha_salida = request.form['fecha_salida']
    can_may = request.form['can_may']
    can_men = request.form['can_men']

    # Conexión a la base de datos y ejecución de la consulta
    conn = sqlite3.connect('hotel_reserva.db')
    cur = conn.cursor()

    cur.execute('''
    INSERT INTO reserva (nombre, apellido, email, contacto, tipo_habitacion, fecha_entrada, fecha_salida, can_may, can_men)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (nombre, apellido, email, contacto, tipo_habitacion, fecha_entrada, fecha_salida, can_may, can_men))

    conn.commit()
    conn.close()

    return 'Reserva realizada con éxito'

if __name__ == '__main__':
    create_table()
    app.run(debug=True)
