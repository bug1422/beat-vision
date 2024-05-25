import { Suspense, lazy } from "react";
const Section1 = lazy(() => import("@/pages/pages/Home"))
const Section2 = lazy(() => import("@/pages/pages/Home"))
const Section3 = lazy(() => import("@/pages/pages/Home"))
const Section4 = lazy(() => import("@/pages/pages/Home"))
const HomePage = () => {
    return (<>
        <Suspense fallback={<div />}>
            <Section1 />
        </Suspense>
        <Suspense fallback={<div />}>
            <Section2 />
        </Suspense>
        <Suspense fallback={<div />}>
            <Section3 />
        </Suspense>
        <Suspense fallback={<div />}>
            <Section4 />
        </Suspense>
    </>);
}
export default HomePage