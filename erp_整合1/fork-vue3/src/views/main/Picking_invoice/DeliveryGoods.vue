<template>
  <div class="common-layout">
    <el-container>
      <el-header>Delivery Goods</el-header>
      <el-main class="content">
        <el-row class="row1">
          <el-col :span="4">Search Order Number</el-col>
          <el-col :span="4">
            <el-input v-model="inputOrderNumber" placeholder="please enter" clearable></el-input>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="3">Search Ship-to-party</el-col>
          <el-col :span="4">
            <el-input id="shipParty" v-model="inputShipToParty" placeholder="please enter" clearable></el-input>
          </el-col>
        </el-row>
        <el-row class="row1">
          <el-col :span="3">Search Order Time</el-col>
          <el-col :span="2">
            <el-button @click="load">Search</el-button>
          </el-col>
        </el-row>

        <el-table :data="OrderSearchList" style="width: 1400px" class="eltable1">
          <el-table-column prop="orderId" label="orderId" width="150">
          </el-table-column>
          <el-table-column prop="shipToParty" label="shipToParty" width="150">
          </el-table-column>
          <el-table-column prop="soldToParty" label="soldToParty" width="150">
          </el-table-column>
          <el-table-column prop="reqDelivDate" label="reqDelivDate" width="150">
          </el-table-column>
          <el-table-column prop="netValue" label="netValue" width="150">
          </el-table-column>
          <el-table-column prop="currency" label="currency" width="150">
          </el-table-column>
          <el-table-column prop="status" label="status" width="150">
          </el-table-column>
          <el-table-column fixed="right" label="operation" width="100">
            <template #default="scope">
              <el-button @click="CreateDelivery(scope.row)" type="text" size="small">
                Create Delivery
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div style="padding: 10px 0">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
            :page-sizes="[2, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-main>
    </el-container>
  </div>
  <div>
    <el-dialog :model-value="dialogVisible" title="Confirm Delivery" width="30%" :append-to-body="true" v-if="true">
      <span>Are you sure to deliver {{ OrderNumber }} order(s)?</span>
      <template #footer>
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios"

let dialogVisible = ref(false);
export default {
  data() {
    return {
      time: [new Date(2000, 10, 10), new Date(2050, 12, 12)],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      dialogVisible: false, //data里面也要return一下，不然dialog不显示
      OrderNumber: 0,
      inputOrderNumber: "",
      inputShipToParty: "",
      OrderSearchList: [],
    };
  },
  beforeMount() {
    this.load();
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.load();
    },

    load() {
      axios({
        url: "/g2/order/page",
        method: 'GET',
        params: {
          orderId: this.inputOrderNumber,
          shipToParty: this.inputShipToParty,
          start: this.time === null ? new Date(2000, 10, 10) : this.time[0],
          end: this.time === null ? new Date(2050, 12, 12) : this.time[1],
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.OrderSearchList = res.data.data.records;
        this.total = res.data.data.total;
      });
    },

    CreateDelivery(row) {
      axios.post("/g2/delivery/create", row).then(() => {
        axios
          .get("/g2/delivery/specific", {
            params: {
              orderId: row.orderId,
            },
          })
          .then((res) => {
            this.$message.success("successfully create delivery");
            this.$notify({
              title: "deliveryId: ",
              message: res.data.data.deliveryId,
              duration: 0,
            });
            this.load();
          });
      });
    },

    handleSelectionChange: function (change) {
      this.SelectOrder = change;
    },
    //确认Order的弹窗
    CheckOrder: function () {
      this.dialogVisible = true;
      this.OrderNumber = this.SelectOrder.length;
    },
  },
};
</script>
