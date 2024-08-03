
import { Content } from "../components/Content"
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { Sidebar } from "../components/Sidebar"

export const Dashboard= () => {
    return <div className="w-screen h-screen">
        <div className="">
            <Navbar />
        </div>
        <div>
            <div className="">
                <Sidebar />
            </div>
            <div className="mt-20">
                <Content />
            </div>
        </div>
        <div className="">
            <Footer />
        </div>
    </div>
}
