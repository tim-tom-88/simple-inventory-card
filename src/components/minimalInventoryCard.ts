import packageJson from '../../package.json';

import { SimpleInventoryCard } from './simpleInventoryCard';
import { InventoryConfig } from '../types/homeAssistant';

const minimalCardDescription = 'A minimalist card to manage your inventories';

class MinimalInventoryCard extends SimpleInventoryCard {
  setConfig(config: InventoryConfig): void {
    const nextConfig: InventoryConfig = {
      ...config,
      minimal: true,
      type: config.type || 'custom:simple-inventory-card-custom-minimal',
    };

    super.setConfig(nextConfig);
  }
}

export { MinimalInventoryCard };

if (!customElements.get('simple-inventory-card-custom-minimal')) {
  customElements.define('simple-inventory-card-custom-minimal', MinimalInventoryCard);
}

window.customCards = window.customCards || [];
const minimalCardConfig = {
  type: 'simple-inventory-card-custom-minimal',
  name: 'Simple Inventory Card Minimal',
  description: minimalCardDescription,
  preview: true,
  documentationURL: 'https://github.com/blaineventurine/simple-inventory-card-custom',
};

const existingMinimalCard = window.customCards.find(
  (card) => card.type === 'simple-inventory-card-custom-minimal',
);
if (!existingMinimalCard) {
  window.customCards.push(minimalCardConfig);
}

globalThis.setTimeout(() => {
  const event = new Event('custom_card_update', {
    bubbles: true,
    cancelable: false,
  });
  document.dispatchEvent(event);
}, 2000);

console.info(
  `%c Simple Inventory Card Minimal %c ${packageJson.version}`,
  'color: steelblue; background: black; font-weight: bold;',
);
