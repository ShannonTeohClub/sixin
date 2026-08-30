<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Menu from '$lib/components/Menu.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onNavigate, afterNavigate } from '$app/navigation';

	let { children } = $props();

	afterNavigate((nav) => {
		if (nav.type !== 'popstate') window.scrollTo(0, 0);
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
				if (navigation.type !== 'popstate') window.scrollTo(0, 0);
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Menu />
{@render children()}
<Footer />
