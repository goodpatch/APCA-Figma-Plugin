<script>
	import { GlobalCSS } from "figma-plugin-ds-svelte";
	import { Label, Section } from "figma-plugin-ds-svelte";

	import { APCAcontrast } from "./APCAonly.98e_d12e.js";

	$: foreground = "#ffffff";
	$: background = "#E5E5E5";
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

	function RGBToHex(color) {
		let r = Math.round(color.r * 255).toString(16);
		let g = Math.round(color.g * 255).toString(16);
		let b = Math.round(color.b * 255).toString(16);

		if (r.length == 1) r = "0" + r;
		if (g.length == 1) g = "0" + g;
		if (b.length == 1) b = "0" + b;

		return "#" + r + g + b;
	}

	onmessage = (event) => {
		foreground = RGBToHex(event.data.pluginMessage.value);
		calculateContrast();
	};
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
	<input type="text" bind:value={foreground} />

	<Section>Background</Section>
	<input
		type="color"
		name="background"
		id="background"
		bind:value={background}
		on:input={() => calculateContrast()}
	/>
	<input type="text" bind:value={background} />
</div>

<style>
	input {
		width: 100%;
	}
</style>
