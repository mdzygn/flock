<script>
  export let isActive = false;
  export let isFirst = false;
  export let isHover = false;
  export let getOptionLabel = undefined;
  export let item = undefined;
  export let filterText = '';

  let itemClasses = '';

  $: {
    const classes = [];
    if (isActive) { classes.push('active'); }
    if (isFirst) { classes.push('first'); }
    if (isHover) { classes.push('hover'); }
    if (item.isGroupHeader) { classes.push('groupHeader'); }
    if (item.isGroupItem) { classes.push('groupItem'); }
    itemClasses = classes.join(' ');
  }
</script>

<style>
  .item {
    cursor: default;
    min-height: var(--height, 42px);
    line-height: var(--height, 42px);
    padding: var(--itemPadding, 0 20px);
    color: var(--itemColor, inherit);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .groupHeader {
    text-transform: var(--groupTitleTextTransform, uppercase);
  }

  .groupItem {
    padding-left: var(--groupItemPaddingLeft, 40px);
  }

  .item:active {
    background: var(--itemActiveBackground, #b9daff);
  }

  .item.active {
    background: var(--itemIsActiveBG, #007aff);
    color: var(--itemIsActiveColor, #fff);
  }

  .item.first {
    border-radius: var(--itemFirstBorderRadius, 4px 4px 0 0);
  }

  .item.hover:not(.active) {
    background: var(--itemHoverBG, #e7f2ff);
  }
  
  .item .itemDescription {
    font-size: 1.1rem;
    margin-top: -6px;
    color: #999999;
    
    line-height: initial;
    padding-bottom: 12px;
    
    width: 170px;
    white-space: initial;
  }
</style>



<div class="item {itemClasses}">
  {@html getOptionLabel(item, filterText)}
  {#if item.description}
    <div class="itemDescription">{item.description}</div>
  {/if}
</div>
