<template>
  <div>
    <!--    选择类型的弹窗-->
    <el-card>
      <el-row>
        <el-col span="3"><span>Order type:</span></el-col>
        <el-col span="21">
          <el-input placeholder="Please input" v-model="order_type" >
            <template #append>
              <el-button @click="this.editDialog.show=true" icon="Connection"></el-button>
            </template>
          </el-input>
        </el-col>
      </el-row>
    </el-card>
    <!--    销售区域信息 传值到下一个页面 考虑移动-->
    <el-card>
      <el-form>
        <!--        这里不起存储作用，进行一个预输入，到下一个页面进行存储-->
        <!--        销售区域信息需要在数据库中进行搜索和表单校验-->
        <el-form-item label="Sales Organization："  label-width="180px">
          <el-input style="width: 300px" v-model="SO"><template #append><el-button @click="showInformation(1)" icon="More"></el-button></template></el-input>
        </el-form-item>
        <el-form-item label="Distribution Channel："  label-width="180px">
          <el-input style="width: 300px" v-model="DB"><template #append><el-button @click="showInformation(2)" icon="More"></el-button></template></el-input>
        </el-form-item>
        <el-form-item label="Division："  label-width="180px">
          <el-input style="width: 300px" v-model="DI"></el-input>
        </el-form-item>
        <el-form-item label="Sales Office："  label-width="180px">
          <el-input style="width: 300px" v-model="OF"></el-input>
        </el-form-item>
        <el-form-item label="Sales Group："  label-width="180px">
          <el-input style="width: 300px" v-model="SG"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
  <div style="float: right">
    <el-button @click="enterOrder">Continue</el-button>
    <el-button @click="createReference">Create with Reference</el-button>
  </div>
  <!--添加或修改的弹框-->
  <el-dialog  :title="editDialog.title"
              v-model="editDialog.show"
              v-if="editDialog.show"
              width="70%" >
    <div>
      <el-table :data="gridData" @row-click="handleclick">
        <el-table-column width="50">
          <template v-slot="scope">
            <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column property="type_id" label="Type" width="150" />
        <el-table-column property="description" label="Description" width="200" />
      </el-table>
      <el-button style="float: right;margin-bottom: 50px" @click="confirm_type"> OK </el-button>
    </div>
  </el-dialog>
  <!--  查询inquiry的弹窗,这里查询inquiry表格-->
  <el-dialog :title="reference_v.title"
             v-model="reference_v.show"
             v-if="reference_v.show"
             width="70%">
    <el-form >
      <!--  下拉框可直接输入编号进行选择，最终传值的变量输入框-->
      <el-form-item label="Quotation"><el-select clearable filterable v-model="need">
        <el-option v-for="item in allQuotation" :label="item.quotationId" :value="item.quotationId">
        </el-option></el-select></el-form-item>
      <!--  下面是搜索区域-->
      <el-divider><el-icon><Star/></el-icon></el-divider>
      <span style="font-weight: bolder;color: #475669;">Search for quotation</span>
      <el-row>
        <el-col :span="8">
          <el-form-item label="sold-to-party：" prop="soldToParty" label-width="180px">
            <el-input style="width: 300px" v-model="sold_to_party_s"></el-input>
          </el-form-item>
          <el-form-item label="Customer Reference：" prop="cus_ref" label-width="180px">
            <el-input style="width: 300px" v-model="cus_ref_s"></el-input>
          </el-form-item>
          <el-form-item label="Sales Organization：" prop="salesOrg" label-width="180px" >
            <el-input style="width: 300px" v-model="salesOrg1"></el-input>
          </el-form-item>
        </el-col><el-col :span="8">
        <el-form-item label="Distribution Channel："  label-width="180px" prop="distrChannel">
          <el-input style="width: 300px" v-model="distrChannel1"></el-input>
        </el-form-item>
        <el-form-item label="Division："  label-width="180px" prop="division">
          <el-input style="width: 300px" v-model="division1"></el-input>
        </el-form-item>
      </el-col><el-col :span="8">
        <el-form-item label="Sales Office："  label-width="180px" prop="salesOffice">
          <el-input style="width: 300px" v-model="salesOffice1"></el-input>
        </el-form-item>
        <el-form-item label="Sales Group：" prop="salesGroup" label-width="180px">
          <el-input style="width: 300px" v-model="salesGroup1"></el-input>
        </el-form-item>
      </el-col>
      </el-row>
    </el-form>
    <el-button @click="searchQuotation" style="float: right" icon="Search">Search</el-button>
    <el-divider></el-divider>
    <el-card>
      <el-tooltip
          class="box-item"
          effect="dark"
          content="Double click to choose."
          placement="top-start"
      >
        <el-table :data="quotationData"  @row-dblclick="checkQuotation">
          <el-table-column prop="quotationId" label="quotation" width="150" ></el-table-column>
          <el-table-column prop="soldToParty" label="SoldToParty" width="200" />
          <el-table-column prop="customerReference" label="Cus_Ref" ></el-table-column>
          <el-table-column prop="reqDelivDate" label="Req.Deliv.Date" ></el-table-column>
          <!--      在这里增加销售区域的数据-->
          <el-table-column label="Sales.Org" prop="salesOrg"  ></el-table-column>
          <el-table-column label="Distr.Channel"  prop="distrChannel"></el-table-column>
          <el-table-column label="DV"  label-width="180px" prop="division"></el-table-column>
        </el-table>
      </el-tooltip>
    </el-card>
    <el-button color="#193254" @click="copyQuotation" style="float: right" >Copy</el-button>
    <el-button color="#193254"  @click="cancel" style="float: right">Cancel</el-button>
  </el-dialog>
