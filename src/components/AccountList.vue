<template>
  <h2>账号列表:</h2>
  <div class="container">
    <van-cell-group>
      <van-cell
        v-for="item in walletInfo"
        icon="location-o"
        :title="item.address"
        :value="item.balance"
      />
    </van-cell-group>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Web3 from "web3";
import store2 from "store2";
const walletInfo = ref([]);
walletInfo.value = store2.get("walletInfo") || [];
const web3 = new Web3(
  Web3.givenProvider ||
    "wss://sepolia.infura.io/ws/v3/9592f660765f4dd19d74b5248ba9b66c"
);
const walletInfoC = computed(() => {
  return walletInfo.value.map(async (item) => {
    web3.eth.getBalance(item.address).then((res) => {
      item.balance = web3.utils.fromWei(res, "ether");
    });
    const res = await web3.eth.getBalance(item.address);
    item.balance = web3.utils.fromWei(res, "ether");
    return item;
  });
});
</script>

<style scoped lang="less">
.container {
  &:deep(.van-cell__title) {
    width: 60px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
</style>
