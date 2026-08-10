<script lang="ts">
  let { subhead, quote = '', video, body, bgColor = '#fafafa', aspectRatio = '16 / 9' }: { subhead: string; quote?: string; video: string; body: string; bgColor?: string; aspectRatio?: string } = $props();

  // Convert share URLs to embed URLs
  const embedUrl = $derived.by(() => {
    if (!video) return '';
    const ytMatch = video.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    const vimeoMatch = video.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?title=0&byline=0&portrait=0`;
    return video;
  });
</script>

<section class="block-video" style="background: {bgColor}">
  <div class="container">
    <div class="grid-22">

      {#if subhead}
        <p class="t-label block-subhead">{subhead}</p>
      {/if}

      {#if quote}
        <h2 class="t-heading block-quote">{@html quote}</h2>
      {/if}

      {#if embedUrl}
        <div class="video-wrap" style="--aspect-ratio: {aspectRatio}">
          <iframe
            src={embedUrl}
            title={subhead || 'Video'}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      {/if}

      {#if body}
        <p class="t-body-large block-body">{@html body}</p>
      {/if}

    </div>
  </div>
</section>

<style>
  .block-video { padding: 60px 0; }

  .block-subhead {
    grid-column: 2 / 4;
    grid-row: 1;
    align-self: start;
    margin-top: 6px;
  }

  .block-quote {
    grid-column: 7 / 17;
    grid-row: 1;
    margin-bottom: 20px;
    text-wrap: balance;
  }

  .video-wrap {
    grid-column: 5 / 18;
    grid-row: 2;
    position: relative;
    aspect-ratio: var(--aspect-ratio, 16 / 9);
    border-radius: 20px;
    overflow: hidden;
  }

  .video-wrap iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .block-body {
    grid-column: 7 / 16;
    grid-row: 3;
    margin-top: 24px;
    text-wrap: balance;
  }

  @media (max-width: 767px) {
    .block-subhead { grid-column: 1 / -1; grid-row: auto; margin-bottom: 12px; }
    .block-quote   { grid-column: 1 / -1; grid-row: auto; }
    .video-wrap    { grid-column: 1 / -1; grid-row: auto; margin-top: 36px;}
    .block-body    { grid-column: 1 / -1; grid-row: auto; }
  }
</style>
