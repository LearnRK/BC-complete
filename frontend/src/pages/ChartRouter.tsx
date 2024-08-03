import { Route, Routes } from "react-router-dom"
import { Intensity } from "./projectPages/Intensity"
import { PageNotFound } from "./PageNotFound"
import { ProjectBySector } from "./projectPages/ProjectBySector"
import { ProjectByTopic } from "./projectPages/ProjectByTopic"
import { ProjectByYear } from "./projectPages/ProjectByYear"
import { ProjectLikelihood } from "./projectPages/ProjectLikelihood"
import { ProjectByCountries } from "./projectPages/ProjectsByCountries"
import { ProjectByRegion } from "./projectPages/ProjectsByRegion"
import { ProjectByRelevance } from "./projectPages/ProjectsByRelevance"

export const ChartRouter = () => {
        return <Routes>
          <Route path='/intensity' element={<Intensity />}/>
          <Route path='/sector' element={<ProjectBySector />}/>
          <Route path='/topic' element={<ProjectByTopic />}/>
          <Route path='/year' element={<ProjectByYear />}/>
          <Route path='/likelihood' element={<ProjectLikelihood />}/>
          <Route path='/country' element={<ProjectByCountries />}/>
          <Route path='/region' element={<ProjectByRegion />}/>
          <Route path='/relevance' element={<ProjectByRelevance />}/>
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
}