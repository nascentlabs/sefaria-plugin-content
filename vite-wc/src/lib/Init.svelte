<script>
  import { youtubeIframePlayerApiState } from './StateYoutube.svelte';

  // @ts-ignore
  window.onYouTubeIframeAPIReady() {
    youtubeIframePlayerApiState.ready = true
  }

  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  console.log('init called', youtubeIframePlayerApiState)
</script>