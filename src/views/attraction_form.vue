<template>
	<div style="padding-bottom: 15px;">
		<Header @send="send" />
		<div class="column" style="align-items: center; width: 100vw;">
			<div class="field-container">
				<div
					v-for="(row, index) in field_rows"
					:key="index"
					class="column"
				>
					<h1 v-if="row.title" class="title">{{ row.title }}</h1>
					<div class="row-wrap" style="justify-content: center;">
						<MLField
							v-for="field in row.fields"
							:placeholder="field.placeholder"
							:ref="field.id"
							:type="field.type"
							:validate="field.validate"
							:key="field.id"
						></MLField>
					</div>
				</div>
			</div>
			<div class="row-wrap" style="justify-content: center;">
				<div class="column-wrap">
					<div
						v-for="(hour, index) in hours"
						:key="'hour_' + index"
						class="hour-parent"
					>
						<h1 class="title" style="margin-right: 15px;">
							{{ hour.title }}
						</h1>
						<HourPicker :model="hours_values[index]" />
					</div>
				</div>
				<RowSelector
					v-for="(selector, index) in selectors"
					:key="'selector_' + index"
					ref="categories"
					:values="selector.values"
				/>
			</div>
			<div class="bottom-container">
				<div
					style="position: relative; flex:1; display: flex; flex-grow: 1; max-width: 800px;"
				>
					<textarea
						placeholder="Start Writing"
						v-model="description"
						ref="description"
					/>

					<div class="button-row">
						<button @click="refocus('\t')">
							<h2>tab</h2>
						</button>
						<button @click="refocus('\n\n\t')">
							<h2>new paragraph</h2>
						</button>
					</div>
					<h3>Description</h3>
				</div>

				<ImageField ref="image" />
			</div>
		</div>
		<Error :content="error" />
	</div>
</template>

<script>
import MLField from "../components/ml_field.vue";
import { field_rows, hours, selectors } from "../assets/components.js";
import Header from "../components/header.vue";
import RowSelector from "../components/row_selector.vue";
import HourPicker from "../components/hour_picker.vue";
import ImageField from "../components/image_field.vue";
import Error from "../components/error.vue";
import axios from "axios";

export default {
	name: "AttractionForm",
	components: {
		MLField,
		Header,
		RowSelector,
		HourPicker,
		ImageField,
		Error,
	},
	data() {
		return {
			field_rows,
			hours,
			selectors,
			hours_values: Array.from({ length: hours.length }, () => ["", ""]),
			description: "",
			error: "",
		};
	},
	methods: {
		refocus: function(char) {
			this.description += char;

			const description = this.$refs.description;

			/* Seting textarea cursor to a new position */
			description.focus();
			description.selectionEnd = this.description.length;
			description.selectionStart = this.description.length;
		},

		send: async function() {
			const hours_data = {},
				fields_data = {};

			/*  Getting all the fields' references */
			const fields = field_rows.flatMap((row) =>
				row.fields.map((field) => ({
					name: field.placeholder,
					data: this.$refs[field.id][0].$data,
				}))
			);

			/* Checking whether all the fields' values are valid */
			for (let i = 0; i < fields.length; i++) {
				if (fields[i].data.validated !== 2) {
					this.error = `Invalid field '${fields[i].name}'`;
					return;
				}
				fields_data[fields[i].name] = fields[i].data.value;
			}

			/* Creating an hour string from hour fields and checking their validity*/
			for (let [index, hour] of hours.entries()) {
				const hs = `${this.hours_values[index][0]}-${this.hours_values[index][1]}`;

				if (
					hs.length <= 1 ||
					!hs.match(/([0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2})/)
				) {
					this.error = `Invalid hours '${hour.title}'`;
					return;
				}

				hours_data[hour.id] = hs.replace("00:00-00:00", "00:00-24:00");
			}

			/* Creating request body */
			const data = {
				category:
					selectors[0].values[
						this.$refs.categories[0].$data.selected
					],
				description: {
					name: this.$route.params.name,
					hours: hours_data,
					info: this.description,
				},
				location: {
					city: fields_data.city,
					coordinates: {
						latitude: parseFloat(fields_data.latitude),
						longitude: parseFloat(fields_data.longitude),
					},
				},
				image: {
					url: this.$refs.image.$data.url,
					copyright: this.$refs.image.$data.copyright,
				},
			};

			try {
				const result = await axios.post(
					"http://127.0.0.1:8080/add",
					data,
					{
						headers: { "Content-Type": "application/json" },
					}
				);

				if (result.data.error) this.error = result.data.error;
				/* Go back to the landing page */ else this.$router.push("/");
			} catch (err) {
				this.error = err;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.button-row {
	@extend .row;
	position: absolute;
	right: 18px;
	top: 22px;
	button {
		@extend .shadow_box;
		background-image: linear-gradient(
			135deg,
			nth($greens, 1),
			nth($greens, 2)
		);
		margin-left: 7px;
		border: none;
		padding: 8px 15px;
		h2 {
			color: white;
			font-weight: 900;
		}
		&:active h2 {
			animation: scale 0.1s;
			animation-iteration-count: infinite;
		}
	}
}
.title {
	align-self: baseline;
	font-weight: 900;
	margin-left: 30px;
	font-family: Avenir;
	@media screen and (max-width: 750px) {
		align-self: center;
	}
}
.field-container {
	padding: 10px 20px 10px 20px;
	@extend .row-wrap;
	justify-content: center;
}

.hour-parent {
	display: flex;
	justify-content: center;
	@media screen and (max-width: 580px) {
		flex-direction: column;
	}
}
textarea {
	@extend .shadow_box;
	flex: 1;
	display: inline;
	resize: none;
	margin: 15px 5px 0 15px;
	border-width: 0px;
	padding: 47px 15px 15px 15px;
	font-weight: 900;
	min-width: 400px;
	min-height: 300px;
}
.bottom-container {
	@extend .row-wrap;
	width: 100vw;
	max-width: 1200px;
	justify-content: center;

	h3 {
		position: absolute;
		font-family: Avenir;
		font-weight: 900;
		left: 30px;
		top: 27px;
	}
}
</style>
