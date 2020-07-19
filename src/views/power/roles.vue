<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>

      <el-table :data="roleList" border stripe>
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row v-for="(item1 , index) in scope.row.children" :key="index">
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row v-for="(item2,index2) in item1.children" :key="index2">
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      @close="removeRightById(scope.row,item3.id)"
                      closable
                      type="warning"
                      v-for="(item3,index3) in item2.children"
                      :key="index3"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="分配权限" :visible.sync="setDialogVisible" width="50%" @close="setClosed">
      <el-tree
        node-key="id"
        default-expand-all
        show-checkbox
        :data="rightsList"
        :props="treeProps"
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="setDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allot">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleList: [],
      setDialogVisible: false,
      rightsList: [],
      treeProps: {
        label: "authName",
        children: "children"
      },
      defKeys: [],
      roleId:''
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    async allot() {
        const keys=[
            ...this.$refs.treeRef.getCheckedKeys(),
            ...this.$refs.treeRef.getHalfCheckedKeys(),
        ]
        const idStr =keys.join(',')
       const {data :res } = await this.$http.post(`roles/${this.roleId}/rights`,{rids:idStr})
       if (res.meta.status !==200) {
           return this.$msg.error("失败")
       }
       this.$msg.success("成功")
       this.getRolesList()
       this.setDialogVisible =false;
    },
    setClosed() {
      this.defKeys = [];
    },
    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }

      node.children.forEach(element => this.getLeafKeys(element, arr));
    },

    async showSetRightDialog(role) {
        this.roleId =role.id
      const { data: res } = await this.$http.get("rights/tree");
      if (res.meta.status !== 200) {
        return;
      }
      this.rightsList = res.data;

      this.getLeafKeys(role, this.defKeys);

      this.setDialogVisible = true;
    },

    async removeRightById(role, rightId) {
      const confirmRes = await this.$confirm(
        "此操作将删除信息，是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (confirmRes !== "confirm") {
        return;
      }

      const { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      );
      if (res.meta.status !== 200) {
        return this.$msg.error("删除失败");
      }
      role.children = res.data;
    },
    async getRolesList() {
      const { data: res } = await this.$http.get("roles");

      if (res.meta.status !== 200) {
        return this.$msg.error("获取角色列表失败");
      }

      this.roleList = res.data;
    }
  }
};
</script>

<style>
</style>