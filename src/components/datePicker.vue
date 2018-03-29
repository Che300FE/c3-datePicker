<template>
  <div class="data-picker" v-if="visiable">
    <!-- 顶部的bar条开始 -->
    <div class="title-bar">
      <div class="go-back__arrow" @click.stop="goBack">
        <img class="back-img" src="https://ssl-assets.che300.com/feimg/bapp/substitution/left-arrow.png">
      </div>
      <h2 class="title-name">选择日期</h2>
    </div>
    <!-- 顶部bar条结束 -->
    <div class="date-list__wrapper">
        <ul class="date-list__content">
            <li class="date__year-item"
                v-for="(year, index) in allDate"
                @click.stop="toggleMonth(year)"
                :key="index">
                <span class="date__year-value">
                    {{year.year}}
                </span>
                <ul class="date__month-list"
                    v-show="year.toggle">
                    <li class="date__month-item"
                    v-for="(month, index) in year.months"
                    @click.stop="selectMonth({
                      year: year.year,
                      month: month
                    })"
                    :key="index">
                        {{month}}月
                    </li>
                </ul>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>

import '../sass/datePicker.scss';

let oDate = new Date();
let curYear = oDate.getFullYear();
let curMonth = oDate.getMonth() + 1;

export default {
  name: "c3DatePicker",
  props: {
    visiable: {
      type: Boolean,
      default: false
    },
    maxYear: {
      type: [String, Number],
      default: curYear
    },
    maxMonth: {
      type: [String, Number],
      default: curMonth
    },
    minYear: {
      type: [String, Number],
      default: curYear - 10
    },
    minMonth: {
      type: [String, Number],
      default: 1
    },
    goBack: {
      type: Function,
      default: function () {}
    },
    selectMonth: {
      type: Function,
      default: function () {}
    }
  },
  data() {
    return {
      maxY: "",
      maxM: "",
      minY: "",
      minM: "",
      allDate: []
    };
  },
  created() {
    // 渲染前对数据做统一的限制处理
    this.maxY = this.limitYear(this.maxYear);
    this.minY = this.limitYear(this.minYear);
    this.maxM = this.limitMonth(this.maxY, this.maxMonth);
    this.minM = this.limitMonth(this.minY, this.minMonth);

    if (this.maxY < this.minY) {
      // 最小年不能大于最大年
      this.minY = this.maxY;

      if (this.maxM < this.minY) {
        // 当最小年最大年是同一年的时候
        // 最小月份不能大于最大月份
        this.minM = this.maxM;
      }
    }

    // 生成区间内所有年月的数据
    this.allDate = this.createAllDate(
      this.maxY,
      this.maxM,
      this.minY,
      this.minM
    );
  },
  methods: {
    // 对传入的年份做规则处理
    limitYear(year) {
      year = Number(year);

      // 如果传入的最大年份大于今年 || 小于1970年 || 转成数字之后是NaN
      // 都将其变成今年
      if (year > curYear || year < 1970 || isNaN(year)) {
        return curYear;
      }

      return year;
    },
    // 对传入的月份做规则处理
    limitMonth(year, month) {
      month = Number(month);

      // 最小为1月
      if (month < 1) {
        return 1;
      }

      // 最大为12月
      if (month > 12 || isNaN(month)) {
        return 12;
      }

      if (year === curYear && month > curMonth) {
        return curMonth;
      }

      return month;
    },
    // 生成时间区间内所有年月的数据
    createAllDate(maxY, maxM, minY, minM) {
      let allDate = [];

      if (minY === maxY) {
        let oYear = {
          year: minY,
          toggle: false,
          months: []
        };

        for (let i = minM; i <= maxM; i++) {
          oYear.months.push(i);
        }

        allDate.push(oYear);
      } else {
        for (let y = minY; y <= maxY; y++) {
          let oYear = {
            year: y,
            toggle: false,
            months: []
          };

          let ms = 1;
          let me = 12;

          y === minY && (ms = minM);
          y === maxY && (me = maxM);

          for (; ms <= me; ms++) {
            oYear.months.push(ms);
          }

          allDate.unshift(oYear);
        }
      }

      return allDate;
    },
    toggleMonth (oYear) {
      let cacheToggle = oYear.toggle;

      this.allDate.forEach(year => {
        year.toggle = false;
      });

      oYear.toggle = !cacheToggle;
    }
  }
};
</script>
