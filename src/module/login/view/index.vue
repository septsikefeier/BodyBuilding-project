<template>
    <div id="lg-content">
      <div class="lg-header">
        <p>ArcBody</p>
        <p>管理中心</p>
      </div>
      <div class="lg-form">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="登录" name="first">
            <router-view></router-view>
          </el-tab-pane>

          <el-tab-pane label="注册" name="second">
            <div class="input-content" v-if="registerStepOne">
              <!--输入序列号-->
              <el-form ref="serialNumFrom" :model="serialNumFrom" :rules="rules" class="register-step">
                <el-form-item prop="serialNumber">
                  <el-input placeholder="请在机身xxx处寻找" v-model="serialNumFrom.serialNumber">
                    <template slot="prepend">序列号</template>
                  </el-input>
                </el-form-item>
              </el-form>
              <div class="login-btn" @click="nextStep('serialNumFrom')">
                下一步
              </div>
            </div>
            <!--注册表单-->
            <div class="input-content" v-if="registerStepTwo">
              <el-form ref="registerFrom" :model="registerFrom" :rules="rules" class="register-step">
                <el-form-item prop="userName">
                  <el-input placeholder="建议填写健身房名称" v-model="registerFrom.userName">
                    <template slot="prepend">用户名</template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="mailbox">
                  <el-input placeholder="请输入邮箱" v-model="registerFrom.mailbox">
                    <template slot="prepend">邮&nbsp;&nbsp;&nbsp;箱</template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input placeholder="请输入密码" type="password" v-model="registerFrom.password">
                    <template slot="prepend">密&nbsp;&nbsp;&nbsp;码</template>
                  </el-input>
                </el-form-item>
                <citySelect @transmitData="getCityData">
                  <P slot="cityError" v-if="cityError" class="error-text">请选择城市</P>
                </citySelect>
                <p class="notes-style">已阅读并接受<span class="clause">使用条款</span> 和 <span class="clause">隐私政策</span></p>
                <div class="login-btn" style="margin-top: 15px" @click="clickRegister('registerFrom')">
                  注册
                </div>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>
<script>
  import citySelect from '../../.././components/citySelect.vue'
  import api from '../../.././vuex/api'
  export default {
    data () {
      return {
        activeName: 'first',
        registerStepOne: true,
        registerStepTwo: false,
        cityError: false,
        serialNumFrom: {
          serialNumber: ''
        },
        registerFrom: {
          userName: '',
          mailbox: '',
          password: '',
          selectProv: '',
          selectCity: ''
        },
        rules: {
          serialNumber: [
            { required: true, message: '请填写序列号', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          mailbox: [
            { required: true, message: '请填写邮箱地址', trigger: 'blur' },
            { pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/, message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码', trigger: 'blur' }
          ],
        }
      }
    },
    watch: {
      'registerFrom.selectCity' (val, oldVal){
        this.cityError = false
      }
    },
    components: {
      citySelect
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      clickRegister(formName) {
        // 表单校验
        if ( this.registerFrom.selectCity === '') {
          this.cityError = true
          return false
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              showClose: true,
              message: '注册成功',
              type: 'success'
            })
            setTimeout(function () {
              location.reload()
            },1000)
            // 验证成功后操作
//            api.SendMail(this.mailForm).then(function (data) {
//              console.log('成功')
//              this.$message.error('您输入的序列号不存在')
//            }).catch(function (error) {
//              console.log('失败')
//            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      getCityData(prov, city) {
        this.registerFrom.selectProv = prov
        this.registerFrom.selectCity = city
      },
      nextStep(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.registerStepOne = false
            this.registerStepTwo = true
//        api.RegisterNumber(this.mailForm).then(function (data) {
//          console.log('成功')
//          this.$message.error('您输入的序列号不存在');
//          }).catch(function (error) {
//            console.log('失败')
//          })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  #lg-content {
    .el-tabs__nav {
      float: none;
      height: 60px;
    }
    .el-tabs__active-bar { /*滚动条*/
      left: 140px;
      top: 56px;
      background-color: #02d1b1;
    }
    .el-tabs__header { /*头部*/
      height: 60px;
    }
    .el-tabs__item { /*头部文字*/
      top: 9px;
    }
    .el-tabs__item.is-active {
      color:#02d1b1;
    }
    .el-select .el-input {
      width: 110px;
    }
    .el-form-item {
      margin: 0;
    }
    .el-form-item__content {
      margin-top: 20px;
    }
    .notes-style {
      font-size: 12px;
      line-height: 52px;
      text-align: left;
    }
    .clause {
      color: #02d1b1;
    }
    #citySelect {
      margin-top: 22px;
      position: relative;
    }
    .register-step {
      .el-form-item__error {
        left: 63px;
      }
    }
  }
</style>
