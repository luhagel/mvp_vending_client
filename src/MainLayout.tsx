import React from 'react'
import { Button, Layout, Space } from 'antd'
import { RegisterForm } from './app/users/RegisterForm'
import { DepositForm } from './app/users/DepositForm'
import { LoginForm } from './app/users/LoginForm'
import { removeTokenFromLocalStorage, useAuth } from './hooks/useAuth'
import { NewProductForm } from './app/products/NewProductForm'
import { Can } from './components/Can'
import { AccountBadge } from './components/AccountBadge'
import { LogoutOutlined } from '@ant-design/icons'

const { Header, Content, Footer } = Layout

export const MainLayout: React.FC = ({ children }) => {
	const { isLoggedIn } = useAuth()
	return (
		<Layout>
			<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
				<nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<h1 style={{ marginRight: 16, marginBottom: 0 }}>MVP Vending</h1>
					<Space style={{ marginRight: 16 }}>
						<Can requiredPermissions={{ users: ['deposit'] }}>
							<DepositForm />
						</Can>
						<Can requiredPermissions={{ products: ['create'] }}>
							<NewProductForm />
						</Can>
					</Space>
					{isLoggedIn ? (
						<Space>
							<AccountBadge />
							<Button
								danger
								type="primary"
								onClick={() => {
									removeTokenFromLocalStorage()
									window.location.reload()
								}}
								shape="circle"
								icon={<LogoutOutlined />}
							/>
						</Space>
					) : (
						<Space>
							<LoginForm />
							<RegisterForm />
						</Space>
					)}
				</nav>
			</Header>
			<Content style={{ padding: '100px 50px' }}>
				<div className="site-layout-content">{children}</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>Luca Hagel ©2022</Footer>
		</Layout>
	)
}
