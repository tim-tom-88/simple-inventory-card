import { DEFAULTS } from '@/utils/constants';
import { InventoryItem } from '../types/homeAssistant';
import { TodoList } from '../types/todoList';
import { TranslationData } from '@/types/translatableComponent';
import { TranslationManager } from '@/services/translationManager';

const getTodoListName = (todoLists: TodoList[], entityId: string): string => {
  const list = todoLists.find((l) => l.entity_id === entityId || l.id === entityId);
  return list ? list.name : entityId;
};

const getExpiryStatus = (
  item: InventoryItem,
  translations: TranslationData,
  threshold: number = DEFAULTS.EXPIRY_ALERT_DAYS,
): { class: string; label: string } | null => {
  if (!item.expiry_date) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiry = new Date(item.expiry_date + 'T00:00:00');

  const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntilExpiry < 0) {
    const daysAgo = Math.abs(daysUntilExpiry);
    const key = daysAgo === 1 ? 'expiry.expired_day_ago' : 'expiry.expired_days_ago';
    return {
      class: 'expired',
      label: TranslationManager.localize(
        translations,
        key,
        { days: daysAgo },
        `Expired ${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`,
      ),
    };
  }

  if (daysUntilExpiry === 0) {
    return {
      class: 'expires-today',
      label: TranslationManager.localize(
        translations,
        'expiry.expires_today',
        undefined,
        'Expires today',
      ),
    };
  }

  if (daysUntilExpiry <= threshold) {
    const key = daysUntilExpiry === 1 ? 'expiry.expires_in_day' : 'expiry.expires_in_days';
    return {
      class: 'expiring-soon',
      label: TranslationManager.localize(
        translations,
        key,
        { days: daysUntilExpiry },
        `Expires in ${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''}`,
      ),
    };
  }

  return { class: 'expiry-safe', label: `${item.expiry_date}` };
};

const renderLocationAndCategory = (item: InventoryItem): string => {
  if (item.location && item.category) {
    return `<span class="location-category">${item.location} | ${item.category}</span>`;
  }
  if (item.location) {
    return `<span class="location">${item.location}</span>`;
  }
  if (item.category) {
    return `<span class="category">${item.category}</span>`;
  }
  return '';
};

const renderAutoAddInfo = (
  item: InventoryItem,
  todoLists: TodoList[],
  translations: TranslationData,
): string => {
  if (!item.auto_add_enabled) {
    return '';
  }

  const listName = getTodoListName(todoLists, item.todo_list || '');
  return `<span class="auto-add-info">${TranslationManager.localize(
    translations,
    'items.auto_add_info',
    {
      quantity: item.auto_add_to_list_quantity || 0,
      list: listName,
    },
    `Auto-add at ƒ%Ï ${item.auto_add_to_list_quantity || 0} ƒÅ' ${listName}`,
  )}</span>`;
};

export function createItemRowTemplate(
  item: InventoryItem,
  todoLists: TodoList[],
  translations: TranslationData,
): string {
  const expiryInfo = getExpiryStatus(item, translations, item.expiry_alert_days);

  return `
    <div class="item-row ${item.quantity === 0 ? 'zero-quantity' : ''} ${item.auto_add_enabled ? 'auto-add-enabled' : ''}" data-action="item_click" data-name="${item.name}">
      <div class="item-header">
        <span class="item-name">${item.name}</span>
        ${renderLocationAndCategory(item)}
      </div>
      <div class="item-description">
        <span>${item.description || ''}</span>
      </div>
      <div class="item-footer">
        <div class="item-details">
          <span class="quantity">${item.quantity} ${item.unit || ''}</span>
          ${expiryInfo ? `<span class="expiry ${expiryInfo.class}">${expiryInfo.label}</span>` : ''}
          ${renderAutoAddInfo(item, todoLists, translations)}
        </div>
        <div class="item-controls">
          <button class="edit-btn" data-action="open_edit" data-name="${item.name}">ƒsT‹÷?</button>
          <button class="control-btn" data-action="decrement" data-name="${item.name}" ${item.quantity === 0 ? 'disabled' : ''}>ƒz-</button>
          <button class="control-btn" data-action="increment" data-name="${item.name}">ƒz</button>
          <button class="control-btn" data-action="remove" data-name="${item.name}">ƒ?O</button>
        </div>
      </div>
    </div>
  `;
}

export function createMinimalItemRowTemplate(
  item: InventoryItem,
  todoLists: TodoList[],
  translations: TranslationData,
): string {
  const expiryInfo = getExpiryStatus(item, translations, item.expiry_alert_days);

  return `
    <div class="item-row ${item.quantity === 0 ? 'zero-quantity' : ''} ${item.auto_add_enabled ? 'auto-add-enabled' : ''}" data-action="item_click" data-name="${item.name}">
      <div class="item-header">
        <span class="item-name">${item.name}</span>
        ${renderLocationAndCategory(item)}
      </div>
      <div class="item-description">
        <span>${item.description || ''}</span>
      </div>
      <div class="item-footer">
        <div class="item-details">
          ${expiryInfo ? `<span class="expiry ${expiryInfo.class}">${expiryInfo.label}</span>` : ''}
          ${renderAutoAddInfo(item, todoLists, translations)}
        </div>
        <div class="item-controls">
          <button class="edit-btn" data-action="open_edit" data-name="${item.name}">ƒsT‹÷?</button>
        </div>
      </div>
    </div>
  `;
}
