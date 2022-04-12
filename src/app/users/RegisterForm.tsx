import React, { useState } from 'react'
import { Modal, Button, Form, Input, Select } from 'antd'
import { mutate } from 'swr'

export const RegisterForm = () => {
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
			<Button onClick={showModal}>Register</Button>
			<Modal
				title="Register for a new Account"
				visible={isModalVisible}
				onCancel={handleCancel}
				okText="Register"
				onOk={() => {
					form
						.validateFields()
						.then(async (values) => {
							const res = await fetch('http://localhost:4000/api/v1/users', {
								method: 'POST',
								headers: {
									'content-type': 'application/json'
								},
								body: JSON.stringify({
									user: values
								})
							})
							if (res.ok) {
								form.resetFields()
								mutate('http://localhost:4000/api/v1/users')
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
						label="Register as"
						name="role"
						rules={[{ required: true, message: 'Please select the kind of account you are registering for!' }]}
					>
						<Select>
							<Select.Option value="seller">Seller</Select.Option>
							<Select.Option value="buyer">Buyer</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item
						label="Username"
						name="username"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Password"
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password />
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}
