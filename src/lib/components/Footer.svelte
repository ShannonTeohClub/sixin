<script lang="ts">
  import { base } from '$app/paths';
</script>

<footer>
  <div class="container">
    <div class="grid-22">

      <div class="footer-brand">
        <a href="{base}" aria-label="Sixin home">
          <img src="{base}/images/sixin-logomark.svg" alt="Sixin" />
        </a>
        <p class="t-caption rights">All rights reserved. 2026.</p>
      </div>

      <nav class="footer-nav">
        <a href="{base}/info"   class="t-caption footer-link">INFO</a>
        <a href="{base}" class="t-caption footer-link">DESIGN</a>
        <!-- <a href="{base}/feed"   class="t-caption footer-link">FEED</a> -->
      </nav>

    </div>
  </div>
</footer>

<style>
  footer {
    background: #212121;
    color: #f1f1f1;
    padding: 80px 0 30px 0;
  
  }

  .footer-brand {
    grid-column: 1 / 9;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .footer-brand a {
    display: inline-block;
    line-height: 0;
  }

  .footer-brand img {
    height: 64px;
    width: auto;
    display: block;
    margin-bottom: 70px;
    margin-left: 40px;
  }

  .rights {
    color: #c8c8c8;
    margin: 0;
    text-transform: uppercase;
    font-weight: 300 !important;
  }

  .footer-nav {
    grid-column: 10 / 12;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .footer-link {
    text-decoration: none;
    color: inherit;
  }

  .footer-link:hover { opacity: 0.5; }

  @media (max-width: 767px) {
    .footer-brand { grid-column: 1 / -1; }
    .footer-nav   { grid-column: 1 / -1; flex-direction: row; gap: 20px; }
  }
</style>
