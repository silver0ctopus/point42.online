// Массивы-заглушки для будущего бэкенда Supabase
const initialProfileData = {
    bio: "Засекреченный сотрудник Point 42. Доступ к терминалу подтвержден.",
    rewards: ["Орден Первопроходца", "Жетон Вектора", "Чип Выжившего"]
};

const initialBackpackData = Array(24).fill(null); // Сетка на 24 ячейки
initialBackpackData[0] = { id: "pda_upgrade", title: "Модуль КПК v2" };
initialBackpackData[1] = { id: "medkit", title: "Армейская аптечка" };

// Инициализация при загрузке DOM
document.addEventListener("DOMContentLoaded", () => {
    injectPDA();
    setupPDALogic();
});

// 1. Инжектим HTML структуру прямо в body
function injectPDA() {
    const pdaHTML = `
        <div id="inventory-modal" class="modal-overlay hidden">
            <div class="pda-container">
                
                <!-- Левый сайдбар с табами -->
                <aside class="pda-sidebar">
                    <button class="pda-tab-btn active" data-tab="profile">ПРОФИЛЬ</button>
                    <button class="pda-tab-btn" data-tab="backpack">РЮКЗАК</button>
                    <button id="pda-close-btn" class="pda-close-btn">ВЫХОД</button>
                </aside>

                <!-- Основной контент КПК -->
                <main class="pda-main">
                    
                    <!-- Сквозная шапка (Экипировка и Аватар) -->
                    <header class="pda-header">
                        <div class="eq-slot" data-slot="head">Голова</div>
                        <div class="pda-avatar-container">
                            <div class="pda-avatar-stub">⚡</div>
                            <!-- Добавили элемент для отображения имени, который ищет app.js -->
                            <div id="modal-player-name" class="pda-username">Загрузка...</div>
                        </div>
                        <div class="eq-slot" data-slot="torso">Торс</div>
                        <div class="eq-slot" data-slot="arms">Руки</div>
                        <div class="pda-healthbar-wrapper">
                            <div class="pda-healthbar-fill" style="width: 85%;"></div>
                            <span class="pda-healthbar-text">HP 85/100</span>
                        </div>
                        <div class="eq-slot" data-slot="legs">Ноги</div>
                    </header>

                    <!-- Переключаемые зоны -->
                    <section class="pda-content">
                        
                        <!-- Страница 1: Профиль (Публичная) -->
                        <div id="pda-tab-profile" class="pda-page">
                            <div class="pda-bio-section">
                                <h3>ИНФОРМАЦИЯ О СЕБЕ</h3>
                                <textarea id="pda-bio-text" placeholder="Расскажите о себе...">${initialProfileData.bio}</textarea>
                            </div>
                            <div class="pda-rewards-section">
                                <h3>НАГРАДЫ И ПОДАРКИ</h3>
                                <div class="pda-rewards-grid">
                                    ${initialProfileData.rewards.map(r => `<div class="reward-item" title="${r}">🏅</div>`).join('')}
                                </div>
                            </div>
                        </div>

                        <!-- Страница 2: Рюкзак (Приватная) -->
                        <div id="pda-tab-backpack" class="pda-page hidden">
                            <h3>ИНВЕНТАРЬ СУЩЕСТВА</h3>
                            <div class="pda-inventory-grid">
                                ${initialBackpackData.map((item, index) => `
                                    <div class="inventory-cell" data-index="${index}">
                                        ${item ? `<span class="item-icon" title="${item.title}">📦</span>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                    </section>
                </main>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', pdaHTML);
}

// 2. Логика управления интерфейсом
function setupPDALogic() {
    const modal = document.getElementById("inventory-modal");
    const tabBtns = document.querySelectorAll(".pda-tab-btn");
    const pages = document.querySelectorAll(".pda-page");
    const closeBtn = document.getElementById("pda-close-btn");
    const hudBtn = document.getElementById("hud-avatar-btn");
    if (hudBtn) {
        hudBtn.addEventListener("click", () => {
            togglePDA(true, "profile"); // При клике на HUD открываем профиль
        });
    }

    // Функция переключения вкладок внутри КПК
    function switchTab(tabName) {
        tabBtns.forEach(btn => {
            btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
        });
        pages.forEach(page => {
            page.classList.toggle("hidden", page.id !== `pda-tab-${tabName}`);
        });
    }

    // Переключение по кликам на табы
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            switchTab(btn.getAttribute("data-tab"));
        });
    });

    // Управление состоянием КПК (Открыть / Закрыть)
    function togglePDA(forceState, targetTab) {
        const isHidden = modal.classList.contains("hidden");
        const shouldOpen = forceState !== undefined ? forceState : isHidden;

        const camera = document.querySelector("[look-controls]");

        if (shouldOpen) {
            modal.classList.remove("hidden");
            if (targetTab) switchTab(targetTab);
            // Отключаем вращение камеры в A-Frame, чтобы мышь освободилась
            if (camera) camera.setAttribute("look-controls", "enabled: false");
        } else {
            modal.classList.add("hidden");
            // Возвращаем управление камерой
            if (camera) camera.setAttribute("look-controls", "enabled: true");
        }
    }

    // Клик на кнопку закрытия
    closeBtn.addEventListener("click", () => togglePDA(false));

    // Горячие клавиши (I, U, Esc)
    window.addEventListener("keydown", (e) => {
        // Если игрок пишет в textarea, игнорируем горячие клавиши рюкзака
        if (document.activeElement.tagName === "TEXTAREA") {
            if (e.code === "Escape") {
                document.activeElement.blur(); // Просто выходим из фокуса текста
            }
            return;
        }

        if (e.code === "KeyI") {
            const isHidden = modal.classList.contains("hidden");
            const isBackpackActive = document.querySelector(".pda-tab-btn[data-tab='backpack']").classList.contains("active");
            
            if (isHidden) {
                togglePDA(true, "backpack");
            } else if (isBackpackActive) {
                togglePDA(false);
            } else {
                switchTab("backpack");
            }
        }

        if (e.code === "KeyU") {
            const isHidden = modal.classList.contains("hidden");
            const isProfileActive = document.querySelector(".pda-tab-btn[data-tab='profile']").classList.contains("active");

            if (isHidden) {
                togglePDA(true, "profile");
            } else if (isProfileActive) {
                togglePDA(false);
            } else {
                switchTab("profile");
            }
        }

        if (e.code === "Escape" && !modal.classList.contains("hidden")) {
            togglePDA(false);
        }
    });
}
