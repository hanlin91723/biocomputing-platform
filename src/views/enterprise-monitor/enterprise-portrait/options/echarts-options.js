// export const map = function(){
//   return {
//     tooltip: {
//       formatter: function (params) {
//         return (
//           params.seriesName + "<br />" + params.name + "：" + params.value
//         );
//       }, //数据格式化
//     },
//     visualMap: {
//       min: 0,
//       max: 2000,
//       left: "10px",
//       // left: "left",
//       top: "bottom",
//       text: ["高", "低",], //取值范围的文字
//       textStyle: {
//         color: "white",
//       },
//       inRange: {
//         color: ["#e0ffff", "rgba(0,60,153,0.8)",], //取值范围的颜色
//       },
//       show: true, //图注
//     },
//     geo: {
//       map: "china",
//       roam: false, //不开启缩放和平移
//       zoom: 1.23, //视角缩放比例
//       left:"100px",
//       label: {
//         normal: {
//           show: false,
//           fontSize: "10",
//           color: "rgba(0,0,0,0.7)",
//         },
//       },
//       itemStyle: {
//         normal: {
//           // borderColor: "rgba(0, 0, 0, 0.2)",
//           //  areaColor: 'rgba(0,60,153,0.8)',
//           borderColor: "#02c0ff",
//         },
//         emphasis: {
//           areaColor: "#F3B329", //鼠标选择区域颜色
//           shadowOffsetX: 0,
//           shadowOffsetY: 0,
//           shadowBlur: 20,
//           borderWidth: 0,
//           shadowColor: "rgba(0, 0, 0, 0.5)",
//         },
//       },
//     },
//     series: [
//       {
//         name: "店铺数量",
//         type: "map",
//         geoIndex: 0,
//         data: null,
//       },
//     ],
//   };
// };

// export const rankingBar = function(){
//   let yData = ["杭州市", "宁波市", "温州市", "湖州市", "嘉兴市", "绍兴市", "金华市", "衢州市", "舟山市", "台州市", "丽水市",];
//   let yValue = [1234,868, 672, 491, 367, 251, 142, 103, 85, 34, 5,];
//   return {
//     tooltip: {
//         trigger: "axis",
//         axisPointer: {
//             type: "shadow",
//         },
//     },
//     legend: {
//         show: false,
//     },
//         grid: {
//           containLabel: true,
//         },
//     xAxis: {
//         type: "value",
//         splitLine: {
//             show: false,
//             lineStyle: {
//                 color:"#ebebeb",
//             },
//         },
//         axisLabel: {
//             show: false,
//         },
//         axisTick: {
//             show: false,
//         },
//         axisLine: {
//             show: false,
//         },

//     },
//     yAxis: {
//         type: "category",
//         inverse: true,
//         axisLine: {
//             show: false,
//         },
//         axisTick: {
//             show: false,
//         },
//         axisPointer: {
//             label: {
//                 show: true,
//                 margin: 30,
//             },
//         },
//         data: yData,
//         axisLabel: {
//             fontSize: 14,
//             align: "right",
//             color: "#333",
//         },
//     },
//     series: [{
//             z: 2,
//             name: "数量",
//             type: "bar",
//             data: yValue.map((item) => {
//                 return {
//                     value: item,
//                     itemStyle: {
//                         color:"#6395f9",
//                     },
//                 };
//             }),
//             label: {
//                 show: true,
//                 position: "right",
//                 color: "#333333",
//                 fontSize: 14,
//                 offset: [10, 0,],
//             },
//         },

//     ],
// };
// };

export const mapAndBar = function(data){
  let yData = data.map(item=>{
    return item.name;
  });
  let yValue = data.map(item=>{
    return item.value;
  });
  return {
    tooltip: {
      formatter: function (params) {
        return (
          params.seriesName + "<br />" + params.name + "：" + params.value
        );
      }, //数据格式化
    },
    visualMap: {
      min: 0,
      max: 13,
      left: "10px",
      // left: "left",
      top: "bottom",
      text: ["高", "低",], //取值范围的文字
      color: "white",
      inRange: {
        color: ["#e0ffff", "rgba(0,60,153,0.8)",], //取值范围的颜色
      },
      show: true, //图注
    },
    geo: {
      map: "china",
      roam: false, //不开启缩放和平移
      zoom: 1.23, //视角缩放比例
      left:"100px",
      label: {
          show: false,
          fontSize: "10",
          color: "rgba(0,0,0,0.7)",
      },
      itemStyle: {
          // borderColor: "rgba(0, 0, 0, 0.2)",
          //  areaColor: 'rgba(0,60,153,0.8)',
          borderColor: "#02c0ff",
      },
      emphasis: {
        areaColor: "#F3B329", //鼠标选择区域颜色
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 20,
        borderWidth: 0,
        shadowColor: "rgba(0, 0, 0, 0.5)",
      },
    },
    legend: {
      show: false,
  },
      grid: {
        containLabel: true,
        right: 0,
        x: 340,
        y: 50,
        x2: 50,
        y2: 50,
      },
  xAxis: {
      type: "value",
      splitLine: {
          show: false,
          lineStyle: {
              color:"#ebebeb",
          },
      },
      axisLabel: {
          show: false,
      },
      axisTick: {
          show: false,
      },
      axisLine: {
          show: false,
      },

  },
  yAxis: {
      type: "category",
      inverse: true,
      axisLine: {
          show: false,
      },
      axisTick: {
          show: false,
      },
      axisPointer: {
          label: {
              show: true,
              margin: 30,
          },
      },
      data: yData,
      axisLabel: {
          fontSize: 14,
          align: "right",
          color: "#333",
      },
  },
    series: [
      {
        name: "数量",
        type: "map",
        geoIndex: 0,
        data,
      },
      {
        z: 2,
        name: "数量",
        type: "bar",
        data: yValue.map((item) => {
            return {
                value: item,
                itemStyle: {
                    color:"#1990FF",
                },
            };
        }),
        barWidth:"45%",
        label: {
            show: true,
            position: "right",
            color: "#1990FF",
            fontSize: 10,
            // offset: [10, 0,],
        },
    },
    ],
  };
};

