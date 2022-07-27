import BasicInformation from "~/components/BasicInformation";
import Education from "~/components/Education";
import Project from '~/components/Project';
import SelectUser from '~/components/SelectUser';
import Skill from "~/components/Skill";
import { UserContextProvided } from "~/context/UserContext";

export default function Home<NextPage>() {
  return (
    <div className=' w-[calc(100%-230px)] ml-[230px] p-20'>
      <div className='p-10 bg-white box-shadow'>
        <UserContextProvided>
          <SelectUser/>
          <BasicInformation />
          <Education />
          <Skill />
          <Project/>
        </UserContextProvided>
      </div>
    </div>
  );
}
