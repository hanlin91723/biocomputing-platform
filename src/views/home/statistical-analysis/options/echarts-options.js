export const marketRisk = function (data) {
  return {
    color: ["rgba(245,114,114,1)", "rgba(244,165,47,1)", "rgba(182,200,76,1)", "rgba(93,209,140,1)", ],
    title: {
      text: "市场风险概况",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      // orient: "vertical",
      top: "bottom",
    },
    series: [{
      name: "",
      type: "pie",
      radius: "50%",
      data,
      itemStyle: {
        borderWidth: 2,
        borderColor: "#fff",
      },
    }, ],
  };
};

export const riskIndexAnalysis = function (data) {
  return {
    title: {
      text: "企业综合风险指数分析",
      // textAlign: "auto",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      maxInterval: 5,
      alignTicks: false,
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [{
      data,
      type: "line",
    }, ],
  };
};

export const enterpriseNum = function (data) {
  return {
    xAxis: {
      type: "category",
      data: data.map(item => item.name),
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
    },
    series: [{
      data: data.map(item => item.value),
      type: "line",
    }, ],
  };
};

export const wordCloud = function (data) {
  return {
    // xAxis: {
    //   type: "category",
    //   data: data.map(item => item.date),
    //   boundaryGap: false,
    // },
    // yAxis: {
    //   type: "value",
    // },
    color: [
      "#86D4FF",
      "#FF8F6C",
      "#2CF263",
      "#9FA8F7",
      "#1274FF",
      "#E6613D",
      "#FFC629",
      "#FFAB2E",
      "#F78289",
      "#FF6C96",
      "#45BFD4",
      "#4E31FF",
      "#31FBFB",
      "#86D4FF",
      "#BF8AFD",
      "#FFF500",
      "#DE58FF",
      "#72ED7C",
      "#0BEEB8",
      "#931CFF",
      "#3D25F2",
      "#F995C8",
      "#FBE9B4",
      "#FF4AB6",
    ],
    title: {
      text: "风险指标云图",
      left: "center",
    },
    series: [{
      type: "wordCloud",
      shape: "circle", // shape这个属性虽然可配置，但是在词的数量不太多的时候，效果不明显，它会趋向于画一个椭圆

      // Keep aspect ratio of maskImage or 1:1 for shapes
      // This option is supported since echarts-wordcloud@2.1.0
      keepAspect: false,
      // maskImage: maskImage,// 这个是可以自定义背景图片的，词云会按照图片的形状排布，所以有形状限制的时候，最好用背景图来实现，而且，这个背景图一定要放base64的，不然词云画不出来

      // 位置的配置
      left: "center",
      top: "center",
      width: "70%",
      height: "80%",
      right: null,
      bottom: null,

      sizeRange: [12, 60, ], // 词的大小，最小12px，最大60px，可以在这个范围调整词的大小
      rotationRange: [-90, 90, ], // 每个词旋转的角度范围和旋转的步进
      rotationStep: 45,

      // size of the grid in pixels for marking the availability of the canvas
      // the larger the grid size, the bigger the gap between words.

      gridSize: 8, // 词间距，数值越小，间距越小，这里间距太小的话，会出现大词把小词套住的情况，比如一个大的口字，中间会有比较大的空隙，这时候他会把一些很小的字放在口字里面，这样的话，鼠标就无法选中里面的那个小字，这里可以用函数根据词云的数量动态返回间距
      drawOutOfBound: false, // 允许词太大的时候，超出画布的范围
      layoutAnimation: true, // 布局的时候是否有动画
      shrinkToFit: false,
      // 这是全局的文字样式，相对应的还可以对每个词设置字体样式
      textStyle: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        // 颜色可以用一个函数来返回字符串，这里是随机色
        color: function () {
          // Random color
          return "rgb(" + [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
          ].join(",") + ")";
        },
      },
      emphasis: {
        focus: "self",
        // textStyle: {
        //   textShadowBlur: 10,
        //   textShadowColor: "#333",
        // },
      },

      // 数据必须是一个数组，数组是对象，对象必须有name和value属性
      data,
    }, ],
  };
};

export const ranking = function (data) {
  return {
    title: {
      text: "风险企业十大行业排名",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01, ],
    },
    yAxis: {
      type: "category",
      data: data.map(item => item.name),
    },
    series: [{
      type: "bar",
      data: data.map(item => item.value),
    }, ],
  };
};

export const distribution = function (data) {
  return {
    title: {
      text: "风险企业规模分布",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      // orient: "vertical",
      top: "bottom",
    },
    series: [{
      name: "",
      type: "pie",
      radius: "50%",
      data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    }, ],
  };
};