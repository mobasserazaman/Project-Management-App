import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";
function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProject: undefined,
    projects: []
  });

  function handleStartAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProject: null,
      }
    })

  }

  function handleAddProject(projectData){
    setProjectsState(prevState => {

      const newProject = {
        ...projectData,
        id: Math.random()
      }
      return{
        ...prevState,
        selectedProject:null,
        projects:[...prevState.projects, newProject]
      }
    })
  }

  console.log(projectsState)

  let content;
  if(projectsState.selectedProject === null){
    content = <NewProject onAdd={handleAddProject}/>
  }else if(projectsState.selectedProject === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject}/>
      {content}
    </main>
  );
}

export default App;
