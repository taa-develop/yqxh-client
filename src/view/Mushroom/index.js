/**
 * @desc 主页-菇房
 */
import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js";
import { gql } from "apollo-boost";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import Box from "../../component/Box";

import {
  Wrap,
  LeftWrapper,
  RightWrapper,
  ContentBox,
  HeaderTitle,
  Accordion,
  AccordionItemTitle,
  AccordionContent,
  Table,
  LightCol,
  TCellHead,
} from "./components";

const GET_HOUSES = gql`
  query {
    mushroomHouseList {
      id
      name
    }
  }
`;

const GET_HOUSE_DATA = gql`
  query getHouseData($pageQuery: PageQuery!, $batchQuery: BatchQuery!) {
    batchList(pageQuery: $pageQuery, batchQuery: $batchQuery) {
      id
      environment
      mushroomHouseId
      recorder
      recordCount
      number
      status
      startTime
      endTime
      stage {
        id
      }
      silo {
        id
      }
    }

    pageInfo {
      pageNum
      hasNextPage
      pages
    }
  }
`;

const GET_INDICATORS = gql`
  query getIndicators(
    $pageQuery: PageQuery!
    $indicatorQuery: IndicatorQuery!
  ) {
    indicatorsList(pageQuery: $pageQuery, indicatorQuery: $indicatorQuery) {
      id
    }
  }
`;

const GET_STAGES = gql`
  query getStages($pageQuery: PageQuery!, $batchId: Int!) {
    stageListByBatchId(pageQuery: $pageQuery, batchId: $batchId) {
      id
      stageName
      batchId
      recorder
      recordCount
    }
  }
`;

const GET_RECORDS = gql`
  query getRecords($pageQuery: PageQuery!, $stageId: Int!) {
    recordListByStageId(pageQuery: $pageQuery, stageId: $stageId) {
      id
      recorder
      remark
      indicatorData {
        key
        value
      }
    }
  }
`;

