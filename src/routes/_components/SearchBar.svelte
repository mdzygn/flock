<script>
    import locale from '../../locale';

    import { testInputDefocus } from '../../utils';

    import SearchIcon from "../../assets/icons/search.png";
    import ClearIcon from "../../assets/icons/clear.png";

    export let searchString = '';

    let input;

    function selectSearchIcon() {
        if (searchString) {
            searchString = '';
        } else {
            focusInput();
        }
    }

    function focusInput() {
        if (input) {
            input.focus();
        }
    }
</script>

<div class="searchBar">
    <div class="searchBarField">
        <div class="searchButton" on:click="{selectSearchIcon}">
            <div class="searchIcon" style="background-image: url({searchString ? ClearIcon : SearchIcon})" />
        </div>
        <input bind:this="{input}" class="searchFieldInput" type="text" bind:value="{searchString}" placeholder="{locale.GENERAL.SEARCH_PLACEHOLDER}" on:keypress="{testInputDefocus}" />
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
        margin-top: -2px;
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