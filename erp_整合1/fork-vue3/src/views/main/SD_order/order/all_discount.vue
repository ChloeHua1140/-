<template>
  <div>
    <el-card style="width: 88%;margin-left: 6%;margin-top: 20px">
  <span>
    Manage All Item:
  </span>
      <el-form>
        <!--    这里查询details,加总所有的Net_value数据-->
        <el-row><el-row :span="20">
          <el-form-item label="Net value" prop="netValue"><el-input v-model="form.netValue" disabled></el-input></el-form-item></el-row>
          <el-col :span="4"><el-form-item prop="currency"><span style="background-color: #F5F7FA">USD</span></el-form-item></el-col>
        </el-row>
      </el-form>
    </el-card>
    <div>
 <el-card style="width: 88%;margin-left: 6%;margin-top: 20px">
<el-table :data="allDetail" :summary-method="getSummaries" show-summary>
  <el-table-column prop="detailId" label="Item" type="index" width="80"></el-table-column>
  <el-table-column prop="materialId" label="Material" width="100"></el-table-column>
  <el-table-column prop="netValue" label="Net Value" width="120" ><template #default="scope"><span>{{(scope.row.netValue).toFixed(2)}}</span></template></el-table-column>
  <el-table-column prop="quantity" label=" Quantity" width="100" ></el-table-column>
  <el-table-column prop="materialprice" label=" Unit price" width="100" ></el-table-column>
  <el-table-column label="Gross value" prop="gross"><template #default="scope"><span>{{(scope.row.quantity*scope.row.materialprice).toFixed(2)}}</span></template></el-table-column>
  <el-table-column label="Discount" align="center">
    <template #default="scope">
    <el-table :data="allDetail[scope.$index].discountRulesList" show-summary>
      <el-table-column prop="discountType"></el-table-column>
      <el-table-column prop="discountAll"></el-table-column>
    </el-table></template>
  </el-table-column>
