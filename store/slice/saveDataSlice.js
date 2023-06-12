import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  matchDetails: {
    teamMem: '',
    venue: '',
    time: ''

  },
  singleDetails: {
    num: 0
  },
  allDetails: [
    {
      "team": "team-1",
      "num": 1,
      "mem1": {
        "num": 1,
        "name1": "owais",
        "category1": "Bowler",
        "score1": "15",
        "wicket1": "1"
      }
    },
    {
      "team": "team-1",
      "num": 2,
      "mem2": {
        "num": 2,
        "name2": "daniyal",
        "category2": "Batsman",
        "score2": "25"
      }
    },
    {
      "team": "team-1",
      "num": 3,
      "mem3": {
        "num": 3,
        "name3": "hammad",
        "category3": "All-Rounder",
        "score3": "15",
        "wicket3": "5"
      }
    },
    {
      "team": "team-1",
      "num": 4,
      "mem4": {
        "num": 4,
        "name4": "umar",
        "category4": "All-Rounder",
        "score4": "13",
        "wicket4": "03"
      }
    },
    {
      "team": "team-1",
      "num": 5,
      "mem5": {
        "num": 5,
        "name5": "shabbir",
        "category5": "All-Rounder",
        "score5": "2",
        "wicket5": "0"
      }
    },
    {
      "team": "team-1",
      "num": 6,
      "mem6": {
        "num": 6,
        "name6": "talha",
        "category6": "Batsman",
        "score6": "0"
      }
    },
    {
      "team": "team-1",
      "num": 7,
      "mem7": {
        "num": 7,
        "name7": "bilal",
        "category7": "Batsman",
        "score7": "5"
      }
    },
    {
      "team": "team-1",
      "num": 8,
      "mem8": {
        "num": 8,
        "name8": "kamil",
        "category8": "All-Rounder",
        "score8": "50",
        "wicket8": "01"
      }
    },
    {
      "team": "team-1",
      "num": 9,
      "mem9": {
        "num": 9,
        "name9": "huzaifa",
        "category9": "Bowler",
        "score9": "5",
        "wicket9": "01"
      }
    },
    {
      "team": "team-1",
      "num": 10,
      "mem10": {
        "num": 10,
        "name10": "muhammad",
        "category10": "Batsman",
        "score10": "0"
      }
    },
    {
      "team": "team-1",
      "num": 11,
      "mem11": {
        "num": 11,
        "name11": "huzaifa riaz",
        "category11": "Bowler",
        "score11": "0",
        "wicket11": "0"
      }
    },
    {
      "team": "team-2",
      "num": 1,
      "mem1": {
        "num": 1,
        "name1": "owais",
        "category1": "Bowler",
        "score1": "15",
        "wicket1": "1"
      }
    },
    {
      "team": "team-2",
      "num": 2,
      "mem2": {
        "num": 2,
        "name2": "daniyal",
        "category2": "Batsman",
        "score2": "25"
      }
    },
    {
      "team": "team-2",
      "num": 3,
      "mem3": {
        "num": 3,
        "name3": "hammad",
        "category3": "All-Rounder",
        "score3": "15",
        "wicket3": "5"
      }
    },
    {
      "team": "team-2",
      "num": 4,
      "mem4": {
        "num": 4,
        "name4": "umar",
        "category4": "All-Rounder",
        "score4": "13",
        "wicket4": "03"
      }
    },
    {
      "team": "team-2",
      "num": 5,
      "mem5": {
        "num": 5,
        "name5": "shabbir",
        "category5": "All-Rounder",
        "score5": "2",
        "wicket5": "0"
      }
    },
    {
      "team": "team-2",
      "num": 6,
      "mem6": {
        "num": 6,
        "name6": "talha",
        "category6": "Batsman",
        "score6": "0"
      }
    },
    {
      "team": "team-2",
      "num": 7,
      "mem7": {
        "num": 7,
        "name7": "bilal",
        "category7": "Batsman",
        "score7": "5"
      }
    },
    {
      "team": "team-2",
      "num": 8,
      "mem8": {
        "num": 8,
        "name8": "kamil",
        "category8": "All-Rounder",
        "score8": "10",
        "wicket8": "01"
      }
    },
    {
      "team": "team-2",
      "num": 9,
      "mem9": {
        "num": 9,
        "name9": "huzaifa",
        "category9": "Bowler",
        "score9": "5",
        "wicket9": "01"
      }
    },
    {
      "team": "team-2",
      "num": 10,
      "mem10": {
        "num": 10,
        "name10": "muhammad",
        "category10": "Batsman",
        "score10": "0"
      }
    },
    {
      "team": "team-2",
      "num": 11,
      "mem11": {
        "num": 11,
        "name11": "huzaifa riaz",
        "category11": "Bowler",
        "score11": "0",
        "wicket11": "0"
      }
    },


  ]
}
const saveDataSlice = createSlice({
  name: 'saveDataSlice',
  initialState,
  reducers: {
    addSingleData(state, action) {
      // console.log(action.payload)
      state.singleDetails = {
        team: action.payload.team,
        num: action.payload.num,
        [`mem${action.payload.num}`]: {
          num: action.payload.num,
          ...state.singleDetails[`mem${action.payload.num}`],
          ...action.payload[`mem${action.payload.num}`]
        }
      }
    },
    addAllDetails(state, action) {
      state.allDetails.push({ ...state.singleDetails })
    },
    addMatchDetails(state, action) {
      state.matchDetails = {
        ...state.matchDetails,
        ...action.payload
      }
    }
  }
})
export const { addSingleData, addAllDetails, addMatchDetails } = saveDataSlice.actions
export default saveDataSlice.reducer
