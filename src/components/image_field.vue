<template>
	<div class="image-field-container">
		<div class="image-container">
			<img v-if="!url" class="image" src="../assets/empty_img.jpg" />
			<img v-else class="image" :src="url" @error="url = null" />
		</div>
		<MLField
			ref="url-field"
			placeholder="image URL"
			:validate="validateURL"
			@onvalidatechange="onvalidatechange"
			size="medium"
		/>
		<div class="row">
			<MLField
				v-if="copyright_exists"
				ref="copyright-field"
				placeholder="copyright"
				@onvalidatechange="oncopyvalidatechange"
				:validate="validateCopyright"
			/>
			<button
				class="royalty"
				@click="copyright_exists = !copyright_exists"
			>
				<h2>royalty free</h2>
			</button>
		</div>
	</div>
</template>

<script>
import MLField from "./ml_field.vue";
export default {
	name: "ImageField",
	components: {
		MLField,
	},
	data() {
		return {
			url: null,
			copyright: null,
			copyright_exists: true,
			/* These are passed to components as values and this is not referenced */
			validateURL: function(val) {
				return val.match(
					/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
				);
			},
			validateCopyright: function(val) {
				return val.length > 2;
			},
		};
	},
	methods: {
		onvalidatechange: function(validated, url) {
			if (validated) this.url = url;
			else this.url = null;
		},
		oncopyvalidatechange: function(validated, copyright) {
			if (validated) this.copyright = copyright;
			else this.copyright = null;
		},
	},
};
</script>

<style lang="scss" scoped>
.image-field-container {
	margin-top: -170px;
	@media screen and (max-width: 1200px) {
		margin-top: 0px;
	}
}
.image-container {
	@extend .shadow_box;
	flex: 1;
	margin: 15px;
	overflow: hidden;
	display: flex;
	width: 500px;
	max-width: calc(100vw - 30px);
	max-height: 333px;
}
.image {
	width: 100%;
	height: 100%;
}

.royalty {
	@extend .shadow_box;
	background-image: linear-gradient(135deg, nth($greens, 1), nth($greens, 2));
	flex: 1;
	margin: 10px;
	min-height: 65px;
	border: none;
	h2 {
		color: white;
		font-weight: 900;
	}
	&:active h2 {
		animation: scale 0.1s;
		animation-iteration-count: infinite;
	}
}
</style>