function Mushroom() {
  const [houses, setHouses] = useState([]);
  const [currHouseId, setCurrHouseId] = useState("");
  const [batches, setBatches] = useState([]);
  const [currBatch, setCurrBatch] = useState({});
  const [stages, setStages] = useState([]);

  const chartRef = useRef(null);

  const [getRecords] = useLazyQuery(GET_RECORDS, {
    onCompleted: (res) => {
      console.log("记录", res);
    },
  });

  const [getStages] = useLazyQuery(GET_STAGES, {
    onCompleted: (res) => {
      console.log("阶段", res);

      if (Array.isArray(res.stageListByBatchId)) {
        setStages(res.stageListByBatchId);
        // 根据阶段列表逐个请求阶段下的记录
        const tasks = res.stageListByBatchId.map(
          (stage) =>
            new Promise((r) => {
              setTimeout(() => {
                getRecords({
                  variables: {
                    pageQuery: { pageNum: 1, pageSize: 10 },
                    stageId: stage.id,
                  },
                });
                r();
              }, 100); //添加延迟,否则只请求最后一个
            })
        );
        Promise.all(tasks);
      }
    },
  });

  const [getHouseData] = useLazyQuery(GET_HOUSE_DATA, {
    onCompleted: (res) => {
      console.log("批次", res);

      if (Array.isArray(res.batchList)) {
        setBatches(res.batchList);
        if (res.batchList.length > 0) {
          setCurrBatch(res.batchList[0]);
        }
      }

      if (Array.isArray(res.batchList) && chartRef && chartRef.current) {
        new Chart(chartRef.current.getContext("2d"), {
          type: "line",
          data: {
            // 接口没有数据
            // labels: res.batchList.map((item) => item.number),
            labels: ["a", "b", "c", "d", "d"],
            datasets: [
              {
                // 接口没有数据
                // data: res.batchList.map((item) => item.recordCount),
                data: [1, 6, 10, 4, 5],
                borderColor: "#377dcd",
                borderWidth: 1,
                fill: false,
              },
            ],
          },
          options: {
            legend: { display: false },
            scales: {
              xAxes: [{ gridLines: { color: "#032875" } }],
            },
          },
        });
      }

      if (Array.isArray(res.batchList) && res.batchList.length > 0) {
        // 默认获取第一批次
        getStages({
          variables: {
            pageQuery: { pageNum: 1, pageSize: 10 },
            batchId: res.batchList[0].id,
          },
        });
      }
    },
  });

  const { loading, error } = useQuery(GET_HOUSES, {
    onCompleted: (res) => {
      console.log("菇房列表", res);
      if (res.mushroomHouseList && res.mushroomHouseList[0]) {
        setHouses(res.mushroomHouseList);
        setCurrHouseId(res.mushroomHouseList[0].id);
      }
    },
  });

  useQuery(GET_INDICATORS, {
    variables: {
      pageQuery: { pageNum: 1, pageSize: 10 },
      indicatorQuery: { environment: "MUSHROOM_HOUSE", status: 1 },
    },
    onCompleted: (res) => {
      console.log("指标", res);
    },
  });

  useEffect(() => {
    currHouseId &&
      getHouseData({
        variables: {
          pageQuery: { pageNum: 1, pageSize: 10 },
          batchQuery: {
            environment: "MUSHROOM_HOUSE",
            mushroomHouseId: currHouseId,
          },
        },
      });
  }, [currHouseId, getHouseData]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const titleColSpan = Math.floor(stages.length / 6);
  console.log(stages.length, titleColSpan);

  return (
    <Wrap>
      <LeftWrapper>
        <Box>
          <ContentBox>
            <HeaderTitle>全部菇房</HeaderTitle>
            <Accordion>
              {houses.map(({ id, name }) => (
                <li key={id}>
                  <AccordionItemTitle onClick={() => setCurrHouseId(id)}>
                    {name}
                  </AccordionItemTitle>
                  {currHouseId === id && (
                    <AccordionContent>
                      <Table>
                        <tbody>
                          <tr>
                            <td>选择时间段</td>
                            <td>2020-04-01</td>
                            <td>2020-04-02</td>
                          </tr>
                          <tr>
                            <td>数据数量</td>
                            <td colSpan={2}>100</td>
                          </tr>
                          <tr>
                            <td>批次数</td>
                            <td colSpan={2}>100</td>
                          </tr>
                        </tbody>
                      </Table>
                      <canvas ref={chartRef} width={200} height={120}></canvas>
                    </AccordionContent>
                  )}
                </li>
              ))}
            </Accordion>
          </ContentBox>
        </Box>
      </LeftWrapper>
      <RightWrapper>
        <Box>
          <ContentBox>
            <Table>
              <tbody>
                <tr>
                  <LightCol></LightCol>
                  <LightCol colSpan={titleColSpan}>选择时间段</LightCol>
                  <LightCol colSpan={titleColSpan}>2020-04-01</LightCol>
                  <LightCol colSpan={titleColSpan}>2020-04-01</LightCol>
                  <LightCol colSpan={titleColSpan}>数据数量:100</LightCol>
                  <LightCol colSpan={titleColSpan}>批次:100</LightCol>
                  <LightCol colSpan={stages.length - 5 * titleColSpan}>
                    选择批次:
                    <select
                      value={currBatch.id || ""}
                      onChange={(e) =>
                        setCurrBatch(
                          batches
                            .filter((v) => v.id === e.target.value)
                            .map((v) => v.id)
                            .pop() || ""
                        )
                      }
                    >
                      {batches.map((batch) => (
                        <option
                          value={batch.id}
                          label={`批次${batch.number}`}
                        ></option>
                      ))}
                    </select>
                  </LightCol>
                </tr>
                <tr>
                  <td>批次</td>
                  <td colSpan={stages.length}>
                    批次{currBatch.number || ""}, 共{currBatch.recordCount || 0}
                    条数据
                  </td>
                </tr>
                <tr>
                  <LightCol>阶段</LightCol>
                  {stages.map((stage) => (
                    <LightCol key={stage.id}>{stage.stageName}</LightCol>
                  ))}
                </tr>
                <tr>
                  <td>记录时间</td>
                  {Array(stages.length)
                    .fill(0)
                    .map((_, i) => (
                      <td key={i}>9:00</td>
                    ))}
                </tr>
                <tr>
                  <LightCol>序号</LightCol>
                  {Array(stages.length)
                    .fill(0)
                    .map((_, i) => (
                      <LightCol key={i}>{i + 1}</LightCol>
                    ))}
                </tr>
                <tr>
                  <td>记录人员</td>
                  {Array(stages.length)
                    .fill(0)
                    .map((_, i) => (
                      <td key={i}>张{i + 1}</td>
                    ))}
                </tr>
                <tr>
                  <TCellHead rowSpan={3}>料温</TCellHead>
                </tr>
                <tr>
                  {Array(stages.length)
                    .fill(0)
                    .map((_, i) => (
                      <LightCol key={i}>{i + 1}</LightCol>
                    ))}
                </tr>
                <tr>
                  <td colSpan={stages.length}>折线图</td>
                </tr>
              </tbody>
            </Table>
          </ContentBox>
        </Box>
      </RightWrapper>
    </Wrap>
  );
}

export default Mushroom;
