import { Table, Tag } from 'antd'
import React from 'react'
import { useUsers } from './users'

const userColumns = [
	{
		title: 'Name',
		dataIndex: 'username',
		key: 'username'
	},
	{
		title: 'Deposit',
		dataIndex: 'deposit',
		key: 'deposit',
		render: (deposit: number) => <span>{deposit} $</span>
	},
	{
		title: 'Role',
		dataIndex: 'role',
		key: 'role',
		render: (role: 'buyer' | 'seller') => (
			<Tag color={role === 'buyer' ? 'green' : 'gold'}>{role === 'buyer' ? 'Buyer' : 'Seller'}</Tag>
		)
	},
	{
		title: '',
		key: 'actions'
	}
]

export const UserList = () => {
	const { isLoading, users } = useUsers()

	return <Table columns={userColumns} dataSource={users?.data || []} loading={isLoading} />
}
