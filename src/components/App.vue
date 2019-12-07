<template>
	<div>
		<div id="sliders">
			<slider
				v-for="(player, index) in players"
				:key="index"
				:player="player"
			></slider>
		</div>

		<br /><br />

		<slider :player="mainPlayer" title="Master"></slider>
	</div>
</template>

<script>
import Pizzicato from 'pizzicato';
import config from '../configs/config_test';
import Slider from './Slider.vue';

export default {
	components: { Slider },
	data() {
		return {
			defaultVolume: 0.5,
			mainPlayer: { player: null, volume: 0.3 },
			players: [],
			tracks: config,
			volumeCurveExponent: 2,
			ready: false,
		};
	},
	computed: {
		masterVolumeSliderValue: function() {},
	},
	methods: {},
	mounted() {
		this.mainPlayer.player = new Pizzicato.Group();

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

					this.mainPlayer.player.addSound(trackPlayer);
					break;
			}
		});

		this.mainPlayer.volume = this.mainPlayer.player.volume = 0.005;
		this.mainPlayer.player.play();

		this.ready = true;
	},
};
</script>

<style lang="scss"></style>
