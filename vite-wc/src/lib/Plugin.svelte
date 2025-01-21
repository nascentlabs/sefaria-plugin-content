<svelte:options customElement={{ tag: "sefaria-plugin", shadow: "none" }} />

<script>
  import ContentSwitcher from "./ContentSwitcher.svelte";
  let { sref } = $props();
</script>
<p>Content for <strong>{sref}</strong></p>
<ContentSwitcher {sref}></ContentSwitcher>