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
let show = ref(false);
const passwordValue = ref(""); // 密码
let mnemonic = ref(""); // 助记词
let mnemonicInput = ref(""); // 用户输入
const isSave = ref(false);

const seed = ref("");
const createWallet = () => {
  show.value = true;
};
const confirm = () => {
  passwordValue.value = "";
  mnemonic.value = bip39.generateMnemonic();
  console.log("助记词", mnemonic.value);
};
const btnmnemonic = async() => {
  mnemonicInput.value = mnemonic.value
  if (mnemonicInput.value == mnemonic.value) {
    seed.value = await bip39.mnemonicToSeed(mnemonic.value);
    const hdWallet = hdkey.fromMasterSeed(seed.value); // 钱包
    const keyPair = hdWallet.derivePath("m/44'/60'/0'/0/0") // 密钥对(m/子树/币种/账户/外部链/地址索引)
    const wallet  = keyPair.getWallet() 
    const lowerCaseAddress = wallet.getAddressString()
    const CheckSumAddress = wallet.getAddressString()
    const privateKey = wallet.getPrivateKey().toString('hex')
    const keyStore = await wallet.toV3(passwordValue.value)
    const walletInfo = {
      address:lowerCaseAddress,
      privateKey,
      keyStore,
      mnemonic:mnemonic.value,
      balance:0
    }
    console.log(6666,walletInfo);
  } else {
    showNotify("不一致");
  }
};
</script>

<style scoped lang="less"></style>
