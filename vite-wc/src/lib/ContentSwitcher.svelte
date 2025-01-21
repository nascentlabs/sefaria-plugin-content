<script>
  import ContentApplePodcasts from "./ContentApplePodcasts.svelte";
  import ContentYoutube from "./ContentYoutube.svelte";
  import LogoYoutube from "./LogoYoutube.svelte";
  import LogoApple from "./LogoApple.svelte";
  let { sref } = $props();
  let uiState = $state(0);
  const onYoutubeClick = () => {
    uiState = 1;
  };
  const onAppleClick = () => {
    uiState = 2;
  };
</script>

{#if uiState === 0}
  <p>Available content:</p>
  <div class="grid">
    <div style="width: 4rem; display: flex; justify-self: center;" onclick={onYoutubeClick}>
      <LogoYoutube />
    </div>
    <div
      style="justify-self: start; display: flex; align-items: center; padding: 0px 1rem"
      onclick={onYoutubeClick}>
      <span>Youtube Videos</span>
    </div>
    <div style="width: 2rem; display: flex; justify-self: center;" onclick={onAppleClick}>
      <LogoApple />
    </div>
    <div
      style="justify-self: start; display: flex; align-items: center; padding: 0px 1rem"
      onclick={onAppleClick}
    >
      <span>Apple Podcasts</span>
    </div>
  </div>
{:else if uiState === 1}
  <ContentYoutube {sref}></ContentYoutube>
{:else if uiState === 2}
  <ContentApplePodcasts {sref}></ContentApplePodcasts>
{/if}

<style>
  div.grid {
    display: grid;
    grid-template-columns: 4rem 1fr;
    align-items: stretch;
    gap: 0.25rem 0rem;
    cursor: pointer;
  }
</style>
