export const rankingBar = function (name,value) {
    return {
        grid: {
            left: "0%",
            right: "5%",
            bottom: "0%",
            top: "10%",
            containLabel: true,
        },
        backgroundColor: "#ffffff",
        tooltip: {
            trigger: "item",
          },
        xAxis: {
            show: false,
            type: "value",
        },
        yAxis: [{
            type: "category",
            inverse: true,
            axisLabel: {
                show: true,
                textStyle: {
                    color: "#303133",
                    fontSize: "14",
                },
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            data: name,
        }, {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
                padding: [0, 0, 0, -10, ],
                textStyle: {
                    color: "#303133",
                    fontSize: "14",
                },
                formatter: function (value) {
                    if (value >= 10000) {
                        return (value / 10000).toLocaleString() + "万";
                    } else {
                        return value.toLocaleString();
                    }
                },
            },
            data: value,
        }, ],
        series: [{
                name: "",
                type: "bar",
                zlevel: 1,
                itemStyle: {
                    normal: {
                        barBorderRadius: 0,
                        color: "rgba(93, 119, 255, 1)",
                    },
                },
                barWidth: 12,
                data: value,
            },
            {
                name: "",
                type: "bar",
                barWidth: 12,
                barGap: "-100%",
                data: [14000, 14000,14000,14000,14000,14000,14000,14000,14000,14000, ],
                itemStyle: {
                    normal: {
                        color: "rgba(234, 236, 239, 1)",
                        barBorderRadius: 0,
                    },
                },
            },
        ],
    };
};

export const registeredScale = function(data){
    return {
        color: [
            "rgba(55, 87, 255, 1)",
            "rgba(93, 119, 255, 1)",
            "rgba(132, 151, 255, 1)",
            "rgba(170, 184, 255, 1)",
            "rgba(208, 215, 255, 1)",
        ],
        tooltip : {
            trigger: "item",
            // formatter: "{a} <br/>{b} : {c} ({d}%)",
            formatter: "{a} <br/>{b} : {d}%",
        },
        toolbox: {
            show : false,
           
        },
          legend: {
            itemlength:20,
            itemWidth:15,
            orient: "horizontal",
            bottom:"5%",
            left:"20%",
            textStyle: {
                color:"#909399",
            },
            height:150,
        },
        series : [
            {
                label:{
                     show:false,
                },
                name:"注册规模分布",
                type:"pie",
                radius : [0, 75,],
                center:["55%", "35%",],
                data,
            },
        ],
    };
};