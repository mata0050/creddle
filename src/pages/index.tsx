import BasicInformation from "~/components/BasicInformation";
import Education from "~/components/Education";
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
        </UserContextProvided>
      </div>
    </div>
  );
}
