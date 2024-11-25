import { Layout, Card, Statistic, List, Typography, Tag } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { capitalize } from '../../../utils'
import styles from './AppSider.module.css' // CSS-модуль
import { useContext } from 'react'
import CryptoContext from '../../../context/crypto-context'

const { Sider } = Layout

function AppSider() {
	const { assets } = useContext(CryptoContext)

	return (
		<Sider width="25%" className={styles.sider}>
			<div className={styles.flexContainer}>
				{assets.map((asset) => (
					<Card key={asset.id} className={styles.card}>
						<Statistic
							title={capitalize(asset.id)}
							value={asset.totalAmount}
							precision={2}
							valueStyle={{
								color: asset.grow ? '#3f8600' : '#cf1322'
							}}
							prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
							suffix="$"
						/>
						<List
							size="small"
							dataSource={[
								{
									title: 'Total Profit',
									value: asset.totalProfit,
									withTag: true
								},
								{ title: 'Asset Amount', value: asset.amount, isPlain: true }
							]}
							renderItem={(item) => (
								<List.Item className={styles.listItem}>
									<span>{item.title}: </span>
									<span>
										{item.withTag && (
											<Tag color={asset.grow ? 'green' : 'red'}>
												{asset.growPercent}%
											</Tag>
										)}
										{item.isPlain && item.value}
										{!item.isPlain && (
											<Typography.Text type={asset.grow ? 'success' : 'danger'}>
												{item.value.toFixed(2)}$
											</Typography.Text>
										)}
									</span>
								</List.Item>
							)}
						/>
					</Card>
				))}
			</div>
		</Sider>
	)
}

export default AppSider
