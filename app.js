// ==========================================
// ИНИЦИАЛИЗАЦИЯ SUPABASE CLIENT
// ==========================================

const SUPABASE_URL = 'https://hjgeubtprprvnmszjbaj.supabase.co'; // Ваш URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ2V1YnRwcnBydm5tc3pqYmFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTEyMTUsImV4cCI6MjA5NDMyNzIxNX0.j5WdnROT426wTMzjI6kMWhrU_pnPqteIboGK6km2pn0'; // Ваш ключ

// Использование window.supabase гарантирует, что мы вызываем метод класса из CDN,
// а результат (клиент) записываем в нашу глобальную переменную
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



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






// ==========================================
// СЕКЦИЯ: ИНИЦИАЛИЗАЦИЯ И АВТОРИЗАЦИЯ SUPABASE
// ==========================================


document.addEventListener('DOMContentLoaded', async () => {
    await checkUserSession();
});

/**
 * Проверяет текущую сессию пользователя и запускает обновление интерфейса
 */
async function checkUserSession() {
    try {
        // 1. Получаем текущую сессию
        const { data: { session }, error: sessionError } = await db.auth.getSession();
        
        if (sessionError) throw sessionError;

        // Если сессии нет — отправляем пользователя на стартовую локацию «Лифт»
        if (!session) {
            console.warn("Пользователь не авторизован. Перенаправление в Лифт...");
            window.location.href = 'index.html'; 
            return;
        }

        const user = session.user;
        console.log("Успешная сессия для UID:", user.id);

        // 2. Получаем никнейм (Сначала проверяем таблицу профилей, затем metadata)
        let username = await fetchUserProfile(user.id);
        
        if (!username) {
            // Фолбэк: если в БД пусто, пробуем достать из метаданных регистрации
            username = user.user_metadata?.username || user.email.split('@')[0];
        }

        // 3. Обновляем интерфейс
        updateHUD(username);

    } catch (error) {
        console.error("Ошибка при проверке сессии:", error.message);
        // В случае критической ошибки тоже можно редиректить
        // window.location.href = 'index.html';
    }
}

/**
 * Запрос к таблице профилей в БД Supabase
 */
async function fetchUserProfile(userId) {
    try {
        // Предполагаем, что таблица называется 'profiles', а колонка с ником — 'username'
        const { data, error } = await db
            .from('profiles')
            .select('username')
            .eq('id', userId)
            .single();

        if (error) {
            // Если таблицы нет или запись не найдена, это обработается в блоке catch
            throw error;
        }

        return data?.username;
    } catch (err) {
        console.log("Дополнительные данные профиля не найдены в таблице profiles, используем метаданные.");
        return null;
    }
}

// ==========================================
// СЕКЦИЯ: УПРАВЛЕНИЕ HUD И ИНТЕРФЕЙСОМ
// ==========================================

/**
 * Внедряет реальное имя пользователя из Supabase в ваш HTML-код Лобби
 */
function updateHUD(username) {
    // 1. Находим элемент имени в верхнем HUD-блоке (был id="hud-player-name")
    const hudPlayerNameEl = document.querySelector('#hud-player-name'); 
    
    // 2. Находим элемент имени внутри модального окна инвентаря (был id="modal-player-name")
    const modalPlayerNameEl = document.querySelector('#modal-player-name'); 

    // Обновляем имя в HUD на месте текста "Загрузка..."
    if (hudPlayerNameEl) {
        hudPlayerNameEl.textContent = username;
    } else {
        console.warn("Элемент #hud-player-name не найден в lobby.html");
    }

    // Обновляем имя в инвентаре на месте текста "Имя Игрока"
    if (modalPlayerNameEl) {
        modalPlayerNameEl.textContent = username;
    } else {
        console.warn("Элемент #modal-player-name не найден в lobby.html");
    }
    
    console.log(`Интерфейс Point42 успешно обновлен для пользователя: ${username}`);
}
    
    // Здесь же в будущем можно будет запустить рендер кастомной аватарки, 
    // если её URL будет храниться в профиле:
    // if (avatarUrl) { document.querySelector('#hud-avatar').src = avatarUrl; } }
