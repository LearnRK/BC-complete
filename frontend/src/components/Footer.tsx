
export const Footer = () => {
    return <footer className="top-1 bg-white rounded-lg shadow m-4 dark:bg-gray-800 top-0 ">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400"> 
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="/resume" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="/privacy" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="mailto:rakshitksingh@gmail.com?subject=Regarding%20Black%20Coffer%20assignment%20-%20sent%20from%20webApp&body=I%20was%20looking%20at%20your%20app%20and%20i%20found%20it%20interesting%20..." className="hover:underline">Contact</a>
                </li>
            </ul>
            </div>
        </footer>
}