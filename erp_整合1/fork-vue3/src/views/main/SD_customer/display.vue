<template>
  <div class="app-container">
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
        <template #default="scope">
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
        <template #default="scope">
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
        <template #default="scope">
          <el-button @click="deletedRelation(scope.row)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="handRelation(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const dataForm = reactive({
      key: '',
      item: ''
    });
    const route = useRoute()
    const router = useRouter()
    const customerData = ref([]);
    const personData = ref([]);
    const relatonData = ref([]);
    const showCustomer = ref(true);
    const showPerson = ref(false);
    const showRelation = ref(false);
    const currentPage = ref(1);
    const total = ref(20);
    const pageSize = ref(5);
    const cdatas0 = ref(true);
    const cdatas = ref(false);
    const cdatas2 = ref(false);
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:10086/sysUser/selectCustomers");
        customerData.value = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    function getDataList() {
      axios.get("http://localhost:10086/sysUser/selectCustomers2", {
        params: {
          key: dataForm.key,
          item: dataForm.item
        },
      })
        .then((response) => {
          console.log(response);
          console.log("请求成功");
          //因为后台帮助分页，所以后台需要将一些数据传到前端，当然就不止有数据了，例如：数据的总数等等
          customerData.value = response.data;
          //因为每次请求的页数不同，所以采用一个变量代替
        })
    }
    function getDataList2() {
      axios.get("http://localhost:10086/sysUser/selectContactPerson2", {
        params: {
          key: dataForm.key,
          item: dataForm.item
        },
      })
        .then((response) => {
          console.log(response);
          console.log("请求成功");
          //因为后台帮助分页，所以后台需要将一些数据传到前端，当然就不止有数据了，例如：数据的总数等等
          personData.value = response.data;
          //因为每次请求的页数不同，所以采用一个变量代替
        })
    }
    function getDataList3() {
      axios.get("http://localhost:10086/sysUser/selectRelationShip2", {
        params: {
          key: dataForm.key,
          item: dataForm.item
        },
      })
        .then((response) => {
          console.log(response);
          console.log("请求成功");
          //因为后台帮助分页，所以后台需要将一些数据传到前端，当然就不止有数据了，例如：数据的总数等等
          relatonData.value = response.data;
          //因为每次请求的页数不同，所以采用一个变量代替
        })
    }

    const handleSizeChange = (val) => {
      currentPage.value = 1;
      pageSize.value = val;
      getData();
    };

    const handleCurrentChange = (val) => {
      currentPage.value = val;
      getData();
    };

    onMounted(() => {
      getData();
    });

    watch(() => route.query.type, (val) => {
      if (val == 1) {
        showCustomer2();
      } else if (val == 2) {
        showPerson2();
      } else if (val == 3) {
        showRelation2();
      }
    }, { immediate: true });

    function getData2() {
      axios
        .get("http://localhost:10086/sysUser/selectContactPerson", {
          params: {
          },
        })
        .then((response) => {
          console.log(response);
          console.log("请求成功");
          //因为后台帮助分页，所以后台需要将一些数据传到前端，当然就不止有数据了，例如：数据的总数等等
          personData.value = response.data;
          //因为每次请求的页数不同，所以采用一个变量代替
        })
    }

    function getData3() {
      axios
        .get("http://localhost:10086/sysUser/selectRelationShip", {
          params: {
          },
        })
        .then((response) => {
          console.log(response);
          console.log("请求成功");
          //因为后台帮助分页，所以后台需要将一些数据传到前端，当然就不止有数据了，例如：数据的总数等等
          relatonData.value = response.data;
          //因为每次请求的页数不同，所以采用一个变量代替
        })
    }
    function showCustomer2() {
      customerData.value = []
      personData.value = []
      relatonData.value = []
      showCustomer.value = true
      showPerson.value = false
      showRelation.value = false
      cdatas0.value = true
      cdatas.value = false
      cdatas2.value = false
      getData()
    }
    function showPerson2() {
      customerData.value = []
      personData.value = []
      relatonData.value = []
      showCustomer.value = false
      showPerson.value = true
      showRelation.value = false
      cdatas0.value = false
      cdatas.value = true
      cdatas2.value = false
      getData2()
    }
    function showRelation2() {
      relatonData.value = []
      showCustomer.value = false
      showPerson.value = false
      showRelation.value = true
      cdatas0.value = false
      cdatas.value = false
      cdatas2.value = true
      getData3()
    }

    function handCustomer(row) {
      router.push({ path: "/editCustomer", query: { userId: row.customerId } });
    }
    function handPerson(row) {
      router.push({ path: "/editPerson", query: { userId: row.contactPersonNumber } });
    }
    function handRelation(row) {
      router.push({ path: "/editRelation", query: { userId: row.relationshipId } });
    }

    function deleted(row) {
      var deleteConfirm = confirm("是否删除");
      if (deleteConfirm) {
        axios({
          method: "post",
          url: "http://localhost:10086/sysUser/delet",
          data: "&userId=" + row.customerId,
        })
          .then((response) => {
            console.log(response);
            getData();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    function deletedPerson(row) {
      var deleteConfirm = confirm("是否删除");
      if (deleteConfirm) {
        axios({
          method: "post",
          url: "http://localhost:10086/sysUser/deletPerson",
          data: "&userId=" + row.contactPersonNumber,
        })
          .then((response) => {
            console.log(response);
            getData2();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    function deletedRelation(row) {
      var deleteConfirm = confirm("是否删除");
      if (deleteConfirm) {
        axios({
          method: "post",
          url: "http://localhost:10086/sysUser/deletRelation",
          data: "&userId=" + row.relationshipId,
        })
          .then((response) => {
            console.log(response);
            getData3();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    return {
      dataForm,
      customerData,
      personData,
      relatonData,
      showCustomer,
      showPerson,
      showRelation,
      currentPage,
      total,
      pageSize,
      cdatas0,
      cdatas,
      cdatas2,
      getData,
      getDataList,
      getDataList2,
      getDataList3,
      handleSizeChange,
      handleCurrentChange,
      handCustomer,
      handPerson,
      handRelation,
      deleted,
      deletedPerson,
      deletedRelation,
      // ... other methods like deleted, handCustomer, etc.
    };
  }
};

</script>

<style scoped>
table {
  border-collapse: collapse;
}

td,
th {
  border: 1px solid #000;
}
</style>
