<template>
	<div>
		<input
			type="range"
			min="0"
			max="1"
			step="0.01"
			v-model="player.volume"
			@input="volumeChanged"
		/>

		<div @click="toggleMute">
			{{ _title }}
			<br />
			{{ _volume }}
		</div>
	</div>
</template>

<script>
export default {
	props: { player: {}, title: {} },
	data() {
		return {
			volumeBeforeMute: undefined,
			titleOverride: undefined,
		};
	},
	methods: {
		volumeChanged() {
			this.player.player.volume = Math.pow(parseFloat(this.player.volume), 2);
			if (this.volumeBeforeMute && this.player.player.volume > 0)
				this.volumeBeforeMute = undefined;
		},
		setVolume(level) {
			this.player.volume = level;
			this.volumeChanged();
		},
		toggleMute() {
			if (this.volumeBeforeMute === undefined) {
				this.volumeBeforeMute = this.player.volume;
				this.setVolume(0);
			} else {
				this.setVolume(this.volumeBeforeMute);
				this.volumeBeforeMute = undefined;
			}
		},
	},
	computed: {
		_title() {
			return this.titleOverride || this.title || this.player.track.title;
		},
		_volume() {
			return this.volumeBeforeMute
				? `m ${this.volumeBeforeMute}`
				: this.player.volume;
		},
	},
};
</script>

<style>
input[type='range'] {
	-webkit-appearance: slider-vertical;
}
</style>
