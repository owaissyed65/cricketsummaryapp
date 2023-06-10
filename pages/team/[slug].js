// import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Wrapper from "@/components/Wrapper"
import { addSingleData, addAllDetails, addMatchDetails } from '@/store/slice/saveDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

const Slug = ({ slug }) => {
    const dispatch = useDispatch();
    const { singleDetails, allDetails, matchDetails } = useSelector((state) => state.saveDataSlice)
    const [members, setMembers] = useState([]);
    const [check, setCheck] = useState(true)
    const [details, setDetails] = useState(
        {
            teamMem: '',
            venue: '',
            time: ''
        }
    );

    const [exRun, setExRun] = useState('')
    const [disableAdd, setDisableAdd] = useState(false)
    useEffect(() => {
        setMembers([])
        if (members.length <= 11) {
            for (let i = 0; i < matchDetails.teamMem; i++) {
                setMembers((prev) => [...prev, prev.length + 1])
            }
        }
        return () => 0
    }, [matchDetails.teamMem]);
    const setValue = (e) => {
        if (e.target.name === 'teamMem' && e.target.value > 11 < e.target.value) {
            setDetails((prev) => ({ ...prev, [e.target.name]: 11 }))
        } else {
            setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }

    }
    const submitForm = (e) => {
        e.preventDefault()
        setCheck(false)
        dispatch(addMatchDetails(details))
    }
    const onChangeMembersDetails = (e, i) => {
        const existMember = allDetails.find(p => p[`mem${i}`])
        if (existMember) {
            e.target.value = existMember[`mem${i}`][`${e.target.name}`]
            alert('You already filled this field')
            setDisableAdd(false)
            e.target.disabled = true
        }
        else {
            setDisableAdd(true)
            dispatch(addSingleData({
                team: slug,
                num: i,
                [`mem${i}`]: {
                    [e.target.name]: e.target.value
                }
            }));
        }
    }
    const addInformationOfMember = (curEle) => {
        const existMember = allDetails.find(p => p[`mem${curEle}`])
        if (existMember) {
            alert('You already filled this field')
            setDisableAdd(false)
        }
        else {
            if (singleDetails?.[`mem${curEle}`]?.[`category${curEle}`] && singleDetails?.[`mem${curEle}`]?.[`score${curEle}`] && singleDetails?.[`mem${curEle}`]?.[`name${curEle}`]) {
                setDisableAdd(() => false)
                dispatch(addAllDetails())

            } else {
                alert('Please Fill required Field')
            }
        }
    }
    return (
        <div className="w-full">
            <Wrapper>
                <h1 className="text-center font-extrabold text-[24px] text-[#720632] mt-8">Add Details Of  {slug?.toUpperCase()}</h1>
                {!matchDetails.teamMem && check && <div className='w-full flex justify-center min-h-[20rem]'>
                    <form className="flex flex-col w-[60%] items-center py-5 justify-evenly"
                        onSubmit={submitForm}
                    >
                        <input type="number" placeholder='Add A Team Member Num' className='w-[80%] rounded-xl h-[35px] px-2 py-2 border-[2px] border-[#720632]' name='teamMem' onChange={setValue} value={details.teamMem} required />
                        <input type="text" placeholder='Add A Venue' className='w-[80%] rounded-xl h-[35px] px-2 py-2 border-[2px] border-[#720632] ' name='venue' onChange={setValue} value={details.venue} required />
                        <input type="time" placeholder='Add A Time' className='w-[80%] rounded-xl h-[35px] px-2 py-2 border-[2px] border-[#720632]' name='time' onChange={setValue} value={details.time} required />
                        <button className='px-5 py-2 bg-[#720632] rounded-md text-white text-[18px] cursor-pointer mb-4 transition-transform duration-200 hover:scale-90'>Add</button>
                    </form>
                </div>}
                {members.length > 0 && <div className='flex flex-col items-center gap-4 mt-3'>
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
                                        <input type="text" placeholder={`Enter A member Name ${curEle}`} className='w-full focus:border-none active:border-none focus:outline-none text-[19px] h-full px-1 capitalize' name={`name${curEle}`} onChange={(e) => onChangeMembersDetails(e, curEle)} />
                                    </td>
                                    <td className='border-[2px] border-[black] p-2 text-left'>
                                        <select className='w-full focus:border-none active:border-none focus:outline-none  h-full px-1'
                                            name={`category${curEle}`} onChange={(e) => onChangeMembersDetails(e, curEle)}
                                            defaultValue={'DEFAULT'}
                                        >
                                            <option value="DEFAULT" disabled>Please Select</option>
                                            <option value="Batsman">Batsman</option>
                                            <option value="Bowler">Bowler</option>
                                            <option value="All-Rounder">All-Rounder</option>
                                        </select>
                                    </td>
                                    <td className='border-[2px] border-[black] p-2 text-left '>
                                        <input type="text" className='w-full focus:border-none active:border-none focus:outline-none capitalize' placeholder='Enter A Score' name={`score${curEle}`} onChange={(e) => onChangeMembersDetails(e, curEle)} />
                                    </td>
                                    <td className='border-[2px] border-[black] p-2 text-left'> <input type="number" className={`w-full focus:border-none active:border-none focus:outline-none capitalize ${singleDetails?.[`mem${curEle}`]?.[`category${curEle}`] === 'Batsman' ? 'cursor-not-allowed' : 'cursor-pointer'}`} placeholder='Enter A Wickets' name={`wicket${curEle}`} onChange={(e) => onChangeMembersDetails(e, curEle)} disabled={singleDetails?.[`mem${curEle}`]?.[`category${curEle}`] === 'Batsman'} /></td>
                                    <td className='p-2 text-left'>
                                        {/* button */}
                                        <input type='button' className={`${singleDetails?.[`mem${curEle}`]?.[`category${curEle}`] && singleDetails?.[`mem${curEle}`]?.[`score${curEle}`] && singleDetails?.[`mem${curEle}`]?.[`name${curEle}`] && singleDetails?.num === curEle && disableAdd ? 'bg-[#720632] cursor-pointer transition-transform duration-500 hover:scale-90 ' : 'bg-[#720632]/40 cursor-not-allowed transition-none hover:scale-100 '}text-white px-6 rounded-3xl p-1`} value={'Add'} onClick={() => {
                                            addInformationOfMember(curEle)
                                        }} />
                                    </td>
                                </tr>)
                            })}
                        </tbody >
                        <tfoot className='text-[18px]'>
                            <tr>
                                <td></td>
                                <td className='font-bold border-[2px] border-[black] px-3 p-2 text-left'>Extra Runs</td>
                                <td className='border-[2px] border-[black] p-2 text-left'><input type="number" className='w-full focus:border-none active:border-none focus:outline-none capitalize' name={`extrarun${slug}`} value={matchDetails?.[`extrarun${slug}`]} onChange={(e) => {
                                    if (!matchDetails?.[`extrarun${slug}`]) {
                                        setExRun(prev => e.target.value)
                                    }
                                    else {
                                        alert(`Already Add Extra Number in Team ${slug.slice(-1)}`)
                                        e.target.disabled = true
                                        e.target.value = matchDetails?.[`extrarun${slug}`]
                                    }
                                }} /></td>
                                <td><button className='mt-3 px-3 py-2 bg-[#720632] rounded-md text-white text-[18px] cursor-pointer mb-4 transition-transform duration-200 hover:scale-90'
                                    onClick={() => {
                                        dispatch(addMatchDetails({
                                            [`extrarun${slug}`]: Number(exRun)
                                        }))
                                    }}>Add Extra Run</button></td>
                            </tr>
                        </tfoot>
                    </table>
                    {exRun.length > 0 && <Link href='/' className='px-5 py-2 bg-[#720632] rounded-md text-white text-[18px] cursor-pointer mb-4 transition-transform duration-200 hover:scale-110' >Continue</Link>}
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
