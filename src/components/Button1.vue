<template>
  <van-button type="primary" @click="createWallet">创建钱包</van-button>
  <van-button type="success">导入钱包</van-button>
  <van-dialog v-model:show="show" title="标题" show-cancel-button>
    <van-cell-group inset>
      <van-field v-model="passwordValue" type="password" label="密码" placeholder="请输入密码" />
    </van-cell-group>
  </van-dialog>
</template>

<script setup>
import { showDialog } from "vant";
import "vant/es/dialog/style";
import { ref } from "vue";
let show = ref(false);
const passwordValue = ref('')
const createWallet = () => {
  show.value = true;
};
</script>

<style scoped lang="less"></style>
