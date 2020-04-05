<script>
  import { stores } from '@sapper/app';
  const { page } = stores();
  $: {
    if (typeof gtag !== 'undefined'){
      gtag('config', 'G-Y1CKT7L852', {
        page_path: $page.path
      });
    }
  }
</script>