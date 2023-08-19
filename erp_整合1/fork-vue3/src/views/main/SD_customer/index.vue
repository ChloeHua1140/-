<template>
  <div style="padding:20px">
    <el-form :inline="true" :model="dataForm" style="margin-left: -10px" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="customerId" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.item" placeholder="title" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="cdatas0">
        <el-button @click="getDataList()">Search</el-button>
      </el-form-item>
      <el-form-item v-if="cdatas">
        <el-button @click="getDataList2()">Search</el-button>
      </el-form-item>
      <el-form-item v-if="cdatas2">
        <el-button @click="getDataList3()">Search</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="customerData" v-if="showCustomer" border style="width: 100%">
      <el-table-column prop="customerId" label="customerId" width="120">
      </el-table-column>
      <el-table-column prop="title" label="title" width="80">
      </el-table-column>
      <el-table-column prop="name" label="name"> </el-table-column>
      <el-table-column prop="postalCode" label="postalCode" width="100">
      </el-table-column>
      <el-table-column prop="city" label="city" width="80">
      </el-table-column>
      <el-table-column prop="country" label="country"> </el-table-column>
      <el-table-column prop="language" label="language" width="100">
      </el-table-column>
      <el-table-column prop="reconciliationAcct" label="reconciliationAcct" width="180">
      </el-table-column>
      <el-table-column prop="sortKey" label="sortKey">
      </el-table-column>
      <el-table-column prop="paymentTerms" label="paymentTerms" width="120">
      </el-table-column>
      <el-table-column prop="salesOrg" label="salesOrg" width="100">
      </el-table-column>
      <el-table-column prop="salesDistrict" label="salesDistrict" width="120"> </el-table-column>
      <el-table-column prop="customerStatsGroup" label="customerStatsGroup" width="180">
      </el-table-column>
      <el-table-column prop="division" label="division" width="100">
      </el-table-column>
      <el-table-column prop="currency" label="currency">
      </el-table-column>
      <el-table-column prop="priceGroup" label="priceGroup" width="120">
      </el-table-column>
      <el-table-column prop="deliveryPriority" label="deliveryPriority" width="130">
      </el-table-column>
      <el-table-column prop="shippingConditions" label="shippingConditions" width="160">
      </el-table-column>
      <el-table-column prop="deliveringPlant" label="deliveringPlant" width="130">
      </el-table-column>
      <el-table-column prop="maxPartDeliviries" label="maxPartDeliviries" width="140">
      </el-table-column>
      <el-table-column prop="incoterms" label="incoterms" width="100">
      </el-table-column>
      <el-table-column prop="incotermsLocation" label="incotermsLocation" width="160">
      </el-table-column>
      <el-table-column prop="acctAssmtGrpCust" label="acctAssmtGrpCust" width="160">
      </el-table-column>
      <el-table-column prop="taxClassific" label="taxClassific" width="120">
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button @click="deleted(scope.row)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="handCustomer(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--          <el-pagination-->
    <!--            @size-change="sizeChangeHandle"-->
    <!--            @current-change="currentChangeHandle"-->
    <!--            :current-page="1"-->
    <!--            :page-sizes="[10, 20, 50, 100]"-->
    <!--            :page-size="pageSize"-->
    <!--            :total="1"-->
    <!--            layout="total, sizes, prev, pager, next, jumper">-->
    <!--          </el-pagination>-->
    <el-table :data="personData" v-if="showPerson" border style="width: 100%">
      <el-table-column prop="contactPersonNumber" label="contactPersonNumber" width="180">
      </el-table-column>
      <el-table-column prop="title" label="title" width="180">
      </el-table-column>
      <el-table-column prop="firstName" label="firstName" width="260">
      </el-table-column>
      <el-table-column prop="lastName" label="lastName" width="230">
      </el-table-column>
      <el-table-column prop="correspondanceLang" label="correspondanceLang" width="280">
      </el-table-column>
      <el-table-column prop="country" label="country" width="100"> </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button @click="deletedPerson(scope.row)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="handPerson(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="relatonData" v-if="showRelation" border style="width: 100%">
      <el-table-column prop="relationshipId" label="relationshipId" width="120">
      </el-table-column>
      <el-table-column prop="relationshipAtegory" label="relationshipAtegory" width="180">
      </el-table-column>
      <el-table-column prop="searchTerm" label="searchTerm" width="110">
      </el-table-column>
      <el-table-column prop="businessPartner1" label="businessPartner1" width="180">
      </el-table-column>
      <el-table-column prop="businessPartner2" label="businessPartner2" width="180">
      </el-table-column>
      <el-table-column prop="validFrom" label="validFrom" width="100">
      </el-table-column>
      <el-table-column prop="validTo" label="validTo" width="100">
      </el-table-column>
      <el-table-column prop="vip" label="vip" width="80">
      </el-table-column>
      <el-table-column prop="department" label="department" width="120">
      </el-table-column>
      <el-table-column prop="functions" label="functions" width="120">
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button @click="deletedRelation(scope.row)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="handRelation(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      dataForm: {
        key: '',
        item: ''
      },
      activeIndex2: "1",
      customerData: [],
      personData: [],
      relatonData: [],
      cdatas0: true,
      cdatas: false,
      cdatas2: false,
      showCustomer: true,
      showPerson: false,
      showRelation: false,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 5, // 每页的数据条数
    };
  },
  mounted() {
    this.getData();
  },
  methods: {

    getDataList() {
      var that = this;
      axios.get("http://localhost:10086/sysUser/selectCustomers2", {
        params: {
          key: this.dataForm.key,
          item: this.dataForm.item
        },
      })
        .then((response) => {
          console.log(response);
          console.log("请求成功");
          //因为后台帮助分页，所以后台需要将一些数据传到前端，当然就不止有数据了，例如：数据的总数等等
          that.customerData = response.data;
          //因为每次请求的页数不同，所以采用一个变量代替
        })
    },
    getDataList2() {
      var that = this;
      axios.get("http://localhost:10086/sysUser/selectContactPerson2", {
        params: {
          key: this.dataForm.key,
          item: this.dataForm.item
        },
      })
        .then((response) => {
          console.log(response);
          console.log("请求成功");
          //因为后台帮助分页，所以后台需要将一些数据传到前端，当然就不止有数据了，例如：数据的总数等等
          that.personData = response.data;
          //因为每次请求的页数不同，所以采用一个变量代替
        })
    },
    getDataList3() {
      var that = this;
      axios.get("http://localhost:10086/sysUser/selectRelationShip2", {
        params: {
          key: this.dataForm.key,
          item: this.dataForm.item
        },
      })
        .then((response) => {
          console.log(response);
          console.log("请求成功");
          //因为后台帮助分页，所以后台需要将一些数据传到前端，当然就不止有数据了，例如：数据的总数等等
          that.relatonData = response.data;
          //因为每次请求的页数不同，所以采用一个变量代替
        })
    },
    getData() {
      var that = this;
      axios
        .get("http://localhost:10086/sysUser/selectCustomers", {
          params: {
          },
        })
        .then((response) => {
          console.log(response);
          console.log("请求成功");
          //因为后台帮助分页，所以后台需要将一些数据传到前端，当然就不止有数据了，例如：数据的总数等等
          that.customerData = response.data;
          //因为每次请求的页数不同，所以采用一个变量代替
        })
    },

    getData2() {
      var that = this;
      axios
        .get("http://localhost:10086/sysUser/selectContactPerson", {
          params: {
          },
        })
        .then((response) => {
          console.log(response);
          console.log("请求成功");
          //因为后台帮助分页，所以后台需要将一些数据传到前端，当然就不止有数据了，例如：数据的总数等等
          that.personData = response.data;
          //因为每次请求的页数不同，所以采用一个变量代替
        })
    },

    getData3() {
      var that = this;
      axios
        .get("http://localhost:10086/sysUser/selectRelationShip", {
          params: {
          },
        })
        .then((response) => {
          console.log(response);
          console.log("请求成功");
          //因为后台帮助分页，所以后台需要将一些数据传到前端，当然就不止有数据了，例如：数据的总数等等
          that.relatonData = response.data;
          //因为每次请求的页数不同，所以采用一个变量代替
        })
    },
    showCustomer2() {
      this.customerData = [],
        this.personData = [],
        this.relatonData = [],
        this.showCustomer = true
      this.showPerson = false
      this.showRelation = false
      this.cdatas0 = true
      this.cdatas = false
      this.cdatas2 = false
      this.getData()
    },
    showPerson2() {
      this.customerData = [],
        this.personData = [],
        this.relatonData = [],
        this.showCustomer = false
      this.showPerson = true
      this.showRelation = false
      this.cdatas0 = false
      this.cdatas = true
      this.cdatas2 = false
      this.getData2()
    },
    showRelation2() {
      this.relatonData = [],
        this.showCustomer = false
      this.showPerson = false
      this.showRelation = true
      this.cdatas0 = false
      this.cdatas = false
      this.cdatas2 = true
      this.getData3()
    },
    handCustomer(row) {
      this.$router.push({ path: "/editCustomer", query: { userId: row.customerId } });
    },

    handPerson(row) {
      this.$router.push({ path: "/editPerson", query: { userId: row.contactPersonNumber } });
    },
    handRelation(row) {
      this.$router.push({ path: "/editRelation", query: { userId: row.relationshipId } });
    },
    deleted(row) {
      var deleteConfirm = confirm("是否删除");
      if (deleteConfirm) {
        axios({
          method: "post",
          url: "http://localhost:10086/sysUser/delet",
          data: "&userId=" + row.customerId,
        })
          .then((response) => {
            console.log(response);
            this.getData();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    deletedPerson(row) {
      var deleteConfirm = confirm("是否删除");
      if (deleteConfirm) {
        axios({
          method: "post",
          url: "http://localhost:10086/sysUser/deletPerson",
          data: "&userId=" + row.contactPersonNumber,
        })
          .then((response) => {
            console.log(response);
            this.getData2();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    deletedRelation(row) {
      var deleteConfirm = confirm("是否删除");
      if (deleteConfirm) {
        axios({
          method: "post",
          url: "http://localhost:10086/sysUser/deletRelation",
          data: "&userId=" + row.relationshipId,
        })
          .then((response) => {
            console.log(response);
            this.getData3();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = 5;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getData(val);
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  border-collapse: collapse;
}

td,
th {
  border: 1px solid #000;
}
</style>
