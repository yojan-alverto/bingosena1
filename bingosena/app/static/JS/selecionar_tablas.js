document.addEventListener('DOMContentLoaded', function() {
    // Variables de estado
    let selectedTablas = [];
    let selectedColor = 'red';
    let selectedIcon = 'star';
    const maxTablas = 8;
    
    // Elementos del DOM
    const tablasGrid = document.getElementById('tablasGrid');
    const selectedCount = document.getElementById('selectedCount');
    const selectAllBtn = document.getElementById('selectAllBtn');
    const startGameBtn = document.getElementById('startGameBtn');
    const colorOptions = document.querySelectorAll('.color-option');
    const iconOptions = document.querySelectorAll('.icon-option');
    const previewGrid = document.getElementById('previewGrid');
    const previewColor = document.getElementById('previewColor');
    const previewIcon = document.getElementById('previewIcon');
    
    // Generar 20 tablas de bingo
    function generateTablas() {
        tablasGrid.innerHTML = '';
        
        for (let i = 1; i <= 20; i++) {
            const tablaItem = document.createElement('div');
            tablaItem.className = 'tabla-item';
            tablaItem.dataset.id = i;
            
            // Generar números aleatorios para esta tabla (simulación)
            const numbers = generateBingoNumbers();
            
            tablaItem.innerHTML = `
                <div class="tabla-number">${i}</div>
                <div class="tabla-info">Tabla de Bingo</div>
                <div class="tabla-info">Números: ${numbers.slice(0, 5).join(', ')}...</div>
            `;
            
            tablaItem.addEventListener('click', () => toggleTablaSelection(i));
            tablasGrid.appendChild(tablaItem);
        }
    }
    
    // Generar números de bingo aleatorios
    function generateBingoNumbers() {
        const numbers = [];
        for (let i = 0; i < 24; i++) {
            numbers.push(Math.floor(Math.random() * 90) + 1);
        }
        return numbers;
    }
    
    // Seleccionar/deseleccionar tabla
    function toggleTablaSelection(id) {
        const index = selectedTablas.indexOf(id);
        const tablaItem = document.querySelector(`.tabla-item[data-id="${id}"]`);
        
        if (index === -1) {
            // Si no está seleccionada y no hemos alcanzado el máximo
            if (selectedTablas.length < maxTablas) {
                selectedTablas.push(id);
                tablaItem.classList.add('selected');
            }
        } else {
            // Si ya está seleccionada, la quitamos
            selectedTablas.splice(index, 1);
            tablaItem.classList.remove('selected');
        }
        
        updateSelectionCount();
        updateStartButton();
    }
    
    // Actualizar contador de selección
    function updateSelectionCount() {
        selectedCount.textContent = selectedTablas.length;
        
        // Cambiar texto del botón de seleccionar todas
        if (selectedTablas.length === 20) {
            selectAllBtn.innerHTML = '<i class="bi bi-x-circle"></i> Deseleccionar todas';
        } else {
            selectAllBtn.innerHTML = '<i class="bi bi-check-all"></i> Seleccionar todas';
        }
    }
    
    // Habilitar/deshabilitar botón de inicio
    function updateStartButton() {
        startGameBtn.disabled = selectedTablas.length === 0;
    }
    
    // Seleccionar todas las tablas
    selectAllBtn.addEventListener('click', function() {
        if (selectedTablas.length === 20) {
            // Deseleccionar todas
            selectedTablas = [];
            document.querySelectorAll('.tabla-item').forEach(item => {
                item.classList.remove('selected');
            });
        } else {
            // Seleccionar todas
            selectedTablas = Array.from({length: 20}, (_, i) => i + 1);
            document.querySelectorAll('.tabla-item').forEach(item => {
                item.classList.add('selected');
            });
        }
        
        updateSelectionCount();
        updateStartButton();
    });
    
    // Seleccionar color
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            selectedColor = this.dataset.color;
            updatePreview();
        });
    });
    
    // Seleccionar icono
    iconOptions.forEach(option => {
        option.addEventListener('click', function() {
            iconOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            selectedIcon = this.dataset.icon;
            updatePreview();
        });
    });
    
    // Generar vista previa de tabla de bingo
    function generatePreview() {
        previewGrid.innerHTML = '';
        
        // Generar números para la vista previa
        const numbers = generateBingoNumbers();
        
        // Crear celdas (5x5)
        for (let i = 0; i < 25; i++) {
            const cell = document.createElement('div');
            cell.className = 'preview-cell';
            
            // La celda del centro es "FREE"
            if (i === 12) {
                cell.classList.add('free');
                cell.textContent = 'FREE';
            } else {
                cell.textContent = numbers[i] || i + 1;
            }
            
            previewGrid.appendChild(cell);
        }
    }
    
    // Actualizar vista previa
    function updatePreview() {
        // Actualizar información de color e icono
        const colorNames = {
            'red': 'Rojo',
            'blue': 'Azul',
            'yellow': 'Amarillo',
            'green': 'Verde'
        };
        
        const iconNames = {
            'star': 'Estrella',
            'dino': 'Dinosaurio',
            'ghost': 'Fantasma',
            'diamond': 'Diamante'
        };
        
        previewColor.textContent = colorNames[selectedColor];
        previewIcon.textContent = iconNames[selectedIcon];
    }
    
    // Iniciar juego
    startGameBtn.addEventListener('click', function() {
        // Guardar selección en localStorage o enviar al servidor
        const gameSettings = {
            tablas: selectedTablas,
            color: selectedColor,
            icon: selectedIcon
        };
        
        localStorage.setItem('bingoSettings', JSON.stringify(gameSettings));
        
        // Redirigir al juego (simulado)
        alert(`¡Juego iniciado con ${selectedTablas.length} tablas, color ${selectedColor} e icono ${selectedIcon}!`);
        // window.location.href = "/juego/";
    });
    
    // Inicializar
    generateTablas();
    generatePreview();
    updatePreview();
});