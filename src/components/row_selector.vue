<template>
	<div class="container">
		<div
			class="selector"
			:style="{
				transform: 'translateX(' + 109 * selected + '%)',
				width: '110px',
				height: '55px',
			}"
		/>
		<div class="button-container">
			<button
				v-for="(value, index) in values"
				:class="['value-text', { focused: selected === index }]"
				@click="selected = index"
				:key="index"
			>
				{{ value }}
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "RowSelector",
	props: {
		values: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			selected: 0,
		};
	},
};
</script>

<style lang="scss" scoped>
.selector {
	position: absolute;
	transition: 0.5s ease-in-out;
	border-radius: 25px;
	background-image: linear-gradient(135deg, nth($greens, 1), nth($greens, 2));
	left: 5px;
	top: 5px;
}
.container {
	@extend .shadow_box;
	margin: 10px;
	align-self: baseline;
	position: relative;
	background-color: white;
}
.button-container {
	position: relative;
	display: flex;
	background-color: transparent;

	button {
		width: 120px;
		height: 65px;
		color: $def_color;
		font-weight: 900;
		transition: color 0.5s;
		background-color: transparent;
		border: none;
	}

	button.focused {
		color: #ffffff;
	}
}
</style>
