// 充值相关 API 封装
export async function createOrder(amount, encryptType, merchantNo, secret) {
  const res = await fetch('/demo/api/order/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount, encryptType, merchantNo, secret }),
  })
  const data = await res.json()
  return { ok: res.ok, data }
} 