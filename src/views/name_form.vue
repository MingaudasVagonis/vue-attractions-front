<template>
	<div id="main-container">
		<div id="center-container">
			<div
				class="row"
				style="justify-content: space-between; align-items: center; margin-bottom: 30px;;"
			>
				<div class="row" style="align-items: center">
					<img id="logo" src="../assets/logo.png" />
					<div class="column">
						<h1 id="title">#myLithuania</h1>
						<h2 id="subtitle">attractions</h2>
					</div>
				</div>
				<bounce-loader
					:loading="loading"
					color="#afd526"
					size="60px"
				></bounce-loader>
			</div>
			<div class="row" style="align-items: center;">
				<MLField
					ref="name_field"
					placeholder="Attraction's Name"
					size="medium"
					:validate="validateName"
				/>
				<button id="try" @click="checkName"><h1>➜</h1></button>
			</div>
			<div id="extra" v-if="extra.length > 0">
				<h1>
					{{
						`There are already ${
							this.extra.length
						} similar attraction${
							this.extra.length > 1 ? "s" : ""
						}:`
					}}
				</h1>
				<h2 v-for="(e, index) in extra" :key="'extra_' + index">
					{{ "• " + e }}
				</h2>
				<button @click="proceed">proceed anyways</button>
			</div>
		</div>
	</div>
</template>

<script>
import MLField from "../components/ml_field.vue";
import BounceLoader from "vue-spinner/src/BounceLoader.vue";
import axios from "axios";

export default {
	name: "NameForm",
	components: {
		MLField,
		BounceLoader,
	},
	data() {
		return {
			loading: false,
			extra: [],
		};
	},
	methods: {
		checkName: async function() {
			if (this.loading) return;

			if (this.$refs.name_field.validated !== 2) return;

			this.loading = true;

			try {
				const result = await axios.get("http://127.0.0.1:8080/check", {
					params: {
						name: this.$refs.name_field.value,
					},
				});

				/* If no similar attractions were found auto go to another page */
				if (result.data.length === 0)
					this.$router.push(
						"/add_attraction/" + this.$refs.name_field.value
					);
				else this.extra = result.data;
			} catch (err) {
				console.log(err);
			} finally {
				this.loading = false;
			}
		},
		proceed: function() {
			this.$router.push("/add_attraction/" + this.$refs.name_field.value);
			this.extra = [];
		},
		validateName: function(val) {
			return val.length > 3;
		},
	},
};
</script>

<style lang="scss" scoped>
#main-container {
	width: 100vw;
	height: 100vh;
	background-image: linear-gradient(135deg, nth($greens, 1), nth($greens, 3));
}
#center-container {
	@extend .shadow_box;
	background-color: $blueish_white;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	padding: 30px;
}
#try {
	background-image: linear-gradient(135deg, nth($greens, 1), nth($greens, 2));
	border-radius: 25px;
	border: none;
	margin-left: 20px;
	padding: 17px 22px;

	&:active h1 {
		animation: scale 0.2s;
		animation-iteration-count: infinite;
	}

	h1 {
		font-size: 1.7em;
		color: white;
	}
}
#extra {
	h1 {
		color: $darker;
		font-family: Avenir;
		font-weight: 900;
		margin: 20px 0 0 20px;
	}

	h2 {
		color: $def_color;
		font-family: Avenir;
		font-weight: 900;
		margin: 10px 0 0 50px;
	}

	button {
		border: none;
		margin: 15px 0 0 50px;
		font-weight: 900;
		color: nth($greens, 2);
		background: none;
	}
}
#title {
	font-size: 2.5em;
	line-height: 1.1em;
	font-family: "Pacifico", cursive;
	margin-left: 15px;
}
#subtitle {
	font-size: 1.5em;
	margin-left: 15px;
	color: $def_color;
	align-self: flex-end;
	font-family: Avenir;
	font-weight: 900;
}
#logo {
	width: 100px;
	height: 100px;
	border-radius: 25px;
}
</style>
