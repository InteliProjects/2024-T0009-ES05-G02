import NavBar from "../components/navBar";
import Avatar from "../components/avatar.tsx";
import imagem from "../assets/react.svg";
import ClassScheduleFormStepper from "../components/ClassScheduleFormStepper.tsx";

export default function NewClassSchedule() {
  return (
    <>
      <div>
        <NavBar
          name={"Nome"}
          role={"líder"}
          avatar={
            <Avatar
              defaultImage=""
              profileImage={"imagem"}
              widthImage={"30px"}
              heightImage={"30px"}
            />
          }
        />
      </div>

      <ClassScheduleFormStepper></ClassScheduleFormStepper>
    </>
  );
}
