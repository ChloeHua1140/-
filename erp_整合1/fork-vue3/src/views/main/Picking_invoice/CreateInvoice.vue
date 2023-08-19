<template>
  <div class="common-layout">
    <el-container>
      <el-header>Create:Overview of Billing Items</el-header>

      <el-main class="content">
        <el-descriptions class="margin-top" title="Invoice Create" :column="3" :size="size" border>
          <el-descriptions-item>
            <!--页面偏上的位置的description，展示的是Order相关的信息-->
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <user />
                </el-icon>
                Order ID
              </div>
            </template>
            {{ OrderID }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <iphone />
                </el-icon>
                Net Valule
              </div>
            </template>
            {{ NetValueCount }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <location />
                </el-icon>
                Sold to Party
              </div>
            </template>
            {{ soldToParty }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <office-building />
                </el-icon>
                Address
              </div>
            </template>
            {{ address }}
          </el-descriptions-item>
        </el-descriptions>

        <!--这个table展示的是上一页传递过来的OrderID，对应的material item-->
        <el-table :data="detailsSearchList" style="width:1400px" class="eltable1"
          @selection-change="handleSelectionChange">
          <!--按照截图加了一个selection框，但是不知道有没有用-->
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" width="50" />
          <el-table-column prop="item" label="Item" width="200">
          </el-table-column>
          <el-table-column prop="materialId" label="Material ID" width="400">
          </el-table-column>
          <el-table-column prop="materialName" label="Item Description" width="400">
          </el-table-column>
          <el-table-column prop="quantity" label="quantity" width="400">
          </el-table-column>
          <!--          <el-table-column-->
          <!--              prop="netWeight"-->
          <!--              label="Net Weight"-->
          <!--              width="400">-->
          <!--          </el-table-column>-->
          <!--          <el-table-column-->
          <!--              prop="grossWeight"-->
          <!--              label="Gross Weight"-->
          <!--              width="400">-->
          <!--          </el-table-column>-->

        </el-table>
      </el-main>
    </el-container>
  </div>
  <div>
    <el-footer>
      <el-button type="info" @click="clickSave">Create Invoice</el-button>
    </el-footer>
  </div>
</template>

<script>

import { ref } from "vue";
import { ElNotification } from "element-plus";
import axios from "axios"

let orderID = ref('')
export default {
  beforeMount() {
    this.OrderID = this.$route.query.orderID
    this.loadOrder()
    // this.loadOrderMaterial()
  },

  data() {
    return {
      //四个要通过传入orderID进行筛选后，最后呈现在description里面的内容
      OrderID: '',
      NetValueCount: '',
      address: '',
      soldToParty: '',
      //根据某个OrderID查询出来的，Order里面要的item
      detailsSearchList: [],
      //该OrderID对应的InvoiceID，如果还没有开具话则为空，已经开具了则是对应的invoice
      InvoiceID: '',
      //selectInvoice:[],//用来记录哪些新的invoice需要被生成
    }
  },

  methods: {

    //加载上一页传输过来的订单号OrderID，里面对应的信息,展示在页面上方
    loadOrder() {
      axios
        .post("/g2/operates/salesOrder/query", {
          id: this.OrderID
        })
        .then((res) => {
          console.log(res)
          this.detailsSearchList = res.data.data.materials
          this.NetValueCount = res.data.data.orderInfo.salesOrderAllInfo.netValue + res.data.data.orderInfo.salesOrderAllInfo.currency;
          this.soldToParty = res.data.data.orderInfo.salesOrderAllInfo.soldToParty;
          this.address = res.data.data.orderInfo.customerAllInfo.name + ' / ' + res.data.data.orderInfo.customerAllInfo.city + ' / ' + res.data.data.orderInfo.customerAllInfo.country;
        });
    },
    //加载这个OrderID对应的material
    loadOrderMaterial() {
      axios
        .post("/g2/operates/salesOrder/query", {
          id: this.OrderID
        })
        .then((res) => {
          this.detailsSearchList = res.data.data.materials; //显示在前端上面的，查出来的具体item的数据
        });
    },
    //点击Create Invoice过后，将生成新invoice的请求传递给后端
    postInvoice() {
      axios
        .post("/g2/operates/invoice/add", {
          id: this.OrderID
        })
        .then((res) => {
          this.InvoiceID = res.data.data; //返回新生成的invoiceID
        });
    },


    // handleSelectionChange:function (change){
    //   this.selectInvoice = change //用来存储被勾选了的item
    // },

    //告诉用户生成的新的invoiceID是多少
    clickSave: function () {
      this.postInvoice()
      ElNotification.success({
        title: 'Success',
        message: 'Invoice' + " : " + this.InvoiceID + 'has been created' + ' by the Order : ' + this.OrderID,
        offset: 500,
      })
    },
  },

}
</script>

