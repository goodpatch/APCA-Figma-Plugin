<script>
	//import Global CSS from the svelte boilerplate
	//contains Figma color vars, spacing vars, utility classes and more
	import { GlobalCSS } from "figma-plugin-ds-svelte";
	import { Label, Section } from "figma-plugin-ds-svelte";

	import { APCAcontrast } from "./APCAonly.98e_d12e.js";

	$: foreground = "#ffffff";
	$: background = "#000000";
	$: contrast = 0;

	function convertHexColor(color) {
		return "0x" + color.substring(1);
	}

	function calculateContrast() {
		contrast = Math.round(
			APCAcontrast(
				convertHexColor(foreground),
				convertHexColor(background)
			)
		);
	}
</script>

<div class="wrapper p-xxsmall">
	<p>{contrast}</p>

	<Section>Foreground</Section>
	<input
		type="color"
		name="foreground"
		id="foreground"
		bind:value={foreground}
		on:input={() => calculateContrast()}
	/>

	<Section>Background</Section>
	<input
		type="color"
		name="background"
		id="background"
		bind:value={background}
		on:input={() => calculateContrast()}
	/>
</div>

<style>
	input {
		width: 100%;
	}
</style>
