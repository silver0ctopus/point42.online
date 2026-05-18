
// 1. Инициализируем подключение к базе данных
const db = window.db; 

// 2. Объявляем переменные интерфейса на самом верху, чтобы они были доступны ВЕЗДЕ в этом файле
let authUi, authTitle, inputLogin, inputEmail, inputPassword, inputConfirm;
let btnPrimary, btnGuest, toggleLink, statusDiv;
let isSignUpMode = false;

document.addEventListener('DOMContentLoaded', () => {
    // Проверяем бэкенд
    if (!db) {
        console.error("КРИТИЧЕСКАЯ ОШИБКА POINT 42: Клиент Supabase (db) не найден! Проверьте index.html");
        return;
    }

    // 3. Привязываем переменные к элементам DOM, когда страница загрузилась
    authUi = document.getElementById('auth-ui');
    authTitle = document.getElementById('auth-title');
    inputLogin = document.getElementById('auth-login');
    inputEmail = document.getElementById('auth-email');
    inputPassword = document.getElementById('auth-password');
    inputConfirm = document.getElementById('auth-password-confirm');
    
    btnPrimary = document.getElementById('btn-primary');
    btnGuest = document.getElementById('btn-guest');
    toggleLink = document.getElementById('auth-toggle-link');
    statusDiv = document.getElementById('auth-status');

    // Кнопка вызова панели (для открытия терминала в Лифте)
    const callBtn = document.getElementById('call-button');
    if (callBtn) {
        callBtn.addEventListener('click', () => {
            if (authUi) authUi.style.display = 'block'; 
        });
    }

    // 4. Переключение режимов (Вход / Регистрация)
    if (toggleLink) {
        toggleLink.addEventListener('click', (e) => {
            e.preventDefault();
            isSignUpMode = !isSignUpMode;
            showStatus('');

            if (isSignUpMode) {
                authTitle.innerText = 'РЕГИСТРАЦИЯ ТЕРМИНАЛА';
                btnPrimary.innerText = 'ЗАРЕГИСТРИРОВАТЬСЯ';
                toggleLink.innerText = 'Уже есть терминал? Войти';
                inputLogin.classList.remove('hidden');
                inputConfirm.classList.remove('hidden');
            } else {
                authTitle.innerText = 'АВТОРИЗАЦИЯ ТЕРМИНАЛА';
                btnPrimary.innerText = 'ВОЙТИ';
                toggleLink.innerText = 'Нет терминала? Зарегистрировать';
                inputLogin.classList.add('hidden');
                inputConfirm.classList.add('hidden');
            }
        });
    }

    // 5. Логика Главной Кнопки (Вход / Регистрация)
    if (btnPrimary) {
        btnPrimary.addEventListener('click', async () => {
            const email = inputEmail.value.trim();
            const password = inputPassword.value;
            const login = inputLogin.value.trim();
            const confirmPass = inputConfirm.value;

            showStatus('Обработка запроса...', 'info');

            if (!email || !password) {
                showStatus('Заполните Email и Пароль!', 'error');
                return;
            }

            if (isSignUpMode) {
                // Флоу РЕГИСТРАЦИИ
                if (!login) { showStatus('Укажите позывной!', 'error'); return; }
                if (password !== confirmPass) { showStatus('Пароли не совпадают!', 'error'); return; }

                const { data, error } = await db.auth.signUp({
                    email: email,
                    password: password,
                    options: { data: { username: login } }
                });

                if (error) {
                    showStatus(`Ошибка регистрации: ${error.message}`, 'error');
                } else {
                    showStatus('Регистрация успешна! Вход...', 'success');
                    
                    localStorage.setItem('psi_user_type', 'user');
                    localStorage.setItem('psi_user_name', login);

                    // Прячем терминал и открываем двери лифта через встроенную функцию
                    if (authUi) authUi.style.display = 'none';
                    if (window.openDoors) window.openDoors();
                }

            } else {
                // Флоу ВХОДА
                const { data, error } = await db.auth.signInWithPassword({
                    email: email,
                    password: password
                });

                if (error) {
                    showStatus(`Ошибка входа: ${error.message}`, 'error');
                } else {
                    showStatus('Доступ разрешен. Запуск Лифта...', 'success');
                    
                    localStorage.setItem('psi_user_type', 'user');
                    // Временный фолбэк для имени, пока не подтянули профиль
                    localStorage.setItem('psi_user_name', email.split('@')[0]);

                    if (authUi) authUi.style.display = 'none';
                    if (window.openDoors) window.openDoors(); 
                }
            }
        });
    }

    // 6. Логика Гостевого пропуска
    if (btnGuest) {
        btnGuest.addEventListener('click', async () => {
            showStatus('Авторизация гостя...', 'info');
            const { data, error } = await db.auth.signInAnonymously();
            
            if (error) {
                showStatus(`Гостевой вход недоступен: ${error.message}`, 'error');
            } else {
                localStorage.setItem('psi_user_type', 'guest');
                localStorage.setItem('psi_user_name', 'Гость');
                
                if (authUi) authUi.style.display = 'none';
                if (window.openDoors) window.openDoors();
            }
        });
    }

    // Вспомогательная функция для вывода ошибок на экран терминала
    function showStatus(text, type = '') {
        if (statusDiv) {
            statusDiv.innerText = text;
            statusDiv.className = `status-msg ${type}`;
        }
    }
});
