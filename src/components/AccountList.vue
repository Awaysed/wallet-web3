<template>
  <h2>账号列表:</h2>
  <div class="container">
    <van-cell-group>
      <van-cell
        v-for="item in walletInfo"
        icon="location-o"
        :title="item.address"
        value="内容"
      />
    </van-cell-group>
  </div>
</template>

<script setup>
import { ref } from "vue";
import store2 from "store2";
const walletInfo = ref([]);
walletInfo.value = store2.get("walletInfo") || [];
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
