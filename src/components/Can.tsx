import React from 'react'
import { useAuth } from '../hooks/useAuth'

export const Can: React.FC<{ requiredPermissions: any }> = ({ requiredPermissions, children }) => {
	const { isLoggedIn, currentUser } = useAuth()
	if (!isLoggedIn) {
		return null
	}
	const can = (userPermissions: any, requiredPermissions: any) => {
		return Object.keys(requiredPermissions).reduce((acc, curr) => {
			if (!userPermissions[curr]) {
				return false
			}
			return acc ? requiredPermissions[curr].every((perm: string) => userPermissions[curr].includes(perm)) : acc
		}, true)
	}

	return can(currentUser?.pem, requiredPermissions) ? <>{children}</> : null
}
