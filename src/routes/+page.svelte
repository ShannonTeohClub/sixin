<script lang="ts">
  import Featured from '$lib/components/Featured.svelte';
  let { data } = $props();
  import { base } from '$app/paths';
</script>

<Featured />

{#each data.sections as section, i}
  <section class={section.title.toLowerCase()}>
    <div class="container">
      <div class="grid-22">

        <div class="section-num">{i + 1}</div>
        <h2 class="t-heading section-title">{section.DisplayName || section.title}</h2>
        <p class="t-label section-scope" style="color: #888;">{@html section.Scope}</p>
        <p class="t-body-large section-desc">{section.SectionDescription}</p>

        <div class="cards">
          {#each section.projects as project}
            <svelte:element
              this={project.Slug ? 'a' : 'div'}
              href={project.Slug ? (project.Slug.startsWith('http') ? project.Slug : `${base}/projects/${project.Slug}`) : undefined}
              target={project.Slug?.startsWith('http') ? '_blank' : undefined}
              rel={project.Slug?.startsWith('http') ? 'noopener noreferrer' : undefined}
              class="card {project.GridArea || ''}"
              style={project.BgColor ? `background: ${project.BgColor}` : ''}
            >

              <div class="thumb">
                <img
                  class="img-primary"
                  src="{base}/images/thumbnails/{project.Image}"
                  alt={project.Title}
                />
                {#if project.HoverImage}
                  <img class="img-hover" src="{base}/images/thumbnails/{project.HoverImage}" alt="" aria-hidden="true" />
                {/if}
                <!-- Interface only: description sits inside the thumbnail, top-left -->
                <p class="t-caption desc-overlay" style={project.LabelColor ? `color: ${project.LabelColor}` : ""}>{project.Description}</p>
              </div>

              <div class="meta">
                <span class="t-label type-label" style={project.LabelColor ? `color: ${project.LabelColor}` : ''}>
                {@html section.title.toLowerCase() === 'exhibitions' ? (project.BInfo || '') : project.Type}
              </span>
                <h3 class="t-body-large title">
                  {@html project.Title}. <span style={project.LabelColor ? `color: ${project.LabelColor}` : ''}>
                  {#if project.Description2 && section.title.toLowerCase() === 'exhibitions'}
                  {project.Year}.  <br><span style="opacity: 40%;">{project.Description2}</span>
                  {/if}</span>
                </h3>
                <p class="t-caption desc-below">{project.Description}</p>
                {#if project.AInfo && section.title.toLowerCase() === 'exhibitions'}
                  <span class="t-label location">{@html project.AInfo}</span>
                {/if}
              </div>

            </svelte:element>
          {/each}
        </div>

      </div>
    </div>
  </section>
{/each}

<style>
  section { padding: 70px 0; }

  /* ── Section header row ─────────────────────────────────── */
  .section-scope,
  .section-desc {
    grid-column: 3 / 22; /* mobile: aligned under title */
    text-wrap:balance;margin-bottom: 2rem; margin-top: 10px;
  }
  .section-title  { grid-column: 3 / 22; align-self: center; margin-bottom: 0.25rem; }
  .section-scope  { display: none;}


  /* ── Section number circle ──────────────────────────────── */
  .section-num {
    grid-column: 1 / 3; /* mobile: narrow col for circle */
    width: 21px;
    height: 21px;
    border-radius: 50%;
    background: #d9d9d9;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    align-self: center;
margin-bottom: 5px;
  font-size: 12px;
  font-weight: 300;
  }

  /* block so <a> cards don't collapse to inline */
  .card { display: block; color: inherit; text-decoration: none; }

  /* Only the hovered thumbnail gets the name — avoids duplicate names on the page */
  .card:hover .img-primary { view-transition-name: project-thumb; }
  /* Product cards: transition from hover image instead of primary */
  .product .card:hover .img-primary { view-transition-name: none; }
  .product .card:hover .img-hover   { view-transition-name: project-thumb; }

  /* ── Shared thumbnail ───────────────────────────────────── */
  .thumb {
    position: relative;
    overflow: hidden;
  }


  .thumb .img-primary {
    display: block;
    width: 100%;
    aspect-ratio: 28 / 23;
    object-fit: cover;
  }
  /* desc-overlay hidden by default; interface reveals it */
  .desc-overlay { display: none; }

  /* ── Section backgrounds ────────────────────────────────── */
  .graphic   { background: #eee; }
  .product   { background: #fff; }
  .interface { background: #F3F3F3; color: #555; }

  /* ══ DESKTOP ════════════════════════════════════════════════ */
  @media (min-width: 768px) {

  .section-num {
    width: 30px;
    height: 30px;
    vertical-align: 5px;
      font-size: 18px;
  }

    .section-num   { grid-column: 2 / 3; }
    .section-title { grid-column: 3 / 22; }
    .section-scope { grid-column: 3 / 10;
      margin-bottom: 40px;
  margin-top: 20px;
  display: block;
 }
    .section-desc  { grid-column: 12 / 22; }

    .cards { grid-column: 2 / 22; }

    /* Product & Interface: 4 cards across */
    .product .cards,
    .interface .cards {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 5px;
      row-gap: 30px;
    }

    /* Featured first card spans full width of .cards = cols 2-21 of grid-22 */
    .interface .card:first-child {
      grid-column: 1 / -1;
    }
    .interface .card:first-child .img-primary {
      aspect-ratio: 16 / 6;
    }

    /* Graphic: grid-template-areas */
    .graphic .cards {
      display: grid;
      grid-template-columns: repeat(20, 1fr);
      gap: 5px;
      grid-auto-rows: clamp(100px, 17vw, 220px);
      grid-template-areas:
        "g1 g1 g1 g1 g1 g1 g1 g1 g2 g2 g2 g2 g3 g3 g3 g3 g4 g4 g4 g4"
        "g5 g5 g5 g5 g6 g6 g6 g6 g7 g7 g7 g7 g7 g7 g7 g7 g4 g4 g4 g4"
        "g8 g8 g8 g8 g8 g8 g8 g8 g9 g9 g9 g9 g10 g10 g10 g10 g11 g11 g11 g11"
        ;
    }
  }

  /* Grid area names apply on all breakpoints so mobile template-areas work too */
  .graphic .g1  { grid-area: g1; }
  .graphic .g2  { grid-area: g2; }
  .graphic .g3  { grid-area: g3; }
  .graphic .g4  { grid-area: g4; }
  .graphic .g5  { grid-area: g5; }
  .graphic .g6  { grid-area: g6; }
  .graphic .g7  { grid-area: g7; }
  .graphic .g8  { grid-area: g8; }
  .graphic .g9  { grid-area: g9; }
  .graphic .g10 { grid-area: g10; }
  .graphic .g11 { grid-area: g11; }

  /*  Product hover  */
  .img-hover {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  /* .meta is the anchor — desc-below overlays at its top */
  .product .meta {
    position: relative;
    margin-top: 5px;
  }
  .product .type-label,
  .product .title {
    transition: opacity 0.4s ease;
    margin-top: 3px;
  }
  .product .desc-below {
    position: absolute;
    top: 5px;
    left: 0;
    right: 0;
    opacity: 0;
    text-align: center;
    text-wrap: balance;
    transition: opacity 0.4s ease;
  }
  .product .card:hover .img-hover   { opacity: 1; }
  .product .card:hover .type-label,
  .product .card:hover .title       { opacity: 0; }
  .product .card:hover .desc-below  { opacity: 1; }

  /* ── Interface: dark thumb bg (invisible behind cover, shows for transparent images) */
  .interface .thumb { background: #212121; }
  /* .interface .card:nth-child(6) .thumb .img-primary { object-fit: contain;  } */

  /* ── Interface: description overlaid top-left on thumbnail ─ */
  .interface .desc-overlay {
    display: block;
    position: absolute;
    top: 8px;
    left: 8px;
    color: white;
    width: 60%;
    text-wrap: balance;
  }
  .interface .desc-below { display: none; }
  .interface .type-label { color: #555 !important;
  }
      .interface .meta {
    position: relative;
    margin-top: 5px;
  }
      .interface .title {
text-wrap: balance;
    margin-top: 3px;
  }



  /* ── Graphic: image fills grid area, label bottom-left ───── */
  .graphic .card {
    position: relative;
    overflow: hidden;
  }
  .graphic .thumb {
    height: 100%;
     background-color: #fff;
  }




  .graphic .thumb .img-primary {
    height: 100%;
    aspect-ratio: unset;
  }
  .graphic .type-label {
    position: absolute;
    bottom: 8px;
    left: 8px;
  }
  .graphic .title,
  .graphic .desc-below { display: none; }

  /* ══ MOBILE ═════════════════════════════════════════════════ */
  @media (max-width: 767px) {
    .cards        { grid-column: 1 / -1; }

    /* Interface: single column, 280×230 card */
    .interface .cards {
      display: flex;
      flex-direction: column;
      gap: 25px;
      margin: 0 auto;
    }
    .interface .card { width: 280px; }
    .interface .thumb .img-primary {
      width: 280px;
      height: 230px;
      aspect-ratio: unset;
    }

    /* Product: 2-column grid */
    .product .cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 5px;
    }

    /* Graphic mobile: 2-column grid-template-areas */
    .graphic .cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 5px;
      grid-auto-rows: calc((100vw - 25px) / 2);
      grid-template-areas:
        "g1  g1"
        "g2  g3"
        "g4  g6"
        "g4  g10"
        "g7  g7"
        "g9  g11"
        "g8  g8"
        "g5 g5";
    }
    /* Images fill their grid area on mobile */
    .graphic .thumb { height: 100%; }
    .graphic .thumb .img-primary {
      height: 100%;
      aspect-ratio: unset;
    }

  }

  /* ══ EXHIBITIONS ════════════════════════════════════════════
     Each entry is a 370px horizontal band. The card uses its own
     22-column grid (same gap as the parent) so column numbers
     match the overall grid system directly.

     Row structure inside the card:
       row 1 (1fr)  — flexible top space
       row 2 (auto) — title
       row 3 (50px) — spacer between title and type/location
       row 4 (auto) — type + location
       row 5 (1fr)  — flexible bottom space               */

  .exhibitions { background: #EDEDED; }

  .exhibitions .cards {
    /* Full container width so internal col numbers match the
       parent 22-col grid without any offset */
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
  
  }

  .exhibitions .card {
    display: grid;
    grid-template-columns: repeat(22, 1fr);
    grid-template-rows: 1fr auto 50px auto 1fr;
    column-gap: 5px;
    height: 380px;
    overflow: hidden;
  }

  /* Flatten .meta so its children are direct grid items of .card */
  .exhibitions .meta { display: contents; }

  .exhibitions .title {
    grid-column: 3 / 10;
    grid-row: 2;
    align-self: end;
  }

  .exhibitions .type-label {
    grid-column: 3 / 6;
    grid-row: 4;
    align-self: start;
  }

  .exhibitions .location {
    display: block;
    grid-column: 7 / 10;
    grid-row: 4;
    align-self: start;
  }

  .exhibitions .thumb {
    grid-column: 13 / 22;
    grid-row: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }

  .exhibitions .thumb .img-primary {
    width: 100%;
    height: auto;
    max-height: 360px;
    aspect-ratio: unset;
    object-fit: contain;
    display: block;
  }

  .exhibitions .desc-overlay,
  .exhibitions .desc-below { display: none; }

  /* ── Exhibitions mobile override (must come after global exhibitions rules) */
  @media (max-width: 767px) {
    .exhibitions .card {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto auto;
      height: auto;
      padding: 20px 0px 30px 0;
      overflow: visible;
      gap: 35px 5px;
           text-wrap: balance;
    }
    .exhibitions .title {
      grid-column: 1 / -1;
      grid-row: 1;
      align-self: auto;
      padding-left: 15px;
      padding-right: 15px;
     
    }
    .exhibitions .thumb {
      grid-column: 1 / -1;
      grid-row: 2;
      justify-content: center;
      padding: 0;
    }
    .exhibitions .thumb .img-primary {
      max-width: 230px;
      width: 100%;
      max-height: none;
    }
    .exhibitions .type-label {
      grid-column: 1 / 2;
      grid-row: 3;
      align-self: start;
      padding-left: 15px;
      padding-right: 10px;
    }
    .exhibitions .location {
      grid-column: 2 / 3;
      grid-row: 3;
      align-self: start;
      padding-right: 10px;
    }
  }
</style>
