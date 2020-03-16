<script>
    import LocationIcon from "../../assets/icons/location.png";

    export let className = '';
    export let location = '';
</script>

<div class="location {className}" class:hidden={!location}><div class="locationIcon" style="background-image: url({LocationIcon})" />{location}</div>

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

	.locationIcon {
		display: inline-block;
		background-size: cover;
		width: 11px;
		height: 13px;
		vertical-align: middle;
    	margin-right: 3px;
    	margin-bottom: 2px;
	}
</style>