<script>
  import { onDestroy, onMount } from "svelte";
  import YouTubePlayer from "youtube-player";

  let { sref } = $props();

  let uid = null;

  function CustomDiv(node) {
    uid = crypto.randomUUID();
    const childDivElem = document.createElement("div");
    childDivElem.id = uid;
    node.appendChild(childDivElem);
    console.log("before player instantiation", node.children[0]);
    const player = YouTubePlayer(uid, {
      width: "100%",
      videoId: "2ixetloUNE4",
      autoplay: "1",
      rel: "0",
    });
    console.log("after player instantiation", node.children[0]);

    setTimeout(() => {
      console.log("after a while", node.children[0]);
    }, 1000);
  }
</script>

<div class="yt-wrapper" use:CustomDiv></div>
