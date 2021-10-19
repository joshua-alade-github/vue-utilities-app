<template>
  <h2 class="text-center mt-5">Calculator</h2>

  <div class="calculator p-3">
    <div class="calc-display w-full m-1 p-3 text-end lead font-weight-bold text-white py-5">
      <div class="text-start">
        {{prevCalcValue}}
      </div>
      <div>
        {{calcValue || 0}}
      </div>
    </div>

    <div class="row g-0">
      <div class="col-3" v-for="cButton in cButtons" :key="cButton">
        <div class="calc-display calc-buttons lead text-white text-center m-1 py-4 rounded"
         :class="{'calc-buttons-prime': ['%', 'C', 'DEL', '/', '*', '-', '+', '+/-', '.', '='].includes(cButton)}"
         @click="action(cButton)"
         >
          {{cButton}}
        </div>
      </div>
    </div>
    <div style="background: rgb(199, 199, 199)" class="w-full m-1 p-3 text-end lead font-weight-bold py-4"
     v-for="prevA in prevAsR" :key="prevA">
      {{prevA}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'Calculator',
  data() {
    return {
      calcValue: "",
      cButtons: [
      '%', 'C', 'DEL', '/',
      7, 8, 9, '*',
      4, 5, 6, '-',
      1, 2, 3, '+',
      '+/-', 0, '.', '='
      ],
      operator: null,
      prevCalcValue: '',
      prevAs: [],
    }
  },
  computed: {
    prevAsR() {
      return this.prevAs.slice().reverse()
    }
  },
  methods: {
    action(cButton) {
      if(cButton === '.' && this.calcValue === '') {
        this.calcValue += "0."
      }
      else if(cButton === '.' && this.calcValue.includes('.')) {
        return
      }
      else if(!isNaN(cButton) || cButton === '.') {
        this.calcValue += cButton + '';
      }
      else if(cButton === 'C') {
        this.calcValue = '';
      }
      else if(cButton === '%') {
        this.calcValue = this.calcValue / 100 +'';
      }
      else if(cButton === 'DEL') {
        this.calcValue = this.calcValue.slice(0, -1);
      }
      else if(cButton === '+/-') {
        if(this.calcValue[0] !== '-') {
          this.calcValue = '-' + this.calcValue + '';
        }
        else {
          this.calcValue = this.calcValue.slice(1);
        }
      }
      else if(['/', '*', '-', '+',].includes(cButton)) {
        this.operator = cButton;
        this.prevCalcValue = this.calcValue
        this.calcValue = ''
      }
      else if(cButton === '=') {
        this.calcValue = eval(
          this.prevCalcValue + this.operator + this.calcValue
        );
        this.calcValue += ''
        this.operator = null;
        this.prevCalcValue = ''
        this.prevAs.push(this.calcValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .calculator {
    max-width: 500px;
    margin: 50px auto;
    background: rgb(0, 0, 0);
  }
  .calc-display {
    background: #363636;
  }
  .calc-buttons:hover {
    cursor: pointer;
    background: #ff0000;
  }
  .calc-buttons-prime {
    background: #f79809;
  }
</style>