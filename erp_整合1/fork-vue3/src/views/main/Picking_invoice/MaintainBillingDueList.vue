<template>
  <div class="common-layout">
    <el-container>
      <el-header>Billing Management</el-header>
      <el-main class="content">
        <el-row class="row1">
          <el-col :span="3">Search Sold To Party</el-col>
          <el-col :span="3">
            <el-input v-model="inputSoldToParty" placeholder="please enter" clearable></el-input>
          </el-col>

          <div class="flex">
            <!--用弹窗table来找sold to party的botton-->
            <el-button type="info" :icon="Search" @click="SearchPartyDialogVisible = true"/>
            <el-button type="default" @click="loadDeliveryList">Star Search</el-button>
            <el-dialog
                :model-value="SearchPartyDialogVisible"
                title="Search Sold to Party Number"
                width="20%"
                :append-to-body="true"
                v-if="true"
                @close="SearchPartyDialogVisible=false">
              <el-form :model="form">

                <el-form-item label="Country" width="80px">
                  <el-input class="dialog_input" v-model="inputCountry"></el-input>
                </el-form-item>
                <el-form-item label="City" width="80px">
                  <el-input class="dialog_input" v-model="inputCity"></el-input>
                </el-form-item>
                <el-form-item label="Name" width="80px">
                  <el-input  v-model="inputName"></el-input>
                </el-form-item>
              </el-form>
              <template #footer>
                <el-button type="primary" @click="clickSearch">Search</el-button>
                <el-button @click="SearchPartyDialogVisible = false">Cancel</el-button>
              </template>
            </el-dialog>
          </div>

          <!--输入完搜索Sold to Party所需要的条件后，再弹出一个table的dialog来找到对应的customer-->
          <el-dialog title="Double Click to Customer"
                     :model-value="CustomerDialogVisible"
                     width="50%"
                     height="250"
                     :append-to-body="true"
                     v-if="true"
                     @close="CustomerDialogVisible=false">
            <!--double click双击后对应的customerID传回到搜索框中-->
            <el-table :data="SearchCustomerData"
                      @row-dblclick="searchCustomerRow">
              <el-table-column property="city" label="City" width="180" />
              <el-table-column property="postalCode" label="Postal Code" width="180" />
              <el-table-column property="name" label="Name" width="180" />
              <el-table-column property="customerId" label="Customer ID" width="180" />
            </el-table>
          </el-dialog>

          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="4">Search Sales Organization</el-col>
          <el-col :span="3">
            <el-cascader
                ref="cascaderAddrOrg"
                v-model="inputOrg"
                :options="optionsOrg"
                @change="OrgHandleChange"
                clearable/>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="4">Search Distribution Channel</el-col>
          <el-col :span="3">
            <el-cascader
                ref="cascaderAddrDistribution"
                v-model="inputDistribution"
                :options="optionsDistribution"
                @change="DistributionHandleChange"
                clearable  />
          </el-col>
        </el-row>
        <!--billing显示出来的tabledata数据-->
        <el-table
            :data="BillingSearchList"
            style="width:1400px"
            class="eltable1"
            @select="selectClick"
            ref="taskTableRef">
          <el-table-column type="selection" width="55" />
          <el-table-column
              prop="customer.salesOrg"
              label="Sales Organization"
              width="180">
          </el-table-column>
          <el-table-column
              prop="customer.customerId"
              label="Sold To Party"
              width="150">
          </el-table-column><el-table-column
            prop="orderId"
            label="Order ID"
            width="180">
        </el-table-column>
          <el-table-column
              prop="netValue"
              label="Net Value"
              width="200">
          </el-table-column>
          <el-table-column
              prop="currency"
              label="Currency"
              width="210">
          </el-table-column>
          <el-table-column
              prop="customer.city"
              label="Customer City"
              width="120">
          </el-table-column>
          <el-table-column
              prop="customer.name"
              label="Customer Name"
              width="120">
          </el-table-column>
          <el-table-column
              prop="customer.distrChannel"
              label="Distribution Channel"
              width="120">
          </el-table-column>

        </el-table>
      </el-main>
    </el-container>
    <el-footer>
      <el-button type="info" @click="CheckDelivery" :disabled="check">Individual Billing Document</el-button>
    </el-footer>
  </div>
</template>


<script>
import LoginVue from '../Login.vue';

import axios from "axios";

