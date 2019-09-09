<template>
  <div class="dialog-container">
    <el-dialog :title="dialog.title" :visible.sync="dialog.show">
      <el-form ref="myform" :model="dialog.formData" :rules="form_rules" label-width="120px" style="margin:10px; width:auto;">
        <el-form-item label="收入类型" prop="type">
          <el-select v-model="dialog.formData.type" placeholder="请选择类型">
            <el-option
              :label="type_name"
              :value="type_name"
              v-for="(type_name,index) in form_type_list"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="describe" label="收支描述">
          <el-input v-model="dialog.formData.describe" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="income" label="收入">
          <el-input v-model="dialog.formData.income" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="expend" label="支出">
          <el-input v-model="dialog.formData.expend" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="cash" label="账户现金">
          <el-input v-model="dialog.formData.cash" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="备注">
          <el-input v-model="dialog.formData.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('myform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: Object
  },
  data () {
    return {
      form_type_list: [
        '提现',
        '提现手续费',
        '充值',
        '优惠券',
        '充值优惠券',
        '转账'
      ],
      form_rules: {
        describe: [
          {required: true, message: '收支描述不能为空', trigger: 'blur'}
        ],
        income: [
          {required: true, message: '收入不能为空', trigger: 'blur'}
        ],
        expend: [
          {required: true, message: '支出不能为空', trigger: 'blur'}
        ],
        cash: [
          {required: true, message: '账户现金不能为空', trigger: 'blur'}
        ],
        remark: [
          {required: true, message: '备注不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (myform) {
      this.$refs[myform].validate(valid => {
        const url = this.dialog.option === 'edit' ? `edit/${this.dialog.formData.id}` : 'add'
        if (valid) {
          // 提交表单
          this.$axios.post(`/api/profiles/${url}`, this.dialog.formData)
            .then(res => {
              // 添加成功
              this.$message({
                message: '数据添加成功',
                type: 'success'
              })
              // 重置表单
              this.resetForm(myform)
              // 执行父组件事件刷新数据
              this.$emit('update')
            })
            .catch(error => this.$message({message: error, type: 'error'}))
          // 隐藏表单
          this.dialog.show = false
        } else {
          this.dialog.show = true
        }
      })
    },
    // 重置表单函数
    resetForm (myform) {
      this.$refs[myform].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-container {
  width: 100px;
  display: inline-block;
}
</style>
