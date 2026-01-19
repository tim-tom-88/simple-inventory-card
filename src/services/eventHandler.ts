import { ELEMENTS, ACTIONS, DEFAULTS, CSS_CLASSES } from '../utils/constants';
import { HomeAssistant, InventoryConfig, InventoryItem } from '../types/homeAssistant';
import { Services } from './services';
import { Modals } from './modals';
import { Filters } from './filters';
import { Utilities } from '../utils/utilities';
import { TranslationData } from '@/types/translatableComponent';
import { TranslationManager } from './translationManager';
import { initializeMultiSelect } from './multiSelect';

export class EventHandler {
  private renderRoot: ShadowRoot;
  private services: Services;
  private modals: Modals;
  private filters: Filters;
  private config: InventoryConfig;
  private hass: HomeAssistant;
  private renderCallback: () => void;
  private updateItemsCallback: (items: InventoryItem[], sortMethod: string) => void;
  private translations: TranslationData;

  private boundClickHandler: EventListener | undefined = undefined;
  private boundChangeHandler: EventListener | undefined = undefined;

  private eventListenersSetup = false;

  import { SimpleInventoryCard } from '@/components/simpleInventoryCard';

// ... (imports)

export class EventHandler {
  private card: SimpleInventoryCard;
  private renderRoot: ShadowRoot;
  // ... (other properties)

  constructor(
    card: SimpleInventoryCard,
    renderRoot: ShadowRoot,
    services: Services,
    modals: Modals,
    filters: Filters,
    config: InventoryConfig,
    hass: HomeAssistant,
    renderCallback: () => void,
    updateItemsCallback: (items: InventoryItem[], sortMethod: string) => void,
    private getFreshState: () => { hass: HomeAssistant; config: InventoryConfig },
    translations: TranslationData,
  ) {
    this.card = card;
    this.renderRoot = renderRoot;
    this.services = services;
    this.modals = modals;
    this.filters = filters;
    this.config = config;
    this.hass = hass;
    this.renderCallback = renderCallback;
    this.updateItemsCallback = updateItemsCallback;
    this.translations = translations;
  }

  // ... (other methods)

  private async handleClick(event: Event): Promise<void> {
    const target = event.target as HTMLElement;
    if (target.tagName === 'BUTTON' && target.hasAttribute('data-processing')) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Handle item row click
    const itemRow = target.closest('.item-row');
    if (itemRow && itemRow.hasAttribute('data-name')) {
      // Check if the click was on a button within the row
      if (target.closest('button')) {
        return; // Let other handlers manage button clicks
      }

      const itemName = itemRow.getAttribute('data-name');
      if (itemName) {
        event.preventDefault();
        event.stopPropagation();
        
        const state = this.hass.states[this.config.entity];
        const allItems = Utilities.validateInventoryItems(state.attributes?.items || []);
        const item = allItems.find(i => i.name === itemName);

        if (item) {
          const itemClickEvent = new CustomEvent('simple-inventory-card-item-click', {
            bubbles: true,
            composed: true,
            detail: { item },
          });
          this.card.dispatchEvent(itemClickEvent);
        }
        return;
      }
    }
    
    if (target.dataset.action && target.dataset.name) {
      event.preventDefault();
      event.stopPropagation();
      await this.handleItemAction(target, target.dataset.action, target.dataset.name);
      return;
    }

    // ... (rest of the method)
  }
  
  // ... (rest of the class)
}


  setupEventListeners(): void {
    if (this.eventListenersSetup) {
      return;
    }

    const actualClickHandler = (event: Event) => {
      this.handleClick(event).catch((error) => {
        console.error('Error in handleClick:', error);
      });
    };

    const actualChangeHandler = (event: Event) => {
      this.handleChange(event);
    };

    this.renderRoot.addEventListener('click', actualClickHandler);
    this.renderRoot.addEventListener('change', actualChangeHandler);

    this.filters.setupSearchInput(this.config.entity, () => this.handleSearchChange());
    this.eventListenersSetup = true;

    const filters = this.filters.getCurrentFilters(this.config.entity);
    if (filters.showAdvanced) {
      this.initializeMultiSelects();
    }
  }

