<template>
	<div
		:class="[{ up: animating }, 'container']"
		@animationend="animating = false"
	>
		<div>
			Error
		</div>
		<div>
			{{ content }}
		</div>
	</div>
</template>

<script>
export default {
	name: "Error",
	props: {
		content: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			animating: false,
		};
	},
	watch: {
		content: function(val) {
			if (val) this.animating = true;
		},
	},
};
</script>

<style scoped lang="scss">
.container {
	width: 100vw;
	top: 100%;
	background-image: linear-gradient(135deg, nth($reds, 1), nth($reds, 2));
	position: absolute;
	flex-direction: column;
	display: none;
	font-size: 2em;
	font-weight: 900;
	:first-child {
		font-family: Avenir;
		align-self: baseline;
		border-top-right-radius: 30px;
		border-bottom-right-radius: 30px;
		background-color: white;
		padding: 10px 90px 10px 20px;
		margin-top: 20px;
	}
	:nth-child(2) {
		font-family: Avenir;
		color: white;
		padding: 20px;
	}
}

.up {
	display: flex;
	animation: upanim 3s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes upanim {
	0% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-100%);
	}
}
</style>
