<script>
  import { onDestroy, onMount } from "svelte";
  let { sref } = $props();

  let uid = null;

  onMount(() => {
    console.log("content plugin onMount called");
  });

  onDestroy(() => {
    console.log("content plugin onDestroy called");
    const elem = document.getElementById(uid);
    if (elem) {
      elem.remove();
    }
  });

  function CustomDiv(node) {
    uid = crypto.randomUUID();
    const childDivElem = document.createElement("div");
    childDivElem.id = uid;
    node.appendChild(childDivElem);
    console.log("before player instantiation", node.children[0]);
    // @ts-ignore
    const player = new YT.Player(uid, {
      height: "315",
      width: "560",
      videoId: "2ixetloUNE4",
      autoplay: "1",
      rel: "0",
    });
    console.log("after player instantiation", node.children[0]);
  }
</script>

<!-- <div class="yt-wrapper" use:CustomDiv></div> -->
<iframe
  frameborder="0"
  allowfullscreen
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  title="Introduction to the Zohar by Rabbi Ashlag.wmv"
  src="https://www.youtube.com/embed/2ixetloUNE4?enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A5173&amp;widgetid=1"
></iframe>
