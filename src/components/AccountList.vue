<template>
    <h2>账号列表:</h2>
    <div>
        <div v-for="item in walletInfo">hello</div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import store2 from "store2";
const walletInfo = ref([])
walletInfo.value =  store2.get("walletInfo") || [];
</script>

<style scoped lang='less'>
</style>