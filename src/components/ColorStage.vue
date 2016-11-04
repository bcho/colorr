<template>
  <div
    class="color-stage"
    :style="stageStyle">
    <input
    type="text"
    class="color-input"
    autofocus="1"
    v-model="inputColor"
    :style="inputStyle">
  </div>
</template>

<style>
.color-stage {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
}

.color-input {
  display: block;
  outline: none;
  width: 100%;
  background-color: transparent;
  border: none;
  font-size: 3rem;
  text-align: center;
}
</style>

<script>
  function rgb2lumin(rgbColor) {
    const rgb = parseInt(rgbColor.replace(/^#/, ''), 16);
    if (isNaN(rgb)) return 0;

    const r  = (rgb >> 16) & 0xff;
    const g  = (rgb >> 8) & 0xff;
    const b  = (rgb >> 0) & 0xff;

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;  // per ITU-R BT.709
  }

  export default {
    name: 'ColorStage',

    props: {
      color: {
        type: String,
        required: true,
      },
    },

    data: function() {
      return {
        inputColor: this.color.replace(/^#/, ''),
      };
    },

    computed: {
      stageStyle: function() {
        return {
          backgroundColor: `#${this.inputColor}`,
        };
      },

      inputStyle: function() {
        return {
          color: (rgb2lumin(this.inputColor) > 30) ? '#fff' : '#000',
        };
      },
    },
  };
</script>
