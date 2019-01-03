<template>
  <div id="app">
    <div class="header">
      <div class="logo">
        <img src="../chrome/icon_128.png" alt>
      </div>
      <div class="title">在线翻译</div>
    </div>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-select v-model="language" placeholder="请选择语言">
          <el-option label="自动检测语言" key="auto" value="自动检测语言"></el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="handleTranslate">翻译</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 6}"
        placeholder="请输入内容"
        v-model="query"
        @keyup.enter.native="handleTranslate"
        clearable
      ></el-input>
    </el-row>
    <el-row>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 6}"
        placeholder="请输入内容"
        v-model="result"
      ></el-input>
    </el-row>
  </div>
</template>

<script>
import md5 from "./util/md5";

const appKey = "54e65200a6dcd9b3";
const key = "T44I0MMbhsLJ5Sk15gP74hlT73zMCYog";
const salt = new Date().getTime();

const errorCode = {
  '101': '缺少必填的参数，出现这个情况还可能是et的值和实际加密方式不对应',
  '102': '不支持的语言类型',
  '103': '翻译文本过长',
  '104': '不支持的API类型',
  '105': '不支持的签名类型',
  '106': '不支持的响应类型',
  '107': '不支持的传输加密类型',
  '108': 'appKey无效，注册账号， 登录后台创建应用和实例并完成绑定， 可获得应用ID和密钥等信息，其中应用ID就是appKey（ 注意不是应用密钥）',
  '109': 'batchLog格式不正确',
  '110': '无相关服务的有效实例',
  '111': '开发者账号无效',
  '113': 'q不能为空',
  '201': '解密失败，可能为DES,BASE64,URLDecode的错误',
  '202': '签名检验失败',
  '203': '访问IP地址不在可访问IP列表',
  '205': '请求的接口与选择的接入方式不一致',
  '301': '辞典查询失败',
  '302': '翻译查询失败',
  '303': '服务端的其它异常',
  '401': '账户已经欠费',
  '411': '访问频率受限,请稍后访问',
  '2005': 'ext参数不对',
  '2006': '不支持的voice'
}

export default {
  name: "popup",
  data() {
    return {
      language: '自动检测语言',
      query: "",
      from: "auto",
      to: "auto",
      result: ""
    };
  },
  methods: {
    handleTranslate() {
      const str1 = appKey + this.query + salt + key;
      const sign = md5(str1);
      const options = {
        type: 'post',
        data: {
          // q: this.query,
          q: encodeURI(this.query),
          appKey: appKey,
          salt: salt,
          from: this.from,
          to: this.to,
          sign: sign
        }
      }
      this.$request('http://openapi.youdao.com/api', options).then(res => {
        if (res.errorCode === '0') {
          this.result = res.translation[0];
        } else {
          this.$message(`${res.errorCode}: ${errorCode[res.errorCode]}`);
        }
      }, err => {
        this.$message(err);
      })
    }
  }
};
</script>

<style>
#app {
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  font-size: 14px;
  color: #1f2d3d;
  width: 300px;
  min-height: 320px;
  margin: 20px 20px 40px;
  position: relative;
  overflow: hidden;
}
.header {
  height: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.header .logo {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
.header .logo img {
  width: 100%;
}
.header .title {
  font-size: 20px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
</style>


