<template>
  <div>
    <div v-for="(quantity, name) in datapackets" :key = name>
      <p>{{ name }}: {{ quantity }}</p>
      <input type = "number" placeholder="0" min="0" v-bind:id = name>
    </div>
      <button v-on:click="updateOrder()">Update</button>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      id: "",
      datapackets: {},
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
            if (doc.id === this.id) {
              this.datapackets = doc.data();
            }
          });
        });
    },
    updateOrder: function () {
      let updatedDoc= Object.assign({}, this.datapackets);
      for(const key in updatedDoc){
        var updatedQuantity = document.getElementById(key).value;

        if (updatedQuantity == ""){
          updatedQuantity = this.datapackets[key];
        }

        updatedDoc[key] = updatedQuantity;
      }
      database.collection('orders').doc(this.id).set(updatedDoc).then(() => {location.reload()});
      this.$router.push({ path: '/orders' });
    }
  },
  created() {
    this.fetchItems();
    this.id = this.$route.params.id;
  },
};
</script>