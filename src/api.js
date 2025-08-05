// 充值相关 API 封装
export async function createOrder(amount, encryptType, merchantNo, secret, merchantOrderNo) {
  const res = await fetch('/demo/api/order/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount, encryptType, merchantNo, secret, merchantOrderNo }),
  })
  const data = await res.json()
  return { ok: res.ok, data }
}

// 代付相关 API 封装
export async function createWithdraw(formData) {
  const res = await fetch('/demo/api/order/payOut', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  const data = await res.json()
  return { ok: res.ok, data }
} 