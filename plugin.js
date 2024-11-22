class SefariaPlugin extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // State variables
    const a1 = 'eGFpLVJqcm1BVjBQcXNSa0NHTU1uakN4Q3RrcjdJb2Z5NTdjNUN'
    const a2 = '1a0xIckhSd09pc1J3TW9qZTlhNGNsVDlnMFJBSFZHd3ZFY1RZT0lXS1VqbkVj'
    this.b = atob(`${a1}${a2}`)
    
    // Create a container for the results or player
    this.container = document.createElement('div');
    this.shadowRoot.appendChild(this.container);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      div {
        font-family: Arial, sans-serif;
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
      this.fetchData(newValue);
    }
  }

  // Fetch data when the component is added to the DOM
  connectedCallback() {
    const query = this.getAttribute('sref');
    if (query) {
      // this.fetchData(query);
    }
  }

  async fetchData(query) {
    const apiUrl = `https://www.sefaria.org/api/v3/texts/${query}`;
    this.container.innerHTML = '';
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const tempElem = document.createElement('p');
      tempElem.innerHTML = data.versions.find((version) => version.language === 'he').text
      const text = tempElem.textContent
      const promptResult = await this.promptLLM(text, query)
      this.renderResults(promptResult, query);
    } catch (error) {
      console.error('Error fetching data:', error);
      this.container.innerHTML = '<p>Error fetching data.</p>';
    }
  }

  async promptLLM(text, query) {
    const body = {
      messages: [
        {
          role: "system",
          content: "You are a translator"
        },
        {
          role: "user",
          content: `Please translate the following text from ${query}": ${text}`
        }
      ],
      "model": "grok-beta",
      "stream": false,
      "temperature": 0
    }
    const request = new Request("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.b}`
      },
      body: JSON.stringify(body),
    });
    const response = await fetch(request)
    const data = await response.json()
    return data.choices[0].message.content
  }

  renderResults(text, query) {
    this.container.innerHTML = `<h1>Grok LLM Transaltion of ${query}</h1>`;
    const pElem = document.createElement('p');
    pElem.innerText = text
    this.container.appendChild(pElem);
  }
}

// Define the new custom element
customElements.define('sefaria-plugin', SefariaPlugin);
