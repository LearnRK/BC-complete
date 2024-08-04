import axios from "axios";
import { useEffect, useState } from "react"
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { APPOINT_URL } from "../config";

export const AppointMe = () => {
    const [ email, setEmail ] = useState("");
    const [ subject, setSubject ] = useState("Regarding fullstack appointment from BlackCoffer.");
    const [ message, setMessage ] = useState("");
    const [ mailto, setMailto ] = useState("");

    const emailUrl = APPOINT_URL;

    useEffect(() => {
        setMailto(`mailto:rakshitksingh@gmail.com?subject=${subject}&body=${message}`);
    }, [email, subject, message])

    const sendMessage = () => {
        axios({
            method: 'post',
            url: emailUrl,
            headers: {}, 
            data: {
              email: email,
              subject: subject,
              message: message
            }
          });
        window.open(mailto);
    }


    return <div>
        <Navbar />
        <section className="mt-20 bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Get in touch</h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">I hope my work was satisfactory, and being a constant learner I can asure you, I can learn the skill and develop whatever is required for the company. Feel free to give feedback. You may use this form to get in touch with me.</p>
                <form action="#" className="space-y-8">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input type="email" id="email" onChange={(e) => { setEmail(e.target.value);}} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@blackcoffer.com" required />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                        <input type="text" id="subject" onChange={(e) => { setSubject(e.target.value);}} placeholder="Regarding fullstack appointment from BlackCoffer." className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                        <textarea id="message" rows={6} onChange={(e) => { setMessage(e.target.value);}} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a message..."></textarea >
                    </div>
                        <button onClick={sendMessage} type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
                </form>
            </div>
        </section>
        <Footer />
    </div>
}