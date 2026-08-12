<script lang="ts">
  import { base } from '$app/paths';
</script>

<nav>
  <div class="container">
    <div class="grid-22">
      <a href="{base}" class="nav-logo" aria-label="Sixin home">
        <img src="{base}/images/sixin-logomark.svg" alt="Sixin" />
      </a>
      <div class="nav-links">
        <a href="{base}/info"   class="t-caption nav-link">INFO</a>
        <a href="{base}" class="t-caption nav-link">DESIGN</a>
        <!-- <a href="{base}feed"   class="t-caption nav-link">FEED</a> -->
      </div>
    </div>
  </div>
</nav>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    /* mix-blend-mode: multiply; */
    /* background-color: #212121; */
    /* opacity: 30%; */
    mix-blend-mode: difference;
    padding: 40px;
  }

  .nav-logo {
    grid-column: 1 / 5;
    display: flex;
    align-items: center;
    padding-left: 33px; /* container 20px + 40px = 60px from container left edge */
  }

  .nav-logo img {
    display: block;
    height: 64px;
    width: auto;
  }

  .nav-links {
    grid-column: 17 / 21;
    display: flex;
    align-items: center;
    gap: 20px;
    color: #f1f1f1;
  }

  .nav-link {
    text-decoration: none;
    color: inherit;
  }

  .nav-link:hover { opacity: 0.5; }

  @media (max-width: 767px) {
    .nav-logo  { grid-column: 1 / 12; padding-left: 0; }
    .nav-links { grid-column: 12 / -1; justify-content: flex-end; }
      .nav-logo img {
    height: 44px;
  }
  nav {
    padding: 24px;
  }
  }
</style>
