// keyboard.js

const KEY_DOWN = 40
const KEY_UP = 38
const ESCAPE = 27
const CHAR_A = 65

export default {
  template: `
    <input type="text" @keydown.prevent="onKeydown" v-model="quantity" />
  `,

  data () {
    return {
      quantity: 0
    }
  },

  methods: {
    increment () {
      this.quantity += 1
    },
    decrement () {
      this.quantity -= 1
    },
    clear () {
      this.quantity = 0
    },
    onKeydown (e) {
      if (e.keyCode === ESCAPE) {
        this.clear()
      }
      if (e.keyCode === KEY_DOWN) {
        this.decrement()
      }
      if (e.keyCode === KEY_UP) {
        this.increment()
      }
      /* if (e.which === CHAR_A) {
        this.quantity = 13;
      } */
    }
  },

  watch: {
    quantity: function (newValue) {
      this.$emit('input', newValue)
    }
  }
}
