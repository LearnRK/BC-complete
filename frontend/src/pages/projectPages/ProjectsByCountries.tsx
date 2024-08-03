import { CountryBarplot } from "../../charts/CountryBarplot"
import { Navbar } from "../../components/Navbar"
import { Sidebar } from "../../components/Sidebar"

export const ProjectByCountries = () => {
    return <div className="w-screen h-screen">
        <Navbar />
        <div>
            <Sidebar />
            <div className="mt-20 ml-20 w-screen h-screen"> 
                <h2 className="pt-10 flex justify-center text-4xl font-extrabold dark:text-white ">Project By Country</h2>
                <div className="flex justify-center h-auto w-screen">
                    <CountryBarplot width={1000} height={1800} />   
                </div>
            </div>
        </div>
    </div>
}