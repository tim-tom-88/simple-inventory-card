import { TemplateResult, CSSResult, LitElement, html } from 'lit-element';
import { HomeAssistant, InventoryConfig } from '../types/homeAssistant';
import { Utilities } from '../utils/utilities';
import {
  createEntitySelector,
  createEntityInfo,
  createNoEntityMessage,
  createItemClickActionEditor,
  createSortMethodSelector,
} from '../templates/configEditor';
import { configEditorStyles } from '../styles/configEditor';
import { TranslationData } from '@/types/translatableComponent';
import { TranslationManager } from '@/services/translationManager';
import { DEFAULTS, SORT_METHODS } from '@/utils/constants';

class ConfigEditor extends LitElement {
  public hass?: HomeAssistant;
  private _config?: InventoryConfig;
  private _translations: TranslationData = {};

  constructor() {
    super();
    this._config = { entity: '', type: '', sort_method: DEFAULTS.SORT_METHOD };
  }

  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
    };
  }

  async firstUpdated() {
    await this._loadTranslations();
  }

  async updated(changedProps: Map<string | number | symbol, unknown>) {
    if (changedProps.has('hass') && this.hass) {
      const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
      if (
        !oldHass ||
        oldHass.language !== this.hass.language ||
        oldHass.selectedLanguage !== this.hass.selectedLanguage
      ) {
        await this._loadTranslations();
      }
    }
  }

  private async _loadTranslations(): Promise<void> {
    const language = this.hass?.language || this.hass?.selectedLanguage || 'en';
    try {
      this._translations = await TranslationManager.loadTranslations(language);
      this.requestUpdate();
    } catch (error) {
      console.warn('Failed to load translations:', error);
      this._translations = {};
    }
  }

  setConfig(config: InventoryConfig): void {
    this._config = { ...config, sort_method: config.sort_method || DEFAULTS.SORT_METHOD };
  }

  get _entity(): string {
    return this._config?.entity || '';
  }

  render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html`<div>
        ${TranslationManager.localize(
          this._translations,
          'common.loading',
          undefined,
          'Loading...',
        )}
      </div>`;
    }
    const inventoryEntities = Utilities.findInventoryEntities(this.hass);
    const entityOptions = Utilities.createEntityOptions(this.hass, inventoryEntities);
    const sortOptions = this._createSortOptions();
    const selectedSort = this._config.sort_method || DEFAULTS.SORT_METHOD;

    if (!this._config.entity && inventoryEntities.length > 0) {
      if (!this._config.type) {
        this._config.type = 'custom:simple-inventory-card-custom';
      }

      this._config.entity = inventoryEntities[0];
      this.dispatchEvent(
        new CustomEvent('config-changed', {
          detail: { config: this._config },
          bubbles: true,
          composed: true,
        }),
      );
    }

    return html`
      <div class="card-config">
        ${createEntitySelector(
          this.hass,
          entityOptions,
          this._entity,
          this._valueChanged.bind(this),
          this._translations,
        )}
        ${createSortMethodSelector(
          this.hass,
          sortOptions,
          selectedSort,
          this._sortMethodChanged.bind(this),
          this._translations,
        )}
        ${createItemClickActionEditor(
          this._config?.item_click_action?.service || '',
          this._stringifyJson(this._config?.item_click_action?.target),
          this._stringifyJson(this._config?.item_click_action?.data),
          this._stringifyYaml(this._config?.item_click_action),
          this._actionValueChanged.bind(this),
          this._actionYamlChanged.bind(this),
          this._translations,
        )}
        ${this._entity
          ? createEntityInfo(this.hass, this._entity, this._translations)
          : createNoEntityMessage(this._translations)}
      </div>
    `;
  }

  private _valueChanged(event_: CustomEvent): void {
    if (!this._config) {
      return;
    }

    const value = event_.detail?.value;

    if (this._entity === value) {
      return;
    }

    const config: InventoryConfig = {
      ...this._config,
      entity: value,
      sort_method: this._config.sort_method || DEFAULTS.SORT_METHOD,
      type: this._config.type || 'custom:simple-inventory-card-custom',
    };

    this._config = config;

    this.requestUpdate();

    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _actionValueChanged(event_: Event): void {
    if (!this._config) {
      return;
    }

    const target = event_.target as HTMLInputElement;
    const field = target?.dataset?.field;
    if (!field) {
      return;
    }

    const value = target.value ?? '';
    const nextAction = { ...(this._config.item_click_action || {}) };

    if (field === 'item_click_service') {
      if (value.trim()) {
        nextAction.service = value.trim();
      } else {
        delete nextAction.service;
      }
    }

    if (field === 'item_click_target') {
      const parsed = this._parseJsonInput(value);
      if (parsed === undefined) {
        return;
      }
      if (parsed) {
        nextAction.target = parsed;
      } else {
        delete nextAction.target;
      }
    }

    if (field === 'item_click_data') {
      const parsed = this._parseJsonInput(value);
      if (parsed === undefined) {
        return;
      }
      if (parsed) {
        nextAction.data = parsed;
      } else {
        delete nextAction.data;
      }
    }

    const hasActionValues =
      (nextAction.service && nextAction.service.trim()) || nextAction.target || nextAction.data;

    const config: InventoryConfig = {
      ...this._config,
      ...(hasActionValues ? { item_click_action: nextAction } : {}),
      sort_method: this._config.sort_method || DEFAULTS.SORT_METHOD,
      type: this._config.type || 'custom:simple-inventory-card-custom',
    };

    this._config = config;
    this.requestUpdate();

    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _actionYamlChanged(event_: CustomEvent): void {
    if (!this._config) {
      return;
    }

    const value =
      (event_.detail?.value as string | undefined) ||
      ((event_.target as HTMLInputElement | undefined)?.value ?? '');
    const parsed = this._parseYamlOrJsonInput(value);
    if (parsed === undefined) {
      return;
    }

    const config: InventoryConfig = {
      ...this._config,
      ...(parsed ? { item_click_action: parsed } : {}),
      sort_method: this._config.sort_method || DEFAULTS.SORT_METHOD,
      type: this._config.type || 'custom:simple-inventory-card-custom',
    };

    if (!parsed && this._config.item_click_action) {
      delete (config as InventoryConfig & { item_click_action?: unknown }).item_click_action;
    }

    this._config = config;
    this.requestUpdate();

    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _parseJsonInput(value: string): Record<string, any> | undefined | null {
    const trimmed = value.trim();
    if (!trimmed) {
      return null;
    }

    try {
      return JSON.parse(trimmed) as Record<string, any>;
    } catch (error) {
      console.warn('Invalid JSON in item click action field:', error);
      alert('Invalid JSON. Please correct it before saving.');
      return undefined;
    }
  }

  private _parseYamlOrJsonInput(value: string): Record<string, any> | undefined | null {
    const trimmed = value.trim();
    if (!trimmed) {
      return null;
    }

    const yaml = (globalThis as { jsyaml?: { load?: (input: string) => unknown } }).jsyaml;
    if (yaml?.load) {
      try {
        const parsed = yaml.load(trimmed);
        if (parsed && typeof parsed === 'object') {
          return parsed as Record<string, any>;
        }
        return null;
      } catch (error) {
        console.warn('Invalid YAML in item click action field:', error);
        alert('Invalid YAML. Please correct it before saving.');
        return undefined;
      }
    }

    return this._parseJsonInput(value);
  }

  private _sortMethodChanged(event_: CustomEvent): void {
    if (!this._config) {
      return;
    }

    const value = (event_.detail?.value as string | undefined) || DEFAULTS.SORT_METHOD;
    if (this._config.sort_method === value) {
      return;
    }

    const config: InventoryConfig = {
      ...this._config,
      sort_method: value || DEFAULTS.SORT_METHOD,
      type: this._config.type || 'custom:simple-inventory-card-custom',
    };

    this._config = config;
    this.requestUpdate();

    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _createSortOptions(): Array<{ value: string; label: string }> {
    return [
      {
        value: SORT_METHODS.NAME,
        label: TranslationManager.localize(this._translations, 'sort.name', undefined, 'Name'),
      },
      {
        value: SORT_METHODS.CATEGORY,
        label: TranslationManager.localize(
          this._translations,
          'sort.category',
          undefined,
          'Category',
        ),
      },
      {
        value: SORT_METHODS.LOCATION,
        label: TranslationManager.localize(
          this._translations,
          'sort.location',
          undefined,
          'Location',
        ),
      },
      {
        value: SORT_METHODS.QUANTITY,
        label: TranslationManager.localize(
          this._translations,
          'sort.quantity_high',
          undefined,
          'Quantity (High)',
        ),
      },
      {
        value: SORT_METHODS.QUANTITY_LOW,
        label: TranslationManager.localize(
          this._translations,
          'sort.quantity_low',
          undefined,
          'Quantity (Low)',
        ),
      },
      {
        value: SORT_METHODS.EXPIRY,
        label: TranslationManager.localize(
          this._translations,
          'sort.expiry_date',
          undefined,
          'Expiry Date',
        ),
      },
      {
        value: SORT_METHODS.ZERO_LAST,
        label: TranslationManager.localize(
          this._translations,
          'sort.zero_last',
          undefined,
          'Zero Last',
        ),
      },
    ];
  }

  private _stringifyJson(value?: Record<string, any>): string {
    return value ? JSON.stringify(value, null, 2) : '';
  }

  private _stringifyYaml(value?: Record<string, any>): string {
    if (!value) {
      return '';
    }
    const yaml = (globalThis as { jsyaml?: { dump?: (input: unknown) => string } }).jsyaml;
    if (yaml?.dump) {
      try {
        return yaml.dump(value);
      } catch (error) {
        console.warn('Failed to stringify YAML for item click action:', error);
      }
    }
    return this._stringifyJson(value);
  }

  static get styles(): CSSResult {
    return configEditorStyles;
  }
}

export { ConfigEditor };