  cleanupEventListeners(): void {
    if (this.boundClickHandler) {
      this.renderRoot.removeEventListener('click', this.boundClickHandler as EventListener);
    }
    if (this.boundChangeHandler) {
      this.renderRoot.removeEventListener('change', this.boundChangeHandler as EventListener);
    }
    this.eventListenersSetup = false;
  }

  updateDependencies(config: InventoryConfig, hass: HomeAssistant): void {
    this.config = config;
    this.hass = hass;
  }

  import { SimpleInventoryCard } from '@/components/simpleInventoryCard';
import { ELEMENTS, ACTIONS, DEFAULTS, CSS_CLASSES } from '../utils/constants';
// ... (rest of imports)

export class EventHandler {
  private card: SimpleInventoryCard;
  // ... (other properties)

  constructor(
    card: SimpleInventoryCard,
    renderRoot: ShadowRoot,
    // ... (rest of constructor params)
  ) {
    this.card = card;
    // ... (rest of constructor)
  }

  // ... (other methods)

  private async handleClick(event: Event): Promise<void> {
    const target = event.target as HTMLElement;
    if (target.tagName === 'BUTTON' && target.hasAttribute('data-processing')) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const itemRow = target.closest('.item-row');
    if (itemRow && itemRow.hasAttribute('data-name')) {
      if (target.closest('button')) {
        // If a button inside the row was clicked, let other handlers deal with it.
      } else {
        const itemName = itemRow.getAttribute('data-name');
        if (itemName) {
          event.preventDefault();
          event.stopPropagation();
          const state = this.hass.states[this.config.entity];
          const allItems = Utilities.validateInventoryItems(state.attributes?.items || []);
          const item = allItems.find(i => i.name === itemName);

          if (item) {
            const itemClickEvent = new CustomEvent('simple-inventory-card-item-click', {
              bubbles: true,
              composed: true,
              detail: { item },
            });
            this.card.dispatchEvent(itemClickEvent);
          }
          return;
        }
      }
    }

    if (target.dataset.action && target.dataset.name) {
      event.preventDefault();
      event.stopPropagation();
      await this.handleItemAction(target, target.dataset.action, target.dataset.name);
      return;
    }

    // ... (rest of handleClick)
  }

  // ... (rest of class)
}


  private handleChange(event: Event): void {
    const target = event.target as HTMLElement;

    if (target.id === ELEMENTS.SORT_METHOD) {
      const filters = this.filters.getCurrentFilters(this.config.entity);
      filters.sortMethod = (target as HTMLSelectElement).value;
      this.filters.saveFilters(this.config.entity, filters);
      this.renderCallback();
      return;
    }

    if (
      target instanceof HTMLInputElement &&
      target.type === 'checkbox' &&
      (target.id.includes('auto') || target.id.includes('AUTO_ADD'))
    ) {
      setTimeout(() => {
        const controls = target.parentElement?.querySelector('.auto-add-controls') as HTMLElement;
        if (controls) {
          controls.style.display = target.checked ? 'block' : 'none';
        }
      }, 0);
    }

    if (target.id === ELEMENTS.SEARCH_INPUT && target instanceof HTMLInputElement) {
      const filters = this.filters.getCurrentFilters(this.config.entity);
      filters.searchText = target.value;
      this.filters.saveFilters(this.config.entity, filters);

      const state = this.hass.states[this.config.entity];
      if (state) {
        const allItems = Utilities.validateInventoryItems(state.attributes?.items || []);
        const filteredItems = this.filters.filterItems(allItems, filters);
        const sortedItems = this.filters.sortItems(filteredItems, 'name', this.translations);
        this.updateItemsCallback(sortedItems, 'name');
        this.filters.updateFilterIndicators(filters, this.translations);
      }
      return;
    }
  }

  private handleSearchChange(): void {
    const state = this.hass.states[this.config.entity];
    if (!state) return;

    const filters = this.filters.getCurrentFilters(this.config.entity);
    const sortMethodElement = this.renderRoot.querySelector(
      ELEMENTS.SORT_METHOD,
    ) as HTMLSelectElement | null;
    const sortMethod = sortMethodElement?.value || DEFAULTS.SORT_METHOD;

    const allItems = Utilities.validateInventoryItems(state.attributes?.items || []);
    const filteredItems = this.filters.filterItems(allItems, filters);
    const sortedItems = this.filters.sortItems(filteredItems, sortMethod, this.translations);

    this.updateItemsCallback(sortedItems, sortMethod);
    this.filters.updateFilterIndicators(filters, this.translations);
  }

