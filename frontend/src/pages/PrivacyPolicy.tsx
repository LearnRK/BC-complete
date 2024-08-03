import { useNavigate } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"

export const PrivacyPolicy = () => {
    const navigate = useNavigate();
    return <div>
        <Navbar />
        <div className="m-60">
        This is work of indivisual intellect and is for job reqruitment purposes. Use of the content, data, images, source code, etc. will cause violation of the policy. Act accordingly.
        </div>
        <div className="mb-36 flex justify-center">
            <button onClick={() => { navigate("/dashboard")}} className="pt-2 pb-2 pl-10 pr-10 hover:bg-sky-200">Return to Dashboard</button>
        </div>
        <Footer />
    </div>
}