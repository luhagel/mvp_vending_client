import React, { useState } from 'react'
import { Modal, Button, Statistic, Skeleton } from 'antd'
import { mutate } from 'swr'
import { useMe } from './users'
import { getTokenFromLocalStorage } from '../../hooks/useAuth'

export const DepositForm: React.FC = () => {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const { isLoading, me } = useMe()

	if (isLoading) {
		return <Skeleton />
	}

	const depositMoney = async (amount: number) => {
		const res = await fetch('http://localhost:4000/api/v1/users/deposit', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${getTokenFromLocalStorage()}`
			},
			body: JSON.stringify({ amount })
		})
		if (res.ok) {
			mutate('http://localhost:4000/api/v1/auth/me')
		}
	}

	const resetDeposit = async () => {
		const res = await fetch('http://localhost:4000/api/v1/users/reset', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${getTokenFromLocalStorage()}`
			}
		})
		if (res.ok) {
			mutate('http://localhost:4000/api/v1/auth/me')
		}
	}

	const showModal = () => {
		setIsModalVisible(true)
	}

	const handleOk = () => {
		setIsModalVisible(false)
	}

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Deposit
			</Button>
			<Modal
				title="Deposit some Money"
				visible={isModalVisible}
				cancelText="Reset Deposit"
				onCancel={resetDeposit}
				okText="Done"
				onOk={handleOk}
			>
				<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
					<Statistic
						title="Current Balance"
						value={me.deposit / 100}
						precision={2}
						valueStyle={{ color: me.deposit <= 0 ? 'yellow' : '#3f8600' }}
						suffix="$"
					/>
				</div>
				<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', gap: 8 }}>
					<Button onClick={() => depositMoney(5)}>5 ct</Button>
					<Button onClick={() => depositMoney(10)}>10 ct</Button>
					<Button onClick={() => depositMoney(20)}>20 ct</Button>
					<Button onClick={() => depositMoney(50)}>50 ct</Button>
					<Button onClick={() => depositMoney(100)}>100 ct</Button>
				</div>
			</Modal>
		</>
	)
}