export default {
  data() {
    return {
      //收集customer的name，city，country的信息，来进行检索的表单
      form: {},

      //控制dialog的显示和关闭
      SearchPartyDialogVisible: false,
      CustomerDialogVisible: false,

      //通过这三个条件来查询Customer
      inputCountry: '',
      inputCity: '',
      inputName: '',

      //通过这三个条件来查询订单信息Order
      inputDistribution: '',
      inputSoldToParty: 1,
      inputOrg: '',

      taskTableRef: '',//控制表格只能单选

      check: true,//只有选中了bill，才能点击Individual billing document

      //记录要传给下个发货页面CreateInvoice的订单号OrderID和soldToParty编号
      nextViewOrderID: '',
      nextViewSoldToParty: '',

      //两个下拉框的内容和标签
      optionsOrg: [
        {
          value: 'DN00',
          label: 'DN00(Germany North)',
        },
        {
          value: 'DS00',
          label: 'DS00(Germany South)',
        },
        {
          value: 'UE00',
          label: 'UE00(US East)',
        },
        {
          value: 'UW00',
          label: 'UW00(US West)',
        },
      ],
      optionsDistribution: [
        {
          value: 'IN',
          label: 'IN(Internet)',
        },
        {
          value: 'WH',
          label: 'WH(Wholesale)',
        },
      ],
      //bill是搜出来的订单
      BillingSearchList: [],
      //customer是输入条件后查询出来的
      SearchCustomerData: [],
    }
  },

  //在开始渲染之前，就会显示出所有Order，所有的customer也会先加载
  beforeMount() {
    this.loadallDeliveryList()
    this.loadCustomerList()
  },

  methods: {

    //加载全部订单，传递的data为空，希望获取全部的数据
    loadallDeliveryList() {
      axios
          .post("/g2/operates/salesOrder/condition", {})
          .then((res) => {
            this.BillingSearchList = res.data.data; //显示在前端上面的，查出来的数据
          });
    },
    //增加筛选条件后，再加载的订单
    loadDeliveryList() {
      axios
          .post("/g2/operates/salesOrder/condition", {
            soldToParty: this.inputSoldToParty,
            salesOrganization: this.inputOrg,
            distributionChannel: this.inputDistribution,
          })
          .then((res) => {
            this.BillingSearchList = res.data.data; //显示在前端上面的，查出来的数据
          });
    },

    //输入country，city，name来查对应的customer
    loadCustomerList() {
      axios
          .post("/g2/operates/customer/query", {
              country: this.inputCountry,
              city: this.inputCity,
              name: this.inputName,
          })
          .then((res) => {
            this.SearchCustomerData = res.data.data; //由一个dialog里面的table进行显示，查询的的customer
          });
    },


    //销售组织的下拉框，选项改变了过后会被调用的方法
    OrgHandleChange: function () {
      if (this.$refs['cascaderAddrOrg'].getCheckedNodes().length > 0) {
        //如果有选项被选中了，就get选中的选项对应value值，value值对应的是options：[]
        this.inputOrg = this.$refs['cascaderAddrOrg'].getCheckedNodes()[0].value
        this.loadDeliveryList()
      } else {
        //点了右边的clean清除选项
        this.inputOrg = ''
        this.loadDeliveryList()
      }
    },
    //分销渠道的下拉框，选项改变了过后会被调用的方法
    DistributionHandleChange: function () {
      if (this.$refs['cascaderAddrDistribution'].getCheckedNodes().length > 0) {
        this.inputDistribution = this.$refs['cascaderAddrDistribution'].getCheckedNodes()[0].value
        this.loadDeliveryList()
      } else {
        this.inputDistribution = ''
        this.loadDeliveryList()
      }
    },

    //搜索Customer，弹出另一个dialog，另一个dialog里面会显示经过city，country，name来筛选出来的customer
    clickSearch: function () {
      this.loadCustomerList()
      this.CustomerDialogVisible = true
    },
    //双击筛选出来的Customer后
    searchCustomerRow: function (row) {
      this.CustomerDialogVisible = false
      this.SearchPartyDialogVisible = false
      this.inputSoldToParty = row.customerId
      this.loadDeliveryList()
    },

    //控制表格单选，只能选择一个Order去开具invoice，多选了就把之前的选的一个删掉
    selectClick: function (val) {
      if (val.length > 1) {
        this.nextViewOrderID = JSON.parse(JSON.stringify(val))[1].orderId //获取要传输到下一页的订单号
        this.$refs['taskTableRef'].clearSelection()
        this.$refs['taskTableRef'].toggleRowSelection(val.pop())
        this.check = false
        //console.log(nextViewOrderID)
      } else {
        //获取要传输到下一页的订单号，如果只勾选过1个，对应的序号就是[0]；勾选过两个及以上，多勾选的会被删掉，最后被勾选上的是[1]
        this.nextViewOrderID = JSON.parse(JSON.stringify(val))[0].orderId
      }
      this.check = false
    },

    //页面跳转，把这一页勾选的OrderID传递到下一页，去开具Invoice
    CheckDelivery: function () {
      //console.log('click')
      //跳转
      this.$router.push(
          {
            path: '/CreateInvoice',
            query: {orderID: this.nextViewOrderID}
          }
      )
    },

  },
}
</script>
