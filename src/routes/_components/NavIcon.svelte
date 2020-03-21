<script>
    import NavHomeIcon from "../../assets/icons/nav_home.png";
    import NavDiscoverIcon from "../../assets/icons/nav_discover.png";
    import NavFollowingIcon from "../../assets/icons/nav_following.png";
    import NavActivityIcon from "../../assets/icons/nav_activity.png";
    import NavMessagesIcon from "../../assets/icons/nav_messages.png";

    import NavHomeActiveIcon from "../../assets/icons/nav_home_active.png";
    import NavDiscoverActiveIcon from "../../assets/icons/nav_discover_active.png";
    import NavFollowingActiveIcon from "../../assets/icons/nav_following_active.png";
    import NavActivityActiveIcon from "../../assets/icons/nav_activity_active.png";
    import NavMessagesActiveIcon from "../../assets/icons/nav_messages_active.png";

    export let iconId = 'home';

    let icons = {
        'home': {icon: NavHomeIcon, activeIcon: NavHomeActiveIcon},
        'discover': {icon: NavDiscoverIcon, activeIcon: NavDiscoverActiveIcon},
        'following': {icon: NavFollowingIcon, activeIcon: NavFollowingActiveIcon},
        'activity': {icon: NavActivityIcon, activeIcon: NavActivityActiveIcon},
        'messages': {icon: NavMessagesIcon, activeIcon: NavMessagesActiveIcon},
    }

    $: iconItem = icons[iconId];
    $: iconSrc = (iconItem && iconItem.icon) || '';
    $: iconActiveSrc = (iconItem && iconItem.activeIcon) || '';

    export let active = false;
    export let label = false;
</script>

{#if active}
    <img src='{iconActiveSrc}' alt='{label}' />
{:else}
    <img src='{iconSrc}' alt='{label}' />
{/if}

<style>
    img {
        width: 46px;
        height: 46px;
    }
</style>