  private async handleItemAction(
    button: HTMLElement,
    action: string,
    itemName: string,
  ): Promise<void> {
    if (button.hasAttribute('disabled') || button.getAttribute('aria-disabled') === 'true') {
      return;
    }

    button.setAttribute('data-processing', 'true');
    button.setAttribute('disabled', 'true');
    button.style.opacity = '0.6';
    button.style.pointerEvents = 'none';

    try {
      const inventoryId = Utilities.getInventoryId(this.hass, this.config.entity);

      switch (action) {
        case ACTIONS.INCREMENT: {
          await this.services.incrementItem(inventoryId, itemName);
          this.renderCallback();
          break;
        }
        case ACTIONS.DECREMENT: {
          await this.services.decrementItem(inventoryId, itemName);
          this.renderCallback();
          break;
        }
        case ACTIONS.REMOVE: {
          const confirmMessage = TranslationManager.localize(
            this.translations,
            'actions.confirm_remove',
            { name: itemName },
            `Remove ${itemName} from inventory?`,
          );
          if (confirm(confirmMessage)) {
            await this.services.removeItem(inventoryId, itemName);
            this.renderCallback();
          }
          break;
        }
        case ACTIONS.OPEN_EDIT_MODAL: {
          const freshState = this.getFreshState();
          const locations = this.getUniqueLocations();
          const categories = this.getUniqueCategories();
          this.modals.openEditModal(
            itemName,
            () => freshState,
            this.translations,
            locations,
            categories,
          );
          break;
        }
        default: {
          console.warn(`Unknown action: ${action}`);
        }
      }
    } catch (error) {
      console.error(`Error performing ${action} on ${itemName}:`, error);
    } finally {
      setTimeout(() => {
        button.setAttribute('data-processing', 'true');
        button.removeAttribute('disabled');
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
      }, 200);
    }
  }

  private async handleAddItem(): Promise<void> {
    const success = await this.modals.addItem(this.config);
    if (success) {
      this.modals.closeAddModal();
    }
  }

  private async handleSaveEdits(): Promise<void> {
    const success = await this.modals.saveEditModal(this.config);
    if (success) {
      this.modals.closeEditModal();
    }
  }

  private toggleAdvancedFilters(): void {
    try {
      const filters = this.filters.getCurrentFilters(this.config.entity);
      filters.showAdvanced = !filters.showAdvanced;
      this.filters.saveFilters(this.config.entity, filters);
      this.renderCallback();
      if (filters.showAdvanced) {
        this.initializeMultiSelects();
      }
    } catch (error) {
      console.error('Error toggling advanced filters:', error);
    }
  }

  private clearFilters(): void {
    try {
      this.filters.clearFilters(this.config.entity);

      const searchInput = this.renderRoot.querySelector(
        ELEMENTS.SEARCH_INPUT,
      ) as HTMLInputElement | null;
      if (searchInput) {
        searchInput.value = '';
      }

      this.renderCallback();
      const filters = this.filters.getCurrentFilters(this.config.entity);
      setTimeout(() => {
        this.filters.updateFilterIndicators(filters, this.translations);
        if (filters.showAdvanced) {
          this.initializeMultiSelects();
        }
      }, 50);
    } catch (error) {
      console.error('Error clearing filters:', error);
      const errorMessage = TranslationManager.localize(
        this.translations,
        'errors.clear_filters_error',
        undefined,
        'Error clearing filters. Please try again.',
      );
      alert(errorMessage);
    }
  }

