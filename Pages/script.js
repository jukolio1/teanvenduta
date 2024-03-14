let captchaText = '';

// Define un array con 5 ejemplos fijos de CAPTCHA
const fixedCaptchas = ['123ABC', '456DEF', '789GHI', '012JKL', '345MNO'];

function generateCaptcha() {
    // Selecciona un CAPTCHA fijo aleatorio del array
    captchaText = fixedCaptchas[Math.floor(Math.random() * fixedCaptchas.length)];
    drawCaptcha();
}

function drawCaptcha() {
    const canvas = document.getElementById('captcha');
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '30px Arial';
        ctx.fillText(captchaText, 10, 50);
    }
}

function refreshCaptcha() {
    generateCaptcha();
}

function submitCaptcha() {
    const userInput = document.getElementById('textBox').value;
    if (userInput === captchaText) {
        console.log('CAPTCHA correcto');
        document.getElementById('output').textContent = 'CAPTCHA correcto';
    } else {
        console.log('CAPTCHA incorrecto');
        document.getElementById('output').textContent = 'CAPTCHA incorrecto';
    }
}

// Genera el CAPTCHA al cargar la página
window.onload = generateCaptcha;

// Función para mostrar usuarios en la lista
// Función para mostrar usuarios en la lista con botón de eliminar
function displayUsers() {
    // Obtener la lista de usuarios de localStorage
    var users = JSON.parse(localStorage.getItem('users')) || [];

    // Obtener el elemento de la lista donde se mostrarán los usuarios
    var userList = document.getElementById('userList');

    // Limpiar la lista antes de agregar nuevos elementos
    userList.innerHTML = '';

    // Iterar sobre cada usuario y agregarlo a la lista con botón de eliminar
    users.forEach(function(user, index) {
        var listItem = document.createElement('li');
        listItem.textContent = user.username + '-------------------' + user.password;

        // Crear botón de eliminar
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', function() {
            // Eliminar usuario de la lista y actualizar localStorage
            users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(users));

            // Actualizar la lista en la página
            displayUsers();
        });

        listItem.appendChild(deleteButton);
        userList.appendChild(listItem);
    });
}

// Llamar a la función al cargar la página
window.addEventListener('DOMContentLoaded', displayUsers);

