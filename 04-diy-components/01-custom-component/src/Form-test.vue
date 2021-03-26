<template>
  <LgForm class="form" ref="form" :model="user" :rules="rules">
    <LgFormItem label="用户名" prop="username">
      <!-- <lg-input v-model="user.username"></lg-input> -->
      <lg-input
        :value="user.username"
        @input="user.username = $event"
        placeholder="请输入用户名"
      ></lg-input>
    </LgFormItem>
    <LgFormItem label="密码" prop="password">
      <lg-input type="password" v-model="user.password"></lg-input>
    </LgFormItem>
    <LgFormItem>
      <LgButton @click="login">登录</LgButton>
    </LgFormItem>
  </LgForm>
</template>

<script>
import LgForm from "./form/Form";
import LgFormItem from "./form/FormItem";
import LgInput from "./form/Input";
import LgButton from "./form/Button";
export default {
  components: {
    LgForm,
    LgFormItem,
    LgInput,
    LgButton,
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
          },
          {
            min: 6,
            max: 12,
            message: "请输入6-12位密码",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert("验证成功");
        } else {
          alert('验证失败')
        }
      });
    },
  },
};
</script>

<style>
.form {
  width: 30%;
  margin: 150px auto;
}
</style>