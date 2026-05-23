/**
 * СПРАВОЧНИК ПРЕДМЕТОВ (ITEMS_REGISTRY)
 * Маска ID (X-YY-ZZZZ):
 * 1-XX-XXXX: Экипировка (101 - Голова, 102 - Торс, 103 - Ноги, 104 - Перчатки/Обувь)
 * 2-XX-XXXX: Оружие (201 - Основное, 202 - Пистолеты, 203 - Ножи/Холодное)
 * 3-XX-XXXX: Расходники (301 - Еда/Вода, 302 - Медицина)
 * 4-XX-XXXX: Ресурсы и Хлам (401 - Компоненты, 402 - Руда/Сырье)
 */

const ITEMS_REGISTRY = {
  // ==========================================
  // КАТЕГОРИЯ 1: ЭКИПИРОВКА
  // ==========================================
  "1010001": {
    id: "1010001",
    name: "Кожаный шлем «Заря»",
    description: "Старый, пахнущий машинным маслом шлем. Защищает разве что от случайных камней.",
    category: "equipment",
    slotType: "helmet",          // Строго для слота головы
    isBeltCompatible: false,     // На ремень повесить нельзя
    weight: 0.8,
    maxStack: 1,                 // Снаряжение не стакается
    canTrade: true,
    requirements: {
      minExp: 0                  // Доступен новичкам
    },
    props: {
      hasCondition: true,        // Имеет ли износ?
      maxCondition: 100,         // Макс. прочность
      isTwoHanded: false,
      combustible: true,         // Кожа горит!
      fuelTime: 15,              // Секунд горения
      heatOutput: 3              // Выделение тепла
    },
    effects: {
      armor: 5,                  // Добавляет 5 единиц брони
      miningSpeedBonus: 0        // Нет бонуса к добыче
    }
  },
  "1020001": {
    id: "1020001",
    name: "Комбинезон «Сталкер»",
    description: "Классическая экипировка исследователей Зоны. Хороший баланс защиты и веса.",
    category: "equipment",
    slotType: "armor",           // Слот для торса
    isBeltCompatible: false,
    weight: 5.0,
    maxStack: 1,
    canTrade: true,
    requirements: {
      minExp: 1000               // Нужно 1000 опыта, чтобы надеть
    },
    props: {
      hasCondition: true,
      maxCondition: 200,
      isTwoHanded: false,
      combustible: false         // Ткань пропитана огнеупором
    },
    effects: {
      armor: 25,
      radiation_resist: 15
    }
  },

  // ==========================================
  // КАТЕГОРИЯ 2: ОРУЖИЕ И ИНСТРУМЕНТЫ
  // ==========================================
  "2010001": {
    id: "2010001",
    name: "Тяжелая кирка",
    description: "Надежный инструмент для колки породы. Из-за веса приходится держать двумя руками.",
    category: "weapon",
    slotType: "weapon-main",     // Занимает основной слот оружия
    isBeltCompatible: false,
    weight: 4.5,
    maxStack: 1,
    canTrade: true,
    requirements: { minExp: 100 },
    props: {
      hasCondition: true,
      maxCondition: 150,
      isTwoHanded: true,         // ДВУРУЧНОЕ ОРУЖИЕ
      combustible: true          // Рукоять-то деревянная
    },
    effects: {
      damage: 18,
      miningSpeedBonus: 40       // Сокращает время добычи руды на 40%!
    }
  },

  // ==========================================
  // КАТЕГОРИЯ 3: РАСХОДНИКИ И МЕДИЦИНА
  // ==========================================
  "3010001": {
    id: "3010001",
    name: "Батон хлеба",
    description: "Немного черствый, но вполне съедобный батон. Мечта местного гурмана.",
    category: "consumable",
    slotType: null,              // В слоты брони засунуть нельзя
    isBeltCompatible: true,      // Но можно перетащить на РЕМЕНЬ для быстрого использования!
    weight: 0.3,
    maxStack: 10,                // Складывается в пачки по 10 штук
    canTrade: true,
    requirements: { minExp: 0 },
    props: {
      hasCondition: false,       // Хлеб не ломается (не имеет шкалы прочности)
      isTwoHanded: false,
      combustible: true,         // Горит как миленький
      fuelTime: 5,
      heatOutput: 2
    },
    effects: {
      healthRestore: 5,          // Чуть-чуть лечит
      hungerRestore: 40          // Утоляет 40 единиц голода
    }
  },
  "3020001": {
    id: "3020001",
    name: "Армейский стимулятор",
    description: "Экспериментальный медицинский состав. Мгновенно затягивает раны.",
    category: "consumable",
    slotType: null,
    isBeltCompatible: true,      // Тоже можно на ремень
    weight: 0.1,
    maxStack: 5,                 // В стопке до 5 штук
    canTrade: false,             // ВАЖНО: Квантовый/персональный предмет, нельзя передать!
    requirements: { minExp: 500 },
    props: {
      hasCondition: false,
      isTwoHanded: false,
      combustible: false
    },
    effects: {
      healthRestore: 80,         // Мощный отхил
      hungerRestore: -10         // Побочный эффект: вызывает сильное чувство голода
    }
  },

  // ==========================================
  // КАТЕГОРИЯ 4: РЕСУРСЫ И СЫРЬЕ
  // ==========================================
  "4020001": {
    id: "4020001",
    name: "Медная руда",
    description: "Тяжелый кусок необработанной породы с прожилками меди.",
    category: "resource",
    slotType: null,
    isBeltCompatible: false,
    weight: 2.0,
    maxStack: 20,                // Можно носить большими пачками
    canTrade: true,
    requirements: { minExp: 0 },
    props: {
      hasCondition: false,
      isTwoHanded: false,
      combustible: false         // Камень не горит
    },
    effects: {}                  // У сырья нет мгновенных эффектов
  }
};

// Экспортируем, если используем модульную систему (ES6)
// export default ITEMS_REGISTRY;
