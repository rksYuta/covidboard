import React from "react";
import styles from "./Cards.module.css";
// import CountUp from "react-count-up";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";

import { GiHastyGrave } from "react-icons/gi";
import { MdLocalHospital } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";

//redux storeのデータの情報(state)を取得
//useSelector、selectData関数をimport
import { useSelector } from "react-redux";
import { selectData } from "../covidSlice";

const Cards: React.FC = () => {
  //useSelectorを使ってstoreの中のデータ属性を参照して、data変数に格納
  const data = useSelector(selectData);
  return (
    <div className={styles.container}>
      <Grid container spacing={1} justify="center">
        <Grid item xs={12} md={3} component={Card} className={styles.infected}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              <MdLocalHospital />
              Infected persons
            </Typography>
            <Typography variant="h5">
              {/* <CountUp
                start={0}
                end={data.confirmed.value}
                duration={1.5}
                separator=","
              /> */}
              {data.confirmed.value}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} md={3} component={Card} className={styles.recovered}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              <AiFillLike /> Recovered persons
            </Typography>
            <Typography variant="h5">
              {/* <CountUp
                start={0}
                end={data.recovered.value}
                duration={1.5}
                separator=","
              /> */}
              {data.recovered.value}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} md={3} component={Card} className={styles.deaths}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              <GiHastyGrave />
              Dead persons
            </Typography>
            <Typography variant="h5">
              {/* <CountUp
                start={0}
                end={data.deaths.value}
                duration={1.5}
                separator=","
              /> */}
              {data.deaths.value}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
