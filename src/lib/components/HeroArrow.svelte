<script lang="ts">
  import { onMount } from 'svelte';
  import { DotLottie } from '@lottiefiles/dotlottie-web';
  import { base } from '$app/paths';

  let { style = '' }: { style?: string } = $props();

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const lottie = new DotLottie({
      autoplay: true,
      loop: false,
      canvas,
      src: `${base}/lottie/arrow-loader.lottie`,
    });
    return () => lottie.destroy();
  });
</script>

<div class="hero-arrow" {style}>
  <canvas bind:this={canvas} width="204" height="204"></canvas>
</div>

<style>
  .hero-arrow {
    position: absolute;
    bottom: 30px;
    left: 50%;
    line-height: 0;
    mix-blend-mode: difference;
    animation: arrow-float 1.8s ease-in-out infinite;
  }

  @keyframes arrow-float {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50%       { transform: translateX(-50%) translateY(7px); }
  }

  canvas {
    display: block;
    width: 68px;
    height: 68px;
  }
</style>
