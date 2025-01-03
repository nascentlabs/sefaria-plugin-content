<svelte:options customElement="sefaria-plugin" />

<script>
  import Init from "./Init.svelte";
  import ContentYoutube from "./ContentYoutube.svelte";
  import { youtubeIframePlayerApiState } from "./StateYoutube.svelte";

  let { sref } = $props();
</script>

<Init></Init>
<p>Content for <strong>{sref}</strong></p>
{#if youtubeIframePlayerApiState.ready === true || true}
  <ContentYoutube {sref}></ContentYoutube>
{:else}
  <p>Loading...</p>
{/if}
