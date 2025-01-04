<script>
  import { onMount } from "svelte";
  import YouTubePlayer from "youtube-player";

  let { sref } = $props();

  const uid = crypto.randomUUID();
  let player = null;

  onMount(()=>{
    player = YouTubePlayer(uid, {
      width: "100%",
      videoId: "2ixetloUNE4",
      autoplay: "1",
      rel: "0",
    });
  })
</script>

<div class="yt-wrapper">
  <div id={uid}></div>
</div>
