<?php
require_once 'conn/conn.php';

// Script para crear usuario admin (ejecutar una sola vez)
try {
    // Hashear la contraseña "root"
    $hashedPassword = password_hash('root', PASSWORD_DEFAULT);
    
    // Verificar si ya existe el usuario admin
    $checkStmt = $pdo->prepare("SELECT id FROM usuarios WHERE username = ?");
    $checkStmt->execute(['admin']);
    $existingUser = $checkStmt->fetch();
    
    if ($existingUser) {
        echo "El usuario 'admin' ya existe en la base de datos.";
    } else {
        // Insertar el nuevo usuario admin
        $stmt = $pdo->prepare("INSERT INTO usuarios (username, password, Nombre, rol) VALUES (?, ?, ?, ?)");
        $stmt->execute(['admin', $hashedPassword, 'Administrador', 'admin']);
        
        echo "Usuario admin creado exitosamente:<br>";
        echo "Usuario: admin<br>";
        echo "Contraseña: root<br>";
        echo "Rol: admin<br><br>";
        echo "Hash generado: " . $hashedPassword;
    }
    
    // Mostrar todos los usuarios existentes
    echo "<br><br><strong>Usuarios en la base de datos:</strong><br>";
    $allUsers = $pdo->query("SELECT id, username, Nombre, rol FROM usuarios");
    while ($user = $allUsers->fetch()) {
        echo "ID: {$user['id']} - Usuario: {$user['username']} - Nombre: {$user['Nombre']} - Rol: {$user['rol']}<br>";
    }
    
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

// ¡IMPORTANTE! Elimina o comenta este archivo después de usarlo por seguridad
echo "<br><br><strong style='color: red;'>¡IMPORTANTE! Elimina este archivo después de crear el usuario por seguridad.</strong>";
?>