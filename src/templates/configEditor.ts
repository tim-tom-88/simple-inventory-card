import { html, TemplateResult } from 'lit-element';
import { HomeAssistant } from '../types/homeAssistant';
import { TranslationManager } from '@/services/translationManager';
import { TranslationData } from '@/types/translatableComponent';

export function createEntitySelector(
  hass: HomeAssistant,
  entityOptions: Array<{ value: string; label: string }>,
  selectedEntity: string,
  onValueChanged: (event_: CustomEvent) => void,
  translations: TranslationData,
): TemplateResult {
  return html`
    <div class="option">
      <div class="row">
        <div class="col">
          <ha-combo-box
            .hass=${hass}
            .label=${TranslationManager.localize(
              translations,
              'config.inventory_entity_required',
              undefined,
              'Inventory Entity (Required)',
            )}
            .items=${entityOptions}
            .value=${selectedEntity}
            @value-changed=${onValueChanged}
          ></ha-combo-box>
        </div>
      </div>
    </div>
  `;
}

export function createSortMethodSelector(
  hass: HomeAssistant,
  sortOptions: Array<{ value: string; label: string }>,
  selectedSort: string,
  onValueChanged: (event_: CustomEvent) => void,
  translations: TranslationData,
): TemplateResult {
  return html`
    <div class="option">
      <div class="row">
        <div class="col">
          <ha-combo-box
            .hass=${hass}
            .label=${TranslationManager.localize(
              translations,
              'sort.sort_by',
              undefined,
              'Sort by',
            )}
            .items=${sortOptions}
            .value=${selectedSort}
            @value-changed=${onValueChanged}
          ></ha-combo-box>
        </div>
      </div>
    </div>
  `;
}

export function createItemClickActionEditor(
  actionService: string,
  actionTargetJson: string,
  actionDataJson: string,
  actionYaml: string,
  onValueChanged: (event_: Event) => void,
  onYamlChanged: (event_: CustomEvent) => void,
  translations: TranslationData,
): TemplateResult {
  return html`
    <div class="option">
      <div class="section-title">
        ${TranslationManager.localize(
          translations,
          'config.item_click_action',
          undefined,
          'Item click action (optional)',
        )}
      </div>
      <div class="row">
        <div class="col">
          <ha-textfield
            .label=${TranslationManager.localize(
              translations,
              'config.item_click_service',
              undefined,
              'Service (domain.service)',
            )}
            .value=${actionService}
            data-field="item_click_service"
            @change=${onValueChanged}
          ></ha-textfield>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ha-textarea
            .label=${TranslationManager.localize(
              translations,
              'config.item_click_target',
              undefined,
              'Target JSON (optional)',
            )}
            .value=${actionTargetJson}
            placeholder='{"entity_id":"automation.example"}'
            data-field="item_click_target"
            @change=${onValueChanged}
          ></ha-textarea>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ha-textarea
            .label=${TranslationManager.localize(
              translations,
              'config.item_click_data',
              undefined,
              'Data JSON (optional, supports {{location}}, {{name}}, {{quantity}})',
            )}
            .value=${actionDataJson}
            placeholder='{"variables":{"location":"{{location}}","name":"{{name}}"}}'
            data-field="item_click_data"
            @change=${onValueChanged}
          ></ha-textarea>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ha-yaml-editor
            .label=${TranslationManager.localize(
              translations,
              'config.item_click_yaml',
              undefined,
              'Item click action YAML (optional)',
            )}
            .value=${actionYaml}
            @value-changed=${onYamlChanged}
          ></ha-yaml-editor>
        </div>
      </div>
    </div>
  `;
}

export function createEntityInfo(
  hass: HomeAssistant,
  entityId: string,
  translations: TranslationData,
): TemplateResult {
  const state = hass.states[entityId];
  const friendlyName = state?.attributes?.friendly_name || entityId;
  const itemCount = state?.attributes?.items?.length || 0;

  return html`
    <div class="entity-info">
      <div class="info-header">
        ${TranslationManager.localize(
          translations,
          'config.selected_inventory',
          undefined,
          'Selected Inventory:',
        )}
      </div>
      <div class="info-content">
        <strong>${friendlyName}</strong>
        <br />
        <small>${entityId}</small>
        <br />
        <small>
          ${TranslationManager.localize(translations, 'config.items_count', undefined, 'Items')}:
          ${itemCount}
        </small>
      </div>
    </div>
  `;
}

export function createNoEntityMessage(translations: TranslationData): TemplateResult {
  return html`
    <div class="no-entity">
      <ha-icon icon="mdi:information-outline"></ha-icon>
      <div>
        ${TranslationManager.localize(
          translations,
          'config.select_entity_message',
          undefined,
          'Please select an inventory entity above',
        )}
      </div>
    </div>
  `;
}
