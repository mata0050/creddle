import BasicInformation from '~/components/BasicInformation';
import Education from '~/components/Education';
import Project from '~/components/Project';
import Skill from '~/components/Skill';
import { trpc } from '~/utils/trpc';

export default function Home<NextPage>() {
  const { data, isLoading } = trpc.useQuery(['user.getById', { id: '4e06def1-53e4-436a-894d-7260814df125' }]);
  const currentUser  = data !== undefined ? data : undefined ;


  if (!currentUser || isLoading) return <div>Loading...</div>;

  return (
    <div className=' w-[calc(100%-230px)] ml-[230px] p-20'>
      <div className='p-10 bg-white box-shadow'>
        <BasicInformation currentUser={currentUser} />
        <Education currentUser={currentUser} />
        <Skill currentUser={currentUser} />
        <Project currentUser={currentUser} />
      </div>
    </div>
  );
}
