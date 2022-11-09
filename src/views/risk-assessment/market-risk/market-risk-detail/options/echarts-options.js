export const rankingBar = function () {
    return {
        grid: {
            left: "5%",
            right: "5%",
            bottom: "5%",
            top: "10%",
            containLabel: true,
        },
        backgroundColor: "#ffffff",
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
            data: ["安全门未关", "关模低压保护", "料温过低", "马达未启动", "其他", ],
        }, {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
                padding: [0, 0, 0, -40, ],
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
            data: [23, 18, 12, 6, 3, ],
        }, ],
        series: [{
                name: "次数",
                type: "bar",
                zlevel: 1,
                itemStyle: {
                    normal: {
                        barBorderRadius: 0,
                        color: "rgba(93, 119, 255, 1)",
                    },
                },
                barWidth: 12,
                data: [23, 18, 12, 6, 3, ],
            },
            {
                name: "背景",
                type: "bar",
                barWidth: 12,
                barGap: "-100%",
                data: [23, 23, 23, 23, 23, ],
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