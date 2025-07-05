<template>
  <div class="recharge-container">
    <h2>充值</h2>
    <form @submit.prevent="handleRecharge">
      <label for="amount">充值金额：</label>
      <input
        id="amount"
        v-model="amount"
        type="number"
        min="0.01"
        step="0.01"
        placeholder="请输入充值金额"
        required
        :disabled="loading"
      />
      <label for="merchantNo" style="margin-top:12px;display:block;">商户号：</label>
      <select id="merchantNo" v-model="merchantNo" :disabled="loading" required style="width:100%;padding:8px;margin-bottom:16px;border-radius:4px;border:1px solid #ccc;font-size:16px;">
        <option value="" disabled selected>请选择商户号</option>
        <option value="YJ749567">YJ749567</option>
        <option value="VG223937">VG223937</option>
      </select>
      <label for="encryptType" style="margin-top:12px;display:block;">加密方式：</label>
      <select id="encryptType" v-model="encryptType" :disabled="loading" required style="width:100%;padding:8px;margin-bottom:16px;border-radius:4px;border:1px solid #ccc;font-size:16px;">
        <option value="" disabled selected>请选择加密方式</option>
        <option value="md5">MD5</option>
        <option value="sha256">SHA256</option>
      </select>
      <button type="submit" :disabled="loading">
        {{ loading ? '充值中...' : '充值' }}
      </button>
    </form>
    <p v-if="message" style="margin-top:16px;color:#f56c6c;white-space:pre-wrap;">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createOrder } from '../api.js'

const amount = ref('')
const merchantNo = ref('')
const encryptType = ref('')
const loading = ref(false)
const message = ref('')

// 商户号对应的 secret
const merchantSecrets = {
  'YJ749567': '177965d903f446bd98b8facbfa361b96',
  'VG223937': '6f9a3d2b1c4e5f7a8b0d2e3f4c5a6b7d'
}

async function handleRecharge() {
  if (!amount.value || Number(amount.value) <= 0) {
    message.value = '请输入有效的充值金额';
    return;
  }
  if (!merchantNo.value) {
    message.value = '请选择商户号';
    return;
  }
  if (!encryptType.value) {
    message.value = '请选择加密方式';
    return;
  }
  loading.value = true
  message.value = ''
  try {
    const { ok, data } = await createOrder(amount.value, encryptType.value, merchantNo.value, merchantSecrets[merchantNo.value])
    if (ok) {
      message.value = '充值成功！订单信息：\n' + JSON.stringify(data, null, 2)
    } else {
      message.value = data.message || '充值失败'
    }
  } catch (e) {
    message.value = '请求失败，请检查网络或稍后重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.recharge-container {
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 40px 40px 0 40px;
  background: #fafbfc;
  box-sizing: border-box;
}
label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}
input[type="number"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 10px;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: #369870;
}
@media (max-width: 600px) {
  .recharge-container {
    width: 100vw;
    min-height: 100vh;
    padding: 0;
    margin: 0;
    background: #fff;
  }
  input[type="number"] {
    font-size: 18px;
    padding: 12px;
  }
  button {
    font-size: 18px;
    padding: 14px;
  }
}
</style> 