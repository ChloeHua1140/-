<template>
  <div>
    <el-card>
      <span>
        Sales Document Item:
      </span>
      <el-row><el-col :span="18">
          <el-form :model="form" ref="form">
            <!--    这里查询material，details表格-->
            <el-form-item label="Material" prop="materialId"><el-input v-model="form.materialId"
                disabled></el-input></el-form-item>
            <el-form-item label="quantity" prop="quantity"><el-input v-model="form.quantity"
                disabled></el-input></el-form-item>
            <!--    这里的net value为总和-->
            <el-row><el-row :span="20">
                <el-form-item label="Net value" prop="netValue"><el-input v-model="tofix"></el-input>
                </el-form-item></el-row>
              <el-col :span="4">
                <el-form-item><el-input></el-input></el-form-item></el-col>
            </el-row>
            <el-form-item label="Expected order possibility" v-if="this.from_type !== '3'" prop="expectedProbability">
              <el-input v-model="form.expectedProbability"><template #append>%</template></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4" style="margin-left: 20px">
          <el-form :model="form1" ref="form1">
            <el-form-item prop="price" label="Unit_value"><el-input
                v-model="form1.price"></el-input></el-form-item></el-form></el-col>
      </el-row>
    </el-card>
    <div>
      <el-card>
        <span>
          Pricing Elements
        </span>
        <el-button @click="addRow" icon="Plus"></el-button>
        <!--      表格中查询并存储discount和detail表格中的数据-->
        <el-table :data="discountData">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="Type" prop="discountType">
            <template #default="scope">
              <el-input v-model="scope.row.discountType">
                <template #append><el-button @click="chooseDiscount(scope.$index)"
                    icon="Connection"></el-button></template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="Amount" prop="num">
            <template #default="scope">
              <el-input v-model="scope.row.num" @change="calculate(scope.$index)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="Crcy." prop="currency" width="80"><template #default="scope">{{ scope.row.discountType
            === 'RA00' ? '%' : 'USD' }}</template> </el-table-column>
          <el-table-column label="per" width="70"><span>1</span>
          </el-table-column>
          <el-table-column label="Total Value" prop="discountAll">
            <template #default="scope"><span>{{ scope.row.discountAll }}</span></template>
          </el-table-column>
          <el-table-column label="Curr." prop="currency" width="80"><span>USD</span> </el-table-column>
          <el-table-column fixed="right"><template #default="scope">
              <el-button icon="Check" @click="checkDiscount(scope.row)">Save</el-button>
              <el-button icon="Delete" @click="deleteDiscount(scope.row)">Delete</el-button>
            </template></el-table-column>
        </el-table>
      </el-card>
      <el-button @click="submit" style="float: right">Confirm</el-button>
      <el-button @click="cancel" style="float: right">Go Back</el-button>
    </div>
  </div>
  <el-dialog :title="editDialog.title" v-model="editDialog.show" v-if="editDialog.show" width="70%">
    <el-table :data="gridData" @row-click="handleclick">
      <el-table-column width="50">
        <template #default="scope">
          <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column property="discount_type" label="Discount type" width="150" />
      <el-table-column property="description" label="Description" width="200" />
    </el-table>
    <el-button style="float: right" @click="confirm_type"> OK </el-button>
  </el-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "price",
  data() {
    return {
      module: '/api2',
      editDialog: {
        title: 'Choose discount type',
        show: false,
        id: null,
      },
      totalValue: 0,
      materialDiscount: 0,
      form: {},
      form1: {},
      detail_id: '',
      radio: '',
      radioSelect: null,
      discount: '',
      from_type: '',
      temp_value: '',
      material: '',
      tofix: '',
      MaterialData: [],
      discountData: [],
      gridData: [
        {
          discount_type: 'K004',
          description: 'material discount',
        },
        {
          discount_type: 'K007',
          description: 'Customer Discount',
        },
        {
          discount_type: 'RA00',
          description: '% from net value',
        },
        {
          discount_type: 'RA01',
          description: '% from gross value',
        },],
      editProp: ['amount', 'discount_type'],
      // 保存进入编辑的cell
      clickCellMap: {},

    }
  },
  created() {
    //this.material = this.$route.query.id;
    this.detail_id = this.$route.query.detail
    this.getDetail();
    if (this.$route.query.type === '3') {
      this.from_type = '3';
    }
  },
  beforeRouteLeave(to, from, next) {
    let path = to.path
    console.log(path)
    to.meta.keepAlive = true;
    next();
  },
  methods: {
    getDetail() {
      //这个函数用来多表联查，查询detail表格和material表格获取表单,需要根据上一页传输的detail id来进行获取
      let needId = parseInt(this.detail_id)
      var that = this;
      axios
        .get(this.module + '/details/getDetailsById', {
          params: {
            id: needId
          },
        })
        .then((response) => {
          console.log("查找detail成功");
          console.log(response.data)
          that.form = response.data.data
          that.tofix = (that.form.netValue).toFixed(2)
          this.getMaterial(); this.getDiscount();
        })
    },
    getMaterial() {
      let needId = parseInt(this.form.materialId)
      var that = this;
      axios
        .get(this.module + '/material/getMaterialById', {
          params: {
            id: needId
          },
        })
        .then((response) => {
          console.log("查找material成功");
          console.log(response.data)
          that.form1 = response.data.data
        })
    },
    getDiscount() {
      let needId = parseInt(this.detail_id)
      var that = this;
      axios
        .get(this.module + '/discountRules/getDiscountRulesByDetailId', {
          params: {
            detailId: needId
          },
        })
        .then((response) => {
          console.log("查找discount成功");
          console.log(response.data)
          that.discountData = response.data.data
          //that.totalValue=that.discountData.discountAll
        })
    },
    submit() {
      //这个函数用来提交最后的数据增加
      var that = this;
      axios
        .get(this.module + '/details/saveDetailsInitial', {
          params: {
            ...this.form
          },
        })
        .then((response) => {
          console.log("修改售卖可能性成功");
          console.log(response.data)
          this.$message({ type: 'success', message: 'Detail successfully saved!' })
          this.getDetail()
        })

    },
    cancel() {
      this.$router.back();
    },
    handleclick(row) {
      this.temp_value = row.discount_type;
    },
    chooseDiscount(value) {
      this.editDialog.show = true;
      this.editDialog.id = value;
    },
    calculate(id) {
      //验证优惠力度规则
      let discount = this.discountData[id].num; let price = this.form1.price;
      if (this.discountData[id].discountType === 'K004') {
        if (discount > price)//优惠价格大于总价
        { this.$message({ type: 'warning', message: 'Discounted price  greater than total price' }) }
      }
      if (this.discountData[id].discountType === 'RA00') {
        if (discount > 100 || discount < 0)//优惠价格大于总价
        { this.$message({ type: 'warning', message: 'Illegal Discount' }) }
      }
    },
    confirm_type() {
      let index = this.editDialog.id;
      if (this.checkType(this.temp_value) === true) {
        this.discountData[index].discountType = this.temp_value
      }
      else this.discountData.splice(this.discountData.length - 1, 1);
      this.radio = null;
      this.radioSelect = null;
      this.editDialog.show = false;
    },
    checkType(value) {
      //函数用来进行折扣类型的选择限制
      let i = 0; let mark = 0;
      if (this.discountData.length > 0) {
        for (i = 0; i < this.discountData.length; i++) {
          if (this.discountData[i].discountType === value) {
            mark = 1;
          }
        }
        if (mark === 1) {
          this.$message({
            type: 'warning',
            message: 'Duplicate discount type, please modify num directly'
          }); return false
        } else return true
      }
    },
    deleteDiscount(row) {
      this.$confirm('Are you sure to delete this discount?', 'Tip', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        axios
          .get(this.module + '/discountRules/deleteDiscountRules', {
            params: {
              discountId: row.discountId,
            }
          })
          .then((response) => {
            console.log("删除指定折扣成功");
            console.log(response.data); this.getDetail();
          })
          .catch((error) => {
            console.log(error);
          })
      }).catch((error) => {
        this.$message({
          type: 'info',
          message: error === 'cancel' ? 'Cancel' : error
        });
      })
    },
    checkDiscount(row) {
      if (row.discountId) {
        axios
          .get(this.module + '/discountRules/saveDiscountRulesByDetailId', {
            params: {
              discountType: row.discountType,
              num: row.num,
              discountId: row.discountId,
              detailId: this.detail_id,
            }
          })
          .then((response) => {
            console.log("修改折扣成功");
            console.log(response.data);
            this.$message({ type: 'success', message: 'Discount successfully saved!' })
            this.getDetail();
          })
          .catch((error) => {
            console.log(error);
          })
      }
      else {
        axios
          .get(this.module + '/discountRules/saveDiscountRulesByDetailId', {
            params: {
              discountType: row.discountType,
              num: row.num,
              detailId: this.detail_id,
            }
          })
          .then((response) => {
            console.log("保存折扣成功");
            console.log(response.data);
            this.$message({ type: 'success', message: 'Discount successfully saved!' })
            this.getDetail();
          })
          .catch((error) => {
            console.log(error);
          })
      }
    },
    addRow() {
      const circle = this.discountData[0]; //取出数组中第一个对象
      if (circle) {
        const newObj = {};
        for (let key in circle) { //把第一个对象的属性都赋值给新对象newObj  然后每个属性的值都设置为空；
          newObj[key] = '';
        }
        this.discountData.splice(this.discountData.length, 0, newObj);
      }
      else {
        const newItem = {};
        this.discountData.splice(0, 0, newItem);
      }
    },
  },

}
</script>

<style scoped></style>