export const investPie = function(data){
  return {
    color: ["#1990FF","#8DDAF8","#7ACC8B","#FFB355","#F96E5F","#896EF5",],
    tooltip : {
      trigger: "item",
      // formatter: "{a} <br/>{b} : {c} ({d}%)",
      formatter: "{b} : {d}%",
  },
    legend: {
        show: true,
        orient: "vertical",
        itemlength:20,
        itemWidth:15,
        left: "60%",
        align:"left",
        top:"middle",
    },
    series: [
        {
            name: "",
            type: "pie",
            radius: ["40%", "60%",],
            center:["200","50%",],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: "center",
            },
            emphasis: {
                label: {
                    show: false,
                    fontSize: "85",
                    fontWeight: "bold",
                },
            },
            labelLine: {
                show: false,
            },
            data,
        },
    ],
};
};

export const trendChange = function(data) {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // Use axis to trigger tooltip
        type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    // legend: {
    //   icon: "circle",
    //   orient: "horizontal",
    //   itemGap: 40,
    //   itemWidth: 14,
    //   itemHeight: 14,
    //   textStyle: {
    //     fontSize: 14,
    //     color: "#858585",
    //     fontWeight: 400,
    //     padding: [4, 0, 0, 0,],
    //   },
    //   data: ["A", "B", "P", "E",],
    // },
    color: ["#1990FF","#8DDAF8","#7ACC8B","#FFB355","#F96E5F","#896EF5",],
    grid: {
      left: "8%",
      right: "0",
      top: "10%",
      containLabel: false,
    },
    xAxis: {
      type: "category",
      data: data.dateList,
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
      },
      axisLine: {
        show: false,
      },
    },
    yAxis: {
      // min: 0,
      // max: 1200,
      type: "value",
      splitLine: {
        lineStyle: {
          color: "#F3F4F5",
        },
      },
    },
    series: [
      {
        // name: "E",
        name: "积极舆论",
        type: "bar",
        stack: "total",
        label: {
          show: false,
          color: "#FFFFFF",
          formatter: function (e) {
            return e.value ? e.seriesName : "";
          },
        },
        itemStyle: {
          borderRadius: [0, 0, 4, 4,],
        },
        barWidth: 20,
        emphasis: {
          focus: "series",
        },
        data: data.positiveList,
      },
      {
        // name: "P",
        name: "中级舆论",
        type: "bar",
        stack: "total",
        label: {
          show: false,
          color: "#FFFFFF",
          formatter: "{a}",
        },
        emphasis: {
          focus: "series",
        },
        data: data.middleList,
      },
      {
        // name: "A",
        name: "消极舆论",
        type: "bar",
        stack: "total",
        label: {
          show: false,
          color: "#FFFFFF",
          formatter: "{a}",
        },
        itemStyle: {
          borderRadius: [4, 4, 0, 0,],
        },
        emphasis: {
          focus: "series",
        },
        data: data.negativeList,
      },
      {
        name: "趋势",
        type: "line",
        smooth: false,
        showAllSymbol: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: {
              color: "#1990FF",
        },
        label: {
            show: false,
            position: "top",
            color: "#6c50f3",
        },
        itemStyle: {
            color: "rgba(0, 96, 255, 0.8)",
            borderColor: "#fff",
            borderWidth: 2,
        },
      
        data: data.totalList,
    },
    ],
  };
};

export const ringPie = function(data){
  return {
    color: ["#1990FF","#8DDAF8","#7ACC8B","#FFB355","#F96E5F","#896EF5",],
    tooltip : {
      trigger: "item",
      // formatter: "{a} <br/>{b} : {c} ({d}%)",
      formatter: "{b} : {d}%",
  },
    legend: {
        show: true,
        // orient: "vertical",
        itemlength:20,
        itemWidth:15,
        bottom:"0%",
        // left: "60%",
        // align:"left",
        // top:"middle",
    },
    series: [
        {
            name: "",
            type: "pie",
            radius: ["40%", "60%",],
            center:["180","34%",],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: "center",
            },
            emphasis: {
                label: {
                    show: false,
                    fontSize: "85",
                    fontWeight: "bold",
                },
            },
            labelLine: {
                show: false,
            },
            data,
        },
    ],
};
};

