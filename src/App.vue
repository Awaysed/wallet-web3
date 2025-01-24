<template>
  <h2>HelloWorld</h2>
  <!-- <ButtonVue />
  <AccountList/> -->
</template>

<script setup>
// import ButtonVue from "./components/Button1.vue";
// import AccountList from "./components/AccountList.vue";
import Web3 from 'web3'
import mtcContract from "./contract/MyToken.json";
console.log(222,mtcContract);
const geerLiWs = "wss://sepolia.infura.io/ws/v3/9592f660765f4dd19d74b5248ba9b66c"
const web3 = new Web3(
  Web3.givenProvider ||
  geerLiWs
);
</script>

<style></style>
