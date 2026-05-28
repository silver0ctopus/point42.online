const initialProfileData = {
    bio: "Засекреченный сотрудник Point 42. Доступ к терминалу подтвержден.",
    rewards: ["Орден Первопроходца", "Жетон Вектора", "Чип Выжившего"]
};

const initialBackpackData = Array(24).fill(null);
initialBackpackData[0] = { id: "pda_upgrade", title: "Модуль КПК v2" };
initialBackpackData[1] = { id: "medkit", title: "Армейская аптечка" };

document.addEventListener("DOMContentLoaded", () => {
    injectPDA();
    setupPDALogic();
});

function injectPDA() {
    const pdaHTML = `
        <div id="inventory-modal" class="modal-overlay hidden">
            <div class="pda-container">
                <aside class="pda-sidebar">
                    <button class="pda-tab-btn active" data-tab="profile">ПРОФИЛЬ</button>
                    <button class="pda-tab-btn" data-tab="backpack">РЮКЗАК</button>
                    <button id="pda-close-btn" class="pda-close-btn">ВЫХОД</button>
                </aside>
               
                <main class="pda-main">
                    
                 <div id="modal-player-name" class="pda-top-username">Загрузка...</div>   
                    
                    <header class="pda-header">
    <!-- Столбец 1 (Левый): Экипировка сверху вниз -->
    <div class="eq-slot" data-slot="glove-right">Перчатка П</div>
    <div class="eq-slot" data-slot="weapon-right">Оружие П</div>
    <div class="eq-slot" data-slot="helmet">Шлем</div>
    <div class="eq-slot" data-slot="body">Куртка</div>
    <div class="eq-slot" data-slot="backpack">Разгрузка</div>

    <!-- Столбцы 2 и 3 (Центр): Аватарка персонажа -->
    <div class="pda-avatar-container">
        <div class="pda-avatar-stub">⚡</div>
        
    </div>

    <!-- Столбец 4 (Правый): Экипировка сверху вниз -->
    <div class="eq-slot" data-slot="glove-left">Перчатка Л</div>
    <div class="eq-slot" data-slot="weapon-left">Оружие Л</div>
    <div class="eq-slot" data-slot="pants">Штаны</div>
    <div class="eq-slot" data-slot="boots">Обувь</div>
    <div class="eq-slot" data-slot="belt">
        Ремень
        <div class="belt-toggle-btn" id="beltToggleBtn" style="display: none;">▶</div>
    </div>

    <!-- Строка 6 (Низ): Шкала здоровья под всей таблицей экипировки -->
    <div class="pda-healthbar-wrapper">
        <div class="pda-healthbar-fill" style="width: 85%;"></div>
        <span class="pda-healthbar-text">HP 85/100</span>
    </div>
</header>

<!-- Выдвижная панель инвентаря ремня, которая будет появляться строго под шапкой -->
<div class="pda-belt-panel hidden" id="pdaBeltPanel">
    <h4 style="margin: 0 0 8px 0; font-size: 11px; color: #63b3ed; letter-spacing: 1px;">ИНВЕНТАРЬ РЕМНЯ</h4>
    <div class="pda-belt-grid" id="pdaBeltGrid">
        <!-- Ячейки ремня будут генерироваться через JS -->
    </div>
</div>
                    
                    <section class="pda-content">
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

// Переключение вкладок (вынесено глобально в модуль)
function switchTab(tabName) {
    const tabBtns = document.querySelectorAll(".pda-tab-btn");
    const pages = document.querySelectorAll(".pda-page");
    
    tabBtns.forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
    });
    pages.forEach(page => {
        page.classList.toggle("hidden", page.id !== `pda-tab-${tabName}`);
    });
}

// Управление состоянием КПК (вынесено глобально в модуль)
function togglePDA(forceState, targetTab) {
    const modal = document.getElementById("inventory-modal");
    if (!modal) return;
    
    const isHidden = modal.classList.contains("hidden");
    const shouldOpen = forceState !== undefined ? forceState : isHidden;
    const sceneEl = document.querySelector("a-scene");

    if (shouldOpen) {
        modal.classList.remove("hidden");
        if (targetTab) switchTab(targetTab);
        
        if (document.pointerLockElement) {
            document.exitPointerLock();
        }
        if (sceneEl && sceneEl.camera) {
            sceneEl.camera.el.setAttribute("look-controls", "enabled: false");
        }
    } else {
        modal.classList.add("hidden");
        if (sceneEl && sceneEl.camera) {
            sceneEl.camera.el.setAttribute("look-controls", "enabled: true");
        }
        if (sceneEl) {
            sceneEl.focus();
        }
    }
}

function setupPDALogic() {
    const modal = document.getElementById("inventory-modal");
    const tabBtns = document.querySelectorAll(".pda-tab-btn");

    // Клики по табам внутри КПК
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            switchTab(btn.getAttribute("data-tab"));
        });
    });

    // Клик по кнопке ВЫХОД
    const closeBtn = document.getElementById("pda-close-btn");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => togglePDA(false));
    }

    // ГЛОБАЛЬНЫЙ ПЕРЕХВАТ КЛИКОВ (для аватарки в HUD)
    // Убирает баг, когда клик "пролетал" сквозь интерфейс в A-Frame
    document.addEventListener("click", (e) => {
        const hudBtn = e.target.closest("#hud-avatar-btn");
        if (hudBtn) {
            e.preventDefault();
            e.stopPropagation();
            togglePDA(true, "profile");
        }
    });

    // Горячие клавиши (I, U, Esc)
    window.addEventListener("keydown", (e) => {
        if (document.activeElement.tagName === "TEXTAREA") {
            if (e.code === "Escape") document.activeElement.blur();
            return;
        }

        if (e.code === "KeyI") {
            const isHidden = modal.classList.contains("hidden");
            const isBackpackActive = document.querySelector(".pda-tab-btn[data-tab='backpack']").classList.contains("active");
            
            if (isHidden) togglePDA(true, "backpack");
            else if (isBackpackActive) togglePDA(false);
            else switchTab("backpack");
        }

        if (e.code === "KeyU") {
            const isHidden = modal.classList.contains("hidden");
            const isProfileActive = document.querySelector(".pda-tab-btn[data-tab='profile']").classList.contains("active");

            if (isHidden) togglePDA(true, "profile");
            else if (isProfileActive) togglePDA(false);
            else switchTab("profile");
        }

        if (e.code === "Escape" && !modal.classList.contains("hidden")) {
            togglePDA(false);
        }
    });
}
