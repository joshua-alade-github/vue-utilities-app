<template>
  <div class="container">
    <h2 class="text-center mt-5 mb-5">ToDo</h2>

    <div class="d-flex">
      <button v-show="tableLayout" @click="changeLayout">
        <i class="fas fa-th"></i>
      </button>
      <button v-show="!tableLayout" @click="changeLayout">
        <i class="fas fa-list-ol"></i>
      </button>
      <input v-model="task" type="text" placeholder="Enter task" class="form-control">
      <button @click="submitTask" class="btn btn-warning rounded-0">Submit</button>
    </div>

    <TableTodo v-show="tableLayout" />
    <GridTodo v-show="!tableLayout" />
  </div>
</template>

<script>
import TableTodo from "@/components/TableTodo"
import GridTodo from "@/components/GridTodo"
export default {
  name: 'Todo',
  components: {
    TableTodo,
    GridTodo,
  },
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
      tableLayout: true,
    }
  },
  mounted() {
      if (localStorage.getItem("tasks") !== null) {
        this.tasks = JSON.parse(localStorage.getItem("tasks"));
      }
      if (localStorage.getItem("tableLayout") !== null) {
        this.tableLayout = JSON.parse(localStorage.getItem("tableLayout"));
      }
    },
  methods: {
    changeLayout() {
      this.tableLayout = !this.tableLayout
      localStorage.setItem("tableLayout", JSON.stringify(this.tableLayout));
    },
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

<style lang="scss">
  .to-do-pointer:hover {
    cursor: pointer;
    background: rgb(136, 175, 157);
  }
  .to-do-finished {
    text-decoration: line-through;
  }
  .to-do-inProg{
    color: rgb(255, 136, 0);
  }
</style>
