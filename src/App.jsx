import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject"; 
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
        selectedProject:undefined,
        projects:[...prevState.projects, newProject]
      }
    })
  }

  function handleCancelAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProject: undefined,
      }
    })
  }

  function handleSelectProject(id){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProject: id,
      }
    })
  }

  function handleDeleteProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProject: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProject)
      }
    })


  }


  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProject);

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject}/>;
  if(projectsState.selectedProject === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }else if(projectsState.selectedProject === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar selectedProjectId={projectsState.selectedProject} onSelectProject={handleSelectProject} onStartAddProject={handleStartAddProject} projects={projectsState.projects}/>
      {content}
    </main>
  );
}

export default App;
