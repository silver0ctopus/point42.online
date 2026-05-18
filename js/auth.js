// Предполагаем, что db инициализирован глобально, как в lobby.html, 
// либо импортируется здесь. Если db в window:
const db = window.db; 

document.addEventListener('DOMContentLoaded', () => {
    // Элементы UI
    const authTitle = document.getElementById('auth-title');
    const inputLogin = document.getElementById('auth-login');
    const inputEmail = document.getElementById('auth-email');
    const inputPassword = document.getElementById('auth-password');
    const inputConfirm = document.getElementById('auth-password-confirm');
    
    const btnPrimary = document.getElementById('btn-primary');
    const btnGuest = document.getElementById('btn-guest');
    const toggleLink = document.getElementById('auth-toggle-link');
    const statusDiv = document.getElementById('auth-status');

    let isSignUpMode = false;

    // 1. Переключение режимов (Вход / Регистрация)
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

    // 2. Основное действие (Вход или Регистрация)
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
            // Валидация регистрации
            if (!login) {
                showStatus('Укажите позывной!', 'error');
                return;
            }
            if (password !== confirmPass) {
                showStatus('Пароли не совпадают!', 'error');
                return;
            }

            // РЕГИСТРАЦИЯ в Supabase Auth
            const { data, error } = await db.auth.signUp({
                email: email,
                password: password,
                options: {
                    // Передаем login в метаданные, чтобы триггер в БД 
                    // (или мы вручную) записал его в таблицу profiles
                    data: { username: login } 
                }
            });

            if (error) {
                showStatus(`Ошибка регистрации: ${error.message}`, 'error');
            } else {
                showStatus('Регистрация успешна! Проверьте почту (если включено подтверждение) или войдите.', 'success');
                // Если в Supabase выключено подтверждение по email, юзер сразу авторизован.
                // Можно делать редирект: window.location.href = './lobby.html';
            }

        } else {
            // ВХОД в Supabase Auth
            const { data, error } = await db.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                showStatus(`Ошибка входа: ${error.message}`, 'error');
            } else {
                showStatus('Доступ разрешен. Запуск Лифта...', 'success');
                setTimeout(() => {
                    window.location.href = './lobby.html';
                }, 1000);
            }
        }
    });

    // 3. Гостевой пропуск
    btnGuest.addEventListener('click', async () => {
        showStatus('Авторизация гостя...', 'info');
        
        // Вариант А: Использовать Anonymous Auth от Supabase (если включен в консоли)
        const { data, error } = await db.auth.signInAnonymously();
        
        if (error) {
            // Вариант Б: Фолбэк, если анонимный вход выключен — просто пускаем в лобби
            // Но тогда в lobby.html db.auth.getSession() вернет null, 
            // и сработает редирект обратно. Поэтому лучше включить Anonymous Auth в Supabase!
            showStatus(`Гостевой вход недоступен: ${error.message}`, 'error');
        } else {
            window.location.href = './lobby.html';
        }
    });

    // Вспомогательная функция вывода статуса
    function showStatus(text, type = '') {
        statusDiv.innerText = text;
        statusDiv.className = `status-msg ${type}`;
    }
});
