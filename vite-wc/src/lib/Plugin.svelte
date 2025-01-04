<svelte:options customElement={{ tag: "sefaria-plugin", shadow: "none" }} />

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
