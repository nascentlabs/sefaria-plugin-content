
  class LectureSearch extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });

      // Create a container for the results
      this.resultsContainer = document.createElement('div');
      this.shadowRoot.appendChild(this.resultsContainer);

      // Optionally, add styles
      const style = document.createElement('style');
      style.textContent = `
        /* Add your styles here */
        div {
          font-family: Arial, sans-serif;
        }
        ul {
          list-style-type: disclosure-closed;
          padding-left: 0;
        }
        li {
          margin: 5px 0;
        }
        a {
          text-decoration: none;
          color: #000000;
          font-family: cursive;
          font-size: 14px;
        }
        a:hover {
          text-decoration: underline;
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
        this.fetchData(query);
      }
    }

    async fetchData(query) {
      const encodedQuery = encodeURIComponent(query);
      const currentDate = new Date().toISOString();
      const encodedDate = encodeURIComponent(currentDate);
      const apiUrl = `https://www.yutorah.org/Search/GetSearchResults?sort_by=score+desc&organizationID=301&search_query=${encodedQuery}&page=1&facet_query=shiurdate%3A%5B*+TO+${encodedDate}%5D%2Cteacherishidden%3A0`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        this.renderResults(data.response.docs);
      } catch (error) {
        console.error('Error fetching data:', error);
        this.resultsContainer.innerHTML = '<p>Error fetching data.</p>';
      }
    }

    renderResults(docs) {
      this.resultsContainer.innerHTML = ''; // Clear previous results

      if (!docs || docs.length === 0) {
        this.resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
      }

      const list = document.createElement('ul');

      docs.forEach(doc => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');

        link.href = doc.shiurdownloadurl || '#';
        link.textContent = doc.shiurtitle;
        link.target = '_blank'; // Open in a new tab
        listItem.appendChild(link);
        list.appendChild(listItem);
      });

      this.resultsContainer.appendChild(list);
    }
  }

// Define the new custom element
customElements.define('custom-element', LectureSearch);
