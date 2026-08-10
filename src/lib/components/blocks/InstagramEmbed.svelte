<script lang="ts">
  let { subhead = '', quote = '', body = '', video = '', bgColor = '#fafafa' }: {
    subhead?: string; quote?: string; body?: string; video?: string; bgColor?: string;
  } = $props();

  // Accepts full URL (post, reel, tv) or bare shortcode
  const shortcode = $derived.by(() => {
    if (!video) return '';
    const match = video.match(/instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/);
    return match ? match[1] : video;
  });

  const embedUrl = $derived(shortcode ? `https://www.instagram.com/p/${shortcode}/embed/` : '');
</script>

<section class="block-instagram" style="background: {bgColor}">
  <div class="container">
    <div class="grid-22">

      {#if subhead}
        <p class="t-label block-subhead">{subhead}</p>
      {/if}

      {#if quote}
        <h2 class="t-heading block-quote">{@html quote}</h2>
      {/if}

      {#if embedUrl}
        <div class="embed-wrap">
          <iframe
            src={embedUrl}
            title={subhead || 'Instagram post'}
            frameborder="0"
            scrolling="no"
            allowtransparency
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
  .block-instagram { padding: 60px 0; }

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

  .embed-wrap {
    grid-column: 7 / 17;
    grid-row: 2;
    /* Instagram embeds are 540px wide; let them centre at their natural size */
    display: flex;
    justify-content: center;
  }

  .embed-wrap iframe {
    width: 540px;
    max-width: 100%;
    /* Instagram's embed page auto-sizes to ~540×700px for a standard post */
    height: 700px;
    border: none;
    display: block;
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
    .embed-wrap    { grid-column: 1 / -1; grid-row: auto; margin-top: 20px; }
    .block-body    { grid-column: 1 / -1; grid-row: auto; }
  }
</style>
