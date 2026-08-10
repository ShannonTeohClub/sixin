<script lang="ts">
  let { subhead, quote, body, bgColor = '#fafafa' }: { subhead: string; quote: string; body: string; bgColor?: string } = $props();
</script>

<section class="block-text" style="background: {bgColor}">
  <div class="container">
    <div class="grid-22">

      {#if subhead}
        <p class="t-label block-subhead">{subhead}</p>
      {/if}

      {#if quote}
        <h2 class="t-heading block-quote">{@html quote}</h2>
      {/if}

      {#if body}
        <p class="t-body-large block-body">{@html body}</p>
      {/if}

    </div>
  </div>
</section>

<style>
  .block-text { padding: 60px 0; }

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

  @media (max-width: 767px) {
    .block-subhead { grid-column: 1 / -1; margin-bottom: 8px; }
    .block-quote,
    .block-body   { grid-column: 1 / -1; }
  }
</style>
