<script>
  import { tick } from "svelte";
  let { sref } = $props();

  const uid = crypto.randomUUID();
  let singletonWasPlayerInstantiated = $state(false);


  tick().then(() => {
    if (singletonWasPlayerInstantiated === true) {
      return;
    }
    singletonWasPlayerInstantiated = true
    // @ts-ignore
    const player = new YT.Player(uid, {
      height: "315",
      width: "560",
      videoId: "2ixetloUNE4",
      autoplay: "1",
      rel: "0",
    });
  });
</script>

<div id={uid}></div>