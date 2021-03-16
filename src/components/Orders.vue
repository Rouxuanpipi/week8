<template>
  <div>
    <ul>
      <li><router-link to="/" exact>Home</router-link></li>
      <li><router-link to="/orders" exact>Orders</router-link></li>
    </ul>

    <ul>
      <li v-for="doc in orders" :key="doc.id">
        <div v-for="(quantity, name) in doc.data()" :key="name">
          <p>{{ name }}: {{ quantity }}</p>
        </div>
        <button v-bind:id="doc.id" v-on:click="deleteItem(doc)">Delete</button>
        <button v-bind:id="doc.id" v-on:click="route(doc)">Modify</button>
      </li>
    </ul>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    //fetching data from database
    fetchItems: function () {
      database
        .collection("orders")
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            this.orders.push(doc);
          });
        });
    },
    deleteItem: function (del_item) {
      database
        .collection("orders")
        .doc(del_item.id)
        .delete()
        .then(() => {location.reload()});
    }, 
    route: function (event) {
      this.$router.push({ name: "Modify", params: { id: event.id } });
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

#list {
  font-size: 5px;
}

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>