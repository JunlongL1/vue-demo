<template>
  <div class="direction">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: ['direction'],
  setup(props) {
    console.log(props.direction)
    return {
      direction: props.direction
    }
  }
})
</script>

<style>
.direction
{
  display: flex;
  flex-direction: v-bind(direction);
  justify-content: flex-end;
}
</style>