// Работа двери
    
        window.addEventListener('load', () => {
            // Находим все кнопки дверей по классу
            const buttons = document.querySelectorAll('.door-button');
    
            buttons.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Если кнопка уже нажата, ничего не делаем
                    if (this.getAttribute('data-active') === 'true') return;
                    this.setAttribute('data-active', 'true');
    
                    // Смена цвета кнопки (визуальный отклик)
                    this.setAttribute('material', 'color', '#0f0');
    
                    // Получаем ID дверей и ссылку из атрибутов нажатой кнопки
                    const leftId = this.getAttribute('data-left');
                    const rightId = this.getAttribute('data-right');
                    const targetUrl = this.getAttribute('data-url');
    
                    openSpecificDoors(leftId, rightId, targetUrl);
                });
            });
    
            function openSpecificDoors(leftId, rightId, url) {
                const leftDoor = document.getElementById(leftId);
                const rightDoor = document.getElementById(rightId);
    
                if (leftDoor && rightDoor) {
                    // Запускаем анимацию разъезда
                    leftDoor.setAttribute('animation', 'property: position; to: -2.25 -1 0.02; dur: 2000; easing: easeInQuad');
                    rightDoor.setAttribute('animation', 'property: position; to: 2.25 -1 0.02; dur: 2000; easing: easeInQuad');
    
                    // Переход по ссылке
                    setTimeout(() => {
                        window.location.href = url + "?from=" + window.location.pathname.split('/').pop();
                    }, 2500);
                }
            }
        });
    

   // Ограничитель территории камеры
    
        AFRAME.registerComponent('circular-boundary', {
  schema: {
    radius: {type: 'number', default: 12.5}
  },

  tick: function () {
    const cameraEl = this.el.querySelector('[camera]');
    if (!cameraEl) return;

    // Получаем мировые координаты камеры (где она реально в пространстве)
    const worldPos = new THREE.Vector3();
    cameraEl.object3D.getWorldPosition(worldPos);

    // Считаем расстояние от центра пола (0,0) до камеры по горизонтали
    const dist = Math.sqrt(worldPos.x * worldPos.x + worldPos.z * worldPos.z);

    if (dist > this.data.radius) {
      // Вычисляем, насколько камера вылетела за радиус
      const ratio = this.data.radius / dist;
      
      // Находим, в какой позиции должен стоять rig, чтобы камера вернулась в круг
      // Это хитрая математика компенсации смещения камеры внутри rig
      const newX = worldPos.x * ratio;
      const newZ = worldPos.z * ratio;
      
      const diffX = newX - worldPos.x;
      const diffZ = newZ - worldPos.z;

      // Сдвигаем rig так, чтобы камера оказалась на границе
      this.el.object3D.position.x += diffX;
      this.el.object3D.position.z += diffZ;
    }
  }
});
      


// Ещё какой-то блок, потом разберу о чём он

    window.addEventListener('load', () => {
    const rig = document.getElementById('rig');
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('from');

    // Таблица координат для каждой точки входа
    const spawnPoints = {
        'index.html': { pos: '0 0 -11', rot: '0 180 0' },   // Выход из лифта (прямо)
        'default': { pos: '0 0 -11', rot: '0 180 0' },     // По умолчанию (в центре)
        'lab.html': { pos: '10 0 0', rot: '0 90 0' },   // Выход из лабы (справа)
    };

    const point = spawnPoints[source] || spawnPoints['default'];

    // Устанавливаем позицию
    rig.setAttribute('position', point.pos);
    
    // Устанавливаем поворот (чтобы игрок смотрел ВНУТРЬ комнаты, а не в стену)
    rig.setAttribute('rotation', point.rot);
    
    console.log("Игрок появился в точке:", source || "стандарт");
});


    // И ещё какой-то блок

        const msgPanel = document.getElementById('msg-panel');
        
        // Получаем данные из localStorage (из страницы index.html)
        const userType = localStorage.getItem('psi_user_type') || 'guest';
        const userName = localStorage.getItem('psi_user_name') || 'Неизвестный';

        console.log(`Зашел пользователь: ${userName}, тип: ${userType}`);

        function interact(text) {
            msgPanel.style.display = 'block';
            msgPanel.innerText = text;
            setTimeout(() => { msgPanel.style.display = 'none'; }, 3000);
        }

        function checkAccess(locationName) {
            if (userType === 'guest') {
                interact(`Доступ в ${locationName} закрыт. Пожалуйста, пройдите регистрацию у Миры.`);
            } else {
                interact(`Доступ разрешен. Переход в ${locationName}...`);
                // Здесь будет window.location.href = 'next_scene.html';
            }
        }


        // Блок для ХУДа
        // Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const avatarBtn = document.getElementById('hud-avatar-btn');
    const inventoryModal = document.getElementById('inventory-modal');
    const closeBtn = document.getElementById('close-inventory-btn');
  
    // Функция открыть/закрыть
    function toggleInventory() {
      inventoryModal.classList.toggle('hidden');
      
      // Опционально: если у тебя в A-Frame включен look-controls, 
      // при открытии меню можно блокировать вращение камеры, чтобы мышка не двигала сцену.
      const camera = document.querySelector('[camera]');
      if (camera) {
        const isHidden = inventoryModal.classList.contains('hidden');
        // Переключаем look-controls в зависимости от видимости меню
        camera.setAttribute('look-controls', `enabled: ${isHidden}`);
      }
    }
  
    // Клик по рамке в HUD
    avatarBtn.addEventListener('click', toggleInventory);
  
    // Клик по крестику в модельном окне
    closeBtn.addEventListener('click', toggleInventory);
  
    // Закрытие по клику на серую зону вокруг модалки
    inventoryModal.addEventListener('click', (e) => {
      if (e.target === inventoryModal) {
        toggleInventory();
      }
    });
  
    // Отслеживание клавиши "I" (английская) или "Ш" (русская раскладка)
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'i' || e.key.toLowerCase() === 'ш') {
        toggleInventory();
      }
      // Добавим закрытие на ESC для удобства
      if (e.key === 'Escape' && !inventoryModal.classList.contains('hidden')) {
        toggleInventory();
      }
    });
  
    // --- Заготовка под получение данных из Supabase ---
    async function loadUserData() {
      // Здесь должна быть твоя проверка сессии Supabase, например:
      // const { data: { user } } = await supabase.auth.getUser();
      
      // Временный хак для демонстрации:
      const mockUsername = "Nomad_42"; 
      
      // Обновляем данные на UI
      document.getElementById('hud-player-name').textContent = mockUsername;
      document.getElementById('modal-player-name').textContent = mockUsername;
    }
  
    loadUserData();
  });