import { CircularBarplot } from "../charts/CircularBarplot"
import { CountryBarplot } from "../charts/CountryBarplot"
import { DonutChart } from "../charts/DonutChart"
import { Hexbin } from "../charts/Hexbin"
import { LineChart } from "../charts/LineChart"
import { PieChart } from "../charts/PieChart"
import { Scatterplot } from "../charts/ScatterPlot"
import { ViolinPlot } from "../charts/VioinPlot"

export const Content =() => {
    return <div>
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className="grid grid-cols-5 gap-4 mb-4 ">
                    <div className="col-span-2">
                        <div className="h-96 gap-4 mb-4 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                            <a href="/charts/year">
                                <div className="flex justify-center ml-12 mr-12">
                                    <h2 className="text-3xl font-extrabold dark:text-white">Projects by year</h2>
                                </div>
                                <LineChart width={450} height={300} />
                                <div className="flex">
                                    <div className="flex ">
                                        <div className="ml-20 mr-2 w-10 bg-violet-600 text-violet-600 rounded-sm " />
                                        : Start Year
                                    </div>
                                    <div className="flex ">
                                        <div className="ml-20 mr-2 w-10 bg-red-600 text-red-600 rounded-sm" />
                                        : End Year
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="h-96 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                            <a href="/charts/intensity">
                                <div className="flex justify-center ml-12 mr-12">
                                    <h2 className="justify-center text-3xl font-extrabold dark:text-white ">Intensity</h2>
                                </div>
                                <Scatterplot width={500} height={350} />
                            </a>
                        </div>
                    </div>
                    
                    <div className="h-auto col-span-3 flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                    <a href="/charts/topic">
                            <div className="flex justify-center ml-12 mr-12">
                                <h2 className="text-3xl font-extrabold dark:text-white">Projects by topics</h2>
                            </div>
                            <CircularBarplot width={650} height={650} />
                        </a>
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-4  ">
                    <div className="col-span-3 ">   
                        <div className="h-auto gap-4 mb-4 flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                            <a href="/charts/sector">
                            <div className="m-16 flex justify-center ml-12 mr-12">
                                <h2 className="text-3xl font-extrabold dark:text-white">Projects by sector</h2>
                            </div>
                            <DonutChart width={700} height={600} />
                            </a>
                        </div>
                        <div className="h-auto gap-4 mb-4 flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                            <a href="/charts/likelihood">
                            <div className="flex justify-center mt-4 ml-12 mr-12">
                                <h2 className="text-2xl font-extrabold dark:text-white">Projects likelihood</h2>
                            </div>
                            <Hexbin width={650} height={650} />
                            </a>
                        </div>
                    </div> 

                    <div className="col-span-2">
                        <div className="h-192 gap-4 mb-4 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                            <a href="/charts/country">
                                <div className="flex justify-center ml-12 mr-12">
                                    <h2 className="mt-4 text-2xl font-extrabold dark:text-white">Projects by Country</h2>
                                </div>
                                <CountryBarplot width={450} height={1430} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center h-auto mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <a href="/charts/region">
                        <div className="flex justify-center mt-4 ml-12 mr-12">
                            <h2 className="pd-4 text-2xl font-extrabold dark:text-white">Projects by Region</h2>
                        </div>
                        <PieChart width={1000} height={700} />
                    </a>
                </div>
                <div className="flex items-center justify-center h-1/2 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                <a href="/charts/relevance">
                        <div className="flex justify-center mt-4 ml-12 mr-12">
                            <h2 className="pd-4 text-2xl font-extrabold dark:text-white">Projects by Relevance</h2>
                        </div>
                        <ViolinPlot width={1000} height={700} />
                    </a>
                </div>  
            </div>
        </div>
    </div>
}   