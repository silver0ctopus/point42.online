/**
 * СПРАВОЧНИК ПРЕДМЕТОВ (ITEMS_REGISTRY)
 * Маска ID (X-YY-ZZZZ):
 * 1-XX-XXXX: Экипировка (101 - правая перчатка, 102 - левая перчатка, 103 - голова, 104 - Торс, 105 - Штаны, 106 - Обувь, 107 - Ремень, 108 - Доп. экипировка)
 * 2-XX-XXXX: Оружие (201 - правая рука, 202 - левая рука, 203 - двуручное)
 * 3-XX-XXXX: Инструменты ()
 * 4-XX-XXXX: Ресурсы ()
 * 5-XX-XXXX: Расходники ()
 * 6-XX-XXXX: Контейнеры
 * 7-XX-XXXX: Камни
 * 8-XX-XXXX: Сувениры
 * 9-XX-XXXX: 
 * 10-XX-XXXX: 
  */

const ITEMS_REGISTRY = {
  // ==========================================
  // КАТЕГОРИЯ 1: ЭКИПИРОВКА
  // ==========================================
  "1010001": {
    id: "1010001",
    name: "медная правая перчатка",
    description: "медная правая перчатка",
    category: "equipment",
    slotType: "glove-right",          
    isBeltCompatible: false,     
    weight: 1,
    maxStack: 1,                 
    canTrade: true,
    requirements: { minExp: 0 },
    props: {
      hasCondition: true,        
      maxCondition: 100,        
      isTwoHanded: false,
      combustible: false        
    },
    effects: {
      armor: 1
    }
  }, 
 
  "1020001": {
    id: "1020001",
    name: "медная левая перчатка",
    description: "медная левая перчатка",
    category: "equipment",
    slotType: "glove-left",          
    isBeltCompatible: false,     
    weight: 1,
    maxStack: 1,                 
    canTrade: true,
    requirements: { minExp: 0 },
    props: {
      hasCondition: true,        
      maxCondition: 100,        
      isTwoHanded: false,
      combustible: false         
    },
    effects: {
      armor: 1
    }
  },
 
  "1030001": {
    id: "1030001",
    name: "простая кепка",
    description: "простая кепка",
    category: "equipment",
    slotType: "helmet",          
    isBeltCompatible: false,     
    weight: 1,
    maxStack: 1,                 
    canTrade: true,
    requirements: { minExp: 0 },
    props: {
      hasCondition: true,        
      maxCondition: 100,        
      isTwoHanded: false,
      combustible: true, 
      heatOutput: 3
    },
    effects: {
      armor: 1
    }
  },
 
  "1040001": {
    id: "1040001",
    name: "простая куртка",
    description: "простая куртка",
    category: "equipment",
    slotType: "body",          
    isBeltCompatible: false,     
    weight: 1,
    maxStack: 1,                 
    canTrade: true,
    requirements: { minExp: 0 },
    props: {
      hasCondition: true,        
      maxCondition: 100,        
      isTwoHanded: false,
      combustible: true, 
      heatOutput: 3
    },
    effects: {
      armor: 1
    }
  },
 
  "1050001": {
    id: "1050001",
    name: "простые штаны",
    description: "простые штаны",
    category: "equipment",
    slotType: "pants",          
    isBeltCompatible: false,     
    weight: 1,
    maxStack: 1,                 
    canTrade: true,
    requirements: { minExp: 0 },
    props: {
      hasCondition: true,        
      maxCondition: 100,        
      isTwoHanded: false,
      combustible: true, 
      heatOutput: 3
    },
    effects: {
      armor: 1
    }
  },
 
  "1060001": {
    id: "1060001",
    name: "простые ботинки",
    description: "простые ботинки",
    category: "equipment",
    slotType: "boots",          
    isBeltCompatible: false,     
    weight: 1,
    maxStack: 1,                 
    canTrade: true,
    requirements: { minExp: 0 },
    props: {
      hasCondition: true,        
      maxCondition: 100,        
      isTwoHanded: false,
      combustible: true, 
      heatOutput: 3
    },
    effects: {
      armor: 1
    }
  },
 
  "1070001": {
    id: "1070001",
    name: "ремень 1",
    description: "ремень 1",
    category: "equipment",
    slotType: "belt",          
    isBeltCompatible: false,     
    weight: 1,
    maxStack: 1,                 
    canTrade: true,
    requirements: { minExp: 0 },
    props: {
      hasCondition: true,        
      maxCondition: 100,        
      isTwoHanded: false,
      combustible: false
    },
    effects: {
      armor: 1
    }
  },
 
  "1070002": {
    id: "1070002",
    name: "ремень 2",
    description: "ремень 2",
    category: "equipment",
    slotType: "belt",          
    isBeltCompatible: false,     
    weight: 1,
    maxStack: 1,                 
    canTrade: true,
    requirements: { minExp: 1000 },
    props: {
      hasCondition: true,        
      maxCondition: 100,        
      isTwoHanded: false,
      combustible: false
    },
    effects: {
      armor: 1
    }
  },
 
  "1070003": {
    id: "1070003",
    name: "ремень 3",
    description: "ремень 3",
    category: "equipment",
    slotType: "belt",          
    isBeltCompatible: false,     
    weight: 1,
    maxStack: 1,                 
    canTrade: true,
    requirements: { minExp: 5000 },
    props: {
      hasCondition: true,        
      maxCondition: 100,        
      isTwoHanded: false,
      combustible: false
    },
    effects: {
      armor: 1
    }
  },
 
  "1070004": {
    id: "1070004",
    name: "ремень 4",
    description: "ремень 4",
    category: "equipment",
    slotType: "belt",          
    isBeltCompatible: false,     
    weight: 1,
    maxStack: 1,                 
    canTrade: true,
    requirements: { minExp: 20000 },
    props: {
      hasCondition: true,        
      maxCondition: 100,        
      isTwoHanded: false,
      combustible: false
    },
    effects: {
      armor: 1
    }
  },
 
  "1080001": {
    id: "1080001",
    name: "разгрузочный жилет",
    description: "разгрузочный жилет",
    category: "equipment",
    slotType: "backpack-mod",          
    isBeltCompatible: false,     
    weight: 1,
    maxStack: 1,                 
    canTrade: true,
    requirements: { minExp: 0 },
    props: {
      hasCondition: true,        
      maxCondition: 100,        
      isTwoHanded: false,
      combustible: false
    },
    effects: {
      armor: 1
    }
  },
 
  "1080002": {
    id: "1080002",
    name: "рюкзак",
    description: "рюкзак",
    category: "equipment",
    slotType: "backpack-mod",          
    isBeltCompatible: false,     
    weight: 1,
    maxStack: 1,                 
    canTrade: true,
    requirements: { minExp: 0 },
    props: {
      hasCondition: true,        
      maxCondition: 100,        
      isTwoHanded: false,
      combustible: false
    },
    effects: {
      armor: 1
    }
  },

 "1019001": {
    id: "1019001",
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
  "1029001": {
    id: "1029001",
    name: "Комбинезон «Сталкер»",
    description: "Классическая экипировка исследователей Зоны. Хороший баланс защиты и веса.",
    category: "equipment",
    slotType: "body",           // Слот для торса
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
  // КАТЕГОРИЯ 2: ОРУЖИЕ
  // ==========================================

  "2010001": {
    id: "2010001",
    name: "ржавая труба",
    description: "ржавая труба",
    category: "weapon",
    slotType: "weapon-right",    
    isBeltCompatible: true,
    weight: 3,
    maxStack: 1,
    canTrade: true,
    requirements: { minExp: 0 },
    props: {
      hasCondition: true,
      maxCondition: 150,
      isTwoHanded: false,        
      combustible: false         
    },
    effects: {
      damage: 18  
    }
  }, 
 
  "2020001": {
    id: "2020001",
    name: "крышка от бака",
    description: "крышка от бака",
    category: "weapon",
    slotType: "weapon-left",    
    isBeltCompatible: true,
    weight: 3,
    maxStack: 1,
    canTrade: true,
    requirements: { minExp: 0 },
    props: {
      hasCondition: true,
      maxCondition: 150,
      isTwoHanded: false,        
      combustible: false         
    },
    effects: {
      armor: 10  
    }
  },
 
  "2030001": {
    id: "2030001",
    name: "пожарный топор",
    description: "пожарный топор",
    category: "weapon",
    slotType: "weapon-right",    
    isBeltCompatible: true,
    weight: 3,
    maxStack: 1,
    canTrade: true,
    requirements: { minExp: 0 },
    props: {
      hasCondition: true,
      maxCondition: 150,
      isTwoHanded: true,        
      combustible: false         
    },
    effects: {
      damage: 40  
    } 
  },
 
  "2019001": {
    id: "2019001",
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
  // КАТЕГОРИЯ 3: ИНСТРУМЕНТЫ
  // ==========================================

  "3010001": { }, 
  "3010002": { },
  "3010003": { },
  "3020001": { },
 
  "3019001": {
    id: "3019001",
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
  "3029001": {
    id: "3029001",
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
  // КАТЕГОРИЯ 4: РЕСУРСЫ
  // ==========================================

  "4010001": { }, 
  "4010002": { },
  "4010003": { },
  "4010004": { },
  "4010005": { },
 
  "4029001": {
    id: "4029001",
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


  // ==========================================
  // КАТЕГОРИЯ 5: РАСХОДНИКИ
  // ==========================================

 "5010001": { },


  // ==========================================
  // КАТЕГОРИЯ 6: КОНТЕЙНЕРЫ
  // ==========================================

 "6010001": { },
 "6020001": { },


  // ==========================================
  // КАТЕГОРИЯ 7: КАМНИ
  // ==========================================

  // ==========================================
  // КАТЕГОРИЯ 8: СУВЕНИРЫ
  // ==========================================

// Экспортируем, если используем модульную систему (ES6)
// export default ITEMS_REGISTRY;
