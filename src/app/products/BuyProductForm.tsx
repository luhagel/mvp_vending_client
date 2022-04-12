import React from 'react'
import { Button, Form, InputNumber } from 'antd'
import { mutate } from 'swr'
import { getTokenFromLocalStorage } from '../../hooks/useAuth'

export const BuyProductForm: React.FC<{ productId: string; stock: number }> = ({ productId, stock }) => {
	const [form] = Form.useForm()
	return (
		<>
			<Form
				form={form}
				layout="inline"
				onFinish={async ({ amount }) => {
					const res = await fetch('http://localhost:4000/api/v1/products/buy', {
						method: 'POST',
						headers: {
							'content-type': 'application/json',
							authorization: `Bearer ${getTokenFromLocalStorage()}`
						},
						body: JSON.stringify({
							product_id: productId,
							amount: amount || 1
						})
					})
					if (res.ok) {
						form.resetFields()
						mutate('http://localhost:4000/api/v1/products')
						mutate('http://localhost:4000/api/v1/auth/me')
					}
				}}
			>
				<Form.Item label="Amount" name="amount">
					<InputNumber addonAfter="Item(s)" defaultValue={1} min={1} max={stock} />
				</Form.Item>
				<Button type="primary" htmlType="submit" disabled={stock <= 0}>
					Buy
				</Button>
			</Form>
		</>
	)
}
