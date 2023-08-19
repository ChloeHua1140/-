<template>
  <div class="app-container">
    <el-select v-model="value" filterable placeholder="Business Partner Type">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-tabs v-if="value == 'customer'" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Address" name="first">
        <el-form :model="form" label-width="120px">
          <el-form-item prop="name" style="padding-left:2px">
            <span slot="label">
              <span style="color: dimgray;font-size: 20px;"><strong>Name</strong>
              </span>
            </span>
          </el-form-item>
          <el-form-item label="Title" required="true">
            <el-col :span="3">
              <el-input v-model="form.title"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="Name" required="true">
            <el-col :span="3">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="Salutation">
            <el-col :span="3">
              <el-input v-model="form.salutation"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item prop="standard address" style="padding-left: 40px">
            <span slot="label">
              <span style="color: dimgray;font-size: 20px"><strong>Standard Address</strong>
              </span>
            </span>
          </el-form-item>
          <el-form-item label="City" required="true">
            <el-col :span="2">
              <el-input v-model="form.city"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="Region">
            <el-col :span="1">
              <el-input v-model="form.region"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="Street">
            <el-col :span="8">
              <el-input v-model="form.street"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="PostalCode" required="true">
            <el-col :span="3">
              <el-input v-model="form.postalCode"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="Country" required="true">
            <el-col :span="6" style="display: flex;">
              <el-select filterable v-model="form.country" @change="getCountryInfo">
                <el-option v-for="item in countryData" :value="item">{{ item }}</el-option>
              </el-select>
              <span>
                {{ countryInfo }}
              </span>
            </el-col>
          </el-form-item>
          <el-form-item label="Company" required="true">
            <el-col :span="6" style="display: flex;">
              <el-select filterable v-model="form.company" @change="getCompanyInfo">
                <el-option v-for="item in companyData" :value="item">{{ item }}</el-option>
              </el-select>
              <span>
                {{ companyInfo }}
              </span>
            </el-col>
          </el-form-item>
          <el-form-item prop="communication" style="padding-left: 40px">
            <span slot="label">
              <span style="color: dimgray;font-size: 20px"><strong>Communication</strong>
              </span>
            </span>
          </el-form-item>
          <el-form-item label="Language" required="true">
            <el-col :span="2">
              <el-input v-model="form.language"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="Tel number">
            <el-col :span="6">
              <el-input v-model="form.tel_number"></el-input>
            </el-col>
          </el-form-item>
          <!---->
          <!---->

        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Customer: Account Management" name="second">
        <el-form :model="form" label-width="170px">
          <el-form-item label="Reconciliation acct" required="true">
            <el-col :span="5">
              <el-input v-model="form.reconciliationAcct"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="Sort Key " required="true">
            <el-col :span="2">
              <el-input v-model="form.sortKey"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="Payment Terms" required="true">
            <el-col :span="2">
              <el-input v-model="form.paymentTerms"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="Previous Account NO">
            <el-col :span="5">
              <el-input v-model="form.previous_accountNO"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="Personnel NO">
            <el-col :span="5">
              <el-input v-model="form.PersonnelNO"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Sales and Distribution: Orders" name="third">
        <el-form :model="form" label-width="170px">
          <el-form-item label="SalesDistrict" required="true">
            <el-col :span="2">
              <el-input v-model="form.salesDistrict"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="Currency" required="true">
            <el-col :span="6" style="display:flex;">
              <el-select filterable v-model="form.currency" @change="getCurrencyInfo">
                <el-option v-for="item in currencyData" :value="item">{{ item }}</el-option>
              </el-select>
              <span>
                {{ currencyInfo }}
              </span>
              <!-- <el-input v-model="form.currency"></el-input> -->
            </el-col>
          </el-form-item>
          <el-form-item label="Sales Org" required="true">
            <el-col :span="6" style="display:flex;">
              <el-select filterable v-model="form.salesOrg" @change="getSalesOrgInfo">
                <el-option v-for="item in salesOrgData" :value="item">{{ item }}</el-option>
              </el-select>
              <span>
                {{ salesOrgInfo }}
              </span>
              <!-- <el-input v-model="form.currency"></el-input> -->
            </el-col>
          </el-form-item>
          <el-form-item label="Authorization Group">
            <el-col :span="2">
              <el-input v-model="form.authorization_group"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="PriceGroup" required="true">
            <el-col :span="2">
              <el-input v-model="form.priceGroup"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="CustomerStats.Group" required="true">
            <el-col :span="2">
              <el-input v-model="form.customerStatsGroup"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="Account at customer">
            <el-col :span="5">
              <el-input v-model=form.account_at_customer></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="Exchange Rate Type">
            <el-col :span="2">
              <el-input v-model="form.exchange_rate"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Sales and Distribution: Shipping" name="fourth">

        <el-form :model="form" label-width="170px">
          <el-form-item prop="shipping" style="padding-left:0px">
            <span slot="label">
              <span style="color: dimgray;font-size: 20px;"><strong>Shipping</strong>
              </span>
            </span>
          </el-form-item>
          <el-form-item label="Distr. Channel" required="true">
            <el-col :span="6" style="display:flex;">
              <el-select filterable v-model="form.channel" @change="getChannelInfo">
                <el-option v-for="item in channelData" :value="item">{{ item }}</el-option>
              </el-select>
              <span>
                {{ channelInfo }}
              </span>
              <!-- <el-input v-model="form.currency"></el-input> -->
            </el-col>
          </el-form-item>
          <el-form-item label="DeliveryPriority" required="true">
            <el-col :span="2">
              <el-input v-model="form.deliveryPriority"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="ShippingConditions" required="true">
            <el-col :span="3">
              <el-input v-model="form.shippingConditions"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="POD timeframe">
            <el-col :span="6">
              <el-input v-model="form.POD"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="DeliveringPlant" required="true">
            <el-col :span="2">
              <el-input v-model="form.deliveringPlant"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item prop="partial delivery" style="padding-left:50px">
            <span slot="label">
              <span style="color: dimgray;font-size: 20px;"><strong>Partial Delivery</strong>
              </span>
            </span>
          </el-form-item>
          <el-form-item label="Part.dlv./item">
            <el-col :span="1">
              <el-input v-model="form.part"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="MaxPartDeliviries" required="true">
            <el-col :span="1">
              <el-input v-model="form.maxPartDeliviries"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Sales and Distribution: Billing" name="five">
        <el-form :model="form" label-width="170px">
          <el-form-item prop="shipping" style="padding-left:46px">
            <span slot="label">
              <span style="color: dimgray;font-size: 20px;"><strong>Delivery and Payment Terms</strong>
              </span>
            </span>
          </el-form-item>
          <el-form-item label="Incoterms" required="true">
            <el-col :span="2">
              <el-input v-model="form.incoterms"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="IncotermsLocation" required="true">
            <el-col :span="4">
              <el-input v-model="form.incotermsLocation"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="PaymentTerms" required="true">
            <el-col :span="2">
              <el-input v-model="form.paymentTerms"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item prop="shipping" style="padding-left:0px">
            <span slot="label">
              <span style="color: dimgray;font-size: 20px;"><strong>Accounting</strong>
              </span>
            </span>
          </el-form-item>
          <el-form-item label="AcctAssmtGrpCust" required="true">
            <el-col :span="1">
              <el-input v-model="form.acctAssmtGrpCust"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="TaxClassific" required="true">
            <el-col :span="2">
              <el-input v-model="form.taxClassific"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addData()">SAVE</el-button>
            <el-button>CANCEL</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

    </el-tabs>
    <el-tabs v-if="value == 'contact person'" v-model="activeName2" @tab-click="handleClick">
      <el-tab-pane label="ContactPerson" name="first">
        <el-form :model="form2" label-width="170px">
          <el-form-item label="Title" required="true">
            <el-col :span="3">
              <el-input v-model="form2.title"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="FirstName" required="true">
            <el-col :span="3">
              <el-input v-model="form2.firstName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="LastName" required="true">
            <el-col :span="3">
              <el-input v-model="form2.lastName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="CorrespondanceLang" required="true">
            <el-col :span="2">
              <el-input v-model="form2.correspondanceLang"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="Country" required="true">
            <el-col :span="2">
              <el-input v-model="form2.country"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit2()">SAVE</el-button>
            <el-button>CANCEL</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

    </el-tabs>

  </div>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router"

