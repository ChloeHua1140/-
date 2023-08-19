<template>
  <div class="common-layout">
    <el-container>
      <el-header>picking the orders</el-header>
      <el-main class="content">
        <el-row class="row1">
          <el-col :span="4">Search Delivery Number</el-col>
          <el-col :span="4">
            <el-input v-model="inputDeliveryNumber" placeholder="please enter" clearable></el-input>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="3">Search Ship-to-party</el-col>
          <el-col :span="4">
            <el-input id="shipParty" v-model="inputShipToParty" placeholder="please enter" clearable></el-input>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="2">
            <el-button @click="load">Search</el-button>
          </el-col>
        </el-row>

        <!-- <el-row class="row1">
          <el-col :span="4">Choose Pick Status</el-col>
          <el-col :span="4">
            <el-select v-model="pickStatus" placeholder="please select">
              <el-option
                v-for="item in pickOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">Choose GI Status</el-col>
          <el-col :span="4">
            <el-select v-model="giStatus" placeholder="please select">
              <el-option
                v-for="item in giOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          
        </el-row> -->

        <el-table :data="DeliverySearchList" style="width: 1400px" class="eltable1">
          <el-table-column prop="deliveryId" label="deliveryId" width="150">
          </el-table-column>
          <el-table-column prop="shipToParty" label="shipToParty" width="150">
          </el-table-column>
          <el-table-column prop="priority" label="priority" width="150">
          </el-table-column>
          <el-table-column prop="pickingStatus" label="pickingStatus" width="150">
          </el-table-column>
          <el-table-column prop="netWeight" label="netWeight" width="150">
          </el-table-column>
          <el-table-column prop="grossWeight" label="grossWeight" width="150">
          </el-table-column>
          <el-table-column prop="deliveryDate" label="deliveryDate" width="150">
          </el-table-column>
          <el-table-column prop="plannedGiDate" label="plannedGiDate" width="150">
          </el-table-column>
          <el-table-column prop="pickingDate" label="pickingDate" width="150">
          </el-table-column>
          <el-table-column prop="giStatus" label="giStatus" width="150">
          </el-table-column>
          <el-table-column prop="orderId" label="orderId" width="150">
          </el-table-column>
          <el-table-column fixed="right" label="operation" width="300">
            <template #default="scope">
              <!--edit的触发button，上面不用写slot-scope="scope"或者v-slot=“scope”，直接#default="scope"-->
              <el-button link type="primary" @click="showItemDialog(scope.$index, scope.row)">Detail</el-button>

              <el-button link type="primary" @click.prevent="ShipDelivery(scope.$index, scope.row)"
                :disabled="shippingDeliveryDisable(scope.row)">Ship</el-button>
              <el-button link type="primary" @click.prevent="deleteRow(scope.$index, scope.row)"
                :disabled="deleteDeliveryDisable(scope.row)">Remove</el-button>
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

    <div>
      <!--点击detail后显示出来的，展示item的dialog-->
      <el-dialog :model-value="itemDialogVisible" title="Picking Items" width="80%" :append-to-body="true" v-if="true"
        @close="itemDialogVisible = false">
        <!--显示出来的items的数据-->
        <el-table :data="ItemSearchList" style="width: 1400px" class="eltable1">
          <el-table-column prop="deliveryId" label="deliveryId" width="180"></el-table-column>
          <el-table-column prop="deliveryItemId" label="Item" width="180">
          </el-table-column>
          <el-table-column prop="materialId" label="Material Id" width="150">
          </el-table-column>
          <el-table-column prop="name" label="Item Name" width="180">
          </el-table-column>
          <el-table-column prop="pickingStatus" label="pickingStatus" width="180">
          </el-table-column>
          <el-table-column prop="pickingQuantity" label="pickingQuantity" width="180">
          </el-table-column>
          <el-table-column prop="plantId" label="plantId" width="180">
          </el-table-column>
          <el-table-column prop="originalDeliveryQuantity" label="Original Delivery Quantity" width="180">
          </el-table-column>
          <el-table-column fixed="right" label="operation" width="200">
            <template #default="scope">
              <!--edit的触发button，上面不用写slot-scope="scope"或者v-slot=“scope”，直接#default="scope"-->
              <el-button link type="primary" @click="pickItem(scope.$index, scope.row)"
                :disabled="pickingItemDisable()">Pick Item</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button link type="primary" @click.prevent="PickDelivery()" :disabled="pickingItemDeliveryDisable()">Pick
          Delivery</el-button>
      </el-dialog>
    </div>

    <div>
      <!--要给item进行pick的dialog-->
      <el-dialog :model-value="pickingItemDialogVisible" title="Picking" width="40%" :append-to-body="true" v-if="true"
        @close="pickingItemDialogVisible = false">
        <!-- <el-form :model="form" :rules="rules" ref="ruleFormRef"> -->
        <el-form :model="form">
          <el-form-item label="Item Id" width="80px">
            <el-input class="dialog_input" v-model="form.deliveryItemId" disabled></el-input>
          </el-form-item>
          <el-form-item label="Original Delivery Quantity" width="80px">
            <el-input class="dialog_input" v-model="form.originalDeliveryQuantity" disabled></el-input>
          </el-form-item>
          <el-form-item label="plantId" width="80px" prop="plant">
            <el-input v-model="form.plantId"></el-input>
          </el-form-item>
          <el-form-item label="pickingQuantity" width="80px" prop="quantity">
            <el-input v-model="form.pickingQuantity"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button type="success" @click="clickPick">Pick</el-button>
          <el-button @click="clickCancel">Cancel</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      //筛选条件
      inputDeliveryNumber: "",
      inputShipToParty: "",
      pickStatus: "",
      giStatus: "",
      total: 0,
      pageNum: 1,
      pageSize: 10,

      //给item做pick时显示的内容
      form: {},

      //pick的item原来的plant和quantity
      quantityOriginal: "",
      plantIdOriginal: "",

      //两个dialog的显示控制
      pickingItemDialogVisible: false,
      itemDialogVisible: false,

      //pick之前进行一下表单校验
      rules: {
        plant: [
          {
            required: true,
            message: "please enter the plant number",
            trigger: "blur",
          },
        ],
        quantity: [
          {
            required: true,
            message: "please enter the picking quantity",
            trigger: "blur",
          },
        ],
      },

      pickOptions: [
        {
          value: true,
          label: "already picked",
        },
        {
          value: false,
          label: "not yet picked",
        },
      ],
      giOptions: [
        {
          value: true,
          label: "GI posted",
        },
        {
          value: false,
          label: "not yet posted",
        },
      ],

      //显示在table页面上面的Delivery内容
      DeliverySearchList: [],
      //显示在item的dialog里面的，某个Delivery Number对应的item
      ItemSearchList: [],

      //点击detail后，detail那一行对应的Delivery
      currentDelivery: {},

      //点击detail后，detail那一行对应的DeliveryNumber，用于给后端查询对应的item
      detailDeliveryNumber: "",
      //点击Delivery对应的pick过后，pick那一行对应的DeliveryNumber，用于给后端修改这个Delivery的Status
      pickDeliveryNumber: "",
      //点击Delivery对应的ship过后，ship那一行对应的DeliveryNumber，用于给后端修改这个Delivery的Status
      shipDeliveryNumber: "",
      //点击Delivery对应的remove过后，remove那一行对应的DeliveryNumber，用于给后端删除这个Delivery
      removeDeliveryNumber: "",
    };
  },

  //一开始就会显示出所有Delivery Number
  beforeMount() {
    this.load();
  },

  methods: {
    //和显示Delivery相关的load
    load() {
      axios
        .get("/g2/delivery/page", {
          params: {
            deliveryId: this.inputDeliveryNumber,
            shipToParty: this.inputShipToParty,
            giStatus: this.giStatus,
            pickingStatus: this.pickStatus,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          },
        })
        .then((res) => {
          this.DeliverySearchList = res.data.data.records;
          this.total = res.data.data.total;
          this.deleteDeliveryDisable(); //检查Delivery是否可以被remove
          this.shippingDeliveryDisable(); //检查Delivery是否可以被ship，（被GI）
        });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.load();
    },

    //显示Delivery的items，对应的load方法
    loadDeliveryItemList() {
      axios
        .get("/g2/deliveryitem/list", {
          params: {
            deliveryId: this.detailDeliveryNumber,
          },
        })
        .then((res) => {
          this.ItemSearchList = res.data.data;
        });
    },
    //已经输入了对应的plant和quantity，post给后端
    postPlantAndQuantity() {
      axios
        .get("/g2/deliveryitem/pickitem", {
          params: {
            deliveryItemId: this.form.deliveryItemId,
            quantityOriginal: this.quantityOriginal,
            plantIdOriginal: this.plantIdOriginal,
            quantityUpdated: this.form.pickingQuantity,
            plantIdUpdated: this.form.plantId,
          },
        })
        .then((res) => {
          this.loadDeliveryItemList();
        });
    },

    //对Delivery Number进行的全部pick或者delete
    postPickToDelivery() {
      axios
        .get("/g2/delivery/pickcomplete", {
          params: {
            deliveryId: this.pickDeliveryNumber,
          },
        })
        .then((res) => {
          this.$message({
            type: "success",
            message: "successfully pick!",
          });
          this.load();
        });
    },

    postShipToDelivery() {
      axios
        .get("/g2/delivery/postgi", {
          params: {
            deliveryId: this.shipDeliveryNumber,
          },
        })
        .then((res) => {
          this.load();
        });
    },

    postDeleteToDelivery() {
      axios
        .get("/g2/delivery/delete", {
          params: {
            deliveryId: this.removeDeliveryNumber,
          },
        })
        .then((res) => {
          this.load();
        });
    },

    //展开dialog，查看详情，可以给发货单子pick和ship，改变这些货物的Status
    showItemDialog: function (index, row) {
      this.currentDelivery = row;
      this.detailDeliveryNumber = row.deliveryId;
      this.loadDeliveryItemList();
      this.itemDialogVisible = true;
    },
    pickItem: function (index, row) {
      //展开pick那些item的dialog
      this.form = row; //选中了哪一行要pick的item
      this.pickingItemDialogVisible = true;
      this.quantityOriginal = this.form.pickingQuantity;
      this.plantIdOriginal = this.form.plantId;
    },
    //click pick之前检查一下表单有没有输入plant和quantity
    clickPick: function () {
      // console.log("form:", this.form);
      // this.$refs["ruleFormRef"].validate((valid) => {
      //   console.log("valid:", valid);
      //   if (valid) {
      this.postPlantAndQuantity(); //plant和quantity都输入了，才post给后端
      this.pickingItemDialogVisible = false;
      //   } else {
      //     console.log("error");
      //   }
      // });
    },
    clickCancel: function () {
      this.pickingItemDialogVisible = false;
      this.loadDeliveryItemList();
    },

    pickingItemDisable: function () {
      return this.currentDelivery.pickingStatus;
    },

    pickingItemDeliveryDisable: function () {
      if (this.currentDelivery.pickingStatus) return true;
      //遍历ItemSearchList看是否都被pick了
      for (var i = 0; i < this.ItemSearchList.length; i++) {
        if (!this.ItemSearchList[i].pickingStatus) {
          //如果有picking Status还是false的话，就不能pickDelivery
          return true;
        } else {
          return false;
        }
      }
    },

    //delivery对应的ship是否可以点击
    shippingDeliveryDisable: function (row) {
      if (!row?.giStatus && row?.pickingStatus) {
        //还没GI，但是已经pick了，可以进行ship
        return false;
      } else {
        return true;
      }
    },

    //delivery对应的remove是否可以点击
    deleteDeliveryDisable: function (row) {
      if (!row?.giStatus) {
        //只能删除尚未GI的Delivery
        return false; //如果还没GI，就可以点击这个remove按钮
      } else {
        return true;
      }
    },

    //item已经pick完毕，对Delivery进行pick
    PickDelivery: function () {
      this.pickDeliveryNumber = this.detailDeliveryNumber;
      this.postPickToDelivery();
      this.load();
    },
    //Delivery已经pick了，对Delivery进行ship
    ShipDelivery: function (index, row) {
      this.shipDeliveryNumber = row.deliveryId;
      this.postShipToDelivery();
      this.load();
    },

    //删除某一行的delivery
    deleteRow: function (index, row) {
      this.$confirm(
        "This operation will delete the file permanently. Do you want to continue?",
        "tip",
        {
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          type: "warning",
        }
      )
        .then(() => {
          this.removeDeliveryNumber = row.deliveryId;
          this.postDeleteToDelivery();
          this.$message({
            type: "success",
            message: "successfully delete!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Already undeleted.",
          });
        });
    },
  },
};
</script>
