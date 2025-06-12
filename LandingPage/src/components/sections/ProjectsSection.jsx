import { useSelector } from "react-redux";
import CardProject from "../common/CardProject";

const ProjectsSection = () => {
  const { projectsData } = useSelector((store) => store.projectsData);
  return (
    <>
      <div className="containerProjects">
        <div className="imageContainer">
          {projectsData.map((project) => (
            <div key={project.id}>
              <CardProject
                title={project.title}
                img={project.imgURL}
                subTitle={project.subTitle}
              />
            </div>
          ))}
        </div>
        <div className="containerInfo"></div>
      </div>
    </>
  );
};

export default ProjectsSection;
