<script>
    import SearchIcon from "../../assets/icons/search.png";

    export let searchString = '';
    export let placeholder = 'Search';

    let input;

    function selectInput() {
        if (input) {
            input.focus();
        }
    }
</script>

<div class="searchBar">
    <div class="searchBarField">
        <div class="searchButton" on:click="{selectInput}">
            <div class="searchIcon" style="background-image: url({SearchIcon})" />
        </div>
        <input bind:this="{input}" class="searchFieldInput" type="text" value="{searchString}" placeholder="{placeholder}" />
    </div>
</div>

<style>
    .searchBar {
        width: 100%;
    }

    .searchBarField {
        position: relative;
        margin: 15px 16px;

        border-radius: 100px;
        background-color: rgba(0, 0, 0, 0.05);
    }

    .searchButton {
        position: absolute;
        right: -3px;
        top: 0;
        bottom: 0;

        padding: 10px;

        cursor: pointer;

		display: flex;
		align-items: center;
    }

    .searchIcon {
        width: 20px;
        height: 20px;
        background-size: cover;
    }

    .searchFieldInput {
        border: none;
        outline: none;
        background: none;

        width: 100%;
        box-sizing: border-box;

        font-size: 1.5rem;
        padding: 6px 12px;
        padding-right: 28px;
    }
</style>