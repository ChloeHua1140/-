<template>
  <div class="common-layout">
    <el-container>
      <el-header>Display Inventory</el-header>
      <el-main class="content">
        <el-row class="row1">
          <el-col :span="3">Search Material</el-col>
          <el-col :span="3">
            <el-input v-model="inputMaterial" placeholder="please enter" clearable></el-input>
          </el-col>

          <div class="flex">
            <!--用弹窗table来找material的botton-->
            <el-button type="info" @click="clickDialog"/>
            <el-dialog title="Double Click to Chose Material"
                       :model-value="dialogVisible"
                       width="40%"
                       height="250"
                       :append-to-body="true"
                       v-if="true"
                       @close="dialogVisible=false">

              <el-table :data="materialData"
                        @row-dblclick="searchMaterialRow">
                <el-table-column property="materialId" label="Material ID" width="150"/>
                <el-table-column property="name" label="Material Name" width="400"/>
                <el-table-column property="price" label="Material Price" width="400"/>
                <el-table-column property="netWeight" label="Net Weight" width="400"/>
                <el-table-column property="grossWeight" label="Gross Weight" width="400"/>

              </el-table>
            </el-dialog>
          </div>

          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="2">Search Plant</el-col>
          <el-col :span="3">
            <el-input v-model="inputPlant" placeholder="please enter" clearable></el-input>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="3">Storage Location</el-col>
          <el-col :span="3">
            <el-input v-model="inputStorage" placeholder="please enter" clearable></el-input>
          </el-col>
          <el-button type="primary" @click="clickSearchMaterial">Search Inventory</el-button>
        </el-row>
        <el-table
            :data="MateriaNewlList"
            style="width:1400px"
            class="eltable1">
          <el-table-column
              prop="materialId"
              label="Material ID"
              width="150">
          </el-table-column>
          <el-table-column
              prop="materialName"
              label="Material Name"
              width="200">
          </el-table-column>
          <el-table-column
              prop="storageLocation"
              label="Storage Location"
              width="200">
          </el-table-column>
          <el-table-column
              prop="unrestrictedUseStock"
              label="UnrestrictedUseStock"
              width="150">
          </el-table-column>
          <el-table-column
              prop="reservedStock"
              label="Reserved Stock"
              width="150">
          </el-table-column>
          <el-table-column
              prop="onOrderStock"
              label="On-Order Stock"
              width="150">
          </el-table-column>
          <el-table-column
              prop="plantId"
              label="Plant ID"
              width="150">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  // name: "demo2",
  data() {
    return {
      //三个input的值，输入完后点击按钮即可发送请求
      inputMaterial: '',
      inputPlant: '',
      inputStorage: '',
      //查询过后读取到的material的数据
      MateriaNewlList: [],
      //控制搜索material的编号
      dialogVisible: false,
      //用于查找对应的material的
      materialData: []
    }
  },
  methods: {

    //根据查询条件，连接接口二
    loadInventory() {
      axios
          .post("/g2/operates/stock/query", {
            plantId: this.inputPlant,
            storageLocation: this.inputStorage,
            materialId: this.inputMaterial,
          })
          .then((res) => {
            this.MateriaNewlList = res.data.data;
          });
    },

    //在打开的dialog里面，展示全部的material
    loadMaterial() {
      axios
          .get("/g2/operates/material/all", {})
          .then((res) => {
            this.materialData = res.data.data;
          });
    },

    //不知道material的ID，要查material的Id
    clickDialog: function () {
      this.dialogVisible = true
      this.loadMaterial()
    },

    //输入完查询条件后，点击开始查询
    clickSearchMaterial: function () {
      this.loadInventory()
    },


    //弹窗选择出来material后，查询这个material
    searchMaterialRow: function (row) {
      this.dialogVisible = false
      this.inputMaterial = row.materialId
      this.loadInventory()
    },
  },


}
</script>




