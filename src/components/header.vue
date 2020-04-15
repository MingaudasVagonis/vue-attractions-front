<template>
	<div class="container">
		<div
			class="row"
			style="justify-content: space-between; align-items: center;"
		>
			<div class="row">
				<img src="../assets/logo.png" class="logo" />
				<div class="column">
					<h1>#myLithuania</h1>
					<h2>attractions</h2>
				</div>
			</div>
			<button id="send" @click="$emit('send')">
				send
			</button>
		</div>
		<div class="row">
			<div v-for="i in 4" :class="'foot-' + i" :key="i" />
		</div>
	</div>
</template>
<script>
export default {
	name: "Header",
};
</script>

<style scoped lang="scss">
@each $color in $greens {
	$i: index($greens, $color);
	.foot-#{$i} {
		flex: 1;
		height: 10px;
		background-color: $color;
	}
}
.container {
	width: 100vw;
	@extend .column;
	background-color: white;
	margin-bottom: 5px;
	h1 {
		font-size: 2.5em;
		line-height: 1.1em;
		font-family: "Pacifico", cursive;
		margin: 5px 0 0 10px;
	}

	h2 {
		font-size: 1.5em;
		margin-left: 15px;
		color: $def_color;
		align-self: flex-end;
		font-family: Avenir;
		font-weight: 900;
	}
}
.logo {
	height: 70px;
	width: 70px;
	margin: 10px 15px;
	box-shadow: 0px 0px 15px 0px $shadow;
	border-radius: 20px;
}

#send {
	background: none;
	border: none;
	font-size: 1.5em;
	color: nth($greens, 4);
	font-weight: 500;
	margin-right: 15px;
	&:active {
		animation: scale 0.5s;
		animation-iteration-count: infinite;
	}
}
</style>
