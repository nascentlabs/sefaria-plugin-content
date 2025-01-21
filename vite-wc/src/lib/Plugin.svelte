<svelte:options customElement={{ tag: "sefaria-plugin", shadow: "none" }} />

<script>
  import ContentYoutube from "./ContentYoutube.svelte";
  let { sref } = $props();
</script>
<p>Content for <strong>{sref}</strong></p>
<ContentYoutube {sref}></ContentYoutube>