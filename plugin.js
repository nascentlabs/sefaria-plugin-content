class SefariaPlugin extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      div {
        font-family: Arial, sans-serif;
        font-size: 18px;
      }
    `;

    this.shadowRoot.appendChild(style);
  }

  // Observe the 'sref' attribute
  static get observedAttributes() {
    return ['sref'];
  }

  // Called when the 'sref' attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'sref' && newValue !== oldValue) {
        // do something
    }
  }

  // Fetch data when the component is added to the DOM
  connectedCallback() {
    const query = this.getAttribute('sref');
    if (query) {
      // do something
    }
  }
}

// Define the new custom element
customElements.define('sefaria-plugin', SefariaPlugin);