</el-table>
 </el-card>
      <el-card style="width: 88%;margin-left: 6%;margin-top: 20px">
      <span>
        Pricing Elements
      </span>
        <el-button @click="addRow" icon="Plus"></el-button>
        <!--      表格中查询并存储discount和detail表格中的数据--><el-table :data="discountData" >
        <el-table-column type="index"></el-table-column>
        <el-table-column label="Type" prop="discountType" >
          <template #default="scope">
            <el-input v-model="scope.row.discountType" >
              <template #append><el-button @click="chooseDiscount(scope.$index)" icon="Connection"></el-button></template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column  label="Amount" prop="num">
          <template #default="scope">
            <el-input  v-model="scope.row.num" @change="calculate(scope.$index)"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="Crcy." prop="currency" width="80"><template #default="scope">{{scope.row.discountType==='RA00'?'%':'USD'}}</template> </el-table-column>
        <el-table-column label="per" width="70" disabled></el-table-column>
        <el-table-column label="Curr." prop="currency" width="80"><span>USD</span> </el-table-column>
        <el-table-column fixed="right"><template #default="scope">
          <el-button icon="Check" @click="submit(scope.row)">Save</el-button>
          <el-button icon="Delete" @click="deleteDiscount(scope.row)">Delete</el-button>
        </template></el-table-column>
      </el-table>
      </el-card>
      <el-button @click="cancel" style="float: right">Go Back</el-button>
    </div>
  </div>
  <el-dialog  :title="editDialog.title"
              v-model="editDialog.show"
              v-if="editDialog.show"
              width="70%">
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
  name: "prepare",
  data() {
    return {
      module:'/api2',
      editDialog: {
        title: 'Choose discount type',
        show: false,
        id: null,
      },
      totalValue:0,
      form:{},
      radio: '',
      radioSelect: null,
      discount: '',
      temp_value: '',
      document_id: '',
      allDetail:[],
      MaterialData:[],
      discountData: [],
      gridData: [
        {
          discount_type: 'K004',
          description:'material discount',
        },
        {
          discount_type: 'K007',
          description:'Customer Discount',
        },
        {
          discount_type: 'RA00',
          description:'% from net value',
        },
        {
          discount_type: 'RA01',
          description:'% from gross value',
        },
      ],
      editProp: ['amount', 'discount_type'],
      // 保存进入编辑的cell
      clickCellMap: {},
    }
  },
  created() {
    this.document_id = this.$route.query.id;
   this.chooseType()
  },
  beforeRouteLeave(to, from, next) {
    let path=to.path
    console.log(path)
    to.meta.keepAlive = true; console.log(to.meta.keepAlive)
    next();
    },
  methods: {
    chooseType(){
      if(this.document_id) this.getDocument();
        else {this.getBatch()}
    },
    getDocument(){
      let uri='';let needId=parseInt(this.document_id)
      if(this.$route.query.type==='3')  uri=this.module+'/order/getOrderById'
      else if(this.$route.query.type==='2') uri=this.module+'/quotation/getQuotationById'
      else uri=this.module+'/inquiry/getInquiryById'
      var that=this;
      axios
          .get(uri, {
            params: {
              id:needId
            },
          })
          .then((response) => {
            console.log("获取订单/询价单/报价单成功");
            console.log(response.data);this.getAllDetail()
            that.form=response.data.data
          })
    },
    getRA00(Data){
      let newListData=[]
      console.log(Data)
      if(Data.length!==0){
        Data.filter((item) => {
          if(item.discountType)
          {
          if ((item.discountType).indexOf('RA00') !== -1)
          {
            newListData.push(item);
          }}
        });
        this.discountData=newListData
      }
    },
    getAllDetail(){
        //这个函数根据上一个页面传输的id进行detail的查找
      let uri='';let needId=parseInt(this.document_id); var that=this;
      if(this.$route.query.type==='3')
      {uri=this.module+'/order/getAlDiscountrulesAlDetails'
        axios
            .get(uri, {
              params: {
                orderId:needId
              },
            })
            .then((response) => {
              console.log("查找订单detail成功");
              console.log(response.data)
              that.allDetail=response.data.data.detailDtoList;
             if(response.data.data.detailDtoList.length) this.getRA00(response.data.data.detailDtoList[0].discountRulesList);
            })}
      else if(this.$route.query.type==='2')
      {uri=this.module+'/quotation/getAlDiscountrulesAlDetails';
        axios
            .get(uri, {
              params: {
                quotationId:needId
              },
            })
            .then((response) => {
              console.log("查找报价detail成功");
              console.log(response.data)
              that.allDetail=response.data.data.detailDtoList
              if(response.data.data.detailDtoList.length) this.getRA00(response.data.data.detailDtoList[0].discountRulesList);
            })}
      else
      {uri=this.module+'/inquiry/getAlDiscountrulesAlDetails'
        axios
            .get(uri, {
              params: {
                inquiry:needId
              },
            })
            .then((response) => {
              console.log("查找询价detail成功");
              console.log(response.data)
              that.allDetail=response.data.data.detailDtoList
              if(response.data.data.detailDtoList.length) this.getRA00(response.data.data.detailDtoList[0].discountRulesList);
            })}

      },

    getBatch(){
      var that=this
      let needBatch=this.$route.query.batch;
      //console.log(needBatch)
      axios
          .get(this.module+'/details/getAlDiscountrulesAlDetails', {
            params: {
              batch:needBatch
            },
          })
          .then((response) => {
            console.log("查找batch detail成功");
            console.log(response.data)
            that.allDetail=response.data.data.detailDtoList
            if(response.data.data.detailDtoList.length) this.getRA00(response.data.data.detailDtoList[0].discountRulesList);
            console.log(that.allDetail)
          })
    },
    submit(row){
      //这个函数用来提交最后的数据增加
      if(this.document_id)
      {
        let needId = parseInt(this.document_id)
        if(this.$route.query.type==='2')
        {
          var that = this;
          axios
              .get(this.module + '/details/getDetailByQuotationId', {
                params: {
                  quotationId: needId
                },
              })
              .then((response) => {
                console.log("查找detail成功");
                console.log(response.data)
                that.detailData = response.data.data
                this.saveAllDiscount(response.data.data,row)
                this.$message({type:'success',message:'Discount Successfully added!'})
              })
        }
        else if(this.$route.query.type==='1')
        {
          var that = this;
          axios
              .get(this.module + '/details/getDetailByInquiryId', {
                params: {
                  InquiryId: needId
                },
              })
              .then((response) => {
                console.log("查找detail成功");
                console.log(response.data)
                that.detailData = response.data.data
                this.saveAllDiscount(response.data.data,row)
                this.$message({type:'success',message:'Discount Successfully added!'})
              })
        }
        else{
          var that = this;
          axios
              .get(this.module + '/details/getDetailByOrderId', {
                params: {
                  OrderId: needId
                },
              })
              .then((response) => {
                console.log("查找detail成功");
                console.log(response.data)
                that.detailData = response.data.data
                this.saveAllDiscount(response.data.data,row)
                this.$message({type:'success',message:'Discount Successfully added!'})
              })
        }
      }
      else {
        var that = this;
        let ids = [];
        let needBatch = this.$route.query.batch;
        axios
            .get(this.module + '/details/getAlDetailsByBatch', {
              params: {
                batch: needBatch
              },
            })
            .then((response) => {
              console.log("查找batch detail成功");
              console.log(response.data.data.length)
              this.saveAllDiscount(response.data.data,row)
              this.$message({type:'success',message:'Discount Successfully added!'})
            })
      }
    },
    saveAllDiscount(Data,row)
    {
      let i = 0;
      for (i = 0; i < Data.length; i++) {
        axios
            .get(this.module + '/discountRules/saveDiscountRulesByDetailId', {
              params: {
                detailId: Data[i].detailId,
                discountType: row.discountType,
                num: row.num
              },
            })
            .then((response) => {
              console.log("添加总价折扣成功");
              console.log(response.data)
            })
      }
    },
    cancel(){
      this.$router.back();
    },
    handleclick(row) {
      this.temp_value = row.discount_type;
    },
    chooseDiscount(value){
      this.editDialog.show=true;
      this.editDialog.id=value;
    },
    calculate(id){
      //计算表格中的优惠价格，验证优惠力度规则，填充货币单位
      let discount=this.discountData[id].num
      if(this.discountData[id].discountType==='RA00') {
        if (discount >100||discount<0)//优惠价格大于总价
        {this.$message({type:'warning',message:'Illegal Discount'}) }
      }
    },
    //列求和
    getSummaries(param) {
      const { columns, data } = param;//这里可以看出，自定义函数会传入每一列，以及数据
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'Sum';
          return;
        }else if (index === 2||index===5) {
          //页面分别统计 处理
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr ;
              } else {
                return prev;
              }
            }, 0);
            //此处结合了方式一的判断处理，实现多种条件处理
            //此处的column.property获取的值对应<el-table-column>中prop对应的字段
            if(column.property==='netValue'||column.property==='gross') {
                 sums[index] = sums[index].toFixed(2)  ;
            }
          }
        }
      });
      return sums;//最后返回合计行的数据
    },
    confirm_type() {
      let index=this.editDialog.id;
      this.discountData[index].discountType = this.temp_value
      console.log(this.temp_value)
      console.log(this.discountData[index].discountType)
      this.radio = null;
      this.radioSelect = null;
      this.editDialog.show = false;
    },
    deleteDiscount(row)
    {
      this.$confirm('Are you sure to delete this discount?', 'Tip', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        axios
            .get(this.module+'/discountRules/deleteDiscountRules', {
              params: {
                discountId:row.discountId,
              }
            })
            .then((response) => {
              console.log("删除指定折扣成功");
              console.log(response.data);this.getDetail();
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
    addRow() {
      const circle = this.discountData[0]; //取出数组中第一个对象
      if (circle) {
        const newObj = {};
        for (let key in circle) { //把第一个对象的属性都赋值给新对象newObj  然后每个属性的值都设置为空；
          newObj[key] = '';
        }
        this.discountData.splice(this.discountData.length , 0, newObj);
      }
      else {
        const newItem={};
        this.discountData.splice(0 , 0, newItem);
      }
    },
  },

}
</script>

<style scoped>

</style>