<el-dialog :title="reference_i.title"  v-model="reference_i.show"  v-if="reference_i.show">
  <div v-if="this.reference_i.id===1">
   <el-row> <span style="font-size: larger;font-weight: bolder">Sales Organization</span></el-row>
  <el-tag title="Sales Organization" v-for="item in allsalesOrg" @click="confirmInformation(item)" type="info" size="large" style="margin-left: 10px;">{{item}} </el-tag>
  <div><el-button color="#193254" style="float: right;margin-top: 20px" @click="check">Confirm</el-button></div>
  </div>
  <div v-if="this.reference_i.id===2">
    <el-row> <span style="font-size: larger;font-weight: bolder">Sales Organization</span></el-row>
    <el-tag title="Sales Organization" v-for="item in allChannel" @click="confirmInformation(item)" type="info" size="large" style="margin-left: 10px;">{{item}} </el-tag>
    <div><el-button color="#193254" style="float: right;margin-top: 20px" @click="check">Confirm</el-button></div>
  </div>
</el-dialog>
</template>

<script >
import {Connection} from "@element-plus/icons-vue";
import axios from "axios";

export default {
  name: "prepare",
  components: {Connection},
/*  beforeRouteLeave(to, from, next) {
    let path=to.path
    console.log(path)
    to.meta.keepAlive = false;next(); },

 */
  created(){

  },
  data() {
    return {
      module:'/api2',
      salesGroup1:'',salesOffice1:'',division1:'',distrChannel1:'',salesOrg1:'',
      need:'',
      sold_to_party_s:'',
      cus_ref_s:'',
      SO:'',DB:'',DI:'',OF:'',SG:'',
      editDialog: {
        title: 'Choose Quotation Type',
        show: false,
        id: null,
      },

      temp:'',
      allsalesOrg:[],allChannel:[],
      reference_i: {
        title: 'Create with Reference',
        show: false,
        id: null,
      },

      reference_v: {
        title: 'Search for Information',
        show: false,
        id: null,
      },
      radio:'',
      radioSelect:null,
      order_type:'',
      temp_value:'',
      gridData: [
        {
          type_id: 'OR',
          description:'standard order'
        },
        {
          type_id: 'FD',
          description:'free order'
        },
        {
          type_id: 'RE',
          description:'return order'
        },
      ],
      quotationData: [],
      allQuotation:[]
    }
  },
  methods:{
    getQuotation(){
      /*用来获取报价单数据的函数*/
      var that=this;
      axios
          .get(this.module+'/quotation/getPageList', {
            params: {
            },
          })
          .then((response) => {
            console.log(response.data);
            console.log("获取所有报价单成功");
            that.allQuotation = response.data.data.records;
          })
    },
    showInformation(id){
      this.reference_i.show=true;
      this.reference_i.id=id;
      this.getInformation(id)
    },
    check(){
      if(this.reference_i.id===1) this.SO=this.temp;
      else this.DB=this.temp;
      this.reference_i.show=false;
    },
    getInformation(id){
      var that=this;
      if(id===1) {
        axios
            .get("http://localhost:10086/static_data/salesOrg_list", {
              params: {},
            })
            .then((response) => {
              console.log(response.data);
              console.log("获取所有销售信息成功");
              that.allsalesOrg = response.data;
            })
      }
      else{
        axios
            .get("http://localhost:10086/static_data/cl_list", {
              params: {},
            })
            .then((response) => {
              console.log(response.data);
              console.log("获取所有分销渠道成功");
              that.allChannel = response.data;
            })
      }
    },
    confirmInformation(item){
      console.log(item);this.temp=item;
    },
    submit(){
      this.reference_v.show=false
    },
    cancel(){
      this.reference_v.show=false;
      this.salesGroup1='';this.salesOffice1='';this.division1='';
      this.distrChannel1='';this.salesOrg1='';
      this.sold_to_party_s='';this.cus_ref_s='';
      this.quotationData=[];
    },
    createReference()
    {
      this.salesGroup1='';this.salesOffice1='';this.division1='';
      this.distrChannel1='';this.salesOrg1='';
      this.sold_to_party_s='';this.cus_ref_s='';
      this.quotationData=[];
      this.reference_v.show=true;
      this.getQuotation()
    },
    searchQuotation(){
      let newListData = [];
      let mark = 0;
      if (this.sold_to_party_s||this.cus_ref_s||this.salesGroup1||this.salesOrg1||this.salesOffice1||this.division1||this.distrChannel1) {
        this.allQuotation.filter((item) => {
          if ((item.soldToParty === parseInt(this.sold_to_party_s) || this.sold_to_party_s === '') &&
              (this.cus_ref_s === '' || item.customerReference === parseInt(this.cus_ref_s))&&
              (this.salesGroup1===''||item.salesGroup===this.salesGroup1)&&
              (this.salesOffice1===''||item.salesOffice===this.salesOffice1)&&
              (this.division1===''||item.division===this.division1)&&
              (this.distrChannel1===''||item.distrChannel===this.distrChannel1)&&
              (this.salesOrg1===''||item.salesOrg===this.salesOrg1)
          )
          {
            newListData.push(item);
            mark = 1;
          }
        });
        this.quotationData = newListData;
        if (mark === 0) {
          this.$message({
            showClose: true,
            message: 'Cannot find any data.',
            type: 'warning',
          })
        }
      }
      else {
        this.$message({
          showClose: true,
          message: 'Please input your condition.',
          type: 'warning',
        })
      }
    },
    enterOrder() {
      let type = '';
      let SOR='';SOR=this.SO;
      let DBC='';DBC=this.DB;
      let DVI='';DVI= this.DI;
      let SOF=''; SOF=this.OF;
      let SGR='';SGR=this.SG;
      type=this.order_type;
      if(type!=='') {
        this.$router.push({
          path: '/create',
          query: {
            method:1,
            type_id: type,
            SOR_c: SOR,
            DBC_c: DBC,
            DVI_c: DVI,
            SOF_c: SOF,
            SGR_c: SGR,
          },
        })
      }
      else{
        this.$message({
          showClose: true,
          message: 'Please choose Order type',
          type: 'warning',
        })
      }
    },
    copyQuotation(){
      var that=this;
      let id=parseInt(this.need);
      let quotation_copy='';
      quotation_copy=this.need
      if(quotation_copy!=='') {
        this.$confirm('You will copy this Quotation. Do you want to continue?', 'Tip', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          axios
              .get(this.module+'/order/AddOrderByQuotationId', {params:{quotationId:id}})
              .then((response) => {
                console.log(response.data);
                console.log("参考创建报价单成功");
                let id=response.data.data;console.log(id);
                this.$router.push({
                  path: '/create',
                  query: {
                    method:2,
                    order_id:id ,
                  },
                })
              })
        }).catch((error) => {
          this.$message({
            type: 'info',
            message: error === 'cancel' ? 'Cancel' : error
          });
        })
      }
      else{
        this.$message({
          showClose: true,
          message: 'Please choose needed inquiry',
          type: 'warning',
        })
      }
    },
    handleclick(row) {
      this.temp_value = row.type_id;
    },
    checkQuotation(row) {
      this.need = row.quotationId;
    },
    confirm_type() {
      this.order_type=this.temp_value;
      this.radio=null;
      this.radioSelect=null;
      this.editDialog.show=false;
    },
  }
}


</script>

<style scoped>

</style>