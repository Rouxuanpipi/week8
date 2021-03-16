<template>
  <div>
    <ul>
      <li><router-link to="/" exact>Home</router-link></li>
      <li><router-link to="/orders" exact>Orders</router-link></li>
    </ul>
    <ul id="itemsList">
      <li v-for="item in items" v-bind:key="item.name">
        <h2 id="itemName">{{ item.name }}</h2>
        <img v-bind:src="item.imageURL" />
        <p id="price">${{ item.price }}</p>
        <QtyCounter v-on:counter="onCounter" v-bind:item="item"></QtyCounter>
      </li>
    </ul>
    <div id="shoppingBasket">
      <Basket v-bind:bList="items"></Basket>
    </div>
  </div>
</template>

<script>
import Basket from "./Basket.vue";
import database from "../firebase.js";
export default {
  data() {
    return {
      items: [], //store items from database
    };
  },
  components: {
    Basket,
  },
  methods: {
    //fetching data from database
    fetchItems: function () {
      database
        .collection("menu")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            item.id = doc.id;
            this.items.push(item);
          });
        });
    },
    onCounter: function (item, count) {
      for (let i = 0; i < this.items.length; i++) {
        const curr_item = this.items[i];
        if (curr_item.name == item.name) {
          this.items[i].count = count;
          break;
        }
      }
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  max-width: 70%;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 40px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>