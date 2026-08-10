<script lang="ts">
  let { subhead, quote, video, caption, body, bgColor = '#fafafa' }: {
    subhead: string; quote: string; video: string; caption: string; body: string; bgColor?: string;
  } = $props();
  const base = import.meta.env.BASE_URL;
</script>

<section class="block-video-local" style="background: {bgColor}">
  <div class="container">
    <div class="grid-22">

      {#if subhead}
        <p class="t-label block-subhead">{subhead}</p>
      {/if}

      {#if quote}
        <h2 class="t-heading block-quote">{@html quote}</h2>
      {/if}

      {#if video}
        <!-- svelte-ignore a11y_media_has_caption -->
        <video class="block-video" autoplay loop muted playsinline>
          <source src="{base}videos/{video}" />
        </video>
      {/if}

      {#if caption}
        <p class="t-caption block-caption">{caption}</p>
      {/if}

      {#if body}
        <p class="t-body-large block-body">{@html body}</p>
      {/if}

    </div>
  </div>
</section>

<style>
  .block-video-local { padding: 60px 0; }

  .block-subhead {
    grid-column: 2 / 4;
    grid-row: 1;
    align-self: start;
    margin-top: 6px;
  }

  .block-quote {
    grid-column: 7 / 17;
    grid-row: 1;
    margin-bottom: 30px;
    text-wrap: balance;
  }

  .block-video {
    grid-column: 7 / 17;
    grid-row: 2;
    width: 100%;
    height: auto;
    display: block;
  }

  .block-caption {
    grid-column: 18 / 21;
    grid-row: 2;
    align-self: end;
    border-top: 1px solid #b1b1b1;
    padding-top: 15px;
    /* color: #888; */
  }

  .block-body {
    grid-column: 7 / 17;
    grid-row: 3;
    margin-top: 24px;
    text-wrap: balance;
  }

  @media (max-width: 767px) {
    .block-subhead { grid-column: 1 / -1; grid-row: auto; margin-bottom: 12px; }
    .block-quote   { grid-column: 1 / -1; grid-row: auto; }
    .block-video   { grid-column: 1 / -1; grid-row: auto; }
    .block-caption { grid-column: 1 / -1; grid-row: auto; border-top: 1px solid #b1b1b1; padding-top: 12px; margin-top: 12px; max-width: 70%; text-wrap: pretty;}
    .block-body    { grid-column: 1 / -1; grid-row: auto; }
  }
</style>