export const recruit = function(name,value){
  return {
    
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
        },
    },
    grid: {
        top: "10%",
        right: "3%",
        left: "5%",
        bottom: "14%",
    },
    xAxis: [{
        type: "category",
        data: name,
        axisLine: {
            show:false,
            lineStyle: {
                color: "rgba(255,255,255,0.12)",
            },
        },
        axisLabel: {
            show:true,
            margin: 10,
            color: "black",
            fontSize: 14,
        },
    },],
    yAxis: [{
        name: "",
        axisLabel: {
            show:false,
            formatter: "{value}",
            color: "#e2e9ff",
        },
        "axisTick":{ //y轴刻度线
          "show":false,
        },
        axisLine: {
            show: false,
            lineStyle: {
                color: "rgba(255,255,255,1)",
            },
        },
        splitLine: {
            show:false,
            lineStyle: {
                color: "rgba(255,255,255,0.12)",
            },
        },
    },],
    series: [{
        type: "bar",
        data: value,
        barWidth: "20px",
        itemStyle: {
                // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //     offset: 0,
                //     color: "rgba(0,244,255,1)", // 0% 处的颜色
                // }, {
                //     offset: 1,
                //     color: "rgba(0,77,167,1)", // 100% 处的颜色
                // },], false),
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(0,244,255,1)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(0,77,167,1)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                borderRadius: [30, 30, 30, 30,],
                shadowColor: "rgba(0,160,221,1)",
                shadowBlur: 4,
        },
        label: {
           show:true,
           position:["-22%",-17,],
        },
    },],
};
};

export const basicPie = function(data){
  return {
    color: ["#1990FF","#8DDAF8","#7ACC8B","#FFB355","#F96E5F","#896EF5",],
    tooltip : {
      trigger: "item",
      // formatter: "{a} <br/>{b} : {c} ({d}%)",
      formatter: "{b} : {d}%",
  },
    legend: {
        show: true,
        orient: "vertical",
        itemlength:20,
        itemWidth:15,
        left: "60%",
        align:"left",
        top:"middle",
    },
    series: [
        {
            name: "",
            type: "pie",
            radius: [0, "60%",],
            center:["200","50%",],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: "center",
            },
            emphasis: {
                label: {
                    show: false,
                    fontSize: "85",
                    fontWeight: "bold",
                },
            },
            labelLine: {
                show: false,
            },
            data,
        },
    ],
};
};

export const patentBar = function() {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // Use axis to trigger tooltip
        type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {
      icon: "circle",
      orient: "horizontal",
      itemGap: 40,
      itemWidth: 14,
      itemHeight: 14,
      fontSize: 14,
      color: "#858585",
      fontWeight: 400,
      padding: [4, 0, 0, 0,],
      // data: ["A", "B", "P", "E",],
    },
    color: ["#1990FF","#8DDAF8","#7ACC8B","#FFB355","#F96E5F","#896EF5",],
    grid: {
      left: "8%",
      right: "0",
      top: "20%",
      bottom: "10%",
      containLabel: false,
    },
    xAxis: {
      type: "category",
      data: ["2021.11","2021.12","2022.01","2022.02","2022.03","2022.04","2022.05","2022.06","2022.07","2022.08","2022.09","2022.10",],
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
      },
      axisLine: {
        show: false,
      },
    },
    yAxis: {
      // min: 0,
      // max: 1200,
      type: "value",
      splitLine: {
        lineStyle: {
          color: "#F3F4F5",
        },
      },
    },
    series: [
      {
        // name: "E",
        name: "发明专利",
        type: "bar",
        stack: "total",
        label: {
          show: false,
          color: "#FFFFFF",
          formatter: function (e) {
            return e.value ? e.seriesName : "";
          },
        },
        itemStyle: {
          borderRadius: [0, 0, 4, 4,],
        },
        barWidth: 20,
        emphasis: {
          focus: "series",
        },
        data: [320, 80, 301, 334, 390, 330, 320, 390, 330, 320, 390, 390,],
      },
      {
        // name: "P",
        name: "外观专利",
        type: "bar",
        stack: "total",
        label: {
          show: false,
          color: "#FFFFFF",
          formatter: "{a}",
        },
        emphasis: {
          focus: "series",
        },
        data: [120, 132, 101, 134, 90, 230, 210, 302, 301, 334, 390, 330,],
      },
      {
        // name: "A",
        name: "实用新型专利",
        type: "bar",
        stack: "total",
        label: {
          show: false,
          color: "#FFFFFF",
          formatter: "{a}",
        },
        itemStyle: {
          borderRadius: [4, 4, 0, 0,],
        },
        emphasis: {
          focus: "series",
        },
        data: [150, 212, 201, 154, 190, 330, 410, 182, 191, 234, 290, 330,],
      },
    ],
  };
};
