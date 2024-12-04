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
  <p v-if="!isSave">{{ mnemonic }}</p>
  <van-button v-if="mnemonic && !isSave" @click="isSave = true"
    >我已保存</van-button
  >
  <van-field
    v-if="isSave && mnemonic"
    placeholder="请输入确定助记词"
    v-model="mnemonicInput"
  />
  <van-button v-if="isSave && mnemonic" @click="btnmnemonic" mini type="primary"
    >确定</van-button
  >
</template>

<script setup>
import { showDialog, showNotify } from "vant";
import * as bip39 from "bip39";
import { hdkey } from "ethereumjs-wallet";
import "vant/es/dialog/style";
import { ref } from "vue";
import store2 from "store2";
let show = ref(false);
const passwordValue = ref(""); // 密码
let mnemonic = ref(""); // 助记词
let mnemonicInput = ref(""); // 用户输入
const isSave = ref(false);

const seed = ref("");
const createWallet = () => {
  show.value = true;
};
// 确定创建账号
const confirm = () => {
  passwordValue.value = "";
  const walletInfo = store2.get("walletInfo") || [];
  mnemonic.value =
    walletInfo.length > 0
      ? walletInfo[0]["mnemonic"]
      : bip39.generateMnemonic();
  console.log("助记词", mnemonic.value);
  if (walletInfo) {
    btnmnemonic();
  }
};
const btnmnemonic = async () => {
  mnemonicInput.value = mnemonic.value;
  const storeWallet = store2.get("walletInfo") || [];

  if (mnemonicInput.value !== mnemonic.value && storeWallet.length === 0) {
    console.log(9999);
    return;
  } else {
    seed.value = await bip39.mnemonicToSeed(mnemonic.value);
    const hdWallet = hdkey.fromMasterSeed(seed.value); // 钱包

    const addressIndex = storeWallet.length === 0 ? 0 : storeWallet.length + 1;

    const keyPair = hdWallet.derivePath(`m/44'/60'/0'/0/${addressIndex}`); // 密钥对(m/子树/币种/账户/外部链/地址索引)

    const wallet = keyPair.getWallet();

    const lowerCaseAddress = wallet.getAddressString();
    const CheckSumAddress = wallet.getAddressString();
    const privateKey = wallet.getPrivateKey().toString("hex");
    const keyStore = await wallet.toV3(passwordValue.value);

    const walletObj = {
      id: addressIndex,
      address: lowerCaseAddress,
      privateKey,
      keyStore,
      mnemonic: mnemonic.value,
      balance: 0,
    };
    storeWallet.push(walletObj);

    store2("walletInfo", storeWallet);
  }
};
</script>

<style scoped lang="less"></style>
