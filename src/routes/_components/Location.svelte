<script>
    import LocationIcon from "../../assets/icons/location.png";

    export let className = '';
	export let location = '';

    export let hideWithVisibility = false;
</script>

<div class="location {className}" class:hidden={!hideWithVisibility && !location} class:visibilityHidden={hideWithVisibility && !location}><div class="locationIcon" style="background-image: url({LocationIcon})" />{location}</div>

<style>
	.location {
		display: table;

		padding: 5px;
    	margin-left: 16px;
		margin-top: -2px;

		font-size: 1.2rem;
		color: #999999;
	}

    .hidden {
        display: none;
    }
    .visibilityHidden {
        visibility: hidden;
    }

	.locationIcon {
		display: inline-block;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		width: 11px;
		height: 13px;
		vertical-align: middle;
    	margin-right: 3px;
    	margin-bottom: 2px;
	}
</style>