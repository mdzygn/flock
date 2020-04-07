<script>
  import { stores } from '@sapper/app';
  const { page } = stores();

  const productionUrl = 'flock-hub.';

  $: {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes(productionUrl) && typeof gtag !== 'undefined'){
        gtag('config', 'G-Y1CKT7L852', {
          page_path: $page.path
        });
      }
    }
  }
</script>