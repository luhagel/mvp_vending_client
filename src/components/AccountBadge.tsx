import { Skeleton, Space, Tag } from 'antd'
import { useMe } from '../app/users/users'

export const AccountBadge = () => {
	const { isLoading, me } = useMe()

	if (isLoading) {
		return <Skeleton />
	}
	return (
		<Space>
			<span>Hello, {me.username}</span>
			<Tag color={me.deposit <= 0 ? 'yellow' : 'green'}>Balance: {me.deposit / 100} $</Tag>
		</Space>
	)
}
