<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  import { base } from '$app/paths';

  // Update filenames to match your files in static/videos/
  const slides = [
    `${base}/videos/featured-1.mp4`,
    `${base}/videos/featured-2.mp4`,
    `${base}/videos/featured-3.mp4`,
  ];

  let { description = 'This is Shannon’s website. He is trained in and has work experience in 3 types of design: 2  Data Vis/Interface Design, 3  Industrial Design and 4  Communication Design. Sometimes all 3 areas manifest in 1  Exhibitions. In his free time he makes visual articles or videos on  5  Business or Culture.' }: { description?: string } = $props();

  let current = $state(0);
  let videoEls: HTMLVideoElement[] = [];
  let timer: ReturnType<typeof setInterval>;

  onMount(() => {
    videoEls[0]?.play().catch(() => {});
    timer = setInterval(() => {
      videoEls[current]?.pause();
      current = (current + 1) % slides.length;
      videoEls[current]?.play().catch(() => {});
    }, 4000);
  });

  onDestroy(() => clearInterval(timer));
</script>

<section class="featured">
  <!-- Videos stacked; only the active one is visible -->
  {#each slides as src, i}
    <video
      bind:this={videoEls[i]}
      {src}
      class="slide"
      class:active={i === current}
      muted
      playsinline
      preload="auto"
    ></video>
  {/each}

  <!-- Caption overlay, aligned to the page column grid -->
  <div class="caption-wrap">
    <div class="container">
      <div class="grid-22">
        <p class="t-heading caption">This is Shannon’s website. 
          He is trained in and has work experience 
          in 3 types of design: <span class="circ-num">2</span><a href="#product">Data Vis / Interface Design</a>, 
          <span class="circ-num">3</span><a href="#product">Industrial Design</a> and 
          <span class="circ-num">4</span><a href="#product">Communication Design</a>. 
          Sometimes all 3 areas manifest in <span class="circ-num">1</span><a href="#product">Exhibitions</a>. 
          </p>
      </div>
    </div>
  </div>
</section>

<style>
  .featured {
    position: relative;
    height: 640px;
    background: #212121;
    overflow: hidden;
  }

  .slide {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.6s ease;
  }

  .slide.active {
    opacity: 1;
  }

  /* Overlay sits above videos, aligned to the bottom */
  .caption-wrap {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 2rem;
    pointer-events: none;
    background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%);
  }

  .caption {
    grid-column: 1 / 20;
    color: white;
    display: inline;
  }

  .caption a {
    pointer-events: all;
    color: inherit;
    text-decoration-thickness: 2px;
  }

    .circ-num {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    color: #212121;
    background: #d9d9d9;
    align-items: center;
    justify-content: center;
    display: inline-flex;
    vertical-align: 1px;
    margin-right: 5px; 
      font-size: 16px;
  font-weight: 300;
  }

  @media (max-width: 768px) {
  .caption  {
    grid-column: 1 / 22;
    /* line-height: 24px; */
  }
  .featured {
    height: 480px;
  }
     .circ-num {
    width: 21px;
    height: 21px;
      font-size: 12px;
  }
}

</style>
