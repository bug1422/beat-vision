import { SectionList } from "./Sections";

// import { Section1, Section2, Section3, Section4, Section5,Section6 } from "@/pages/pages/Home/Sections"
const HomePage = () => {
    return (<>
            {SectionList.map((Section)=>(
                <Section/>
            ))}
    </>);
}
export default HomePage