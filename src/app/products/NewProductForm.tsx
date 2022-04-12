import React, { useState } from 'react'
import { Modal, Button, Form, Input, InputNumber } from 'antd'
import { mutate } from 'swr'
import { getTokenFromLocalStorage } from '../../hooks/useAuth'

export const NewProductForm = () => {
	const [form] = Form.useForm()
	const [isModalVisible, setIsModalVisible] = useState(false)

	const showModal = () => {
		setIsModalVisible(true)
	}

	const handleOk = () => {
		setIsModalVisible(false)
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Add Product
			</Button>
			<Modal
				title="Add a new Product"
				visible={isModalVisible}
				onCancel={handleCancel}
				okText="Create Product"
				onOk={() => {
					form
						.validateFields()
						.then(async (values) => {
							const res = await fetch('http://localhost:4000/api/v1/products', {
								method: 'POST',
								headers: {
									'content-type': 'application/json',
									authorization: `Bearer ${getTokenFromLocalStorage()}`
								},
								body: JSON.stringify({
									product: values
								})
							})
							if (res.ok) {
								form.resetFields()
								mutate('http://localhost:4000/api/v1/products')
								handleOk()
							}
						})
						.catch((info) => {
							console.log('Validate Failed:', info)
						})
				}}
			>
				<Form form={form} layout="vertical" onFinish={(data) => console.log(data)}>
					<Form.Item
						label="Product Name"
						name="name"
						rules={[{ required: true, message: 'Please input a name for your product!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Cost"
						name="cost"
						rules={[{ required: true, message: 'Please select the kind of account you are registering for!' }]}
					>
						<InputNumber addonAfter="ct" defaultValue={5} min={5} step={5} />
					</Form.Item>
					<Form.Item
						label="Stock"
						name="amount_avaliable"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<InputNumber addonAfter="Item(s)" defaultValue={0} min={0} />
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}
