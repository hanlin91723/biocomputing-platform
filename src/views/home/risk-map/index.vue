<template>
  <div class="wrap">
    <el-bmap
        class="bm-view"
        :center="[106.556901, 29.570045]"
        :zoom="19"
        :tilt="70"
        :events="{
          init: (o) => {
            handler(o);
          },
        }"
        mapType="B_NORMAL_MAP"
      >
        <el-bmap-marker
          v-for="(item, index) in pointsList"
          :key="index"
          :position="[item.lng, item.lat]"
          :icon="item.dotIcon"
          :events="{
            click: (e) => {
              handlePoint(e);
            },
          }"
        ></el-bmap-marker>
        <el-bmapv-view>
          <el-bmapv-heat-map-layer
            :size="80"
            :max="60000"
            :data="heatData"
          ></el-bmapv-heat-map-layer>
        </el-bmapv-view>
      </el-bmap>
      <div class="bm-control">
        <el-radio-group
          class="radio-group"
          @change="changeRadio"
          v-model="radioVal"
        >
          <el-radio class="radio-item" :label="1">风险热力图</el-radio>
          <el-radio class="radio-item" :label="2">高风险企业</el-radio>
          <!-- <el-radio
            :class="{ 'radio-item': true, ['radio-' + item.label]: true }"
            v-for="item in radioList"
            :key="item.label"
            :label="item.label"
          >
            <i class="el-icon-location ico"></i>
            <span>{{ item.name }}</span>
          </el-radio> -->
        </el-radio-group>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      center: {
        lng: 0,
        lat: 0,
      },
      zoom: 3,
      radioVal: 1,
      radioList: [
        {
          label: 2,
          name: "经营风险",
        },
        {
          label: 3,
          name: "经营异常",
        },
        {
          label: 4,
          name: "投诉举报",
        },
        {
          label: 5,
          name: "司法诚信",
        },
        {
          label: 6,
          name: "税收异常",
        },
      ],
      heatData: [],
      pointsList: [],
      noPointsList: [],
      dotIcon: "",
      currentCoordinates: {},
    };
  },
  created() {
    this.getHeatData(1);
  },
  methods: {
    handler(map) {
      map.setMapStyleV2({
        styleId: "4e08c7cbe330dd256796b5ce7b202e75",
      });
    },
    changeRadio(val) {
      switch (val) {
        case 1:
          this.getHeatData(val);
          break;
        case 2:
          this.getHeatData(val);
          break;
        case 3:
          this.getHeatData(val);
          break;
        case 4:
          this.getHeatData(val);
          break;
        case 5:
          this.getHeatData(val);
          break;
        case 6:
          this.getHeatData(val);
          break;
        default:
      }
    },
    getHeatData(val) {
      const param = {
        type: val,
      };
      this.$axios.get("/company/companyPosition", param).then(({ data, }) => {
        this.pointsList = [];
        this.heatData = [];
        if (val === 1) {
          data.forEach((item) => {
            this.heatData.push({
              geometry: {
                type: "Point",
                coordinates: [item.lng, item.lat,],
              },
              properties: {
                count: item.count,
              },
            });
          });
        } else {
          this.noPointsList = data;
          const iconImg = String(6 - val);
          this.noPointsList.map((item) => {
            this.pointsList.push(
              Object.assign({}, item, {
                dotIcon: {
                  url: require(`@/assets/images/others/weather/${iconImg}.png`),
                  size: [16, 20,],
                },
              })
            );
          });
        }
      });
    },
    handlePoint(e) {
      const { target, } = e;
      this.currentCoordinates = this.pointsList.find(
        (item) =>
          item.lng === String(target.latLng.lng.toFixed(6)) &&
          item.lat === String(target.latLng.lat.toFixed(6))
      );
      this.$refs.enterpriseInfoDialog.handleOpenDialog(this.currentCoordinates);
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  position: relative;
  width: 100%;
  height: 100%;
  .bm-view {
    // position: absolute;
    // position: fixed;
    // right: 0;
    // bottom: 0;
    // z-index: 0;
    // width: 3830px;
    // height: 1176px;
    width: calc(100% + 40px);
    height: calc(100vh - 60px);
    margin: -20px;
  }
  .bm-control {
    position: absolute;
    bottom: -40px;
    left: -20px;
    z-index: 99;
    width: 176px;
    // height: 224px;
    padding: 20px;
    background: rgba(35, 44, 73, 1);
    border: 4px solid rgba(69, 154, 255, 0.2);
  }
  .radio-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .radio-item {
      font-size: 16px;
      line-height: 2;
      color: rgba(255, 255, 255, 0.8);
      .ico {
        padding-right: 2px;
        font-size: 20px;
        vertical-align: middle;
      }
      &.radio-2 {
        color: rgba(228, 61, 61, 0.8);
      }
      &.radio-3 {
        color: rgba(255, 123, 1, 0.8);
      }
      &.radio-4 {
        color: rgba(255, 204, 0, 0.8);
      }
      &.radio-5 {
        color: rgba(1, 123, 255, 0.8);
      }
      &.radio-6 {
        color: rgba(36, 203, 52, 0.8);
      }
      /deep/ .el-radio__input.is-checked + .el-radio__label {
        color: unset;
      }
    }
  }
}
</style>
