<svelte:options customElement="sefaria-plugin" />

<script>
  import Init from "./Init.svelte";
  import ContentYoutube from "./ContentYoutube.svelte";
  let { sref } = $props();
</script>
<Init></Init>
<ContentYoutube sref={sref}></ContentYoutube>