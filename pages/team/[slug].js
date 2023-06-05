// import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import Wrapper from "@/components/Wrapper"

const Slug = ({ slug }) => {
    const [members, setMembers] = useState([]);
    const [num, setNum] = useState(null)
    const [check, setCheck] = useState(true)
    const [details, setDetails] = useState(
        {
            teamMem: 0,
            venue: '',
            time: ''
        }
    );
    const [disableAdd, setDisableAdd] = useState(false)
    const [data, setData] = useState({
        num: 0,
    })
    useEffect(() => {
        setMembers([])
        if (members.length <= 15) {
            for (let i = 0; i < num; i++) {
                setMembers((prev) => [...prev, prev.length + 1])
                console.log('hello')
            }
        }
        return () => 0
    }, [num]);
    const setValue = (e) => {
        if (e.target.name === 'teamMem' && e.target.value > 15) {
            setDetails((prev) => ({ ...prev, [e.target.name]: 15 }))
        }
        setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    }
    const submitForm = (e) => {
        e.preventDefault()
        setNum((prev) => Number(details.teamMem))
        setDetails({
            teamMem: 0,
            venue: '',
            time: ''
        })
        setCheck(false)
    }
    const onChangeMembersDetails = (e, i) => {
        setData((prev) => ({
            num: i,
            [`mem${i}`]: {
                // [e.target.name]:
                ...prev[`mem${i}`],
                [e.target.name]: e.target.value
            }
        }))
        if (data[`mem${i}`]?.[`name${i}`] && data[`mem${i}`]?.[`category${i}`] && data[`mem${i}`]?.[`score${i}`]) {
            setDisableAdd(true)
            console.log('hello1')
        }
        else {
            setDisableAdd(false)
        }

    }

    const addInformationOfMember = () => {
       
    }
    return (
        <div className="w-full">
            <Wrapper>
                <h1 className="text-center font-extrabold text-[24px] text-[#720632] mt-8">Add Details Of  {slug?.toUpperCase()}</h1>
                {check && <div className='w-full flex justify-center min-h-[20rem]'>
                    <form className="flex flex-col w-[60%] items-center py-5 justify-evenly"
                        onSubmit={submitForm}
                    >
                        <input type="number" placeholder='Add A Team Member Num' className='w-[80%] rounded-xl h-[35px] px-2 py-2 border-[2px] border-[#720632]' name='teamMem' onChange={setValue} value={details.teamMem} required />
                        <input type="text" placeholder='Add A Venue' className='w-[80%] rounded-xl h-[35px] px-2 py-2 border-[2px] border-[#720632] ' name='venue' onChange={setValue} value={details.venue} required />
                        <input type="time" placeholder='Add A Time' className='w-[80%] rounded-xl h-[35px] px-2 py-2 border-[2px] border-[#720632]' name='time' onChange={setValue} value={details.time} required />
                        <button className='bg-[#720632] rounded-3xl text-white px-5 py-2 transition-transform duration-500 hover:scale-90'>Add</button>
                    </form>
                </div>}
                {/* {members.length > 0 && <div div className='flex flex-col gap-4 w-full items-center mt-3'>
                    {members?.map((curEle, i) => {
                        return (
                            <input key={i} type="text" placeholder={`Add member name ${curEle}`} className='w-[50%] rounded-xl h-[35px] px-2 py-2 border-[2px] border-[#720632]' />
                        )
                    })}
                </div>} */}
                {members.length > 0 && <div className='flex justify-center mt-3'>
                    <table className='border-collapse w-[70%]'>
                        <thead className='text-2xl' >
                            <tr>
                                <th className='border-[2px] border-[black] p-2 text-left w-[35%]'>Name</th>
                                <th className='border-[2px] border-[black] p-2 text-left w-[25%]'>Cateogory</th>
                                <th className='border-[2px] border-[black] p-2 text-left w-[20%]'>Score</th>
                                <th className='border-[2px] border-[black] p-2 text-left w-[20%]'>Wickets</th>
                            </tr>
                        </thead>
                        <tbody className='text-[18px]'>
                            {members.map((curEle) => {
                                return (<tr key={curEle}>
                                    <td className='border-[2px] border-[black] p-2 text-left'>
                                        <input type="text" placeholder={`Enter A member ${curEle}`} className='w-full focus:border-none active:border-none focus:outline-none text-[19px] h-full px-1' name={`name${curEle}`} onChange={(e) => onChangeMembersDetails(e, curEle)} />
                                    </td>
                                    <td className='border-[2px] border-[black] p-2 text-left'>
                                        <select className='w-full focus:border-none active:border-none focus:outline-none  h-full px-1'
                                            name={`category${curEle}`} onChange={(e) => onChangeMembersDetails(e, curEle)}
                                        >
                                            <option defaultValue={'Please Select'} selected disabled>Please Select</option>
                                            <option value="Batsman">Batsman</option>
                                            <option value="Bowler">Bowler</option>
                                            <option value="All-Rounder">All-Rounder</option>
                                        </select>
                                    </td>
                                    <td className='border-[2px] border-[black] p-2 text-left '>
                                        <input type="text" className='w-full focus:border-none active:border-none focus:outline-none' placeholder='Enter A Score' name={`score${curEle}`} onChange={(e) => onChangeMembersDetails(e, curEle)} />
                                    </td>
                                    <td className='border-[2px] border-[black] p-2 text-left'> <input type="text" className='w-full focus:border-none active:border-none focus:outline-none' placeholder='Enter A Wickets' name={`wicket${curEle}`} onChange={(e) => onChangeMembersDetails(e, curEle)} /></td>
                                    <td className='p-2 text-left'>
                                        <input type='button' className={`${data.num === curEle && disableAdd ? 'bg-[#720632] cursor-pointer   transition-transform duration-500 hover:scale-90 ' : 'bg-[#720632]/40 cursor-not-allowed transition-none hover:scale-100 '}text-white px-6 rounded-3xl p-1`} value={'Add'} onClick={() => {
                                            console.log(curEle)
                                            if (disableAdd) {
                                                addInformationOfMember()
                                                setDisableAdd(false)
                                            } else {
                                                alert('Please filled required filled')
                                            }
                                        }} />
                                    </td>
                                </tr>)
                            })}
                        </tbody >
                        <tfoot className='text-[18px]'>
                            <tr>
                                <td></td>
                                <td className='font-bold border-[2px] border-[black] px-3 p-2 text-left'>Extra Runs</td>
                                <th className='border-[2px] border-[black] p-2 text-left'></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>}
            </Wrapper >
        </div >
    )
}

export default Slug
export async function getStaticPaths() {

    let paths = [
        {
            params: { slug: 'team-1' }
        },
        {
            params: { slug: 'team-2' }
        }
    ]
    console.log(paths)
    return {
        paths,
        fallback: false,
    };
}
export async function getStaticProps({ params: { slug } }) {
    return {
        props: {
            slug
        },
    };
}
