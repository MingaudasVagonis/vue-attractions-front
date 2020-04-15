<template>
  <div
    :style="{ borderColor: border }"
    :class="[{ scaleup: focused }, { medium: size === 'medium' }, 'container']"
  >
    <input
      type="text"
      :id="`${placeholder}_input`"
      :placeholder="placeholder"
      class="field"
      v-model="value"
      @focus="focused = true"
      @blur="focused = false"
    />

    <img v-if="validated === 2" class="icon" src="../assets/tick.png" />
    <div v-else class="icon" />
  </div>
</template>

<script>
export default {
  name: "MLField",
  props: {
    size: {
      type: String,
      required: false,
      default: "small",
      validator: function(value) {
        return ["small", "medium"].indexOf(value) !== -1;
      },
    },
    type: {
      type: String,
      required: false,
      default: "text",
      validator: function(value) {
        return ["text", "number"].indexOf(value) !== -1;
      },
    },
    placeholder: {
      type: String,
      required: true,
    },
    validate: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      focused: false,
      border: "transparent",
      value: "",
      validated: 0,
    };
  },
  watch: {
    focused: function(val) {
      if (val || !this.value.trim().length) {
        this.border = "transparent";
        this.validated = 0;
        return;
      }

      if (this.validate(this.value)) {
        this.border = "transparent";
        this.validated = 2;
      } else {
        this.border = "red";
        this.validated = 1;
      }

      this.$emit("onvalidatechange", this.validated === 2, this.value);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  @extend .shadow_box, .row;
  border: 2px solid transparent;
  margin: 10px;
  padding: 20px 20px 20px 50px;
  transition: 0.3s ease-in-out;
  display: flex;
  justify-content: space-between;
  background-color: white;
}

.medium {
  input {
    width: 400px;
  }
  max-width: calc(100vw - 100px);
}

.field {
  border-width: 0;
  outline-width: 0;
  font-weight: 900;
  margin-right: 10px;
}

.icon {
  width: 20px;
  height: 20px;
}

.scaleup {
  transform: scale(1.1);
}
</style>
