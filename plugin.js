class LectureSearch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // State variables
    this.isPlaying = false;
    this.currentLecture = null;

    // Create a container for the results or player
    this.container = document.createElement('div');
    this.shadowRoot.appendChild(this.container);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
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
        cursor: pointer;
      }
      a:hover {
        text-decoration: underline;
      }
      button {
        margin-bottom: 10px;
      }
      audio {
        width: 100%;
        margin-top: 10px;
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
      // Only fetch data if not in media player mode
      if (!this.isPlaying) {
        this.fetchData(newValue);
      }
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
      this.renderResults(data.response.docs, query);
    } catch (error) {
      console.error('Error fetching data:', error);
      this.container.innerHTML = '<p>Error fetching data.</p>';
    }
  }

  renderResults(docs, query) {
    this.container.innerHTML = ''; // Clear previous content

    if (!docs || docs.length === 0) {
      this.container.innerHTML = '<p>No results found.</p>';
      return;
    } else {
      this.container.innerHTML = `<h1>YUTorah Shiurim for ${query}</h1>`;
    }

    const list = document.createElement('ul');

    docs.forEach(doc => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');

      // Use a clickable span instead of a link to prevent default navigation
      link.textContent = doc.shiurtitle;
      link.addEventListener('click', () => {
        this.playLecture(doc);
      });
      listItem.appendChild(link);
      list.appendChild(listItem);
    });

    this.container.appendChild(list);
  }

  playLecture(doc) {
    this.isPlaying = true;
    this.currentLecture = doc;
    this.renderPlayer();
  }

  renderPlayer() {
    this.container.innerHTML = ''; // Clear previous content

    // Back Button
    const backButton = document.createElement('button');
    backButton.textContent = '← Back to Lectures';
    backButton.addEventListener('click', () => {
      this.isPlaying = false;
      this.currentLecture = null;
      const query = this.getAttribute('sref');
      this.fetchData(query);
    });
    this.container.appendChild(backButton);

    // Lecture Title
    const title = document.createElement('h3');
    title.textContent = this.currentLecture.shiurtitle;
    this.container.appendChild(title);

    // Audio Player
    const audioPlayer = document.createElement('audio');
    audioPlayer.controls = true;
    audioPlayer.src = this.currentLecture.shiurdownloadurl || '';
    audioPlayer.type = 'audio/mpeg';
    this.container.appendChild(audioPlayer);
  }
}

// Define the new custom element
customElements.define('sefaria-plugin', LectureSearch);
