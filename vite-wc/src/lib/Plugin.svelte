<svelte:options customElement="sefaria-plugin" />

<script>
  let { sref } = $props();
</script>

<p>Content for <strong>{sref}</strong></p>
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/2ixetloUNE4?si=fqerg2Iu1OWdaVCq"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>
