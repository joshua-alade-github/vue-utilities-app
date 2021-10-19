<template>
  <div class="container">
    <h2 class="text-center mt-5 mb-5">ToDo</h2>

    <div class="d-flex">
      <input v-model="task" type="text" placeholder="Enter task" class="form-control">
      <button @click="submitTask" class="btn btn-warning rounded-0">Submit</button>
    </div>

    <table class="table table-success table-striped table-hover mt-3 table-bordered">
      <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col">Status</th>
          <th scope="col" class="text-center">#</th>
          <th scope="col" class="text-center">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td :class="{'finished': task.status === 'Finished'}">{{task.name}}</td>
          <td style="width: 100px">
            <div @click="changeStatus(index)" class="pointer"
              :class="{
                'text-danger': task.status === 'To-do',
                'text-success': task.status === 'Finished',
                'inProg': task.status === 'In-progress',
              }"
            >
              <span>{{task.status}}</span>
            </div>
          </td>
          <td>
            <div @click="editTask(index)" class="text-center pointer">
              <span class="fa fa-pen"></span>
            </div>
          </td>
          <td>
            <div @click="deleteTask(index)" class="text-center pointer">
              <span class="fa fa-trash"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'Todo',
  data() {
    return {
      task: '',
      editedTask: null,
      statuses: ["To-do", "In-progress", "Finished"],
      tasks: [
        {
          name: 'My todo task',
          status: 'To-do',
        }
      ],
    }
  },
  mounted() {
        this.tasks = JSON.parse(localStorage.getItem("tasks"));
    },
  methods: {
    submitTask() {
      if (this.task.length === 0) return;
      
      if (this.editedTask != null) {
        this.tasks[this.editedTask].name = this.task;
        this.editedTask = null;
      } else {
        this.tasks.push({
          name: this.task,
          status: "To-do",
        });
      }
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      this.task = "";
    },
    changeStatus(index) {
      let newIndex = this.statuses.indexOf(this.tasks[index].status);
      if (++newIndex > 2) newIndex = 0;
      this.tasks[index].status = this.statuses[newIndex];
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    editTask(index) {
      this.task = this.tasks[index].name;
      this.editedTask = index;
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
  },
}
</script>

<style lang="scss" scoped>
  .pointer:hover {
    cursor: pointer;
    background: rgb(136, 175, 157);
  }
  .finished {
    text-decoration: line-through;
  }
  .inProg{
    color: rgb(255, 136, 0);
  }
</style>
