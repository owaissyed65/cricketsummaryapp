import Wrapper from "@/components/Wrapper"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useMemo } from "react"
import { useSelector } from "react-redux"

const Scorecard = () => {
  const router = useRouter()
  useEffect(() => {
    if (allDetails.length !== 22) {
      router.push('/')
    }
  }, [])
  const allDetails = useSelector(state => state.saveDataSlice.allDetails)
  // team one
  let teamOneScore = allDetails.map((p, i) => {
    if (p?.team === 'team-1') {
      return Number(p?.[`mem${p?.num}`]?.[`score${p?.num}`])
    }
    return 0
  })

  let totalTeamOneScore = teamOneScore?.reduce((acc, cur) => acc + cur, 0)
  let checkScoreOne = Math.max(...teamOneScore)/4
  if (checkScoreOne >  70){
    checkScoreOne = checkScoreOne - 50
  }
  else if (checkScoreOne <= 50 && checkScoreOne > 30) {
    checkScoreOne = checkScoreOne - 30
  }
  else if (checkScoreOne <= 30 && checkScoreOne >= 15) {
    checkScoreOne = checkScoreOne - 15
  }
  else {
    checkScoreOne = checkScoreOne - 5
  }

  let totalScoreOne = useMemo(() => {
    return allDetails.filter((e) => e?.team === 'team-1' && Number(e?.[`mem${e?.num}`]?.[`score${e?.num}`]) > checkScoreOne)
  }, [allDetails])

  let teamOneScoreDetails = totalScoreOne.sort((p, q) => {
    return q?.[`mem${q.num}`]?.[`score${q.num}`] - p?.[`mem${p.num}`]?.[`score${p.num}`]
  }, [allDetails])

  let teamOneWicket = allDetails.map((p, i) => {
    if (p?.team === 'team-1' && p?.[`mem${p?.num}`][`wicket${p?.num}`]) {
      return Number(p?.[`mem${p?.num}`][`wicket${p?.num}`])
    }
    return 0
  })
  let totalTeamTwoWicket = teamOneWicket?.reduce((acc, cur) => acc + cur, 0)
  let teamOneTopWicketTaker = useMemo(() => {
    return allDetails.filter((p) => p?.team === 'team-1' && p?.[`mem${p?.num}`][`wicket${p?.num}`] > 0).sort((p, q) => {
      return Number(q?.[`mem${q.num}`]?.[`wicket${q.num}`]) - Number(p?.[`mem${p.num}`]?.[`wicket${p.num}`])
    })
  }, [allDetails])
  if (teamOneTopWicketTaker.length >= 6) {
    for (let i = 0; i < 3; i++) {
      teamOneTopWicketTaker.pop()
    }
  }
  // team 2
  let teamTwoScore = allDetails.map((p, i) => {
    if (p?.team === 'team-2') {
      return Number(p?.[`mem${p?.num}`]?.[`score${p?.num}`])
    }
    return 0
  })

  let totalTeamTwoScore = teamTwoScore?.reduce((acc, cur) => acc + cur, 0)
  let checkScoreTwo = Math.max(...teamTwoScore)/3;

  if (checkScoreTwo <= 50 && checkScoreTwo > 30) {
    checkScoreTwo = checkScoreTwo - 30
  }
  else if (checkScoreTwo <= 30 && checkScoreTwo >= 15) {
    checkScoreTwo = checkScoreTwo - 15
  }
  else {
    checkScoreTwo = checkScoreTwo - 5
  }

  let totalScoreTwo = useMemo(() => {
    return allDetails.filter((e) => e?.team === 'team-2' && Number(e?.[`mem${e?.num}`]?.[`score${e?.num}`]) > checkScoreTwo)
  }, [allDetails])

  let teamTwoScoreDetails = totalScoreTwo.sort((p, q) => {
    return q?.[`mem${q.num}`]?.[`score${q.num}`] - p?.[`mem${p.num}`]?.[`score${p.num}`]
  })
  // wicket
  let teamTwoWicket = allDetails.map((p, i) => {
    if (p?.team === 'team-2' && p?.[`mem${p?.num}`][`wicket${p?.num}`]) {
      return Number(p?.[`mem${p?.num}`][`wicket${p?.num}`])
    }
    return 0
  })
  let totalTeamOneWicket = teamTwoWicket?.reduce((acc, cur) => acc + cur, 0)
  let teamTwoTopWicketTaker = useMemo(() => {
    return allDetails.filter((p) => p?.team === 'team-2' && p?.[`mem${p?.num}`][`wicket${p?.num}`] > 0).sort((p, q) => {
      return Number(q?.[`mem${q.num}`]?.[`wicket${q.num}`]) - Number(p?.[`mem${p.num}`]?.[`wicket${p.num}`])
    })
  }, [allDetails])
  if (teamTwoTopWicketTaker.length >= 6) {
    for (let i = 0; i < 3; i++) {
      teamTwoTopWicketTaker.pop()
    }
  }
  return (
    <div>
      <Wrapper>
        <h1 className="text-center text-[24px] mt-3 font-[800] tracking-widest mb-4 text-[#720632]">Cricket Statistics</h1>
        <h2 className="text-center text-[24px] mt-3 font-[800] tracking-widest mb-4 text-[#720632]">
          Win: {totalTeamOneScore > totalTeamTwoScore ? 'Team 1' : 'Team 2'}
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center px-5 gap-3 mt-3">
          {/* for border */}
          <div className="h-[27rem] border border-[#720632] order-1 hidden md:block"></div>
          <div className="bg-[#b4406e] h-[27rem] w-[40%] order-0 px-2 py-1 rounded-lg">
            <h1 className="font-[600] text-[24px] text-center py-2 border-b-[3px] border-[#720632] text-[#ffffff] tracking-wider">Team-1 <span>{totalTeamOneScore}/{totalTeamOneWicket}</span></h1>
            <div className="flex flex-row justify-center gap-5 h-[90%]">
              {/* border */}
              <div className="h-[100%] bg-[#720632] w-[3px] block order-1"></div>
              {/* border end */}
              <div className="w-[40%] h-[100%] order-0 border-r-[2px] border-l-[2px] border-[#720632] text-[#ffffff]">
                <h1 className="text-center tracking-wider text-[20px] border-b-[2px] border-[#720632] py-1">Batsman <span>(Top-Scorer)</span></h1>
                <div className="w-[100%] flex h-[90%] justify-center gap-1">
                  <div className="w-[45%] px-2 order-0 border-r border-[#720632]">
                    <h1 className="border-b-2 border-[#720632] text-center">Name</h1>
                    {teamOneScoreDetails?.map((e) => {
                      return <div key={e.num} className="mt-1 text-center">{e?.[`mem${e.num}`]?.[`name${e.num}`].slice(0, 1).toUpperCase() + e?.[`mem${e.num}`]?.[`name${e.num}`].slice(1)}</div>
                    })}
                  </div>
                  <div className="w-[45%] px-2 order-2">
                    <h1 className="border-b-2 border-[#720632] text-center">Score</h1>
                    {teamOneScoreDetails?.map((e) => {
                      return <div key={e.num} className="mt-1 text-center">{e?.[`mem${e.num}`]?.[`score${e.num}`]}</div>
                    })}
                  </div>
                </div>
              </div>
              <div className="w-[40%] h-[100%] order-2 border-r-[2px] border-l-[2px] border-[#720632] text-[#ffffff]">
                <h1 className="text-center tracking-wider text-[20px] border-b-[2px] border-[#720632] py-1">Bowler</h1>
                <div className="w-[100%] flex h-[90%] justify-center gap-1">
                  <div className="w-[45%] px-2 order-0 border-r border-[#720632]">
                    <h1 className="border-b-2 border-[#720632] text-center">Name</h1>
                    {teamOneTopWicketTaker?.map((e) => {
                      return <div key={e.num} className="mt-1 text-center">{e?.[`mem${e.num}`]?.[`name${e.num}`].slice(0, 1).toUpperCase() + e?.[`mem${e.num}`]?.[`name${e.num}`].slice(1)}</div>
                    })}
                  </div>
                  <div className="w-[45%] px-2 order-2">
                    <h1 className="border-b-2 border-[#720632] text-center">Wicket</h1>
                    {teamOneTopWicketTaker?.map((e) => {
                      return <div key={e.num} className="mt-1 text-center">{Number(e?.[`mem${e.num}`]?.[`wicket${e.num}`])}</div>
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#b4406e] h-[27rem] w-[40%] order-2 px-2 py-1 rounded-lg">
            <h1 className="font-[600] text-[24px] text-center py-2 border-b-[3px] border-[#720632] text-[#ffffff] tracking-wider">Team-2 <span>{totalTeamTwoScore}/{totalTeamTwoWicket}</span></h1>
            <div className="flex flex-row justify-center gap-5 h-[90%]">
              {/* border */}
              <div className="h-[100%] bg-[#720632] w-[3px] block order-1"></div>
              {/* border end */}
              <div className="w-[40%] h-[100%] order-0 border-r-[2px] border-l-[2px] border-[#720632] text-[#ffffff]">
                <h1 className="text-center tracking-wider text-[20px] border-b-[2px] border-[#720632] py-1">Batsman (Top-Scorer)</h1>
                <div className="w-[100%] flex h-[90%] justify-center gap-1">
                  <div className="w-[45%] px-2 order-0 border-r border-[#720632]">
                    <h1 className="border-b-2 border-[#720632] text-center">Name</h1>
                    {teamTwoScoreDetails?.map((e) => {
                      return <div key={e.num} className="mt-1 text-center">{e?.[`mem${e.num}`]?.[`name${e.num}`].slice(0, 1).toUpperCase() + e?.[`mem${e.num}`]?.[`name${e.num}`].slice(1)}</div>
                    })}
                  </div>
                  <div className="w-[45%] px-2 order-2">
                    <h1 className="border-b-2 border-[#720632] text-center">Score</h1>
                    {teamTwoScoreDetails?.map((e) => {
                      return <div key={e.num} className="mt-1 text-center">{e?.[`mem${e.num}`]?.[`score${e.num}`]}</div>
                    })}
                  </div>
                </div>
              </div>
              <div className="w-[40%] h-[100%] order-2 border-r-[2px] border-l-[2px] border-[#720632] text-[#ffffff]">
                <h1 className="text-center tracking-wider text-[20px] border-b-[2px] border-[#720632] py-1">Bowler</h1>
                <div className="w-[100%] flex h-[90%] justify-center gap-1">
                  <div className="w-[45%] px-2 order-0 border-r border-[#720632]">
                    <h1 className="border-b-2 border-[#720632] text-center">Name</h1>
                    {teamTwoTopWicketTaker?.map((e) => {
                      return <div key={e.num} className="mt-1 text-center">{e?.[`mem${e.num}`]?.[`name${e.num}`].slice(0, 1).toUpperCase() + e?.[`mem${e.num}`]?.[`name${e.num}`].slice(1)}</div>
                    })}
                  </div>
                  <div className="w-[45%] px-2 order-2">
                    <h1 className="border-b-2 border-[#720632] text-center">Wicket</h1>
                    {teamTwoTopWicketTaker?.map((e) => {
                      return <div key={e.num} className="mt-1 text-center">{Number(e?.[`mem${e.num}`]?.[`wicket${e.num}`])}</div>
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default Scorecard
