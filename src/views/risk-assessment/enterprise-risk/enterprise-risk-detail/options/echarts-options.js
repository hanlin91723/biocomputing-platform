//综合风险指数
export const comprehensiveRisk = function (data) {
    return {
        tooltip: {
            show: true,
        },
        radar: {
            radius: "70%",
            indicator: [{
                    name: "财务状况",
                    max: 20,
                },
                {
                    name: "员工情况",
                    max: 10,
                },
                {
                    name: "信用评价",
                    max: 10,
                },
                {
                    name: "网络舆情",
                    max: 10,
                },
                {
                    name: "重要人员",
                    max: 10,
                },
                {
                    name: "司法诉讼",
                    max: 20,
                },
                {
                    name: "企业经营",
                    max: 10,
                },
                {
                    name: "关联企业",
                    max: 10,
                },
            ],
        },
        series: [{
            name: "",
            type: "radar",
            data: [{
                value: data,
            }, ],
        }, ],
    };
};