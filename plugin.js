class SefariaPlugin extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // State variables
    const a1 = 'eGFpLVJqcm1BVjBQcXNSa0NHTU1uakN4Q3RrcjdJb2Z5NTdjNUN'
    const a2 = '1a0xIckhSd09pc1J3TW9qZTlhNGNsVDlnMFJBSFZHd3ZFY1RZT0lXS1VqbkVj'
    this.b = atob(`${a1}${a2}`)
    this.counter = 0
    this.uiState = 0
    this.query = ''
    this.loop()
    // Create a container for the results or player
    this.container = document.createElement('div');
    this.container.classList.add('container')
    this.content = document.createElement('div');
    this.shadowRoot.appendChild(this.container);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      div {
        font-family: Arial, sans-serif;
      }
      h3 {
        margin: 0px;
      }
      .container {
        margin-top: 1em;
        background-color: rgba(0,0,0,0.05);
        padding: 1em;
        border-radius: 1em;
      }
    `;

    this.container.appendChild(this.buildLoadingElem())
    this.container.appendChild(this.content)
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
    this.uiState = 1
    this.query = query
    const apiUrl = `https://www.sefaria.org/api/v3/texts/${query}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const tempElem = document.createElement('p');
      tempElem.innerHTML = data.versions.find((version) => version.actualLanguage !== 'en').text
      const text = tempElem.textContent
      const promptResult = await this.promptLLM(text, query)
      this.uiState = 2
      this.renderResults(promptResult, query);
    } catch (error) {
      this.uiState = 3
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

  async renderResults(text, query) {
    this.uiState = 4
    const pElem = document.createElement('p');
    const footerElem = document.createElement('small');
    this.content.appendChild(pElem);
    this.content.appendChild(footerElem);
    let s = ''
    for (let idx = 0; idx < text.length; idx++) {
      s+=text[idx]
      await this.sleep(Math.floor((Math.random() * 70)))
      pElem.innerText = s
    }
    
    const footerStr = '(Please understand! I am an experimental 🤖. I can hallucinate sometimes. 🫣 So please take my translations with a grain of salt!)'
    let footerS = ''
    for (let idx = 0; idx < footerStr.length; idx++) {
      footerS+=footerStr[idx]
      await this.sleep(Math.floor((Math.random() * 100)))
      footerElem.innerText = footerS
    }
    this.uiState = 5
  }

  buildLoadingElem(){
    const loadingElem = document.createElement('div')
    setInterval(()=>{
      const n = this.counter % 4;
      switch (this.uiState) {
        case 1:
          loadingElem.innerHTML = `<h3>🤖 is 🤔 ${'.'.repeat(n)}</h3>`;
          return;
        case 3:
          loadingElem.innerHTML = `<h3>🤖 🤒</h3><small>Whoops! Something went wrong.</small>`;
          return;
        case 4:
          loadingElem.innerHTML = `<h3>🤖 is typing ${'.'.repeat(n)}</h3>`;
          return;
        case 5:
        loadingElem.innerHTML = `<h3>🤖 Translation of ${this.query}</h3>`;
        return;
        default:
          break;
      }
        if(this.uiState === 1){
          return
        }
        
    }, 100)
    return loadingElem
  }

  loop(){
    setInterval(()=>{
        console.log(`Counter: ${this.counter}`)
        this.counter++
        const n = this.counter % 4
    }, 1000)

  }

  sleep(ms){
    return new Promise((resolve)=>{
      setTimeout(resolve, ms)
    })
  }
}

// Define the new custom element
customElements.define('sefaria-plugin', SefariaPlugin);
