import { Preloader } from '@/components'
import { Suspense, type ReactNode } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="account-body accountbg" >
			<Container className='authen-bg'>
				<Row className="d-flex justify-content-center">
					<Col xs={12} className="align-self-center">
						<Row className="row  mt-5">
							<Col lg={5} className="mx-auto">
								<Suspense fallback={<Preloader />}>{children}</Suspense>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default AuthLayout
