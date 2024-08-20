<template>
  <el-sub-menu
    popper-class="test"
    v-if="props.configData.children"
    :index="props.configData.index"
  >
    <template #title>
      <el-icon v-if="props.configData.icon">
        <!-- 用于动态渲染组件的内置组件 :is 属性来指定要渲染的组件名称或组件对象 -->
        <component :is="props.configData.icon"></component>
      </el-icon>
      <span>{{ props.configData.title }}</span>
    </template>
    <template v-for="item in props.configData.children" :key="item.index">
      <resub :configData="item"></resub>
    </template>
  </el-sub-menu>
  <el-menu-item
    v-else
    :index="props.configData.index"
    :key="props.configData.index"
  >
    <el-icon v-if="props.configData.icon">
      <component :is="props.configData.icon"></component>
    </el-icon>
    <span>{{ props.configData.title }}</span>
  </el-menu-item>
</template>

<script setup lang="ts">
let props = defineProps(["configData"]);
// console.log(props.configData, "1212");
</script>

<style lang="less" scoped>
@bgColor: #0093fc;
@sideSelectColor: #5d5d5d;
// @sideSelectColor: #1e273a;
//侧边菜单收缩时弹出菜单选中颜色
.test {
  .el-menu {
    // 修改二级菜单整个背景颜色
    background-color: #121212;
    // 二级菜单中的子选项
    .el-menu-item {
      background-color: transparent !important;
      width: 100%;
      text-align: center;
      // 被选择的子选项
      &:not(.is-disabled):hover {
        color: #fff;
        background-color: @sideSelectColor !important;
        width: 100%;
        text-align: center;
      }
    }
    .el-menu-item.is-active {
      border-right: 4px solid @bgColor;
      color: @bgColor;
      background-color: @sideSelectColor;
    }
  }
  .el-menu--popup {
    color: #eee;
  }
}
</style>
