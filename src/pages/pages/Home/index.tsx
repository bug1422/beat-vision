<<<<<<< Updated upstream
import { Suspense, lazy } from "react";
import { Row } from "react-bootstrap";
import {Section1, Section2} from './Sections';

const HomePage = () => {
    return (<>
        <Section1 />
        <Section2 />
=======
import { Section1, Section2, Section3, Section4 } from "@/pages/pages/Home/Sections"
const HomePage = () => {
    return (<>
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
>>>>>>> Stashed changes
    </>);
}
export default HomePage