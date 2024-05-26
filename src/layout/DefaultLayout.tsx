import { type ReactNode, Suspense, lazy } from 'react'
// const LeftSideBar = lazy(() => import('./LeftSidebar'))
const TopNavbar = lazy(() => import('./TopNavbar'))
const loading = () => <div />

interface DefaultLayoutProps{
    children?: ReactNode
}

const DefaultLayout = ({children}: DefaultLayoutProps) => {
    return(
        <Suspense fallback={<div/>}>
            <div className="page-wrapper">
                <Suspense fallback={<div />}>
                    <TopNavbar />
                </Suspense>
                <div className='page-content'>
                    <Suspense fallback={loading()}>{children}</Suspense>
                </div>
            </div>
        </Suspense>
    ) 
}

export default DefaultLayout