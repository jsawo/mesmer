<template>
	<div>
		<div id="sliders">
			<span v-for="(player, index) in players" :key="index">
				<input
					type="range"
					min="0"
					max="1"
					step="0.01"
					v-model="player.volume"
					@input="volumeChanged(index)"
				/>
				<br />
				{{ player.track.title }}
				<br />
				{{ player.volume }}
			</span>
		</div>

		<br /><br />

		<input
			type="range"
			min="0"
			max="1"
			step="0.01"
			v-model="masterVolume"
			@input="volumeChanged()"
		/>
		<br />
		<span v-if="ready"> Master Vol: {{ mainPlayer.volume | float }}</span>
	</div>
</template>

<script>
import Pizzicato from 'pizzicato';
import config from '../configs/config_test';

export default {
	components: {},
	data() {
		return {
			masterVolume: 0.3,
			defaultVolume: 0.5,
			mainPlayer: null,
			players: [],
			tracks: config,
			volumeCurveExponent: 2,
			ready: false,
		};
	},
	computed: {
		masterVolumeSliderValue: function() {},
	},
	methods: {
		volumeChanged(playerId) {
			if (playerId !== undefined) {
				this.players[playerId].player.volume = Math.pow(
					parseFloat(this.players[playerId].volume),
					this.volumeCurveExponent
				);
			} else {
				this.mainPlayer.volume = Math.pow(
					parseFloat(this.masterVolume),
					this.volumeCurveExponent
				);
			}
		},
	},
	filters: {
		float(val) {
			return Math.round(val * 100) / 100;
		},
	},
	mounted() {
		this.mainPlayer = new Pizzicato.Group();

		this.tracks.forEach((track, index) => {
			switch (track.source) {
				case 'wave':
					const trackPlayer = new Pizzicato.Sound({
						source: 'wave',
						options: track.options,
					});

					trackPlayer.volume = track.volume || this.defaultVolume;
					this.players.push({
						track: track,
						player: trackPlayer,
						volume: track.volume || this.defaultVolume,
					});

					this.mainPlayer.addSound(trackPlayer);
					break;
			}
		});

		this.mainPlayer.volume = this.masterVolume = 0.005;
		this.mainPlayer.play();

		this.ready = true;

		console.log(this.$data);
	},
};
</script>

<style lang="scss"></style>
