<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Address" name="first" lazy>
        <el-form :model="form" label-width="120px">
          <el-form-item label="Title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="Name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="PostalCode">
            <el-input v-model="form.postalCode"></el-input>
          </el-form-item>
          <el-form-item label="City">
            <el-input v-model="form.city"></el-input>
          </el-form-item>
          <el-form-item label="Country">
            <el-input v-model="form.country"></el-input>
          </el-form-item>
          <el-form-item label="Language">
            <el-input v-model="form.language"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Account" name="second" lazy>
        <el-form :model="form" label-width="170px">
          <el-form-item label="Reconciliation acct">
            <el-input v-model="form.reconciliationAcct"></el-input>
          </el-form-item>
          <el-form-item label="Sort Key ">
            <el-input v-model="form.sortKey"></el-input>
          </el-form-item>
          <el-form-item label="Payment Terms">
            <el-input v-model="form.paymentTerms"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Orders" name="third" lazy>
        <el-form :model="form" label-width="170px">
          <el-form-item label="SalesDistrict">
            <el-input v-model="form.salesDistrict"></el-input>
          </el-form-item>
          <el-form-item label="Currency">
            <el-input v-model="form.currency"></el-input>
          </el-form-item>
          <el-form-item label="PriceGroup">
            <el-input v-model="form.priceGroup"></el-input>
          </el-form-item>
          <el-form-item label="CustomerStats.Group">
            <el-input v-model="form.customerStatsGroup"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Shopping" name="fourth" lazy>
        <el-form :model="form" label-width="170px">
          <el-form-item label="DeliveryPriority">
            <el-input v-model="form.deliveryPriority"></el-input>
          </el-form-item>
          <el-form-item label="ShippingConditions">
            <el-input v-model="form.shippingConditions"></el-input>
          </el-form-item>
          <el-form-item label="DeliveringPlant">
            <el-input v-model="form.deliveringPlant"></el-input>
          </el-form-item>
          <el-form-item label="MaxPartDeliviries">
            <el-input v-model="form.maxPartDeliviries"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Billing" name="five" lazy>
        <el-form :model="form" label-width="170px">
          <el-form-item label="Incoterms">
            <el-input v-model="form.incoterms"></el-input>
          </el-form-item>
          <el-form-item label="IncotermsLocation">
            <el-input v-model="form.incotermsLocation"></el-input>
          </el-form-item>
          <el-form-item label="PaymentTerms">
            <el-input v-model="form.paymentTerms"></el-input>
          </el-form-item>
          <el-form-item label="AcctAssmtGrpCust">
            <el-input v-model="form.acctAssmtGrpCust"></el-input>
          </el-form-item>
          <el-form-item label="TaxClassific">
            <el-input v-model="form.taxClassific"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit()">submit</el-button>
            <el-button>cancel</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from "axios";
import { useRoute, useRouter } from "vue-router"

export default {
  setup(props, { emit }) {
    const activeName = ref('first');
    const route = useRoute()
    const router = useRouter()
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

    const getCustomerData = async () => {
      try {
        const response = await axios.post("http://localhost:10086/sysUser/getCustomerById", "&userId=" + route.query.userId);
        form.value = response.data
        console.log(form.value)
      } catch (error) {
        console.error(error);
      }
    };

    const onSubmit = async () => {
      axios({
        method: "post",
        url: "http://localhost:10086/sysUser/update",
        data:
          "&customerId=" +
          route.query.userId +
          "&title=" +
          form.value.title +
          "&name=" +
          form.value.name +
          "&postalCode=" +
          form.value.postalCode +
          "&city=" +
          form.value.city +
          "&country=" +
          form.value.country +
          "&salesDistrict=" +
          form.value.salesDistrict +
          "&customerStatsGroup=" +
          form.value.customerStatsGroup +
          "&language=" +
          form.value.language +
          "&reconciliationAcct=" +
          form.value.reconciliationAcct +
          "&sortKey=" +
          form.value.sortKey +
          "&paymentTerms=" +
          form.value.paymentTerms +
          "&salesOrg=" +
          form.value.salesOrg +
          "&division=" +
          form.value.division +
          "&currency=" +
          form.value.currency +
          "&priceGroup=" +
          form.value.priceGroup +
          "&deliveryPriority=" +
          form.value.deliveryPriority +
          "&shippingConditions=" +
          form.value.shippingConditions +
          "&deliveringPlant=" +
          form.value.deliveringPlant +
          "&maxPartDeliviries=" +
          form.value.maxPartDeliviries +
          "&incoterms=" +
          form.value.incoterms +
          "&incotermsLocation=" +
          form.value.incotermsLocation +
          "&acctAssmtGrpCust=" +
          form.value.acctAssmtGrpCust +
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

    // Use the onMounted lifecycle hook from the Composition API
    onMounted(() => {
      getCustomerData();
    });

    return {
      activeName,
      form,
      onSubmit
    };
  }
}
</script>