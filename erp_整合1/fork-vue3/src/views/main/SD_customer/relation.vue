<template>
  <div>
    <h2>BP RELATIONSHIP</h2>
    <el-form :model="form" style="width: 500px;margin-left: 600px" label-width="160px">
      <el-form-item label="Relationship Catehory" prop="relationshipAtegory">
        <el-select v-model="form.relationshipAtegory" filterable placeholder="select">
          <el-option label="Has Contact Person" value="BUR001" key="BUR001"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Business Partner1">
        <el-select v-model="form.businessPartner1" filterable placeholder="select">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="Business Partner2">
        <el-select v-model="form.businessPartner2" filterable placeholder="select">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Search Term">
        <el-input v-model="form.searchTerm"></el-input>
      </el-form-item>

      <el-form-item label="Valid From">
        <el-input v-model="form.validFrom"></el-input>
      </el-form-item>

      <el-form-item label="Vaild To">
        <el-input v-model="form.validTo"></el-input>
      </el-form-item>

      <el-form-item label="VIP">
        <el-input v-model="form.vip"></el-input>
      </el-form-item>

      <el-form-item label="Department">
        <el-input v-model="form.department"></el-input>
      </el-form-item>

      <el-form-item label="Functions">
        <el-input v-model="form.functions"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from "vue-router"

export default {
  name: 'relation',
  setup() {
    const form = ref({
      relationshipAtegory: '',
      businessPartner1: '',
      businessPartner2: '',
      searchTerm: '',
      validFrom: '',
      validTo: '',
      vip: '',
      department: '',
      functions: ''
    });
    const router = useRouter()
    const options = ref([]);
    const options2 = ref([]);

    const onSubmit = () => {
      console.log('submit!');
      axios({
        method: "post",
        url: "http://localhost:10086/sysUser/insertRelationShip",
        data:
          "&relationshipAtegory=" +
          form.value.relationshipAtegory +
          "&searchTerm=" +
          form.value.searchTerm +
          "&businessPartner1=" +
          form.value.businessPartner1 +
          "&businessPartner2=" +
          form.value.businessPartner2 +
          "&validFrom=" +
          form.value.validFrom +
          "&validTo=" +
          form.value.validTo +
          "&vip=" +
          form.value.vip +
          "&department=" +
          form.value.department +
          "&functions=" +
          form.value.functions,
      })
        .then((response) => {
          console.log(response);
          router.push({ path: "/" });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getCustomers = () => {
      axios.get("http://localhost:10086/sysUser/selectCustomers")
        .then((response) => {
          console.log("============customer==========" + JSON.stringify(response.data));
          response.data.forEach((item) => {
            options.value.push({ label: item.name, value: item.customerId });
          });
        });
    };

    const getContactPerson = () => {
      axios.get("http://localhost:10086/sysUser/selectContactPerson")
        .then((response) => {
          console.log("============ContactPerson==========" + JSON.stringify(response.data));
          response.data.forEach((item) => {
            options2.value.push({ label: item.firstName, value: item.contactPersonNumber });
          });
        });
    };

    onMounted(() => {
      getCustomers();
      getContactPerson();
    });

    return {
      form,
      options,
      options2,
      onSubmit
    };
  }
}
</script>

<style scoped></style>
