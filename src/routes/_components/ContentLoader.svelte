<script>
    import locale from '../../locale';

    let hasSlots = $$props.$$slots;

    export let label = !hasSlots ? locale.LOADING.DEFAULT : '';
</script>

<div class="contentLoader">{label}<slot></slot></div>

<style>
    .contentLoader {
        padding: 20px;
        font-size: 1.5rem;
        color: #888888;
    }
</style>