/**
 * Контроллер для сборки полного инвентаря игрока
 * @param {Array} databaseInventory - Массив предметов, пришедший из Supabase
 * @returns {Array} - Полные объекты предметов, готовые к отрисовке на фронтенде
 */
function prepareInventoryData(databaseInventory) {
  return databaseInventory.map(dbItem => {
    // 1. Ищем статические данные предмета в нашем справочнике
    const registryItem = ITEMS_REGISTRY[dbItem.item_id];

    // Защита от «вылета»: если в БД есть ID, которого нет в реестре
    if (!registryItem) {
      console.error(`Предмет с ID ${dbItem.item_id} не найден в ITEMS_REGISTRY!`);
      return null; 
    }

    // 2. Склеиваем статические свойства из справочника и динамические из БД
    return {
      // Уникальный UUID строки в базе данных (нужен для операций перемещения/удаления)
      dbInstanceId: dbItem.id, 
      
      // Статика из реестра
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

      // Динамика из базы данных конкретного игрока
      quantity: dbItem.quantity,
      condition: dbItem.condition, // Текущая прочность (например, 46)
      isEquipped: dbItem.is_equipped || false, // Надет ли сейчас
      slotPlaced: dbItem.slot_placed || null   // В каком именно слоте лежит (для сетки или экипировки)
    };
  }).filter(item => item !== null); // Очищаем массив от "сломанных" предметов, если они нашлись
}
