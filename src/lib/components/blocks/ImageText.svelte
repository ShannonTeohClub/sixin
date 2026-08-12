<script lang="ts">
  let { subhead, quote, body, image, imageSpan = '7 / 16', bgColor = '#fafafa', imagePosition = 'below',
        caption = '', captionLink = '', sideImage = '' }: {
    subhead: string; quote: string; body: string; image: string;
    imageSpan?: string; bgColor?: string; imagePosition?: string;
    caption?: string; captionLink?: string; sideImage?: string;
  } = $props();
  import { base } from '$app/paths';

  const isSvg = $derived(image?.toLowerCase().endsWith('.svg') ?? false);
  let svgContent = $state('');

  $effect(() => {
    if (!isSvg || !image) { svgContent = ''; return; }
    fetch(`${base}/images/${image}`)
      .then(r => r.text())
      .then(text => {
        svgContent = text.replace(
          /(href=["'])(?!(?:https?:|data:|\/))([^"']+)(["'])/g,
          (_, pre, path, post) => `${pre}${base}/images/${path}${post}`
        );
      });
  });

  const hasSidePanel = $derived(!!(caption || sideImage));
  const hasImageRow = $derived(!!(image || hasSidePanel));
</script>

{#snippet imageRow()}
  <div class="image-side-row">
    {#if image}
      {#if isSvg}
        <div class="block-image svg-wrap" style="grid-column: {imageSpan}">
          {@html svgContent}
        </div>
      {:else}
        <img
          class="block-image"
          src="{base}/images/{image}"
          alt={subhead || ''}
          style="grid-column: {imageSpan}"
        />
      {/if}
    {/if}

    {#if hasSidePanel}
      <div class="side-panel">
        {#if sideImage}
          <img class="side-image" src="{base}/images/thumbnails/{sideImage}" alt="" />
        {/if}
        {#if caption}
          {#if captionLink}
            <a href={captionLink} class="t-caption side-caption">{caption}</a>
          {:else}
            <p class="t-caption side-caption">{caption}</p>
          {/if}
        {/if}
        <svg class="side-arrow" xmlns="http://www.w3.org/2000/svg" width="48" height="17" viewBox="0 0 48 17" fill="none" style="transform: scaleX(-1)">
          <path d="M47.8535 8.35352L8.35352 8.35351" stroke="currentColor"/>
          <path d="M8.35352 16.3535L0.353516 8.35351" stroke="currentColor"/>
          <path d="M0.353516 8.35352L8.35352 0.353517" stroke="currentColor"/>
        </svg>
      </div>
    {/if}
  </div>
{/snippet}

<section class="block-image-text" style="background: {bgColor}">
  <div class="container">
    <div class="grid-22">

      {#if subhead}
        <p class="t-label block-subhead">{@html subhead}</p>
      {/if}

      {#if quote}
        <h2 class="t-heading block-quote">{@html quote}</h2>
      {/if}

      {#if hasImageRow && imagePosition === 'above'}
        {@render imageRow()}
      {/if}

      {#if body}
        <p class="t-body-large block-body">{@html body}</p>
      {/if}

      {#if hasImageRow && imagePosition !== 'above'}
        {@render imageRow()}
      {/if}

    </div>
  </div>
</section>

<style>
  .block-image-text { padding: 60px 0; }

  .block-subhead {
    grid-column: 2 / 4;
    align-self: start;
    margin-top: 6px;
  }

  .block-quote,
  .block-body {
    grid-column: 7 / 17;
  }

  .block-quote { margin-bottom: 20px; text-wrap: balance; }
  .block-body  { text-wrap: balance; }

  .image-side-row {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: subgrid;
    margin-top: 30px;
    margin-bottom: 20px;
  }

  .block-image {
    display: block;
    width: 100%;
    height: auto;
  }

  .svg-wrap :global(svg) {
    width: 100%;
    height: auto;
    display: block;
  }

  .side-panel {
    grid-column: 19 / 22;
    display: flex;
    flex-direction: column;
    align-self: end;
    gap: 12px;
  }

  .side-image {
    width: 100%;
    display: block;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  .side-caption {
    color: inherit;
    text-decoration: none;
  }

  .side-arrow { color: #222; }

  @media (max-width: 767px) {
    .block-subhead { grid-column: 1 / -1; margin-bottom: 8px; }
    .block-quote,
    .block-body { grid-column: 1 / -1; }

    .image-side-row {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .block-image { width: 100%; }

    .side-panel {
      grid-column: unset;
      align-self: auto;
      max-width: 120px;
    }
  }
</style>
