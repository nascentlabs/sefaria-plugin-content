<script>
  import { youtubeIframePlayerApiState } from "./StateYoutube.svelte";

  // @ts-ignore
  // window.onYouTubeIframeAPIReady = () => {
    // youtubeIframePlayerApiState.ready = true;
    // console.log('window.onYouTubeIframeAPIReady called')
  // };

  const initYoutubeIframeApiScript = () => {
    const tagName = 'script'
    const attributeName = 'src'
    const attributeValue = 'https://www.youtube.com/player_api' 
    const existingScript = document.querySelector(
      `${tagName}[${attributeName}="${attributeValue}"]`,
    );
    if (existingScript == null) {
      const tag = document.createElement(tagName);
      tag[attributeName] = attributeValue;
      const firstScriptTag = document.getElementsByTagName(tagName)[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  };
  // initYoutubeIframeApiScript();
</script>
