<template>
	<div>
		Mesmer
		<br /><br />
		(＠_＠)
		<br /><br />

		<input
			type="range"
			id="masterVolume"
			min="0"
			max="1"
			step="0.01"
			v-model="masterVolume"
			@input="volumeChanged"
		/>
		<input
			type="range"
			id="vol0"
			min="0"
			max="1"
			step="0.01"
			v-model="masterVolume"
			@input="volumeChanged"
		/>
		<input
			type="range"
			id="vol1"
			min="0"
			max="1"
			step="0.01"
			v-model="masterVolume"
			@input="volumeChanged"
		/>
	</div>
</template>

<script>
import Pizzicato from 'pizzicato';

export default {
	components: {},
	data() {
		return {
			masterVolume: 0.3,
			mainPlayer: null,
			players: [],
			machines: [
				{
					tracks: [
						{
							title: 'file1',
							file: 'folder/name.ogg',
							volume: 0.5,
							stretch: 1,
						},
						{
							title: 'generator1',
							volume: 0.2,
							generator: {
								type: 'sine',
								frequency: 440,
								attack: 2,
								release: 5,
							},
						},
						{ title: 'generator2' },
						{
							title: 'somescript',
							generator: {
								type: 'script',
								options: {
									audioFunction: function(e) {
										var output = e.outputBuffer.getChannelData(0);
										for (var i = 0; i < e.outputBuffer.length; i++)
											output[i] = Math.random();
									},
								},
							},
						},
					],
				},
			],
		};
	},
	computed: {
		masterVolumeSliderValue: function() {},
	},
	methods: {
		volumeChanged() {
			this.mainPlayer.volume = parseFloat(this.masterVolume);
		},
	},
	mounted() {
		var sawtoothWave = new Pizzicato.Sound({
			source: 'wave',
			options: {
				type: 'sawtooth',
			},
		});

		var sineWave = new Pizzicato.Sound({
			source: 'wave',
			options: {
				type: 'sine',
				frequency: 440,
			},
		});

		var delay = new Pizzicato.Effects.Delay();
		sawtoothWave.addEffect(delay);

		var group = new Pizzicato.Group([sawtoothWave, sineWave]);

		group.volume = 0.005;
		group.play();

		this.players.push(sineWave);
		this.players.push(sawtoothWave);
		this.mainPlayer = group;
	},
};
</script>

<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	text-align: center;
	color: #fef0fe;
	font-size: 3rem;
	margin-top: 60px;
}
</style>
