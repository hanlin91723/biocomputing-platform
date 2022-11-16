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
  console.log(yValue);
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
      textStyle: {
        color: "white",
      },
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
        normal: {
          show: false,
          fontSize: "10",
          color: "rgba(0,0,0,0.7)",
        },
      },
      itemStyle: {
        normal: {
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

export const investPie = function(){
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
        data: ["信息传输、软件和信息技术服务业", "科学研究和技术服务业", "制造业", "金融业", "文化、体育和娱乐行业","批发和零售业",],
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
            data: [
                {value: 335, name: "信息传输、软件和信息技术服务业",},
                {value: 310, name: "科学研究和技术服务业",},
                {value: 234, name: "制造业",},
                {value: 135, name: "金融业",},
                {value: 1548, name: "文化、体育和娱乐行业",},    
                {value: 600, name: "批发和零售业",},    
            ],
        },
    ],
};
};

