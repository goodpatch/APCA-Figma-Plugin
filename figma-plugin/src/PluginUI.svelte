<script>
	import { GlobalCSS } from "figma-plugin-ds-svelte";
	import { Label, Section, Input } from "figma-plugin-ds-svelte";
	import ColorPicker from "./ColorPicker.svelte";

	import { APCAcontrast } from "./APCAonly.98e_d12e.js";

	$: foreground = "#000000";
	$: background = "#E5E5E5";
	$: contrast = 0;
	$: foregroundName = "";
	$: backgroundName = "";

	function calculateContrast() {
		contrast = Math.round(
			APCAcontrast(HexTo0x(foreground), HexTo0x(background))
		);
	}

	function HexTo0x(color) {
		return "0x" + color.substring(1);
	}

	function ChannelToHex(channel) {
		channel = Math.round(channel * 255)
			.toString(16)
			.toUpperCase();

		if (channel.length == 1) channel = "0" + channel;

		return channel;
	}

	function RGBToHex(color) {
		let r = ChannelToHex(color.r);
		let g = ChannelToHex(color.g);
		let b = ChannelToHex(color.b);

		return "#" + r + g + b;
	}

	onmessage = (event) => {
		foreground = RGBToHex(event.data.pluginMessage.value.foreground);
		foregroundName = event.data.pluginMessage.value.foregroundName;
		backgroundName = event.data.pluginMessage.value.backgroundName;
		if (event.data.pluginMessage.value.background) {
			background = RGBToHex(event.data.pluginMessage.value.background);
		}

		calculateContrast();
	};
</script>

<div class="wrapper p-xxsmall">
	<p>{contrast}</p>
</div>
<div>
	<Section>Foreground</Section>
	<Label>{foregroundName}</Label>
	<div class="flex align-items-center pr-xxsmall pl-xxsmall pb-xsmall">
		<input
			type="color"
			name="foreground"
			id="foreground"
			bind:value={foreground}
			on:input={() => calculateContrast()}
			class="mr-xxxsmall"
		/>
		<Input bind:value={foreground} class="flex-grow" />
	</div>

	<Section>Background</Section>
	<Label>{backgroundName}</Label>
	<div class="flex align-items-center pr-xxsmall pl-xxsmall pb-xsmall">
		<input
			type="color"
			name="background"
			id="background"
			bind:value={background}
			on:input={() => calculateContrast()}
			class="mr-xxxsmall"
		/>
		<Input bind:value={background} class="flex-grow" />
	</div>
</div>

<style>
	input[type="color"] {
		-webkit-appearance: none;
		border: none;
		width: 16px;
		height: 16px;
		padding: 0px;
	}
	input[type="color"]::-webkit-color-swatch-wrapper {
		padding: 0;
	}
	input[type="color"]::-webkit-color-swatch {
		border: 1px solid rgba(0, 0, 0, 0.08);
	}
</style>
