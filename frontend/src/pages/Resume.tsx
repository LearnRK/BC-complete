import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"

export const Resume = () => {
    return <div className="">
        <Navbar />
        <div className="flex justify-center items-center">       
            <img className="h-auto max-w-xl rounded-lg shadow-xl dark:shadow-gray-800" src="../../files/Rakshit_Singh.jpg" alt="image description" />
        </div>
        <Footer />
    </div>
}