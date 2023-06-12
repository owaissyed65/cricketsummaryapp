import Wrapper from '@/components/Wrapper'
import Link from 'next/link'
import { AiOutlinePlus } from 'react-icons/ai'
const index = () => {
  const teams = [
    {
      name: 'Team 1',
      slug: 'team-1'
    },
    {
      name: 'Team 2',
      slug: 'team-2'
    }
  ]
  return (
    <div>
      <Wrapper>
        <div className='h-[10.5rem] flex justify-center items-center '>
          <h1 className='text-[25px] font-black text-[#702632]'> Cricket Summary </h1>
        </div>
        <div className='flex min-h-[11.5rem] justify-center gap-7 md:gap-9 flex-col items-center md:flex-row text-white font-bold text-[22px]'>
          {
            teams.map(({ name: p, slug: i }) => {
              return (
                <div key={i} className='bg-[#702632] w-[70%] md:w-[30%] flex items-center gap-4 md:gap-7 flex-col rounded-3xl  shadow-lg shadow-[#702632]/50 '>
                  <div className='mt-8 '>{p}</div>

                  <Link href={`/team/${i}`}><div className="bg-gray-700/70 h-[50px] w-[50px] md:h-[80px] md:w-[80px] flex justify-center items-center rounded-full cursor-pointer transition-transform duration-500 hover:scale-75 mb-2 md:mb-1">
                    <AiOutlinePlus className='text-[34px]' />
                  </div></Link>
                </div>
              )
            })
          }
        </div>
      </Wrapper>
    </div>
  )
}

export default index
