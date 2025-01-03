<script>
  import { onDestroy, onMount } from "svelte";
  let { sref } = $props();

  const uid = crypto.randomUUID();

  onMount(()=>{
    console.log('content plugin onMount called')
    // @ts-ignore
    const player = new YT.Player(uid, {
      height: "315",
      width: "560",
      videoId: "2ixetloUNE4",
      autoplay: "1",
      rel: "0",
    });
  })

  onDestroy(()=>{
    console.log('content plugin onDestroy called')
    const elem = document.getElementById(uid)
    if(elem){
      elem.remove()
    }
  })
</script>

<div id={uid}></div>