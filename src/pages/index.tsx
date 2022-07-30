import BasicInformation from '~/components/BasicInformation';
import Education from '~/components/Education';
import Project from '~/components/Project';
import SelectUser from '~/components/SelectUser';
import Skill from '~/components/Skill';
import { trpc } from '~/utils/trpc';

export default function Home<NextPage>() {
  const { data, isLoading } = trpc.useQuery(['user.getAllUsers']);
  const currentUser  = data !== undefined ? data[0] : undefined ;
  console.log('data', currentUser);

  if (!currentUser || isLoading) return <div>Loading...</div>;

  return (
    <div className=' w-[calc(100%-230px)] ml-[230px] p-20'>
      <div className='p-10 bg-white box-shadow'>
        {/* <UserContextProvided>
          <SelectUser/> */}
        <BasicInformation currentUser={currentUser} />
        <Education currentUser={currentUser} />
        <Skill currentUser={currentUser} />
        <Project currentUser={currentUser} />
        {/* </UserContextProvided> */}
      </div>
    </div>
  );
}
