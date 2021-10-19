<template>
  <div class="row">
    <div class="col-sm-6 card w-24 m-1" style="width: 20rem; background: rgb(199,219,210);" v-for="(task, index) in this.$parent.tasks" :key="index">
      <div class="card-body">
        <h5 class="card-title"
          :class="{'to-do-finished': task.status === 'Finished'}"
        >
          Task: {{task.name}}
        </h5>
        <div @click="changeStatus(index)" class="to-do-pointer"
            :class="{
            'text-danger': task.status === 'To-do',
            'text-success': task.status === 'Finished',
            'to-do-inProg': task.status === 'In-progress',
            }"
        >
            <span>{{task.status}}</span>
        </div>
        <div @click="editTask(index)" class="text-center to-do-pointer">
            <span class="fa fa-pen"></span>
        </div>
        <div @click="deleteTask(index)" class="text-center to-do-pointer">
            <span class="fa fa-trash"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "TableTodo",
    methods: {
    submitTask() {
      this.$parent.submitTask();
    },
    changeStatus(index) {
      this.$parent.changeStatus(index);
    },
    deleteTask(index) {
      this.$parent.deleteTask(index);
    },
    editTask(index) {
      this.$parent.editTask(index);
    },
  },
}
</script>