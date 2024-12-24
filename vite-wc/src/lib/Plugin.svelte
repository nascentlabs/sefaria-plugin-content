<svelte:options customElement="sefaria-plugin" />
<script>
  let { sref } = $props();
</script>
<h2>Here is the injected ref: {sref}</h2>