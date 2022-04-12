import React, { useState } from 'react'
import { Modal, Button, Form, Input } from 'antd'
import { persistTokenToLocalStorage } from '../../hooks/useAuth'

export const LoginForm = () => {
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
				Login
			</Button>
			<Modal
				title="Login to your Account"
				visible={isModalVisible}
				onCancel={handleCancel}
				okText="Register"
				onOk={() => {
					form
						.validateFields()
						.then(async (values) => {
							const res = await fetch('http://localhost:4000/api/v1/auth', {
								method: 'POST',
								headers: {
									'content-type': 'application/json'
								},
								body: JSON.stringify(values)
							})
							if (res.ok) {
								const data = await res.json()
								persistTokenToLocalStorage(data.token)
								form.resetFields()
								handleOk()
								window.location.reload()
							}
						})
						.catch((info) => {
							console.log('Validate Failed:', info)
						})
				}}
			>
				<Form form={form} layout="vertical" onFinish={(data) => console.log(data)}>
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
