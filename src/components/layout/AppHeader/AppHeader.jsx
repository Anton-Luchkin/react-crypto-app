import { Layout, Select, Space, Button, Modal, Drawer } from 'antd'
import { useEffect, useState } from 'react'
import { useCrypto } from '../../../context/crypto-context'
import CoinInfoModal from '../../CoinInfoModal'
import AddAssetForm from '../../AddAssetForm'
import styles from './AppHeader.module.css'

const { Header } = Layout

function AppHeader() {
	const [select, setSelect] = useState(false)
	const [coin, setCoin] = useState(null)
	const [modal, setModal] = useState(false)
	const [drawer, setDrawer] = useState(false)
	const { crypto } = useCrypto()

	useEffect(() => {
		const keypress = (event) => {
			if (event.key === '/') {
				setSelect((prev) => !prev)
			}
		}
		document.addEventListener('keypress', keypress)
		return () => document.removeEventListener('keypress', keypress)
	}, [])

	function handleSelect(value) {
		setCoin(crypto.find((c) => c.id === value))
		setModal(true)
	}

	return (
		<Header className={styles.header}>
			<Select
				className={styles.header__select}
				open={select}
				onSelect={handleSelect}
				onClick={() => setSelect((prev) => !prev)}
				value="press / to open"
				options={crypto.map((coin) => ({
					label: coin.name,
					value: coin.id,
					icon: coin.icon
				}))}
				optionRender={(option) => (
					<Space>
						<img
							src={option.data.icon}
							alt={option.data.label}
							className={styles.header__img}
						/>
						{option.data.label}
					</Space>
				)}
			/>

			<Button type="primary" onClick={() => setDrawer(true)}>
				Add asset
			</Button>

			<Modal open={modal} onCancel={() => setModal(false)} footer={null}>
				<CoinInfoModal coin={coin} />
			</Modal>

			<Drawer
				title="Add asset"
				onClose={() => setDrawer(false)}
				open={drawer}
				width={600}
				destroyOnClose
			>
				<AddAssetForm onClose={() => setDrawer(false)} />
			</Drawer>
		</Header>
	)
}

export default AppHeader
