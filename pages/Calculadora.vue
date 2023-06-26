<template>
  <div class="calculator">
    <input v-model="display" type="text" readonly />
    <div class="buttons">
      <button v-for="button in buttons" :key="button" @click="handleButtonPress(button)">{{ button }}</button>
      <button class="equal-btn" @click="calculateResult">=</button>
      <button class="clear-btn" @click="clearDisplay">C</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      display: "",
      buttons: ["1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "0", ".", "/", "%"],
    };
  },
  methods: {
    handleButtonPress(button) {
      this.display += button;
    },
    calculateResult() {
      try {
        // eslint-disable-next-line no-eval
        this.display = eval(this.display);
      } catch (error) {
        this.display = "Error";
      }
    },
    clearDisplay() {
      this.display = "";
    },
  },
};
</script>

<style scoped>
.calculator {
  width: 240px;
  margin: 0 auto;
  background-color: #a5a5a5;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

input {
  width: 100%;
  height: 40px;
  font-size: 18px;
  padding: 8px;
  margin-bottom: 10px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
}

button {
  width: 100%;
  height: 40px;
  font-size: 18px;
  border: none;
  background-color: #727070;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #5f5f5f;
}

.equal-btn {
  grid-column: 1 / span 2;
}

.clear-btn {
  background-color: #c12015;
  color: #fff;
}

.clear-btn:hover {
  background-color: #cf0000;
}
</style>
