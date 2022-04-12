import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './MainLayout'
import { ProductList } from './app/products/ProductList'
import { SWRConfig } from 'swr'
import { UserList } from './app/users/UserList'
import { AuthContext, getTokenFromLocalStorage, maybeGetUserFromLocalStorage } from './hooks/useAuth'

ReactDOM.render(
	<React.StrictMode>
		<SWRConfig
			value={{
				refreshInterval: 3000,
				fetcher: (resource, init) =>
					fetch(resource, {
						...init,
						headers: {
							...init?.headers,
							authorization: `Bearer ${getTokenFromLocalStorage()}`
						}
					}).then((res) => res.json())
			}}
		>
			<AuthContext.Provider value={{ currentUser: maybeGetUserFromLocalStorage() }}>
				<BrowserRouter>
					<MainLayout>
						<Routes>
							<Route path="/" element={<App />} />
							<Route path="/products" element={<ProductList />} />
							<Route path="/users" element={<UserList />} />
						</Routes>
					</MainLayout>
				</BrowserRouter>
			</AuthContext.Provider>
		</SWRConfig>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
