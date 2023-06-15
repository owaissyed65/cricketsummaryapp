import React from 'react'
import Wrapper from './Wrapper'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const Header = () => {
    const allDetails = useSelector(state => state.saveDataSlice.allDetails)
    return (
        <header className='w-full sticky top-0 z-50'>
            <Wrapper>
                <div className='bg-[#702632] h-[50px] md:h-[80px] text-white shadow-sm shadow-[#702632]'>
                    <ul className='flex justify-center items-center gap-5 h-[100%] text-[20px]'>
                        <li><Link href='/'>Home</Link></li>
                        <li><Link href='/score/scorecard' onClick={() => {
                            if (allDetails.length !== 22) {
                                alert("Sorry Can't Redirect to ScoreCard because you didn't add data of teams")
                            }
                        }}>Scorecard</Link></li>
                    </ul>
                </div>
            </Wrapper>

        </header>
    )
}

export default Header
