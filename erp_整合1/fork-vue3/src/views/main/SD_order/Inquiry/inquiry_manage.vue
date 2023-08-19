<!--TODO 如果表格中无数据则使用element ui中的空状态 el-empty-->
<template>
  <div class="role-body">
    <el-card class="box-card headerdeepcolor">
      <!--订单展示-->
      <div class="role-button">
        <el-form>
          <div style="width: 300px">
            <el-input v-model="searchContent" placeholder="Please input" class="input-with-select"
              style="margin-left: 100px">
            </el-input>
          </div>
          <el-row style="margin-top: 20px">
            <el-col :span="12">
              <el-form-item label="Inquiry：" prop="inquiry_id" label-width="180px">
                <el-input style="width: 300px" v-model="inquiry_id"></el-input>
              </el-form-item>
              <el-form-item label="sold-to-party：" prop="sold_to_party" label-width="180px">
                <el-input style="width: 300px" v-model="sold_to_party"></el-input>
                <!--                这里需衔接客户查找页面 客户管理part-->
              </el-form-item>
              <el-form-item label="Customer Reference：" prop="cus_ref" label-width="180px">
                <el-input style="width: 300px" v-model="cus_ref"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Requested Delivery Date：" prop="Req_date" label-width="200px">
                <el-date-picker v-model="req_date" type="date" format="YYYY/MM/DD " value-format="YYYY/MM/DD "
                  placeholder="please choose date" style="width:300px" />
                <!--                按照时间查找存在问题，后续进行修改-->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button type="primary" color="#193254" plain class="search-button" @click="search_Data" icon="Search">Searh
        </el-button>
        <el-button type="primary" color="#193254" plain class="search-button" @click="ClearData"
          icon="Refresh">Clear</el-button>
      </div>
    </el-card>
    <el-divider>
      <el-icon><star-filled /></el-icon>
    </el-divider>
    <el-table @row-dblclick="enterOrder" :data="inquiryData" stripe style="width: 100%" :border="true"
      :row-style="{ height: '1' }" ref="multipleTable">
      <el-table-column type="selection" />
      <el-table-column type="index" label="Item" width="81px">
        <template v-slot="scope">
          <!--          {{ (tagData.current - 1) * tagData.size + scope.$index + 1 }}-->
        </template>
      </el-table-column>
      <el-table-column prop="inquiryId" label="Inquiry"></el-table-column>
      <el-table-column prop="soldToParty" show-overflow-tooltip=“true” label="sold-to-party"></el-table-column>
      <el-table-column prop="customerReference" label="Cus_Ref"></el-table-column>
      <el-table-column prop="reqDelivDate" label="Req.Deliv.Date"></el-table-column>
      <!--      在这里增加销售区域的数据-->
      <el-table-column label="Sales.Org" prop="salesOrg"></el-table-column>
      <el-table-column label="Distr.Channel" prop="distrChannel"></el-table-column>
      <el-table-column label="DV" label-width="180px" prop="division"></el-table-column>
      <el-table-column fixed="right">
        <template #default="scope">
          <el-button icon="Edit" @click="enterOrder(scope.row)"></el-button>
          <el-button icon="Delete" @click="deleteOrder(scope.row, scope.$index)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页
    <el-pagination
        background
        layout="prev, pager, next"
        :page-count="tagData.pages"
        :current-page.sync="query.current"
        class="pagination"
        @current-change="getTagData">
    </el-pagination>
    -->
  </div>
</template>

<script >
import { get } from '@/plugins/axios'
import { Refresh, Search } from "@element-plus/icons-vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router"
export default {
  name: "tag",
  components: { Refresh, Search },
  created() {
    this.getInquiry()
  },

  data() {
    return {
      $router: useRouter(),
      $route: useRoute(),
      module: '/api2',
      searchContent: "",
      inquiryData: [],
      req_date: '', sold_to_party: '', cus_ref: '', inquiry_id: '', tagData: [],
      query: {
        current: 1,
        size: 10,
        tagId: 0
      },
      uri: {
        getInquiry: module + '/getPageList'
      },
      editDialog: {
        title: '',
        show: false,
        id: null,
      },
      multipleSelection: [],

    }

  },
  methods: {
    search_Data() {
      let newListData = [];
      let mark = 0;
      console.log(this.req_date)
      if (this.searchContent || this.sold_to_party || this.req_date || this.cus_ref || this.inquiry_id) {
        this.tagData.filter((item) => {
          if (((item.inquiryId + '').indexOf(this.searchContent) !== -1
            || (item.soldToParty + '').indexOf(this.searchContent) !== -1
            || (item.reqDelivDate + '').indexOf(this.searchContent) !== -1
                  || (item.customerReference + '').indexOf(this.searchContent) !== -1
          ) && ((item.soldToParty + '') === this.sold_to_party || this.sold_to_party === '') &&
            (this.req_date === '' || new Date(item.reqDelivDate).getTime() === new Date(this.req_date).getTime()) &&
            (this.inquiry_id === (item.inquiryId + '') || this.inquiry_id === '')
            &&(this.cus_ref === (item.customerReference + '') || this.cus_ref === '')) {
            newListData.push(item);
            mark = 1;
          }
        });
        this.inquiryData = newListData;
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
          message: 'Input your condition.',
          type: 'warning',
        })
      }

    },
    getInquiry() {
      var that = this;
      //获取全部询价单数据的函数
      axios
        .get(this.module + '/inquiry/getPageList', {
          params: {
          },
        })
        .then((response) => {
          console.log("请求成功");console.log(response.data.data)
          that.tagData = response.data.data.records;
        })
    },
    ClearData() {
      this.sold_to_party = '';
      this.cus_ref = '';
      this.req_date = '';
      this.inquiry_id = '';
      this.searchContent = ''
    },
    deleteOrder(row, index) {
      var that = this;
      let id = parseInt(row.inquiryId);
      this.$confirm('You will delete an inquiry record. Do you want to continue?', 'Tip', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        axios
          .get(this.module + '/inquiry/deleteInquiry', {
            params: {
              inquiryId: id
            },
          })
          .then((response) => {
            console.log(response.data);
            console.log("删除询价单成功");
            this.getInquiry();
            this.inquiryData.splice(index, 1)
          })
      }).catch((error) => {
        this.$message({
          type: 'info',
          message: error === 'cancel' ? 'Cancel' : error
        });
      })
    },
    enterOrder(row) {
      let id = '';
      id = row.inquiryId;
      // 跳转路由
      this.$router.push({
        path: '/inquiry_create',
        query: {
          method: 3,
          inquiryId: id,
        }
      })
    }

  }
}

</script>

<style scoped lang="less">
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
  margin-left: 30px;
}

.app-container-oceanFreightTable {
  .headerdeepcolor {
    background-color: #5bc0de !important;
    color: #fff
  }
}

.style1 {
  text-align: center;
  display: inline-block;
  width: 70px;
  height: 25px;
  border: none;
  margin: 5px;
  border-radius: 6px;
}

.style2 {
  background: #f0f9eb;
  display: none;
}

.descStyle {
  overflow: hidden;
  // text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 3; //行数
  -webkit-box-orient: vertical;
}

.role-body {
  padding: 5px 10px 20px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background: white;

  .role-button {
    margin: 5px 0 5px 5px;

    .filter {
      width: auto;
      margin-left: 10px;
    }

    .search-button {
      margin-left: 10px;
      float: right;
    }
  }

  .pagination {
    margin-top: 8px;
  }
}
</style>
