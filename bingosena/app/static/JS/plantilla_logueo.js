document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');
    const authTabs = document.querySelectorAll('.auth-tab');
    const switchLinks = document.querySelectorAll('.switch-form');
    
    // Función para cambiar entre formularios
    function switchForm(formType) {
        // Actualizar pestañas activas
        authTabs.forEach(tab => {
            if (tab.dataset.form === formType) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Animación de transición entre formularios
        if (formType === 'login') {
            registerForm.classList.remove('active');
            setTimeout(() => {
                loginForm.classList.add('active');
            }, 300);
        } else {
            loginForm.classList.remove('active');
            setTimeout(() => {
                registerForm.classList.add('active');
            }, 300);
        }
    }
    
    // Event listeners para las pestañas
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            switchForm(this.dataset.form);
        });
    });
    
    // Event listeners para los enlaces de cambio
    switchLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            switchForm(this.dataset.form);
        });
    });
    
    // Validación de formularios
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aquí iría la lógica de autenticación
            alert('Iniciando sesión...');
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aquí iría la lógica de registro
            const password = this.querySelector('input[type="password"]').value;
            const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
            
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }
            
            alert('Creando cuenta...');
        });
    }
});