import { PieChart } from "../../charts/PieChart"
import { Footer } from "../../components/Footer"
import { Navbar } from "../../components/Navbar"
import { Sidebar } from "../../components/Sidebar"

export const ProjectByRegion = () => {
    return <div className="w-screen h-screen">
        <Navbar />
        <div>
            <Sidebar />
            <div className="mt-20 ml-20 w-screen h-screen"> 
                <h2 className="pt-10 flex justify-center text-4xl font-extrabold dark:text-white ">Project By Region</h2>
                <div className="flex justify-center h-auto w-screen">
                    <PieChart width={1000} height={650} />   
                </div>
            </div>
        </div>
        <Footer />
    </div>
}