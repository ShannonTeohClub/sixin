<script lang="ts">
  let { subhead = '', quote = '', body = '', bgColor = '#fafafa', images = '', photoSpans = '', rowHeights = '' }: {
    subhead?: string; quote?: string; body?: string; bgColor?: string;
    images?: string; photoSpans?: string; rowHeights?: string;
  } = $props();
  const base = import.meta.env.BASE_URL;

  const imageList = $derived(images.split(',').map(s => s.trim()).filter(Boolean));
  const heightList = $derived(rowHeights.split(',').map(s => parseInt(s.trim()) || 300));

  const rows = $derived.by(() => {
    const spanRows = photoSpans.split('|').map(row =>
      row.split(',').map(s => s.trim().replace('/', ' / '))
    );
    let idx = 0;
    return spanRows.map((spans, i) => ({
      height: heightList[i] ?? 300,
      items: spans.map(span => ({ image: imageList[idx++] ?? '', span }))
    }));
  });
</script>

<section class="block-photo-grid" style="background: {bgColor}">
  <div class="container">
    <div class="grid-22">

      {#if subhead}
        <p class="t-label block-subhead">{@html subhead}</p>
      {/if}

      {#if quote}
        <h2 class="t-heading block-quote" style="margin-bottom: 70px;">{@html quote}</h2>
      {/if}

      {#each rows as row}
        <div class="photo-row" style="height: {row.height}px">
          {#each row.items as item}
            {#if item.image}
              <img
                class="photo-item"
                src="{base}images/{item.image}"
                alt=""
                aria-hidden="true"
                style="grid-column: {item.span}"
              />
            {/if}
          {/each}
        </div>
      {/each}

      {#if body}
        <p class="t-body-large block-body">{@html body}</p>
      {/if}

    </div>
  </div>
</section>

<style>
  .block-photo-grid { padding: 60px 0; }

  .block-subhead {
    grid-column: 2 / 4;
    align-self: start;
    margin-bottom: 20px;
  }

  .block-quote {
    grid-column: 7 / 17;
    margin-bottom: 20px;
    text-wrap: balance;
  }

  .photo-row {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: subgrid;
    grid-auto-rows: 100%;
    gap: 5px;
    margin-bottom: 0px;
    overflow: hidden;
  }
  .photo-row:last-of-type { margin-bottom: 0; }

  .photo-item {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .block-body {
    grid-column: 7 / 17;
    margin-top: 30px;
    text-wrap: balance;
  }

  @media (max-width: 767px) {
    .block-subhead { grid-column: 1 / -1; }
    .block-quote   { grid-column: 1 / -1; }

    .photo-row {
      height: auto !important;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .photo-item {
      grid-column: unset !important;
      width: 100%;
      height: 400px;
      aspect-ratio: unset;
    }

    .block-body { grid-column: 1 / -1; }
  }
</style>
