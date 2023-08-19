<template>
  <div >
    <el-row>
      <el-col :span="12">
        <el-button v-if="justDisplay" @click="beginEdit" color="#193254" plain>Edit</el-button>
        <el-button @click="saveOrUpdate" color="#193254" plain>Save</el-button>
        <el-button @click="cancelOperation" color="#193254" plain>Cancel</el-button>
      </el-col>
      <el-col :span="12" justify="end">
        <el-steps :space="200" :active="2" simple>
          <el-step title="Inquiry" icon="Document" v-if="this.$route.query.method==='2'"></el-step>
          <el-step title="Quotation" icon="Edit" v-if="this.$route.query.method==='2'"/>
          <el-step title="Sales Order" icon="Location" />
        </el-steps>
      </el-col>
    </el-row>
    <div>
      <el-card>
        <div>
          <!--              可使用下拉框，建议弹窗显示客户管理部分进行传值选择-->
          <el-form :model="form" ref="form" class="input_box" label-width="100px"  :rules="rules" style="width: 100%" :disabled="justDisplay">
            <el-row><el-col span="4">  <div class="inputDeep">
              <el-input v-model="type_name"  disabled ></el-input></div></el-col>
              <el-col span="20" ><div style="margin-left: 0px">
                <el-form-item style="margin-left: 0px" prop="orderId"><el-input  v-model="form.orderId" prop="orderId" disabled></el-input>
                </el-form-item></div>
              </el-col></el-row>
            <el-row>
              <!--                  第一部分，基础sales order表格中的信息-->
              <el-col :span="12" >
                <div style="width: 80%">
                  <el-form-item label="sold-to-party：" prop="soldToParty" label-width="180px">
                    <el-input v-model="form.soldToParty"><template #append><el-button icon="Connection" @click="chooseCustomer"></el-button></template></el-input>
                  </el-form-item>
                  <el-form-item label="ship-to-party：" prop="shipToParty" label-width="180px">
                    <el-input v-model="form.shipToParty"><template #append><el-button icon="Connection" @click="chooseCustomer_ship"></el-button></template></el-input>
                  </el-form-item>
                  <el-form-item label="Customer Reference：" prop="customerReference" label-width="180px">
                    <el-input v-model="form.customerReference"></el-input>
                  </el-form-item>
                  <el-row><el-col :span="18">
                    <el-form-item label="net value：" prop="net_value" label-width="180px" >
                      <el-row>
                        <el-col :span="20"><el-input v-model="form.netValue" disabled></el-input></el-col>
                        <el-col :span="4"><div style="background-color: #F5F7FA;color:#A8ABB4;border-radius: 5px"><span>.00</span></div></el-col>
                      </el-row>
                    </el-form-item></el-col>
                    <el-col :span="4"><el-form-item prop="currency" label-width="20px" ><el-input v-model="form.currency"></el-input></el-form-item></el-col></el-row>
                  <el-form-item label="Req.Deliv.Date：" prop="reqDelivDate" label-width="180px">
                    <el-date-picker
                        v-model="form.reqDelivDate"
                        type="date"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                        placeholder="Choose request delivery date"
                        style="width: 100%"
                    />
                  </el-form-item>
                </div>
              </el-col>
              <!--              第二部分，销售区域信息，SQL表格中需要添加，届时调整表格数据源-->
              <el-col :span="12">
                <el-card style="width: 90%">
                  <el-form-item label="Sales Organization：" prop="salesOrg" label-width="180px" >
                    <el-input style="width: 300px" v-model="form.salesOrg"></el-input>
                  </el-form-item>
                  <el-form-item label="Distribution Channel："  label-width="180px" prop="distrChannel">
                    <el-input style="width: 300px" v-model="form.distrChannel"></el-input>
                  </el-form-item>
                  <el-form-item label="Division："  label-width="180px" prop="division">
                    <el-input style="width: 300px" v-model="form.division"></el-input>
                  </el-form-item>
                  <el-form-item label="Sales Office："  label-width="180px" prop="salesOffice">
                    <el-input style="width: 300px" v-model="form.salesOffice"></el-input>
                  </el-form-item>
                  <el-form-item label="Sales Group：" prop="salesGroup" label-width="180px">
                    <el-input style="width: 300px" v-model="form.salesGroup"></el-input>
                  </el-form-item>
                </el-card>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card>
        <el-row>
          <span>Material</span>
          <el-button icon="Plus" @click="new_detail" style="margin-left:50px" :disabled="notEdit">Add</el-button>
          <el-button icon="Money" @click="all_discount" style="margin-left:50px" :disabled="notEdit">Condition</el-button>
          <el-button icon="Edit" @click="edit" :disabled="justDisplay" color="#193254" plain>Edit</el-button>
        </el-row>
        <el-table :data="detailData" stripe style="width: 100%" @row-click="getOneMaterial">
          <el-table-column type="selection" ></el-table-column>
          <el-table-column prop="detailId" label="Item" type="index"></el-table-column>
          <el-table-column prop="materialId" label="Material" width="100"></el-table-column>
          <el-table-column prop="netValue" label="Net Value" width="120" >
            <template #default="scope">{{scope.row.netValue.toFixed(2)}}</template>
          </el-table-column>
            <el-table-column prop="quantity" label=" Quantity" width="100" >
              <template #default="scope" >
                <el-input v-model="scope.row.quantity" v-if="editMaterial===true"></el-input>
                <span v-if="editMaterial===false">{{scope.row.quantity}}</span>
              </template>
            </el-table-column>
          <el-table-column label="Description" width="110"><template #default="scope"><span>{{scope.row.name1}}</span></template></el-table-column>
          <el-table-column label="Net Value"  width="100"><template #default="scope"><span>{{scope.row.price1}}</span></template></el-table-column>
          <el-table-column  label="Net weight"  width="110"><template #default="scope"><span>{{scope.row.net_weight1}}</span></template></el-table-column>
          <el-table-column  fixed="right"  >
            <template v-slot="scope">
              <el-button icon="Discount" @click="checkPrice(scope.row)" :disabled="justDisplay"></el-button>
              <el-button icon="Delete" :disabled="justDisplay" @click="deleteDetail(scope.row)"></el-button>
              <el-button icon="Check" @click="save(scope.row)" :disabled="justDisplay" v-if="editMaterial===true"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
  <el-dialog
      v-if="editDialog.show"
      width="800px"
      :title="editDialog.title"
      :close-on-click-modal="false"
      v-model="editDialog.show">
    <div v-if="editDialog.show">
      <el-input v-model="searchContent"
                placeholder="Search for material"
                class="input-with-select"
      >
        <template #append><el-button icon="Search" @click="searchMaterial"></el-button></template>
      </el-input>
      <el-form  style="margin-top: 20px" v-if="editDialog.show" :model="form1" ref="form1" label-width="120px" :rules="rule1">
        <el-form-item label="Material_Item" prop="materialId">
          <!--        对接物料模块查询物料-->
          <el-select  v-model="form1.materialId" placeholder="choose material" clearable filterable @change="selectMaterial">
            <!--            tableData中是数据库中既有的material表格-->
            <el-option
                v-for="item in tableData"
                :label="item.materialId"
                :value="item.materialId">
              <!--弹出框展示仪器基本信息-->
              <el-popover
                  placement="right"
                  width="300"
                  trigger="hover">
                <span>Description：{{ item.name }}</span><br/>
                <span>Net weight：{{ item.netWeight }}</span><br/>
                <span>Price：{{ item.price }}</span>
                <template #reference>
                  <el-button  type="text" style="width:100%;color:black;">
                    <span style="float: left">{{ item.materialId }}</span>
                  </el-button>
                </template>
              </el-popover>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Description" prop="name"><el-input v-model="form1.name"></el-input></el-form-item>
        <el-form-item  label="Quantity" prop="quantity"><el-input-number  v-model="form1.quantity" :min="1"></el-input-number></el-form-item>
        <el-form-item label="Net value" prop="price"><el-input v-model="form1.price"></el-input></el-form-item>
        <el-form-item label="Net weight" prop="netWeight"><el-input v-model="form1.netWeight"></el-input></el-form-item>
        <el-form-item label="Mode" prop="batch" v-if="false"><el-input v-model="this.mode"></el-input></el-form-item>
        <el-form-item>
          <el-button color="#193254" size="small" @click="submit">Submit</el-button>
          <el-button color="#193254" size="small" @click="cancel">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
  <!--用来进行客户查找的弹窗-->
  <el-dialog :title="reference_c.title"
             v-model="reference_c.show"
             v-if="reference_c.show"
             width="70%">
    <el-form >
      <!--  下拉框可直接输入编号进行选择，最终传值的变量输入框-->
      <el-form-item label="Customer"><el-select clearable filterable v-model="need_c">
        <el-option v-for="item in allCustomer" :label="item.customerId" :value="item.customerId">
        </el-option></el-select></el-form-item>
      <!--  下面是搜索区域-->
      <el-divider><el-icon><Star/></el-icon></el-divider>
      <span style="font-weight: bolder;color: #475669;">Search for Customer</span>
      <el-row><el-col :span="8">
        <el-form-item label="name：" prop="name" label-width="180px"><el-input style="width: 300px" v-model="name_s"></el-input></el-form-item>
        <el-form-item label="title：" prop="title" label-width="180px"><el-input style="width: 300px" v-model="title_s"></el-input></el-form-item>
      </el-col><el-col :span="8">
        <el-form-item label="city：" prop="city" label-width="180px"><el-input style="width: 300px" v-model="city_s"></el-input></el-form-item>
        <el-form-item label="Sales Organization：" prop="salesOrg" label-width="180px" ><el-input style="width: 300px" v-model="salesOrg1_s"></el-input></el-form-item>
      </el-col><el-col :span="8">
        <el-form-item label="Distribution Channel："  label-width="180px" prop="distrChannel"><el-input style="width: 300px" v-model="distrChannel1_s"></el-input></el-form-item>
        <el-form-item label="Division："  label-width="180px" prop="division"><el-input style="width: 300px" v-model="division1_s"></el-input></el-form-item>
      </el-col>
      </el-row>
    </el-form>
    <el-button @click="searchCustomer" style="float: right" icon="Search">Search</el-button>
    <el-divider></el-divider>
    <el-card>
      <!--      以下为搜索到的信息展示区域-->
      <el-tooltip
          class="box-item"
          effect="dark"
          content="Double click to choose."
          placement="top-start"
      >
        <el-table :data="customerData"  @row-dblclick="checkCustomer">
          <el-table-column prop="customerId" label="Customer" width="150" ></el-table-column>
          <el-table-column prop="name" label="name" width="200" />
          <el-table-column prop="city" label="city" ></el-table-column>
          <!--      在这里增加销售区域的数据-->
          <el-table-column label="Sales.Org" prop="salesOrg"  ></el-table-column>
          <el-table-column label="Distr.Channel"  prop="distrChannel"></el-table-column>
          <el-table-column label="DV"  label-width="180px" prop="division"></el-table-column>
        </el-table>
      </el-tooltip>
    </el-card>
    <el-button icon="Check" @click="confirmCustomer" style="float: right">Confirm</el-button>
  </el-dialog>