  private getUniqueLocations(): string[] {
    const state = this.hass.states[this.config.entity];
    if (!state?.attributes?.items) return [];

    const locations = new Set<string>();
    Object.values(state.attributes.items).forEach((item: any) => {
      if (item.location?.trim()) {
        locations.add(item.location.trim());
      }
    });
    return Array.from(locations).sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: 'base' }),
    );
  }

  private getUniqueCategories(): string[] {
    const state = this.hass.states[this.config.entity];
    if (!state?.attributes?.items) return [];

    const categories = new Set<string>();
    Object.values(state.attributes.items).forEach((item: any) => {
      if (item.category?.trim()) {
        categories.add(item.category.trim());
      }
    });
    return Array.from(categories).sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: 'base' }),
    );
  }

  private initializeMultiSelects(): void {
    const filters = this.filters.getCurrentFilters(this.config.entity);
    const categories = this.getUniqueCategories();
    const locations = this.getUniqueLocations();

    setTimeout(() => {
      initializeMultiSelect({
        id: ELEMENTS.FILTER_CATEGORY,
        options: categories,
        selected: filters.category,
        placeholder: TranslationManager.localize(
          this.translations,
          'filters.all_categories',
          undefined,
          'All Categories',
        ),
        shadowRoot: this.renderRoot,
        onChange: (selected) => {
          const filters = this.filters.getCurrentFilters(this.config.entity);
          filters.category = selected;
          this.filters.saveFilters(this.config.entity, filters);
          this.filters.updateFilterIndicators(filters, this.translations);
          this.applyFiltersWithoutRender();
        },
      });

      initializeMultiSelect({
        id: ELEMENTS.FILTER_LOCATION,
        options: locations,
        selected: filters.location,
        placeholder: TranslationManager.localize(
          this.translations,
          'filters.all_locations',
          undefined,
          'All Locations',
        ),
        shadowRoot: this.renderRoot,
        onChange: (selected) => {
          const filters = this.filters.getCurrentFilters(this.config.entity);
          filters.location = selected;
          this.filters.saveFilters(this.config.entity, filters);
          this.filters.updateFilterIndicators(filters, this.translations);
          this.applyFiltersWithoutRender();
        },
      });

      initializeMultiSelect({
        id: ELEMENTS.FILTER_EXPIRY,
        options: ['none', 'expired', 'soon', 'future'],
        selected: filters.expiry,
        placeholder: TranslationManager.localize(
          this.translations,
          'filters.all_items',
          undefined,
          'All Items',
        ),
        labels: {
          none: TranslationManager.localize(
            this.translations,
            'filters.no_expiry',
            undefined,
            'No Expiry',
          ),
          expired: TranslationManager.localize(
            this.translations,
            'filters.expired',
            undefined,
            'Expired',
          ),
          soon: TranslationManager.localize(
            this.translations,
            'filters.expiring_soon',
            undefined,
            'Expiring Soon',
          ),
          future: TranslationManager.localize(
            this.translations,
            'filters.future',
            undefined,
            'Future',
          ),
        },
        shadowRoot: this.renderRoot,
        onChange: (selected) => {
          const filters = this.filters.getCurrentFilters(this.config.entity);
          filters.expiry = selected;
          this.filters.saveFilters(this.config.entity, filters);
          this.filters.updateFilterIndicators(filters, this.translations);
          this.applyFiltersWithoutRender();
        },
      });

      initializeMultiSelect({
        id: ELEMENTS.FILTER_QUANTITY,
        options: ['zero', 'nonzero'],
        selected: filters.quantity,
        placeholder: TranslationManager.localize(
          this.translations,
          'filters.all_quantities',
          undefined,
          'All Quantities',
        ),
        labels: {
          zero: TranslationManager.localize(this.translations, 'filters.zero', undefined, 'Zero'),
          nonzero: TranslationManager.localize(
            this.translations,
            'filters.non_zero',
            undefined,
            'Non-zero',
          ),
        },
        shadowRoot: this.renderRoot,
        onChange: (selected) => {
          const filters = this.filters.getCurrentFilters(this.config.entity);
          filters.quantity = selected;
          this.filters.saveFilters(this.config.entity, filters);
          this.filters.updateFilterIndicators(filters, this.translations);
          this.applyFiltersWithoutRender();
        },
      });
    }, 0);
  }

  private applyFiltersWithoutRender(): void {
    const state = this.hass.states[this.config.entity];
    if (!state) return;

    const filters = this.filters.getCurrentFilters(this.config.entity);
    const sortMethodElement = this.renderRoot.querySelector(
      `#${ELEMENTS.SORT_METHOD}`,
    ) as HTMLSelectElement | null;
    const sortMethod = sortMethodElement?.value || filters.sortMethod || DEFAULTS.SORT_METHOD;

    const allItems = Utilities.validateInventoryItems(state.attributes?.items || []);
    const filteredItems = this.filters.filterItems(allItems, filters);
    const sortedItems = this.filters.sortItems(filteredItems, sortMethod, this.translations);

    this.updateItemsCallback(sortedItems, sortMethod);
  }
}
