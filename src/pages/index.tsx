import BasicInformation from '~/components/BasicInformation';
import Education from '~/components/Education';

export default function Home<NextPage>() {
  return (
    <div className=' w-[calc(100%-230px)] ml-[230px] p-20'>
      <div className='p-10 bg-white box-shadow'>
        <BasicInformation />
        <Education />
      </div>
    </div>
  );
}
