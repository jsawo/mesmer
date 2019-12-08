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
// import config from '../configs/config_noise';
import config from '../configs/config_sine';
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
			let trackPlayer;
			switch (track.source) {
				case 'script':
				case 'wave':
					trackPlayer = new Pizzicato.Sound({
						source: track.source,
						options: track.options,
					});
					console.log(
						`Track volume type: ${typeof track.volume} ${track.volume}`
					);
					break;
			}

			if (trackPlayer) {
				trackPlayer.volume =
					typeof track.volume === 'number' ? track.volume : this.defaultVolume;
				this.players.push({
					track: track,
					player: trackPlayer,
					volume:
						typeof track.volume === 'number'
							? track.volume
							: this.defaultVolume,
				});

				this.mainPlayer.player.addSound(trackPlayer);
			}
		});

		this.mainPlayer.volume = this.mainPlayer.player.volume = this.mainPlayer.volume;
		this.mainPlayer.player.play();

		this.ready = true;
	},
};
</script>

<style lang="scss"></style>
