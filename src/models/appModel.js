import { writable } from 'svelte/store';

export const viewMode = writable('discover');
export const locationMode = writable('global');
export const exploreZoomed = writable(false);