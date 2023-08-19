<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="ContactPerson" name="first" lazy>
        <el-form :model="form2" label-width="170px">
          <el-form-item label="Title">
            <el-input v-model="form2.title"></el-input>
          </el-form-item>
          <el-form-item label="FirstName">
            <el-input v-model="form2.firstName"></el-input>
          </el-form-item>
          <el-form-item label="LastName">
            <el-input v-model="form2.lastName"></el-input>
          </el-form-item>
          <el-form-item label="CorrespondanceLang">
            <el-input v-model="form2.correspondanceLang"></el-input>
          </el-form-item>
          <el-form-item label="Country">
            <el-input v-model="form2.country"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit()">submit</el-button>
            <!--<el-button>cancel</el-button>-->
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from 'vue';
import axios from "axios";
import { useRoute, useRouter } from 'vue-router';

export default {
  setup(props) {
    const activeName = ref('first');
    const route = useRoute()
    const router = useRouter()
    const form2 = ref({
      title: '',
      firstName: '',
      lastName: '',
      correspondanceLang: '',
      country: ''
    });

    const getPersonData = async () => {
      axios({
        method: "post",
        url: "http://localhost:10086/sysUser/getPersonById",
        data:
          "&userId=" +
          route.query.userId,
      })
        .then((response) => {
          form2.value = response.data
          console.log(form2.value)
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const onSubmit = async () => {
      axios({
        method: "post",
        url: "http://localhost:10086/sysUser/updatePerson",
        data:
          "&contactPersonNumber=" +
          route.query.userId +
          "&title=" +
          form2.value.title +
          "&firstName=" +
          form2.value.firstName +
          "&lastName=" +
          form2.value.lastName +
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

    onMounted(() => {
      getPersonData()
    });

    return {
      activeName,
      form2,
      onSubmit
    };
  }
}
</script>

<style scoped></style>
