<template>
  <div class="withdraw-container">
    <h2>代付申请</h2>
    <form @submit.prevent="handleWithdraw">
      <div class="form-group">
        <label for="amount">代付金额：</label>
        <input
          id="amount"
          v-model="formData.amount"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="请输入代付金额"
          required
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label for="merchantNo">商户号：</label>
        <select id="merchantNo" v-model="formData.merchantNo" :disabled="loading" required>
          <option value="" disabled selected>请选择商户号</option>
          <option value="YJ749567">YJ749567</option>
          <option value="VG223937">VG223937</option>
        </select>
      </div>

      <div class="form-group">
        <label for="phone">手机号码：</label>
        <input
          id="phone"
          v-model="formData.phone"
          type="text"
          placeholder="请输入手机号码"
          required
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label for="email">邮箱地址：</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          placeholder="请输入邮箱地址"
          required
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label for="account">银行账号：</label>
        <input
          id="account"
          v-model="formData.account"
          type="text"
          placeholder="请输入银行账号"
          required
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label for="accountName">账户姓名：</label>
        <input
          id="accountName"
          v-model="formData.accountName"
          type="text"
          placeholder="请输入账户姓名"
          required
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label for="bankName">开户银行：</label>
        <input
          id="bankName"
          v-model="formData.bankName"
          type="text"
          placeholder="请输入开户银行"
          required
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label for="subBranch">开户支行：</label>
        <input
          id="subBranch"
          v-model="formData.subBranch"
          type="text"
          placeholder="请输入开户支行"
          required
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label for="address">开户地址：</label>
        <input
          id="address"
          v-model="formData.address"
          type="text"
          placeholder="请输入开户地址"
          required
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label for="withdrawType">代付类型：</label>
        <select id="withdrawType" v-model="formData.withdrawType" :disabled="loading" required>
          <option value="" disabled selected>请选择代付类型</option>
          <option value="1">银行卡</option>
          <option value="2">UPI</option>
        </select>
      </div>

      <div class="form-group">
        <label for="encryptType">加密方式：</label>
        <select id="encryptType" v-model="formData.encryptType" :disabled="loading" required>
          <option value="" disabled selected>请选择加密方式</option>
          <option value="md5">MD5</option>
          <option value="sha256">SHA256</option>
        </select>
      </div>

      <button type="submit" :disabled="loading" class="submit-btn">
        {{ loading ? '提交中...' : '提交代付申请' }}
      </button>
    </form>

    <div v-if="message" class="message" :class="{ error: isError }">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { createWithdraw } from '../api.js'

const loading = ref(false)
const message = ref('')
const isError = ref(false)

const merchantSecrets = {
  'YJ749567': '177965d903f446bd98b8facbfa361b96',
  'VG223937': '6f9a3d2b1c4e5f7a8b0d2e3f4c5a6b7d'
}

const formData = reactive({
  amount: '',
  merchantNo: '',
  secret: '',
  phone: '',
  email: '',
  account: '',
  accountName: '',
  address: '',
  subBranch: '',
  withdrawType: '',
  bankName: '',
  encryptType: ''
})

function validateForm() {
  if (!formData.amount || Number(formData.amount) <= 0) {
    return '请输入有效的代付金额'
  }
  if (!formData.merchantNo) {
    return '请选择商户号'
  }
  // 自动填充 secret 字段
  formData.secret = merchantSecrets[formData.merchantNo] || ''
  if (!formData.phone) {
    return '请输入手机号码'
  }
  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    return '请输入有效的邮箱地址'
  }
  if (!formData.account || formData.account.length < 10) {
    return '请输入有效的银行账号'
  }
  if (!formData.accountName || formData.accountName.length < 2) {
    return '请输入有效的账户姓名'
  }
  if (!formData.bankName) {
    return '请选择开户银行'
  }
  if (!formData.subBranch) {
    return '请输入开户支行'
  }
  if (!formData.address) {
    return '请输入开户地址'
  }
  if (!formData.withdrawType) {
    return '请选择代付类型'
  }
  if (formData.withdrawType !== '1' && formData.withdrawType !== '2') {
    return '代付类型只能为银行卡或UPI'
  }
  if (!formData.encryptType) {
    return '请选择加密方式'
  }
  if (!formData.secret) {
    return '未能获取到密钥 (secret)，请检查商户号选择'
  }
  return null
}

async function handleWithdraw() {
  const error = validateForm()
  if (error) {
    message.value = error
    isError.value = true
    return
  }

  loading.value = true
  message.value = ''
  isError.value = false

  try {
    const { ok, data } = await createWithdraw(formData)
    
    if (ok) {
      message.value = '代付申请提交成功！\n' + JSON.stringify(data, null, 2)
      isError.value = false
      // 清空表单，保留商户号
      const keepKeys = ['merchantNo']
      // Object.keys(formData).forEach(key => {
      //   if (!keepKeys.includes(key)) formData[key] = ''
      // })
    } else {
      message.value = data.message || '代付申请失败'
      isError.value = true
    }
  } catch (error) {
    message.value = '网络错误，请稍后重试'
    isError.value = true
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.withdraw-container {
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  padding: 40px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h2 {
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 28px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #34495e;
  font-size: 14px;
}

input, select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

input:focus, select:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

input:disabled, select:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 20px;
}

.submit-btn:hover:not(:disabled) {
  background: #369870;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.message {
  margin-top: 20px;
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
}

.message.error {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.message:not(.error) {
  background: #f0f9ff;
  color: #0369a1;
  border: 1px solid #bae6fd;
}

@media (max-width: 768px) {
  .withdraw-container {
    padding: 20px;
  }
  
  h2 {
    font-size: 24px;
  }
  
  input, select {
    font-size: 16px; /* 防止iOS缩放 */
  }
}
</style> 