<template>
  <div class="common-layout">
    <el-container>
      <el-header>Overview of Invoice</el-header>
      <el-main class="content">
        <el-row class="row1">
          <el-col :span="3">Search Invoice ID</el-col>
          <el-col :span="3">
            <el-input v-model="inputInvoiceID" placeholder="please enter" clearable></el-input>
            <el-button type="primary" @click="clickShowInvoice">Show Invoice</el-button>
          </el-col>
          <!--用弹窗table来找invoice-->
          <div>
            <el-button type="info" icon="el-icon-search" @click="SearchInvoiceDialogVisible = true"/>
            <el-dialog
                :model-value="SearchInvoiceDialogVisible"
                title="Search Sold to Party"
                width="20%"
                :append-to-body="true"
                v-if="true"
                @close="SearchInvoiceDialogVisible=false">
              <el-form :model="form">

                <el-form-item label="Sold To Party" width="80px">
                  <el-input class="dialog_input" v-model="inputSoldToParty"></el-input>
                </el-form-item>
                <el-form-item label="Billing Date" width="80px">
                  <el-input class="dialog_input" v-model="inputdate"></el-input>
                </el-form-item>
                <el-form-item label="Sales Organization" width="80px">
                  <el-input v-model="inputSalesOrg"></el-input>
                </el-form-item>
                <el-form-item label="Distribution Channel" width="80px">
                  <el-input v-model="inputDistribution"></el-input>
                </el-form-item>
              </el-form>
              <template #footer>
                <el-button type="primary" @click="clickSearch">Search</el-button>
                <el-button @click="SearchInvoiceDialogVisible = false">Cancel</el-button>
              </template>
            </el-dialog>
          </div>

          <!--输入完搜索invoice ID所需要的条件后，再弹出一个table的dialog来找到所需要的InvoiceID-->
          <el-dialog title="Double Click to Customer"
                     :model-value="invoiceIdDialogVisible"
                     width="50%"
                     height="250"
                     :append-to-body="true"
                     v-if="true"
                     @close="invoiceIdDialogVisible=false">

            <el-table :data="SearchInvoiceData"
                      @row-dblclick="searchInvoiceRow">
              <!--下面的table展示接口六里面的data-->
              <el-table-column property="invoiceId" label="Invoice ID" width="180"/>
              <el-table-column property="billingDate" label="Billing Date" width="180"/>
              <el-table-column property="payer" label="Payer" width="180"/>
              <el-table-column property="distributionChannel" label="Distribution Channel" width="180"/>
              <el-table-column property="salesOrganization" label="salesOrganization" width="180"/>
            </el-table>
          </el-dialog>


        </el-row>
        <el-descriptions
            class="margin-top"
            :column="3"
            :size="size"
            border>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <user/>
                </el-icon>
                Invoice ID
              </div>
            </template>
            {{ invoiceID }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <iphone/>
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
                  <location/>
                </el-icon>
                Sold To Party
              </div>
            </template>
            {{ soldToParty }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <office-building/>
                </el-icon>
                Address
              </div>
            </template>
            {{ address }}
          </el-descriptions-item>
        </el-descriptions>

        <el-table
            :data="detailsSearchList"
            style="width:1400px"
            class="eltable1"
        >
          <el-table-column type="selection" width="55"/>
          <el-table-column type="index" width="50"/>
          <el-table-column
              prop="item"
              label="Item"
              width="200">
          </el-table-column>
          <el-table-column
              prop="materialId"
              label="Material ID"
              width="400">
          </el-table-column>
          <el-table-column
              prop="materialName"
              label="Item Description"
              width="400">
          </el-table-column>
          <el-table-column
              prop="quantity"
              label="quantity"
              width="400">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import {ref} from "vue";
import axios from "axios"

export default {

  data() {
    return {
      //description里面要显示的内容
      invoiceID: '',
      NetValueCount: '',
      soldToParty: '',
      address: '',
      //借助OrderID查询详细的material信息
      inputInvoiceID: '',
      OrderID: '',
      //控制搜索InvoiceID的dialog的显示和关闭
      SearchInvoiceDialogVisible: false,
      invoiceIdDialogVisible: false,
      //输入对应的条件查询invoiceID
      inputSoldToParty: '',
      inputdate: '',
      inputSalesOrg: '',
      inputDistribution: '',
      //最后输入invoiceID,借助对应的OrderID，查询出来的Invoice的具体信息
      detailsSearchList: [],
      //测试用的假数据
      invoiceList: [
        {
          invoiceID: '9000000001',
          orderID: 'WOKJ7957',
          netValue: 399,
          currency: 'USD',
          billingDate: '2023-07-26',
          item: 10,
          materialID: 'DXTR1102',
          name: 'Deluxe Touring Bike',
          quantity: 100,
        },

        {
          invoiceID: '9000000002',
          orderID: 'WOKJ7957',
          netValue: 399,
          currency: 'USD',
          billingDate: '2023-07-26',
          item: 20,
          materialID: 'PRTR1102',
          name: 'Professional Touring Bike',
          quantity: 200,
        },

        {
          invoiceID: '9000000003',
          orderID: 'WOKJ7957',
          netValue: 399,
          currency: 'USD',
          billingDate: '2023-07-26',
          item: 10,
          materialID: 'PRTR1102',
          name: 'Professional Touring Bike',
          quantity: 200,
        },

        {
          invoiceID: '9000000004',
          orderID: 'WOKJ7957',
          netValue: 399,
          currency: 'USD',
          billingDate: '2023-07-26',
          item: 20,
          materialID: 'DXTR1102',
          name: 'Deluxe Touring Bike',
          quantity: 200,
        },
      ],
      //输入soldToParty，SalesOrganization等条件后搜索出来的invoiceID
      SearchInvoiceData: [],
    }
  },
  methods: {
    loadInvoiceDetail() {
      //调用文档中的接口七
      axios
          .post("/g2/operates/invoice/query/id", {
              id: this.inputInvoiceID
          })
          .then((res) => {
            console.log(res)
            this.detailsSearchList = res.data.data.materials
            this.invoiceID = this.inputInvoiceID;
            this.NetValueCount = res.data.data.orderInfo.salesOrderAllInfo.netValue + res.data.data.orderInfo.salesOrderAllInfo.currency;
            this.soldToParty = res.data.data.orderInfo.salesOrderAllInfo.soldToParty;
            this.address = res.data.data.orderInfo.customerAllInfo.name + ' / ' + res.data.data.orderInfo.customerAllInfo.city + ' / ' + res.data.data.orderInfo.customerAllInfo.country;
            this.OrderID = res.data.data.orderInfo.salesOrderAllInfo.orderId;
          })
    },
    loadOrderMaterial() {
      axios
          .post("/g2/operates/salesOrder/query", {
            data: {
              id: this.OrderID
            }
          })
          .then((res) => {
            this.detailsSearchList = res.data.data.materials; //显示在前端上面的，查出来的具体item的数据
          });
    },

    //调用文档中的接口六，根据输入的条件进行InvoiceID的查询
    loadInvoiceSearch() {
      axios
          .post("/g2/operates/invoice/query", {
            soldToParty: this.inputSoldToParty,
            billingDate: this.inputdate,
            salesOrganization: this.inputSalesOrg,
            distributionChannel: this.inputDistribution,
          })
          .then((res) => {
            this.SearchInvoiceData = res.data.data;
          });
    },

    //输入要搜索的Invoice的ID后，点击button进行数据调用和展示
    clickShowInvoice: function () {
      this.loadInvoiceDetail()
      // this.loadOrderMaterial()
    },

    clickSearch: function () {
      this.loadInvoiceSearch() //查询，是哪一个invoiceID
      this.invoiceIdDialogVisible = true
    },

    //双击InvoiceID进行查询
    searchInvoiceRow: function (row) {
      this.inputInvoiceID = row.invoiceId
      this.loadInvoiceDetail()
      // this.loadOrderMaterial()
      this.invoiceIdDialogVisible = false
      this.SearchInvoiceDialogVisible = false
    },
  },


}
</script>
