<template>
	<div class="slider_container">
		<input
			type="range"
			min="0"
			max="1"
			step="0.01"
			v-model="player.volume"
			@input="volumeChanged"
		/>

		<div class="desc" @click="toggleMute">
			<div class="title">{{ _title }}</div>
			<div class="volume">{{ _volume }}</div>
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
	max-width: 20px;
}
.slider_container {
	flex-grow: 0;
	flex-shrink: 1;
	margin: 0 0.3rem;
}
.desc {
	font-size: 0.9rem;
	color: #bbb;
	user-select: none;
	cursor: pointer;
}
.desc:hover {
	font-size: 0.9rem;
	color: #fff;
}
</style>
