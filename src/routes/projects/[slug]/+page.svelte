<script lang="ts">
  import ImageText from '$lib/components/blocks/ImageText.svelte';
  import Slider from '$lib/components/blocks/Slider.svelte';
  import TextBlock from '$lib/components/blocks/TextBlock.svelte';
  import VideoEmbed from '$lib/components/blocks/VideoEmbed.svelte';
  import Process from '$lib/components/blocks/Process.svelte';
  import VideoBlock from '$lib/components/blocks/VideoBlock.svelte';
  import PhotoGrid from '$lib/components/blocks/PhotoGrid.svelte';
  import InstagramEmbed from '$lib/components/blocks/InstagramEmbed.svelte';

  let { data } = $props();
  import { base } from '$app/paths';
  const { project, blocks } = data;
</script>

{#if project}
  {#if project.Category === 'Product'}
    <!-- Product hero: cover lifts to reveal bg-image section -->
    <div class="product-hero-wrapper">

      <!-- Reveal: sticky, stays at top while cover scrolls away, then exits with wrapper -->
      <section class="product-reveal">
        {#if project.HeroImage}
          <img
            class="reveal-bg"
            src="{base}/images/thumbnails/{project.HeroImage}"
            alt=""
            aria-hidden="true"
            style={project.HeroImageStyle || ''}
          />
        {/if}
        <div class="container reveal-content">
       
              <div class="grid-product">
            <div class="hero-title" style={project.HeroColor || project.LabelColor ? `color: ${project.HeroColor || project.LabelColor}` : ''}>
              <span class="t-label hero-type">{project.Type}</span>
              <h1 class="t-heading">{@html project.Title}. {project.Year}.</h1>
            </div>
                    <div class="subinfo">
              {#if project.AInfo}<p class="t-label">{@html project.AInfo}</p>{/if}
              {#if project.BInfo}<p class="t-label">{@html project.BInfo}</p>{/if}
          </div>
          </div>
              
      
        </div>
      </section>

      <!-- Cover: absolute on top, scrolls away with the wrapper exposing the reveal -->
      <section class="product-cover" style={project.HeroBgColor ? `background: ${project.HeroBgColor}` : ''}>
        <div class="container">
          <div class="grid-22">
       
            <div class="cover-content" style={project.HeroColor || project.LabelColor ? `color: ${project.HeroColor || project.LabelColor}` : ''}>
              {#if project.CInfo}
                <p class="t-caption cover-cinfo">{@html project.CInfo}</p>
              {/if}
              {#if project.HoverImage}
                <img class="cover-img" src="{base}/images/thumbnails/{project.HoverImage}" alt="" aria-hidden="true" style="view-transition-name: project-thumb" />
              {/if}
              {#if project.Description}
                <p class="t-body-large cover-desc">{project.Description}</p>
              {/if}
            </div>
          </div>
        </div>
      </section>

    </div>

  {:else}
    <!-- Default hero -->
    <section
      class="project-hero"
      style={project.HeroBgColor ? `background: ${project.HeroBgColor}` : ''}
    >
      <div class="container">
        <div class="grid-22">

  <div class="project-hero-top-half">
  <div class="hero-title" style={project.HeroColor || project.LabelColor ? `color: ${project.HeroColor || project.LabelColor}` : ''}>
    <span class="t-label hero-type">{project.Type}</span>
    <h1 class="t-heading" >{@html project.Title}. {project.Year}. <br><div class="hero-desc">{project.Description}</div></h1>
  </div>
  <div class="subinfo">
    {#if project.AInfo}<p class="t-label">{@html project.AInfo}</p>{/if}
    {#if project.BInfo}<p class="t-label">{@html project.BInfo}</p>{/if}
  </div>
  </div>

  <div class="project-hero-btm-half">

  <div class="credits">
    {#if project.CInfo}<p class="t-label">{@html project.CInfo}</p>{/if}
  </div>

      {#if project.HeroImage}
        <img
          class="hero-img"
          src="{base}/images/thumbnails/{project.HeroImage}"
          alt=""
          aria-hidden="true"
          style="{project.HeroImageStyle ? project.HeroImageStyle + '; ' : ''}view-transition-name: project-thumb"
        />
      {/if}</div>
        </div>
      </div>
    </section>
  {/if}

  <!-- Content blocks (position: relative so they scroll above the fixed product reveal) -->
  <div class="content-blocks">
  {#each blocks as block}
    {#if block.Type === 'image-text'}
      <ImageText subhead={block.Subhead} quote={block.Quote} body={block.Body} image={block.Images} imageSpan={block.ImageSpan || '7 / 16'} bgColor={block.BgColor || '#fafafa'} imagePosition={block.ImagePosition || 'below'} caption={block.Caption} captionLink={block.CaptionLink} sideImage={block.SideImage} />
    {:else if block.Type === 'slider'}
      <Slider subhead={block.Subhead} quote={block.Quote} body={block.Body} images={block.Images.split(',').map((s) => s.trim()).filter(Boolean)} bgColor={block.BgColor || '#fafafa'} />
    {:else if block.Type === 'text'}
      <TextBlock subhead={block.Subhead} quote={block.Quote} body={block.Body} bgColor={block.BgColor || '#fafafa'} />
    {:else if block.Type === 'video'}
      <VideoEmbed subhead={block.Subhead} quote={block.Quote} video={block.Video} body={block.Body} bgColor={block.BgColor || '#fafafa'} aspectRatio={block.AspectRatio || '16 / 9'} />
    {:else if block.Type === 'process'}
      <Process subhead={block.Subhead} image={block.Images}
        p1={block.P1} p1Bullets={block.P1Bullets}
        p2={block.P2} p2Bullets={block.P2Bullets}
        p3={block.P3} p3Bullets={block.P3Bullets}
        bgColor={block.BgColor || '#fafafa'}
      />
    {:else if block.Type === 'video-block'}
      <VideoBlock subhead={block.Subhead} quote={block.Quote} video={block.Videos} caption={block.Caption} body={block.Body} bgColor={block.BgColor || '#fafafa'} />
    {:else if block.Type === 'photo-grid'}
      <PhotoGrid subhead={block.Subhead} quote={block.Quote} body={block.Body} bgColor={block.BgColor || '#fafafa'} images={block.Images} photoSpans={block.PhotoSpans} rowHeights={block.RowHeights} />
    {:else if block.Type === 'instagram'}
      <InstagramEmbed subhead={block.Subhead} quote={block.Quote} body={block.Body} video={block.Video} bgColor={block.BgColor || '#fafafa'} />
    {/if}
  {/each}
  </div>
{/if}

<style>
  /* ── Product hero ──────────────────────────────────────── */
  .product-hero-wrapper {
    position: relative;
    /* 100vh cover lifts → 100vh clean reveal → 100vh reveal exits as blocks enter */
    height: 200vh;
  }

  .cover-cinfo {
    text-align: left;
  }

  /* Cover: absolute so it scrolls with the wrapper while reveal sticks behind it */
  .product-cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    height: 100vh;
    background: #f5f5f5;
    display: flex;
    align-items: center;
  }

  .cover-content {
    grid-column: 7 / 17;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    gap: 24px;
    text-align: center;
  }

  .cover-img {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid currentColor;
  }

  .cover-desc { text-wrap: balance; }

  /* Reveal: sticky so it stays visible while cover scrolls off, exits when wrapper ends */
  .product-reveal {
    position: sticky;
    top: 0;
    z-index: 1;
    height: 100vh;
    overflow: hidden;
    background: #111;
  }

  .grid-product {
  display: grid;
  grid-template-columns: repeat(22, 1fr);
  gap: 5px;
justify-content: flex-start;
  flex-direction: row;
      grid-column: 1 / 22;
    width: 100%;
    /* height: 300px; */
}

  .reveal-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .reveal-content {
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    align-items: flex-start;
    padding-top: 170px;
  }

  .reveal-title {
    grid-column: 3 / 16;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .reveal-subinfo {
    grid-column: 17 / 21;
    display: flex;
    flex-direction: column;
    gap: 50px;
    align-self: end;
  }

  /* Sits above the fixed product reveal so blocks scroll over it */
  .content-blocks {
    position: relative;
    z-index: 2;
  }

  /* ── Default hero ──────────────────────────────────────── */
  .project-hero {
    position: relative;
    min-height: 750px;
    background: #f5f5f5;
    overflow: hidden;
  }

  .project-hero-top-half {
    margin-top: 100px;
    grid-template-columns: subgrid;
    display: grid;
    grid-column: 1 / 22;
    width: 100%;
    height: 300px;
  }

    .project-hero-btm-half {
    grid-template-columns: subgrid;
    display: grid;
    width: 100%;
     grid-column: 1 / 22;
    height: 300px;
    position: relative;
  }


  .credits {
    grid-column: 3 / 5;
    align-self: end;
    margin-bottom: 60px;
  }

  .hero-title {
    grid-column: 3 / 16;
    padding: 30px 0;
    align-self: center;
  }


  .subinfo {
    grid-column: 17 / 21;
    align-self: center;
    display: flex;
    flex-direction: column;
    gap: 26px;
  }

  .hero-year { margin-top: 8px; }

  .hero-desc { opacity: 0.5; text-wrap: balance;}

  .hero-type {
    grid-column: 17 / 21;
    align-self: center;
    display: inline-block;
    margin-bottom: 24px;
  }

  .hero-img {
    position: absolute;
    bottom: 0;
    z-index: 0;
    right: 0;
    height: auto;
    /* justify-content: flex-end;
    align-items: flex-end; */
  }

  @media (max-width: 767px) {
    .project-hero { min-height: 0; }

    /* top half: stack as flex column, full width */
    .project-hero-top-half {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      height: auto;
      margin-top: 110px;
      gap: 24px;
      /* padding-bottom: 24px; */
    }

    .hero-title {
      grid-column: unset;
      align-self: auto;
      padding: 0;
    }

    .hero-type { grid-column: unset; margin-bottom: 14px;  }

    /* subinfo: full width row so each <p> sits side by side */
    .subinfo {
      grid-column: unset;
      align-self: auto;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .subinfo p { width: 44%; }

    /* bottom half: flex column, image first then credits */
    .project-hero-btm-half {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      height: auto;
      /* gap: 20px; */
      padding-bottom: 40px;
    }

    .hero-img {
      position: static;
      order: -1;
      width: 100% !important;
      max-height: 200px;
      object-fit: contain;
      display: block;
    }

    .credits {
      grid-column: unset;
      align-self: auto;
      margin-bottom: 0;
    }
    .product-hero-wrapper { height: 200svh; }
    .product-cover { height: 100svh; }
    .cover-content { grid-column: 1 / -1; padding: 0 10px; }

    .product-reveal { height: 100svh; }
    .reveal-content { padding-bottom: 40px;align-items: flex-start; padding-top: 40px;}
.grid-product {
  display:flex; flex-direction: column; justify-content: space-between; height:80%;margin-top: 22%;
}
  }



</style>
