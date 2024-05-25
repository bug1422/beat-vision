import { Suspense, lazy } from "react";
import { Row } from "react-bootstrap";
import {Section1, Section2} from './Sections';

const HomePage = () => {
    return (<>
        <Section1 />
        <Section2 />
    </>);
}
export default HomePage