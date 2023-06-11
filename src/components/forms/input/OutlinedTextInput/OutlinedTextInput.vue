<template>
  <text-input
    :class="['outlined-input', indicator ? 'q-field--indicator' : '']"
    v-bind="$attrs"
    outlined
  />
</template>

<script>
import TextInput from '../TextInput/TextInput.vue';

export default {
  props: {
    indicator: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    TextInput,
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
.outlined-input {
  &--indicator {
    border: 2px solid $primary;
  }
}

.q-input {
  font-size: 1.2rem;
}

.q-field {
  /* border: 2px solid $primary; */
  border: 2px solid $secondary;
  border-radius: 10px;
  overflow: hidden;

  transition: 0.3s ease-in-out border;

  ::v-deep input,
  ::v-deep textarea {
    color: $secondary;
  }

  &--dense {
    font-size: 0.7em;
  }

  /* &--empty {
    border: 2px solid $secondary;
  }

  &--focused {
    border: 2px solid $primary;
  }
  */

  ::v-deep &__control::before,
  ::v-deep &__control::after {
    border: none;
  }

  ::v-deep &__label {
    color: $secondary;
  }
}

::v-deep .q-icon {
  color: $secondary;
}
</style>
