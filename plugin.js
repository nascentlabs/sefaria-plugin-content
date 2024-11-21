class DisplayRef extends HTMLElement {
  constructor() {
    super();
    // Attach a shadow DOM tree to this instance
    this.attachShadow({ mode: 'open' });
  }

  // Observe the 'ref' attribute for changes
  static get observedAttributes() {
    return ['sref'];
  }

  // Called when the element is added to the document
  connectedCallback() {
    this.render();
  }

  // Called when an observed attribute has been added, removed, or changed
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  // Render the content inside the shadow DOM
  render() {
    this.shadowRoot.innerHTML = `
      <div class='segment'>
        ${this.getAttribute('sref') || ''}
      </div>
    `;
  }
}

// Define the new custom element
customElements.define('custom-element', DisplayRef);
