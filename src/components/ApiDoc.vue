<template>
  <div class="api-doc-container">
    <h1>API 文档</h1>
    
    <section class="doc-section">
      <h2>充值接口</h2>
      <p>用于创建充值订单的接口，支持多种加密方式和商户号选择。</p>
      
      <h3>接口地址</h3>
      <div class="code-block">
        <div class="code-header">
          <span>POST /demo/api/order/create</span>
          <button @click="copyCode('POST /demo/api/order/create')" class="copy-btn">复制</button>
        </div>
      </div>

      <h3>请求参数</h3>
      <div class="code-block">
        <div class="code-header">
          <span>JSON</span>
          <button @click="copyCode(requestParams)" class="copy-btn">复制</button>
        </div>
        <pre><code>{{ requestParams }}</code></pre>
      </div>

      <h3>参数说明</h3>
      <table class="param-table">
        <thead>
          <tr>
            <th>参数名</th>
            <th>类型</th>
            <th>必填</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>amount</td>
            <td>number</td>
            <td>是</td>
            <td>充值金额，最小0.01</td>
          </tr>
          <tr>
            <td>merchantNo</td>
            <td>string</td>
            <td>是</td>
            <td>商户号，支持：YJ749567、VG223937</td>
          </tr>
          <tr>
            <td>encryptType</td>
            <td>string</td>
            <td>是</td>
            <td>加密方式：md5、sha256</td>
          </tr>
          <tr>
            <td>secret</td>
            <td>string</td>
            <td>是</td>
            <td>商户密钥</td>
          </tr>
        </tbody>
      </table>

      <h3>响应示例</h3>
      <div class="code-block">
        <div class="code-header">
          <span>成功响应</span>
          <button @click="copyCode(successResponse)" class="copy-btn">复制</button>
        </div>
        <pre><code>{{ successResponse }}</code></pre>
      </div>

      <h3>JavaScript 调用示例</h3>
      <div class="code-block">
        <div class="code-header">
          <span>JavaScript</span>
          <button @click="copyCode(jsExample)" class="copy-btn">复制</button>
        </div>
        <pre><code>{{ jsExample }}</code></pre>
      </div>
    </section>

    <section class="doc-section">
      <h2>商户配置</h2>
      <p>系统支持以下商户配置：</p>
      
      <div class="code-block">
        <div class="code-header">
          <span>商户配置</span>
          <button @click="copyCode(merchantConfig)" class="copy-btn">复制</button>
        </div>
        <pre><code>{{ merchantConfig }}</code></pre>
      </div>
    </section>

    <div v-if="copyMessage" class="copy-message">{{ copyMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const copyMessage = ref('')

const requestParams = `{
  "amount": 100.00,
  "merchantNo": "YJ749567",
  "encryptType": "md5",
  "secret": "177965d903f446bd98b8facbfa361b96"
}`

const successResponse = `{
  "code": 200,
  "message": "success",
  "data": {
    "orderId": "202407010001",
    "amount": 100.00,
    "merchantNo": "YJ749567",
    "status": "pending",
    "createTime": "2024-07-01 10:30:00"
  }
}`

const jsExample = `// 使用 fetch 调用接口
async function createOrder(amount, merchantNo, encryptType, secret) {
  const response = await fetch('/demo/api/order/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount,
      merchantNo,
      encryptType,
      secret
    })
  });
  
  return await response.json();
}

// 调用示例
createOrder(100.00, 'YJ749567', 'md5', '177965d903f446bd98b8facbfa361b96')
  .then(data => console.log('订单创建成功:', data))
  .catch(error => console.error('创建失败:', error));`

const merchantConfig = `{
  "YJ749567": {
    "secret": "177965d903f446bd98b8facbfa361b96",
    "name": "商户A"
  },
  "VG223937": {
    "secret": "6f9a3d2b1c4e5f7a8b0d2e3f4c5a6b7d",
    "name": "商户B"
  }
}`

function copyCode(text) {
  navigator.clipboard.writeText(text).then(() => {
    copyMessage.value = '代码已复制到剪贴板！'
    setTimeout(() => {
      copyMessage.value = ''
    }, 2000)
  }).catch(() => {
    copyMessage.value = '复制失败，请手动复制'
    setTimeout(() => {
      copyMessage.value = ''
    }, 2000)
  })
}
</script>

<style scoped>
.api-doc-container {
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  padding: 40px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
}

h1 {
  color: #2c3e50;
  margin-bottom: 40px;
  font-size: 32px;
}

.doc-section {
  margin-bottom: 60px;
}

h2 {
  color: #34495e;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 24px;
}

h3 {
  color: #2c3e50;
  margin: 30px 0 15px 0;
  font-size: 20px;
}

p {
  color: #555;
  margin-bottom: 20px;
}

.code-block {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  margin: 20px 0;
  overflow: hidden;
}

.code-header {
  background: #e9ecef;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  color: #495057;
}

.copy-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s;
}

.copy-btn:hover {
  background: #369870;
}

pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
}

code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.4;
  color: #333;
}

.param-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.param-table th,
.param-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.param-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #495057;
}

.param-table td {
  color: #555;
}

.copy-message {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #42b983;
  color: white;
  padding: 12px 20px;
  border-radius: 4px;
  z-index: 1000;
  animation: fadeInOut 2s ease-in-out;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; transform: translateY(-10px); }
  20%, 80% { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .api-doc-container {
    padding: 20px;
  }
  
  h1 {
    font-size: 24px;
  }
  
  h2 {
    font-size: 20px;
  }
  
  h3 {
    font-size: 18px;
  }
  
  .code-header {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
}
</style> 