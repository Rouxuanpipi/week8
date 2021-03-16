<template>
  <div>
    <h2>Menu:</h2>
    <ul v-for="b in bList" v-bind:key="b.name">
      <p style="font-size:20px" v-if="b.count != 0" v-on:>{{ b.name }} x {{ b.count }}</p>
    </ul>
    <button v-on:click="subOK=true">SubTotal</button>
    <p v-show="subOK">${{ findTotal }}</p><br>
    <p></p>
    <button v-on:click="grandOK=true">Grand Total</button>
    <p v-show="grandOK">${{ (findTotal * 1.07).toFixed(2) }}</p>
    <p></p>
    <button v-on:click="sendOrder">Submit</button>
  </div>
</template>

<script>
import database from "../firebase.js";
export default {
  data() {
    return {
      subOK: false,
      grandOK: false,
    };
  },
  props: {
    bList: {
      type: Array,
    },
  },
  computed: {
    findTotal: function () {
      var total = 0;
      for (let i = 0; i < this.bList.length; i++) {
        total += this.bList[i].price * this.bList[i].count;
      }
      return total;
    },
  },
  methods: {
    sendOrder: function () {
      let arr = {};
      for(let i = 0; i < this.bList.length; i++){
        var name = this.bList[i].name;
        var quantity = this.bList[i].count;
        arr[name] = quantity;
      }
      database.collection("orders").add(arr).then(() => {location.reload()});   
    },
  },
};
</script>
<style scoped>
h2 {
  padding: 35px;
  width: 500px;
  background-color: #f8cac9;
  color: peru;
}

button {
  background-color: #f8cac9;
  padding: 10px 10px;
  text-align: center;
  border-radius: 5px;
}
</style>