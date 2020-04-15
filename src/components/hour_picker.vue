<template>
	<div class="container">
		<vue-timepicker
			:minute-interval="15"
			v-model="model[0]"
		></vue-timepicker>
		<vue-timepicker
			:minute-interval="15"
			v-model="model[1]"
		></vue-timepicker>
		<button @click="allday">
			<img class="icon" src="../assets/allday.png" />
		</button>
	</div>
</template>

<script>
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
export default {
	name: "HourPicker",
	components: {
		VueTimepicker,
	},
	props: {
		model: {
			type: Array,
			required: true,
		},
	},
	methods: {
		allday: function() {
			this.model[0] = "00:00";
			this.model[1] = "00:00";
			this.$forceUpdate();
		},
	},
};
</script>
<style lang="scss" scoped>
.container {
	@extend .shadow_box;
	margin: 10px;
	padding: 5px;
	align-self: baseline;
	display: flex;
	align-items: center;
	background-color: white;
}
button {
	background-image: linear-gradient(135deg, nth($greens, 1), nth($greens, 2));
	border-radius: 25px;
	border: none;
	margin-left: 5px;
	padding: 10px 15px;

	&:active img {
		animation: scale 0.1s;
		animation-iteration-count: infinite;
	}

	img {
		width: 30px;
		height: 30px;
	}
}
</style>

<style lang="scss">
.vue__time-picker input.display-time {
	border-radius: 20px;
	border-width: 0;
	padding: 0;
	font-weight: 900;
	margin-left: 15px;
	background-color: transparent;
}
.vue__time-picker .dropdown {
	border-radius: 20px;
	top: calc(2.2em + 25px);
}
.vue__time-picker .dropdown ul li:not([disabled]).active,
.vue__time-picker .dropdown ul li:not([disabled]).active:focus,
.vue__time-picker .dropdown ul li:not([disabled]).active:hover {
	background-color: nth($greens, 1);
}
</style>
