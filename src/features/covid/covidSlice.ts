//createSlice sliceを作るもの　createAsyncThunk 非同期の関数を作るもの
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import dataJson from "../covid/data.json";
import dataJsondaily from "../covid/dataDaily.json";

const apiurl = "https://covid19.mathdro.id/api";

//APIDATA型を定義　type ofがdataJsonのデータの中身を識別して型を取得。自動で型推論してくれる。
//type of→宣言済みの変数の型を取得する型
type APIDATA = typeof dataJson;

type APIDATADAILY = typeof dataJsondaily;

//slice全体のstateの構造の定義
type covidState = {
  data: APIDATA;
  country: string;
  dailyData: APIDATADAILY;
};
const initialState: covidState = {
  data: {
    confirmed: {
      value: 267853675,
      detail: "https://covid19.mathdro.id/api/confirmed",
    },
    recovered: {
      value: 0,
      detail: "https://covid19.mathdro.id/api/recovered",
    },
    deaths: {
      value: 5279650,
      detail: "https://covid19.mathdro.id/api/deaths",
    },
    dailySummary: "https://covid19.mathdro.id/api/daily",
    dailyTimeSeries: {
      pattern: "https://covid19.mathdro.id/api/daily/[dateString]",
      example: "https://covid19.mathdro.id/api/daily/2-14-2020",
    },
    image: "https://covid19.mathdro.id/api/og",
    source: "https://github.com/mathdroid/covid19",
    countries: "https://covid19.mathdro.id/api/countries",
    countryDetail: {
      pattern: "https://covid19.mathdro.id/api/countries/[country]",
      example: "https://covid19.mathdro.id/api/countries/USA",
    },
    lastUpdate: "2021-12-09T06:22:50.000Z",
  },

  country: "japan",
  dailyData: [
    {
      totalConfirmed: 557,
      mainlandChina: 548,
      otherLocations: 9,
      deltaConfirmed: 0,
      totalRecovered: 0,
      confirmed: {
        total: 557,
        china: 548,
        outsideChina: 9,
      },
      deltaConfirmedDetail: {
        total: 0,
        china: 0,
        outsideChina: 0,
      },
      deaths: {
        total: 17,
        china: 17,
        outsideChina: 0,
      },
      recovered: {
        total: 0,
        china: 0,
        outsideChina: 0,
      },
      active: 0,
      deltaRecovered: 0,
      incidentRate: 0.4510818002025252,
      peopleTested: 0,
      reportDate: "2020-01-22",
    },
  ],
};

//非同期処理　sliceの外に定義する
//createAsyncThunk 第一引数actionの名前　第二引数async(非同期)
export const fetchAsynchGet = createAsyncThunk("covid/get", async () => {
  const { data } = await axios.get<APIDATA>(apiurl);
  return data;
});

export const fetchAsynchGetDaily = createAsyncThunk(
  "covid/getDaily",
  async () => {
    const { data } = await axios.get<APIDATADAILY>(`${apiurl}/daily`);
    return data;
  }
);

export const fetchAsynchGetCountry = createAsyncThunk(
  "covid/getCountry",
  async (country: string) => {
    let dynamicUrl = apiurl;
    if (country) {
      dynamicUrl = `${apiurl}/countries/${country}`;
    }
    const { data } = await axios.get<APIDATA>(dynamicUrl);
    return { data, country };
  }
);

//slice
const covidSlice = createSlice({
  name: "covid",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsynchGet.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    });
    builder.addCase(fetchAsynchGetDaily.fulfilled, (state, action) => {
      return {
        ...state,
        dailydata: action.payload,
      };
    });
    builder.addCase(fetchAsynchGetCountry.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload.data,
        country: action.payload.country,
      };
    });
  },
});

export const selectData = (state: RootState) => state.covid.data;
export const selectDailyData = (state: RootState) => state.covid.dailyData;
export const selectCountry = (state: RootState) => state.covid.country;

export default covidSlice.reducer;
