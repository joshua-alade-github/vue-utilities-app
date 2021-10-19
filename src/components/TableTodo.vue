<template>
  <table class="table table-success table-striped table-hover mt-3 table-bordered">
    <thead>
    <tr>
        <th scope="col">Task</th>
        <th scope="col">Status</th>
        <th scope="col" class="text-center">Edit</th>
        <th scope="col" class="text-center">Delete</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(task, index) in this.$parent.tasks" :key="index">
        <td :class="{'to-do-finished': task.status === 'Finished'}">{{task.name}}</td>
        <td style="width: 100px">
        <div @click="changeStatus(index)" class="to-do-pointer"
            :class="{
            'text-danger': task.status === 'To-do',
            'text-success': task.status === 'Finished',
            'to-do-inProg': task.status === 'In-progress',
            }"
        >
            <span>{{task.status}}</span>
        </div>
        </td>
        <td>
        <div @click="editTask(index)" class="text-center to-do-pointer">
            <span class="fa fa-pen"></span>
        </div>
        </td>
        <td>
        <div @click="deleteTask(index)" class="text-center to-do-pointer">
            <span class="fa fa-trash"></span>
        </div>
        </td>
    </tr>
    </tbody>
  </table>
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