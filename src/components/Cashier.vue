<template>
  <div class="cashier-container">
    <h2>收银台</h2>
    <div class="order-info">
      <div>订单号：{{ orderId || '-' }}</div>
      <div>金额：<span class="amount">￥{{ amount || '0.00' }}</span></div>
    </div>
    <div class="pay-methods">
      <label>支付方式：</label>
      <div class="pay-options">
        <label><input type="radio" v-model="payType" value="wechat" /> 微信支付</label>
        <label><input type="radio" v-model="payType" value="alipay" /> 支付宝</label>
      </div>
    </div>
    <button class="pay-btn" :disabled="!payType" @click="pay">立即支付</button>
    <p v-if="message" class="msg">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 实际项目中这些数据应通过 props 或路由参数传递
const orderId = ref('202407010001')
const amount = ref('99.00')
const payType = ref('')
const message = ref('')

function pay() {
  if (!payType.value) {
    message.value = '请选择支付方式';
    return
  }
  message.value = `模拟发起${payType.value === 'wechat' ? '微信' : '支付宝'}支付...`
  // 这里可对接实际支付接口
}
</script>

<style scoped>
.cashier-container {
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  box-sizing: border-box;
  padding: 40px 40px 0 40px;
}
.order-info {
  margin: 32px 0 24px 0;
  font-size: 18px;
  color: #333;
}
.amount {
  color: #42b983;
  font-size: 22px;
  font-weight: bold;
}
.pay-methods {
  margin-bottom: 24px;
}
.pay-options label {
  margin-right: 24px;
  font-size: 16px;
}
.pay-btn {
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  display: block;
  padding: 14px;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s;
}
.pay-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.msg {
  margin-top: 24px;
  color: #f56c6c;
  text-align: center;
}
@media (max-width: 600px) {
  .cashier-container {
    padding: 24px 12px 0 12px;
  }
}
</style> 