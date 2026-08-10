<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  let sectionEl!: HTMLElement;
  let panelEl: HTMLElement;
  let title1El: HTMLElement;
  let title2El: HTMLElement;
  let title3El: HTMLElement;
  let state1El: HTMLElement;
  let state2El: HTMLElement;
  let state3El: HTMLElement;

  const expertisePills = [
    { text: 'Graphic Design',      color: '#7D9CB2', width: '400px' },
    { text: 'Data vis',            color: '#DCB7AE', width: '220px' },
    { text: 'Physical shapes',     color: '#EEEBDB', width: '220px' },
    { text: 'Interactive physics', color: '#D8E3CF', width: '220px' },
  ];

  // Placeholder — fill in text/colors later
  const scopeRows: { text: string; color: string }[][] = [
    [
      { text: 'Adobe Illustrator', color: '#7D9CB2' },
      { text: 'Typography',        color: '#7D9CB2' },
      { text: 'Print design',      color: '#7D9CB2' },
      { text: 'Brand identity',    color: '#7D9CB2' },
    ],
    [
      { text: 'D3.js',             color: '#C8D8D0' },
      { text: 'Data visualization',color: '#D8C8C8' },
      { text: 'Illustration',      color: '#D8D8C8' },
      { text: 'Motion',            color: '#C8C8D8' },
    ],
    [
      { text: 'Three.js',          color: '#C8D8D8' },
      { text: 'Physical computing',color: '#D8CEC8' },
      { text: 'Arduino',           color: '#CED8C8' },
      { text: 'Fabrication',       color: '#D8C8D0' },
    ],
    [
      { text: 'Editorial design',  color: '#C8D0D8' },
      { text: 'Packaging',         color: '#C8D8C8' },
      { text: 'Signage',           color: '#D0C8D8' },
      { text: 'Exhibition',        color: '#D8D0C8' },
    ],
  ];

  // Placeholder — fill in gif filenames and labels later
  const deliverables = [
    { label: 'Brand systems' },
    { label: 'Data tools' },
    { label: 'Physical objects' },
    { label: 'Digital experiences' },
  ];

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top top',
        end: '+=900',
        scrub: true,
        pin: true,
        anticipatePin: 1,
      }
    });

    tl
      // Phase 1: grow 340 → 520px, swap Expertise → Scope of work
      .to(panelEl, { height: '520px', ease: 'none', duration: 1 })
      .to([title1El, state1El], { opacity: 0, duration: 0.2 }, 0.35)
      .to([title2El, state2El], { opacity: 1, duration: 0.2 }, 0.55)
      // Phase 2: grow 520 → 100vh, swap Scope → Deliverables
      .to(panelEl, { height: '100vh', ease: 'none', duration: 1 }, 1)
      .to([title2El, state2El], { opacity: 0, duration: 0.2 }, 1.35)
      .to([title3El, state3El], { opacity: 1, duration: 0.2 }, 1.55);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  });
</script>

<section class="about-intro" style="background-color: #212121;">
  <div class="container">
    <div class="grid-22">
      <p class="t-heading about-text">
        ‘Six in’ is Shannon’s moniker as a design innovation unit– specialising in <span style="color: #7D9CB2;">graphic design</span> with an edge in <span style="color: #DCB7AE;">data vis</span>, <span style="color:#E1DDC6;">physical shapes</span> and <span style="color: #D8E3CF;">interactive physics</span>.
        <br> <br>
        My passion lies in design that works and touches; especially designs that works for businesses and touches with brands. 
 <br> <br>
I believe that even small-medium enterprises in sunset industries can multiply its competitiveness through new value and direction. 
 <br> <br>
Branding, advertising, new product development–regardless of the method, I aspire to device the most efficient strategy by confronting brutal facts with thorough and sometimes data-driven research.
      </p>
    </div>
  </div>
</section>

<!-- ── GSAP ScrollTrigger section ────────────────────────── -->
<section class="gsap-section" bind:this={sectionEl}>
  <div class="expanding-panel" bind:this={panelEl}>
    <div class="container">
      <div class="grid-22">

        <div class="panel-layers">

          <!-- Titles — all stacked at top: 40px, fade between states -->
          <h2 class="t-heading panel-title" bind:this={title1El}>Expertise</h2>
          <h2 class="t-heading panel-title" bind:this={title2El} style="opacity:0">Scope of work</h2>
          <h2 class="t-heading panel-title" bind:this={title3El} style="opacity:0">Deliverables &amp; record</h2>

          <!-- State 1: Expertise pills -->
          <div class="panel-state" bind:this={state1El}>
            <div class="expertise-row t-body-large">
              {#each expertisePills as pill}
                <div
                  class="pill expertise-pill"
                  style="background:{pill.color}; width:{pill.width}"
                >{pill.text}</div>
              {/each}
            </div>
          </div>

          <!-- State 2: Scope of work pills -->
          <div class="panel-state" bind:this={state2El} style="opacity:0">
            <div class="scope-rows">
              {#each scopeRows as row}
                <div class="scope-row t-caption">
                  {#each row as pill}
                    <div class="pill scope-pill" style="background:{pill.color}">{pill.text}</div>
                  {/each}
                </div>
              {/each}
            </div>
          </div>

          <!-- State 3: Deliverables & record — 4 gif columns -->
          <div class="panel-state" bind:this={state3El} style="opacity:0">
            <div class="deliverables-grid">
              {#each deliverables as item}
                <div class="deliverable-col">
                  <div class="gif-box"></div>
                  <p class="t-body-large deliv-label">{item.label}</p>
                </div>
              {/each}
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* ── Intro section ───────────────────────────────────────── */
  .about-intro {
    min-height: 1000px;
    display: flex;
    align-items: center;
  }

  .about-text {
    grid-column: 3 / 22;
    color: #f1f1f1;
  }

  /* ── GSAP section ───────────────────────────────────────── */
  .gsap-section {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .expanding-panel {
    width: 100%;
    height: 340px;
    background: #D0CFCF;
    overflow: hidden;
    flex-shrink: 0;
  }

  /* Tall enough that all absolute children have room even when panel is 340px */
  .panel-layers {
    grid-column: 2 / 22;
    position: relative;
    min-height: 100vh;
  }

  /* Titles sit at 40px from panel top, stacked on top of each other */
  .panel-title {
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
  }

  /* State content sits below the title */
  .panel-state {
    position: absolute;
    top: 110px;
    left: 0;
    right: 0;
  }

  /* ── State 1: Expertise ─────────────────────────────────── */
  .expertise-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
   
  }

  .pill {
    border-radius: 30px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    flex-shrink: 0;
    white-space: nowrap;
     justify-content: center;
  }

  .expertise-pill {
    height: 60px;
  }

  /* ── State 2: Scope of work ─────────────────────────────── */
  .scope-rows {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .scope-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .scope-pill {
    height: 44px;
    border-radius: 22px;
    padding: 0 20px;
  }

  /* ── State 3: Deliverables & record ─────────────────────── */
  .deliverables-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .deliverable-col {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* Placeholder for gif — replace with <img> once you have the files */
  .gif-box {
    width: 100%;
    aspect-ratio: 4 / 3;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 16px;
  }

  .deliv-label {
    color: #444;
  }
</style>
