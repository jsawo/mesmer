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
		<br /><br />
		Volume: {{ masterVolume }}
	</div>
</template>

<script>
import Pizzicato from 'pizzicato';
import config from './configs/config_test';

export default {
	components: {},
	data() {
		return {
			masterVolume: 0.3,
			defaultVolume: 0.5,
			mainPlayer: null,
			players: [],
			tracks: config,
		};
	},
	computed: {
		masterVolumeSliderValue: function() {},
	},
	methods: {
		volumeChanged(playerId) {
			if (playerId !== undefined) {
				this.players[playerId].player.volume = parseFloat(
					this.players[playerId].volume
				);
			} else {
				this.mainPlayer.volume = parseFloat(this.masterVolume);
			}
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

		console.log(this.$data);
	},
};
</script>

<style lang="scss"></style>
