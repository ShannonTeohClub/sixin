<script lang="ts">
  let { subhead, image, p1, p1Bullets, p2, p2Bullets, p3, p3Bullets, bgColor = '#fafafa' }: {
    subhead: string; image: string;
    p1: string; p1Bullets: string;
    p2: string; p2Bullets: string;
    p3: string; p3Bullets: string;
    bgColor?: string;
  } = $props();
  import { base } from '$app/paths';

  const points = $derived.by(() =>
    [
      { title: p1, raw: p1Bullets },
      { title: p2, raw: p2Bullets },
      { title: p3, raw: p3Bullets },
    ]
      .filter(p => p.title)
      .map(p => ({
        title: p.title,
        bullets: p.raw ? p.raw.split('|').map(b => b.trim()).filter(Boolean) : [],
      }))
  );
</script>

<section class="block-process" style="background: {bgColor}">
  <div class="container">
    <div class="grid-22">

      {#if subhead}
        <p class="t-label block-subhead">{subhead}</p>
      {/if}

      <div class="process-left">
        {#if image}
          <img src="{base}/images/{image}" alt="" aria-hidden="true" />
        {/if}
      </div>

      <div class="process-right">
        {#each points as point, i}
          <div class="process-point">
            <span class="t-caption point-num">{String(i + 1).padStart(2, '0')}</span>
            <h3 class="t-heading point-title">{point.title}</h3>
            {#if point.bullets.length}
              <ul class="point-bullets">
                {#each point.bullets as bullet}
                  <li class="t-body-large">{bullet}</li>
                {/each}
              </ul>
            {/if}
          </div>
        {/each}
      </div>

    </div>
  </div>
</section>

<style>
  .block-process { padding: 60px 0; }

  .block-subhead {
    grid-column: 2 / 4;
    grid-row: 1;
    align-self: start;
    margin-top: 6px;
    margin-bottom: 24px;
  }

  .process-left {
    grid-column: 2 / 12;
    grid-row: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
  }

  .process-left img {
    width: 100%;
    height: auto;
    display: block;
    mix-blend-mode: luminosity;
  }

  .process-right {
    grid-column: 13 / 22;
    grid-row: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .process-point {
    display: grid;
    grid-template-columns: 32px 1fr;
    grid-template-rows: auto auto;
    margin-bottom: 30px;
  }
  .process-point:last-child { margin-bottom: 0; }

  .point-num {
    grid-column: 1;
    grid-row: 1;
    align-self: baseline;
    color: #888;
    padding-top: 4px;
  }

  .point-title {
    grid-column: 2;
    grid-row: 1;
    margin: 0;
  }

  .point-bullets {
    grid-column: 2;
    grid-row: 2;
    list-style: disc;
    list-style-position: outside;
    padding-left: 1em;
    margin: 8px 0 0 -1em; /* negative margin pulls dots left of text column */
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  @media (max-width: 767px) {
    .block-subhead { grid-column: 1 / -1; grid-row: auto; }
    .process-left  { grid-column: 1 / -1; grid-row: auto; padding: 0; }
    .process-right { grid-column: 1 / -1; grid-row: auto; margin-top: 40px; }
  }
</style>