export default {
  setup() {
    const activeName = ref('first');
    const activeName2 = ref('first');
    const router = useRouter()
    const value = ref('');
    const form = ref({
      title: '',
      name: '',
      postalCode: '',
      salesDistrict: '',
      customerStatsGroup: '',
      city: '',
      country: '',
      language: '',
      reconciliationAcct: '',
      sortKey: '',
      paymentTerms: '',
      salesOrg: '',
      division: '',
      currency: '',
      priceGroup: '',
      deliveryPriority: '',
      shippingConditions: '',
      deliveringPlant: '',
      maxPartDeliviries: '',
      incoterms: '',
      incotermsLocation: '',
      acctAssmtGrpCust: '',
      taxClassific: '',
    });
    const form2 = ref({
      title: '',
      firstName: '',
      lastName: '',
      correspondanceLang: '',
      country: ''
    });
    const options = ref([{
      value: 'Account Holder',
      label: 'Account Holder'
    }, {
      value: 'Agency',
      label: 'Agency'
    }, {
      value: 'customer',
      label: 'customer'
    }, {
      value: 'contact person',
      label: 'contact person'
    }, {
      value: 'Co-Applicant',
      label: 'Co-Applicant'
    }, {
      value: 'External Company',
      label: 'External Company'
    }, {
      value: 'Investor',
      label: 'Investor'
    }, {
      value: 'Legal Owner',
      label: 'Legal Owner'
    }, {
      value: 'Payer',
      label: 'Payer'
    }, {
      value: 'Vendor',
      label: 'Vendor'
    }]);

    const addData = () => {
      axios({
        method: "post",
        url: "http://localhost:10086/sysUser/insertCustomer",
        data: "&title=" +
          form.value.title +
          "&name=" +
          form.value.name +
          "&postalCode=" +
          form.value.postalCode+
          "&city=" +
          form.value.city +
          "&country=" +
          form.value.country +
          "&salesDistrict=" +
          form.value.salesDistrict +
          "&customerStatsGroup=" +
          form.value.customerStatsGroup +
          "&language=" +
          form.value.language+
          "&reconciliationAcct=" +
          form.value.reconciliationAcct +
          "&sortKey=" +
          form.value.sortKey +
          "&paymentTerms=" +
          form.value.paymentTerms+
          "&salesOrg=" +
          form.value.salesOrg +
          "&division=" +
          form.value.division +
          "&currency=" +
          form.value.currency+
          "&priceGroup=" +
          form.value.priceGroup +
          "&deliveryPriority=" +
          form.value.deliveryPriority +
          "&shippingConditions=" +
          form.value.shippingConditions+
          "&deliveringPlant=" +
          form.value.deliveringPlant+
          "&maxPartDeliviries=" +
          form.value.maxPartDeliviries+
          "&incoterms=" +
          form.value.incoterms+
          "&incotermsLocation=" +
          form.value.incotermsLocation+
          "&acctAssmtGrpCust=" +
          form.value.acctAssmtGrpCust+
          "&taxClassific=" +
          form.value.taxClassific,
      })
        .then((response) => {
          console.log(response);
          router.push({ path: "/" });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const onSubmit = () => {
      console.log('submit!');
    };

    const onSubmit2 = () => {
      axios({
        method: "post",
        url: "http://localhost:10086/sysUser/insert",
        data: "&title=" +
          form2.value.title +
          "&firstName=" +
          form2.value.firstName +
          "&lastName=" +
          form2.value.lastName+
          "&correspondanceLang=" +
          form2.value.correspondanceLang +
          "&country=" +
          form2.value.country,
      })
        .then((response) => {
          console.log(response);
          router.push({ path: "/" });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const salesOrgData = ref([])
    const getSalesOrgData = () => {
      axios({
        method: "get",
        url: "http://localhost:10086/static_data/salesOrg_list"
      })
        .then((response) => {
          salesOrgData.value = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const salesOrgInfo = ref('')
    const getSalesOrgInfo = (code) => {
      axios({
        method: "get",
        url: "http://localhost:10086/static_data/salesOrg_search?code=" + code
      })
        .then((response) => {
          salesOrgInfo.value = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getSalesOrgData()

    const currencyData = ref([])
    const getCurrencyData = () => {
      axios({
        method: "get",
        url: "http://localhost:10086/static_data/currency_list"
      })
        .then((response) => {
          currencyData.value = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const currencyInfo = ref('')
    const getCurrencyInfo = (code) => {
      axios({
        method: "get",
        url: "http://localhost:10086/static_data/currency_search?code=" + code
      })
        .then((response) => {
          currencyInfo.value = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getCurrencyData()

    const countryData = ref([])
    const getCountryData = () => {
      axios({
        method: "get",
        url: "http://localhost:10086/static_data/country_list"
      })
        .then((response) => {
          countryData.value = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const countryInfo = ref('')
    const getCountryInfo = (code) => {
      console.log(code)
      axios({
        method: "get",
        url: "http://localhost:10086/static_data/country_search?code=" + code
      })
        .then((response) => {
          countryInfo.value = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getCountryData()




    const channelData = ref([])
    const getChannelData = () => {
      axios({
        method: "get",
        url: "http://localhost:10086/static_data/cl_list"
      })
        .then((response) => {
          channelData.value = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const channelInfo = ref('')
    const getChannelInfo = (code) => {
      console.log(code)
      axios({
        method: "get",
        url: "http://localhost:10086/static_data/cl_search?code=" + code
      })
        .then((response) => {
          channelInfo.value = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getChannelData()


    const companyData = ref([])
    const getCompanyData = () => {
      axios({
        method: "get",
        url: "http://localhost:10086/static_data/company_list"
      })
        .then((response) => {
          companyData.value = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const companyInfo = ref('')
    const getCompanyInfo = (code) => {
      console.log(code)
      axios({
        method: "get",
        url: "http://localhost:10086/static_data/company_search?code=" + code
      })
        .then((response) => {
          companyInfo.value = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getCompanyData()
    return {
      companyInfo,
      companyData,
      getCompanyData,
      getCompanyInfo,
      channelData,
      getChannelInfo,
      channelInfo,
      salesOrgData,
      getSalesOrgInfo,
      salesOrgInfo,
      getCountryInfo,
      getCurrencyInfo,
      currencyData,
      currencyInfo,
      countryInfo,
      countryData,
      activeName,
      activeName2,
      value,
      form,
      form2,
      options,
      addData,
      onSubmit,
      onSubmit2
    };
  }
};
</script>

<style scoped>
tr {
  border: 1px solid #000;
}
</style>
