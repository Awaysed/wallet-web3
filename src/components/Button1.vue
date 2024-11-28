<template>
  <van-button type="primary" @click="createWallet">创建钱包</van-button>
  <van-button type="success">导入钱包</van-button>
  <van-dialog
    v-model:show="show"
    title="标题"
    @confirm="confirm"
    show-cancel-button
  >
    <van-cell-group inset>
      <van-field
        v-model="passwordValue"
        type="password"
        label="密码"
        placeholder="请输入密码"
      />
    </van-cell-group>
  </van-dialog>
  <p v-if="!isSave">{{ mnenonic }}</p>
  <van-button v-if="mnenonic && !isSave" @click="isSave = true"
    >我已保存</van-button
  >
  <van-field
    v-if="isSave && mnenonic"
    placeholder="请输入确定助记词"
    v-model="mnenonicInput"
  />
  <van-button v-if="isSave && mnenonic" @click="btnMnenonic" mini type="primary"
    >确定</van-button
  >
</template>

<script setup>
import { showDialog, showNotify } from "vant";
import * as bip39 from "bip39";
import { hdkey } from "ethereumjs-wallet";
import "vant/es/dialog/style";
import { ref } from "vue";
let show = ref(false);
const passwordValue = ref("");
let mnenonic = ref(""); // 助记词
let mnenonicInput = ref(""); // 用户输入
const isSave = ref(false);

const seed = ref("");
const createWallet = () => {
  show.value = true;
};
const confirm = () => {
  passwordValue.value = "";
  mnenonic.value = bip39.generateMnemonic();
  console.log("助记词", mnenonic.value);
};
const btnMnenonic = () => {
  if (passwordValue.value === mnenonicInput.value) {
    seed.value = bip39.mnemonicToSeed(mnenonic.value);
    const hdWallet = hdkey.fromMasterSeed(seed.value); // 钱包
  } else {
    showNotify("不一致");
  }
};
</script>

<style scoped lang="less"></style>
