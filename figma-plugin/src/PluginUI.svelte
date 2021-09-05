<script>
	import { GlobalCSS } from "figma-plugin-ds-svelte";
	import {
		Label,
		Section,
		Input,
		Button,
		Icon,
		IconSwap,
		Type,
		IconButton,
	} from "figma-plugin-ds-svelte";
	import ColorPicker from "./ColorPicker.svelte";

	import { APCAcontrast } from "./APCAonly.98e_d12e.js";

	$: foreground = "#000000";
	$: background = "#000000";
	$: contrast = 0;
	$: foregroundName = "No layer selected";
	$: backgroundName = "No layer selected";

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

	function swapColors() {
		[foreground, background] = [background, foreground];
		calculateContrast();
	}

	function openLink() {
		window.open(
			"https://w3c.github.io/silver/guidelines/explainers/visualContrast.html",
			"_blank"
		);
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

<div class="banner pr-xxsmall pl-xxsmall pt-xxxsmall pb-xxxsmall">
	<Type inverse="true" color="white">Beta version</Type>
</div>

<div class="label-container pt-xxsmall">
	<Label>Contrast</Label>
</div>
<div
	class="wrapper pl-xxsmall pb-xsmall pr-xxsmall flex justify-content-between"
>
	<Type size="xlarge" weight="bold" class="flex align-items-center"
		>{contrast}</Type
	>
	<IconButton iconText="" on:click={openLink} />
</div>
<div>
	<div class="label-container">
		<Label>Foreground</Label>
	</div>
	<Section>{foregroundName}</Section>
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

	<div class="label-container">
		<Label>Background</Label>
	</div>
	<Section>{backgroundName}</Section>
	<div class="flex align-items-center pr-xxsmall pl-xxsmall pb-xxsmall">
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
<div class="wrapper pl-xxsmall pr-xxsmall pb-xxsmall flex">
	<Button
		on:click={swapColors}
		variant="secondary"
		class="flex-grow justify-content-center"
	>
		<Icon iconName={IconSwap} color="black" />
		Swap colors
	</Button>
</div>
<div class="divider" />
<div class="wrapper pl-xxsmall pr-xxsmall">
	<Type>
		Learn more about
		<a href="https://global.goodpatch.com/" rel="noopener" target="_blank"
			>Goodpatch
		</a>
		and
		<a
			href="https://w3c.github.io/silver/guidelines/explainers/visualContrast.html"
			rel="noopener"
			target="_blank"
		>
			Advanced Perceptual Contrast Algorithm (APCA)
		</a>
	</Type>
</div>

<style>
	.banner {
		background-color: var(--red);
	}
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

	.label-container :global(div) {
		height: 16px;
	}

	.divider {
		background-color: var(--silver);
		display: block;
		height: 1px;
		margin: 8px 0 7px 0;
	}
</style>
