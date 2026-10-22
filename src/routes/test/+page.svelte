<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  // ── Configure squares here ──────────────────────────────
  // Each entry is an array of filenames (in static/videos/).
  // One filename = only one video to play.
  // Multiple filenames = cycles through them on each click.
  const squares: { videos: string[] }[] = [
    { videos: ['square-1-A.mp4'] },
    { videos: ['square-2-A.mp4', 'square-2-B.mp4'] },
    { videos: ['square-3-A.mp4', 'square-3-B.mp4'] },
    { videos: ['square-4-A.mp4'] },
    { videos: ['square-5-A.mp4', 'square-5-B.mp4', 'square-5-C.mp4'] },
    { videos: ['square-6-A.mp4'] },
  ];
  // ───────────────────────────────────────────────────────

  let videoEls = $state<(HTMLVideoElement | null)[]>(Array(6).fill(null));
  let nextIndex = $state<number[]>(Array(6).fill(0));
  // Tracks whether the initial autoplay-pause has already fired
  const initialized: boolean[] = Array(6).fill(false);

  onMount(() => {
    videoEls.forEach((el, i) => {
      if (!el) return;
      // iOS Safari ignores preload="metadata" before interaction.
      // autoplay (muted) forces the first frame to load; we pause
      // immediately on the first play event to freeze on that frame.
      function onFirstPlay() {
        if (!initialized[i]) {
          el!.pause();
          initialized[i] = true;
        }
        el!.removeEventListener('play', onFirstPlay);
      }
      el.addEventListener('play', onFirstPlay);
    });
  });

  function handleClick(i: number) {
    const el = videoEls[i];
    if (!el) return;

    // Mark initialized so any still-pending onFirstPlay won't pause this play
    initialized[i] = true;

    const src = `${base}/videos/${squares[i].videos[nextIndex[i]]}`;
    nextIndex[i] = (nextIndex[i] + 1) % squares[i].videos.length;

    el.src = src;
    el.load();
    el.play().catch(() => {});
  }
</script>

<div class="grid">
  {#each squares as square, i}
    <button class="cell" onclick={() => handleClick(i)}>
      <video
        bind:this={videoEls[i]}
        src="{base}/videos/{square.videos[0]}"
        autoplay
        muted
        playsinline
        preload="auto"
      ></video>
    </button>
  {/each}
</div>

<style>
  .grid {
    margin-top: 200px;
    margin-bottom: 200px;
    display: grid;
    grid-template-columns: repeat(3, 100px);
    justify-content: space-between;
    gap: 4px;
    padding: 20px;
  }

  .cell {
    width: 100px;
    height: 100px;
    padding: 0;
    border: none;
    background: #111;
    cursor: pointer;
    overflow: hidden;
    display: block;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
</style>