</template>

<script >
import {Document, Edit, Select} from "@element-plus/icons-vue";
export default {
  inject:['reload'],
  name: "create",
  components: {Document, Edit, Select},
  created() {
    this.getType();
    this.searchMaterial();//用来获取物料信息的函数
    this.getMaterial();
    this.mode=parseInt(new Date().getTime()/1000);console.log(this.mode)
  },
  activated() {
    if(this.path!=="/all_price"&&this.path !== "/price")
    {
    if (location.href.indexOf("#reloaded") === -1) {
      location.href = location.href + "#reloaded";
      this.reload();}
    }
    this.getDetail();
  },
  beforeRouteLeave(to,from,next){
   this.path=to.path;console.log(this.path)
    if (to.path === "/all_price"||to.path === "/price")
    { from.meta.keepAlive = true; console.log(from.meta.keepAlive)}
    next();
  },
  data(){
    return{
      module:'/api2',
      allCustomer:'',
      customerData:[],
      division1_s:'',distrChannel1_s:'',salesOrg1_s:'',name_s:'', city_s:'',title_s:'',
      need_c:'',customer:'',
      reference_c: {
        title: 'Choose Customer',
        show: false,
        id: null,
      },
      path:'',
      mode:'',
      SO:'',DB:'',DI:'',SG:'',OF:'',
      moreWeight:'',
      searchContent:"",
      form:{},form1:{},
      quantity:'',
      type_name:'Standard Order',
      query:{
        type_name: '',
        order_id:'',
      },
      editDialog: {
        title: '',
        show: false,
        id: null,
      },
      MaterialData:[], editMaterial:false,
      name1:'',price1:'',net_weight1:'', tableData:[],
      detailData:[],
      orderData:[],
      rules: {
        soldToParty: [
          {required: true, message: 'Input sold-to-party', trigger: 'blur'},
        ],
        reqDelivDate: [
          {required: true, message: 'Input Req. Deliv Date', trigger: 'blur'},
        ],
      },
      notEdit:false,
      justDisplay:false,total:''
    }
  },
  methods:{
    getType(){
      if(this.$route.query.method==='1'){
        //创建空白报价单
        this.type_name = this.$route.query.type_id;
        if(this.$route.query.SOR_c) {this.form.salesOrg = this.$route.query.SOR_c;}
        if(this.$route.query.SOF_c) {this.form.salesOffice = this.$route.query.SOF_c;}
        if(this.$route.query.SGR_c) this.form.salesGroup = this.$route.query.SGR_c;
        if(this.$route.query.DBC_c)  this.form.distrChannel = this.$route.query.DBC_c;
        if(this.$route.query.DVI_c) this.form.division = this.$route.query.DVI_c;
      }
      else if(this.$route.query.method==='2')
      {
        this.notEdit=true;this.getOrder();
      }
      else {
        this.justDisplay=true;
        this.notEdit=true;
        this.getOrder();
      }
    },
    cancelOperation(){
      this.$confirm('Your operation may not have been saved. Do you want to continue?', 'Tip', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        if(this.$route.query.method==='3'){
          if(this.justDisplay===true){this.$router.push('/order_manage')}
          else{
            this.notEdit=true;
            this.justDisplay=true;
          }}
        else this.$router.push('/order_type')
      }).catch((error) => {
        this.$message({
          type: 'info',
          message: error === 'cancel' ? 'Cancel' : error
        });
      })
    },
    saveOrUpdate(){
      let mode=parseInt(this.mode)//需要传输的batch参数
      if(this.justDisplay===false&&this.detailData.length>0&&this.form.soldToParty&&this.form.reqDelivDate){
        //进行修改操作
        //新建时实现保存
        var that=this
        //debugger
        axios
            .get(this.module+'/order/saveOrder',{
              params:{...this.form,batch:mode}}
            )
            .then((response) => {
              console.log("订单修改成功");
              console.log(response.data);
              if(this.$route.query.method!=='3')
              {this.$message({showClose: true,type :'success',message:'Order   '+response.data.data+'   Successfully created!'})}
              else
              {this.$message({showClose: true,type :'success',message:'Order  '+response.data.data+'   Successfully modified!'})}
            })
            .catch((error) => {
              console.log(error);
            })
      }
      else
      {
        this.$message({type:'warning',message:'You need to input necessary information.'})
      }
    },
    beginEdit(){
      this.justDisplay=false;
      this.notEdit=false;
    },
    getMaterial(){
      //这个函数用来查找所有的物料数据用来进行选择
      var that=this;
      axios
          .get(this.module+'/material/getMaterialList', {
            params: {
            },
          })
          .then((response) => {
            console.log("请求成功");
            console.log(response.data)
            that.MaterialData = response.data.data;
          })
    },
    getOneMaterial(row)
    {
      //这个函数查找单个物料数据用来进行选择
      var that=this;
      axios
          .get(this.module+'/material/getMaterialById', {
            params: {
              id:row.materialId
            },
          })
          .then((response) => {
            console.log("查找单个物料信息请求成功");
            console.log(response.data)
            row.name1 = response.data.data.name;
            row.price1 = response.data.data.price;
            row.net_weight1 = response.data.data.netWeight;
          })
    },
    getOrder(){
      //这个函数根据上一个页面传输的Order_id进行查找
        let needId=parseInt(this.$route.query.order_id)
        var that=this;
        axios
            .get(this.module+'/order/getOrderById', {
              params: {
                id:needId
              },
            })
            .then((response) => {
              console.log("获取指定订单成功");
              console.log(response.data);
              that.form=response.data.data
              this.getDetail();
            })
    },
    getDetail()
    {
      if(this.$route.query.method!=='1') {
        //这个函数根据上一个页面传输的order_id进行detail的查找
        let needId = parseInt(this.$route.query.order_id)
        var that = this;
        axios
            .get(this.module + '/details/getDetailByOrderId', {
              params: {
                orderId: needId
              },
            })
            .then((response) => {
              console.log("查找detail成功");
              console.log(response.data)
              that.detailData = response.data.data
              this.sum=0;this.total=0;
              this.detailData.filter((item) => {
                if (item.detailId)
                {this.sum=this.sum+item.netValue*item.expectedProbability/100;
                  this.total=this.total+item.netValue}});
              this.form.expectOrdVal=this.sum;this.form.netValue=this.total
            })
      }
      else{
        let batchId = parseInt(this.mode); console.log(this.mode)
        var that = this;
        axios
            .get(this.module + '/details/getAlDetailsByBatch', {
              params: {
                batch:batchId
              },
            })
            .then((response) => {
              console.log("根据批次查找detail成功");
              console.log(response.data)
              that.detailData = response.data.data;
              this.sum=0;this.total=0;
              this.detailData.filter((item) => {
                if (item.detailId)
                {this.sum=this.sum+item.netValue*item.expectedProbability/100;
                  this.total=this.total+item.netValue}});
              this.form.expectOrdVal=this.sum;this.form.netValue=this.total
            })}
    },
    searchMaterial(){
      let newListData = [];let mark=0;
      if (this.searchContent) {
        // 在总的数据集MaterialData中进行筛选
        this.MaterialData.filter((item) => {
          if (((item.materialId+'').indexOf(this.searchContent) !== -1
              ||item.name.indexOf(this.searchContent) !== -1
              ||(item.price+'').indexOf(this.searchContent) !== -1||(item.netWeight+'').indexOf(this.searchContent) !== -1))
          {
            newListData.push(item);mark=1;
          }
        });
        if(mark===1)
        {this.tableData = newListData;}
        else
          this.$message({type:'warning',message:'No data found'})
      }
      else {
        this.tableData=this.MaterialData;
      }},
    checkPrice(row){
      let detail_Id = '';
      detail_Id=row.detailId;
      // 跳转路由
      this.$router.push({
        path: '/price',
        query: {
          detail: detail_Id, //这里其实应该是detail id
          type:3
        }
      })
    },
    all_discount(){
      let Id = '';
     Id=this.$route.query.order_id;
      // 跳转路由
      this.$router.push({
        path: '/all_price',
        query: {
          id:this.form.orderId,
          type:3,
          batch:this.mode
        }
      })
    },
    submit(){
      if(!this.form1.quantity){
        this.$message({type:'warning',message:'Please input quantity of materials'})
      }
      else{
        if(this.$route.query.method==='1') {
          // 在这个函数中进行detail表格的新建
          let id=parseInt(this.form1.materialId)
          let num=parseInt(this.form1.quantity);
          let mode=parseInt(this.mode)
          // 在这个函数中进行detail表格的新建
          var that=this
          axios
              .get(this.module+'/details/saveDetailsInitial', {
                params: {
                  ...this.form1,
                  batch:parseInt(this.mode)
                }
              })
              .then((response) => {
                console.log("空白创建成功");
                console.log(response.data)
                this.editDialog.show=false;this.getDetail();this.$refs.form1.resetFields();
                this.searchContent=null;
              })
              .catch((error) => {
                console.log(error);
              })
        }
        else{
          let needId=parseInt(this.$route.query.order_id);
          let id=parseInt(this.form1.materialId)
          let num=parseInt(this.form1.quantity);
          axios
              .get(this.module+'/details/saveDetailsInitial', {
                params: {
                  orderId:needId,
                  ...this.form1,
                  batch:parseInt(this.mode)
                }
              })
              .then((response) => {
                console.log("修改成功");
                console.log(response.data)
                this.editDialog.show=false;this.getDetail();this.$refs.form1.resetFields();
                this.searchContent=null;
              })
              .catch((error) => {
                console.log(error);
              })
        }}
    },
    cancel(){
      this.editDialog.show=false;
      this.$refs.form1.resetFields();
      this.searchContent=null;
    },
    edit()
    {console.log(this.editMaterial);this.editMaterial=true;},
    save(row)
    {
      let needOrder=''
      if(this.$route.query.method==='1') needOrder=0
      else needOrder=this.form.orderId
      axios
          .get(this.module+'/details/saveDetailsInitial', {
            params: {
              detailId:row.detailId,
              quantity:row.quantity,
              netValue:row.quantity*row.price1,
              materialId:row.materialId,
              expectedProbability:row.expectedProbability,
              batch:parseInt(this.mode),
              orderId:needOrder
            }
          })
          .then((response) => {
            console.log("保存修改成功");
            console.log(response.data)
            this.editDialog.show=false;this.getDetail();this.$refs.form1.resetFields();
            this.searchContent=null;
          })
          .catch((error) => {
            console.log(error);
          })
    },
    deleteDetail(row)
    {
      this.$confirm('Are you sure to delete this material?', 'Tip', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        axios
            .get(this.module+'/details/deleteDetails', {
              params: {
                detailsId:row.detailId
              },
            })
            .then((response) => {
              console.log(response.data);
              console.log("删除订单条目成功");this.detailData=[];this.getDetail();
              //this.detailData.splice(row.index,1)
            })
      }).catch((error) => {
        this.$message({
          type: 'info',
          message: error === 'cancel' ? 'Cancel' : error
        });
      })
    },
    new_detail(){
      this.timer = new Date().getTime();
      this.editDialog.title = 'Edit Material';
      this.editDialog.show = true;
      this.editDialog.id = null;
    },
    selectMaterial(){
      const item = this.tableData.find(item1 => item1.materialId === this.form1.materialId );
      this.form1.name = item.name;
      this.form1.netWeight = item.netWeight;
      this.form1.price = item.price;
    },
    chooseCustomer(){
      this.getCustomer();
      this.reference_c.show=true;
      this.reference_c.id=1;
    },
    chooseCustomer_ship(){
      this.getCustomer();
      this.reference_c.show=true;
      this.reference_c.id=2;
    },
    getCustomer(){
      /*用来获取所有客户数据的函数*/
      var that=this;
      axios
          .get("http://localhost:10086/sysUser/selectCustomers", {
            params: {
            },
          })
          .then((response) => {
            console.log(response.data);
            console.log("获取所有客户成功");
            that.allCustomer = response.data;
          })
    },
    searchCustomer(){
      //这个函数进行客户信息的查找
      let newListData = [];
      let mark = 0;
      if (this.name_s||this.city_s||this.salesOrg1_s||this.division1_s||this.distrChannel1_s) {
        //如果输入了筛选条件，在条件中进行查找
        this.allCustomer.filter((item) => {
          if ((this.name_s === '' || item.name === this.name_s)&&
              (this.city_s===''||item.city===this.city_s)&&
              (this.division1_s===''||item.division===this.division1_s)&&
              (this.distrChannel1_s===''||item.distrChannel===this.distrChannel1_s)&&
              (this.salesOrg1_s===''||item.salesOrg===this.salesOrg1_s)
          )
          {
            newListData.push(item);
            mark = 1;
          }
        });
        this.customerData = newListData;
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
    checkCustomer(row) {
      this.need_c = row.customerId;
    },
    confirmCustomer(){
      if(this.reference_c.id===1) this.form.soldToParty=this.need_c;
      else this.form.shipToParty=this.need_c;
      this.reference_c.show=false;
      this.customerData=[];
      this.name_s='';this.city_s='';this.salesOrg1='';
      this.distrChannel1='';this.division1='';
    },
  }
}
import {ref,reactive,watch} from 'vue';
import axios from "axios";
</script>

<style scoped>
.input_box{
  width: 500px;
}

.inputDeep {
:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
  cursor: default;
}
.el-input__wrapper {
  border: none !important;
  box-shadow: none !important;
  padding: 0px;
}
}
</style>