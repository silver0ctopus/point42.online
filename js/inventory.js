// === ИНВЕНТАРНЫЙ МОДУЛЬ ===

// 1. Контроллер (который мы написали на прошлом шаге)
function prepareInventoryData(databaseInventory) {
  return databaseInventory.map(dbItem => {
    const registryItem = ITEMS_REGISTRY[dbItem.item_id];
    if (!registryItem) {
      console.error(`Предмет с ID ${dbItem.item_id} не найден в ITEMS_REGISTRY!`);
      return null; 
    }
    return {
      dbInstanceId: dbItem.id, 
      id: registryItem.id,
      name: registryItem.name,
      description: registryItem.description,
      category: registryItem.category,
      slotType: registryItem.slotType,
      isBeltCompatible: registryItem.isBeltCompatible,
      weight: registryItem.weight,
      maxStack: registryItem.maxStack,
      canTrade: registryItem.canTrade,
      requirements: registryItem.requirements,
      props: registryItem.props,
      effects: registryItem.effects,
      quantity: dbItem.quantity,
      condition: dbItem.condition, 
      isEquipped: dbItem.is_equipped || false, 
      slotPlaced: dbItem.slot_placed || null   
    };
  }).filter(item => item !== null);
}

// 2. Функция загрузки инвентаря (Пункт 2 из прошлого сообщения)
async function loadPlayerInventory(userId) {
  try {
    // ВРЕМЕННО: Включаем тестовую заглушку (Пункт 3), пока в БД нет записей для игрока
    const useMockData = true; 

    if (useMockData) {
      console.log("Загрузка инвентаря: используем тестовые данные");
      const mockDbResponse = [
        { id: "u-1", item_id: "1010001", quantity: 1, condition: 90, is_equipped: false, slot_placed: "bag-0" },
        { id: "u-2", item_id: "3010001", quantity: 5, condition: null, is_equipped: false, slot_placed: "bag-2" },
        { id: "u-3", item_id: "4020001", quantity: 20, condition: null, is_equipped: false, slot_placed: "bag-5" }
      ];
      
      const fullInventory = prepareInventoryData(mockDbResponse);
      renderInventoryInBag(fullInventory); // Запустит отрисовку
      return;
    }

    // РЕАЛЬНЫЙ ЗАПРОС К SUPABASE (включится, когда уберем useMockData)
    const { data: rawInventory, error } = await supabase
      .from('player_inventory')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    const fullInventory = prepareInventoryData(rawInventory);
    renderInventoryInBag(fullInventory);

  } catch (err) {
    console.error("Ошибка при работе с инвентарем:", err.message);
  }
}

// 3. Заготовка под функцию отрисовки (её мы сейчас напишем)
function renderInventoryInBag(items) {
  console.log("Готовы отрисовать предметы в рюкзаке:", items);
  // Здесь будет код, создающий HTML-карточки предметов
}
