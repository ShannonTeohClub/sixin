<script lang="ts">
  let { images, subhead = '', quote = '', body = '', bgColor = '#fafafa' }: { images: string[]; subhead?: string; quote?: string; body?: string; bgColor?: string } = $props();
  import { base } from '$app/paths';

  const GAP = 30;

  let current    = $state(0);
  let trackEl    = $state<HTMLElement | null>(null);
  let trackWidth = $state(0);

  // Larger peek on desktop, smaller on mobile
  const PEEK_PCT   = $derived(trackWidth < 600 ? 0.1 : 0.5);

  $effect(() => {
    if (!trackEl) return;
    const ro = new ResizeObserver(([e]) => { trackWidth = e.contentRect.width; });
    ro.observe(trackEl);
    return () => ro.disconnect();
  });

  const slideWidth = $derived(trackWidth ? trackWidth * (1 - PEEK_PCT) - GAP : 0);

  function slideTo(index: number) {
    if (!trackEl || !slideWidth) return;
    trackEl.scrollTo({ left: index * (slideWidth + GAP), behavior: 'smooth' });
  }

  function prev() { slideTo(Math.max(0, current - 1)); }
  function next() { slideTo(Math.min(images.length - 1, current + 1)); }

  // Sync counter from native scroll (covers touch swipe)
  $effect(() => {
    if (!trackEl) return;
    function onScroll() {
      if (!trackEl || !slideWidth) return;
      current = Math.round(trackEl.scrollLeft / (slideWidth + GAP));
    }
    trackEl.addEventListener('scroll', onScroll, { passive: true });
    return () => trackEl?.removeEventListener('scroll', onScroll);
  });
</script>

<section class="block-slider" style="background: {bgColor}">
  {#if subhead || quote}
    <div class="container">
      <div class="grid-22"  >
        {#if subhead}<p class="t-label block-subhead">{subhead}</p>{/if}
        {#if quote}<h2 class="t-heading block-quote">{@html quote}</h2>{/if}
      </div>
    </div>
  {/if}
  <div class="slider-wrap" style="margin-bottom: 80px;">
    <div class="slider-controls">
      <button onclick={prev} aria-label="Previous slide">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="17" viewBox="0 0 48 17" fill="none">
          <path d="M47.8535 8.35352L8.35352 8.35351" stroke="currentColor"/>
          <path d="M8.35352 16.3535L0.353516 8.35351" stroke="currentColor"/>
          <path d="M0.353516 8.35352L8.35352 0.353517" stroke="currentColor"/>
        </svg>
              <span class="t-caption counter" style="margin-left: 20px;"> {current + 1} / {images.length}</span>
      </button>
      <button onclick={next} aria-label="Next slide">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="17" viewBox="0 0 48 17" fill="none" style="transform: scaleX(-1)">
          <path d="M47.8535 8.35352L8.35352 8.35351" stroke="currentColor"/>
          <path d="M8.35352 16.3535L0.353516 8.35351" stroke="currentColor"/>
          <path d="M0.353516 8.35352L8.35352 0.353517" stroke="currentColor"/>
        </svg>
      </button>
    </div>
    <div class="slider-track" bind:this={trackEl}>
      {#each images as src}
        <div class="slide" style="width: {slideWidth}px">
          <img src="{base}/images/{src}" alt="" aria-hidden="true" />
        </div>
      {/each}
    </div>



  </div>
  {#if body}
    <div class="container">
      <div class="grid-22">
        <p class="t-body-large block-body">{@html body}</p>
      </div>
    </div>
  {/if}
</section>

<style>
  .block-slider { padding: 80px 0; }

  .block-subhead {
    grid-column: 2 / 4;
    margin-bottom: 24px;
  }

  .block-quote {
    grid-column: 7 / 17;
    margin-bottom: 24px;
    text-wrap: balance;
  }

  .slider-wrap {
    position: relative;
    height: 500px;
    /* overflow: hidden; */
  }

  /* Scrollable track — controls live outside it so they don't scroll away */
  .slider-track {
    height: 100%;
    display: flex;
    gap: 50px;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-left: 50px;
    scroll-padding-left: 50px;
    padding-right: 50px;
    scroll-padding-right: 50px;
  
  }
  .slider-track::-webkit-scrollbar { display: none; }

  .slide {
    flex-shrink: 0;
    height: 100%;
    scroll-snap-align: start;
  }

  .slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .slider-controls {
    overflow: visible;
    /* position: absolute;
    top: -40px;
    right: 20%; */
    width: 100%;
    max-width: 1200px;
    margin: 20px auto;
    display: flex;
    padding: 10px;
justify-content: space-between;
    /* align-items: center; */
    gap: 20px;
    z-index: 1;
    pointer-events: none; /* let swipe touches pass through to the track */
  }
  .slider-controls button { pointer-events: all; }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: #222;
    display: flex;
    align-items: center;
    line-height: 0;
  }

  button:hover { opacity: 0.5; }

  .counter { color: #888; }

  .block-body {
    grid-column: 7 / 16;
    margin-bottom: 40px;
    text-wrap: balance;
  }

  @media (max-width: 767px) {
    .block-quote,
    .block-body { grid-column: 1 / -1; }
    
    .slider-wrap { height: 220px; }
    .slide {  }
    .slider-track {
          padding-left: 5px;
    scroll-padding-left: 5px;
    padding-right: 5px;
    scroll-padding-right: 5px;
    }

      .slider-controls {
    top: -40px;
    right: 10%;
      }
  }
</style>
