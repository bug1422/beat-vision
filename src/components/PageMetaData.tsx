import { Helmet } from 'react-helmet'

const PageMetaData = ({ title }: { title: string }) => {
	return (
		<Helmet>
			<title>{title} | Beat Vision</title>
		</Helmet>
	)
}

export default PageMetaData
