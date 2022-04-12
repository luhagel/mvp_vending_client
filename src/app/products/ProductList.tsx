import { Table } from 'antd'
import { Can } from '../../components/Can'
import { BuyProductForm } from './BuyProductForm'
import { useProducts } from './products'

const productColumns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: 'Cost per Item',
		dataIndex: 'cost',
		key: 'cost'
	},
	{
		title: 'In Stock',
		dataIndex: 'amount_available',
		key: 'amount_available'
	},
	{
		title: '',
		key: 'actions',
		render: (_: any, product: { id: string; amount_available: number }) => {
			return (
				<Can requiredPermissions={{ products: ['buy'] }}>
					<BuyProductForm productId={product.id} stock={product.amount_available} />
				</Can>
			)
		}
	}
]

export const ProductList = () => {
	const { isLoading, products } = useProducts()

	return <Table columns={productColumns} dataSource={products?.data || []} loading={isLoading} />
}
