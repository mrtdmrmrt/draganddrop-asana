<template>
  <div id="app" class="home__container">
    <div
      class="sections__wrapper"
      v-for="(section, key) in sections"
      :key="key"
    >
      <div class="sections__wrapper--header">
        <div class="sections__wrapper--header-title">
          <input
            type="text"
            :placeholder="section.name"
            v-model="section.name"
            @keyup.enter="changeSectionName(section.id, section.name)"
          />
        </div>
        <div class="sections__wrapper--header-icons">
          <i
            class="fa fa-plus mr-1"
            @click="addTask(section.id, section.tasks)"
          ></i>
          <i class="fa fa-trash" @click="removeSelection(section.id)"></i>
        </div>
      </div>
      <div
        class="sections__wrapper--task"
        :style="[
          section.tasks.length != 0 ? { 'background-image': 'none' } : '',
        ]"
      >
        <div
          v-if="section.tasks.length == 0"
          class="sections__wrapper--task-add"
        >
          <div @click="addTask(section.id)">
            <i class="fa fa-plus"></i> <span>Add Task</span>
          </div>
        </div>
        <draggable class="draggable" :list="section.tasks" group="task">
          <div
            class="card__wrapper mt-1"
            v-for="task in section.tasks"
            :key="task.id"
          >
            <div class="card__wrapper--header">
              <div
                class="card__wrapper--header-color"
                :style="{ backgroundColor: task.backgroundColor }"
              ></div>
              <div class="card__wrapper--header-icons">
                <i
                  class="fa fa-ellipsis-h"
                  @click="popupCardDetail(task.id)"
                ></i>
              </div>
            </div>

            <div class="card__wrapper--body">
              <input
                type="text"
                :placeholder="task.name"
                v-model="task.name"
                @keyup.enter="changeTaskName(section.id, section.tasks)"
              />
            </div>

            <div class="card__wrapper--footer">
              <div class="card__wrapper--footer-date">{{ task.date }}</div>
              <div class="card__wrapper--footer-icons">
                <i class="fa fa-th"></i>
              </div>
            </div>
            <div
              v-if="tmpTaskId === task.id"
              class="card__wrapper--popup-detail"
            >
              <div class="card__wrapper--popup-detail--colors">
                <div class="card__wrapper--popup-detail--colors-title">
                  Colors:
                </div>
                <div
                  class="card__wrapper--popup-detail--colors-color"
                  v-for="(color, key) in colors"
                  :key="key"
                >
                  <div
                    :style="{
                      backgroundColor: color,
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                    }"
                    @click="
                      changeColor(section.id, section.tasks, task.id, color)
                    "
                  ></div>
                </div>
              </div>
              <div
                class="card__wrapper--popup-detail--delete"
                @click="removeTask(section.id, section.tasks, task.id)"
              >
                <i class="fa fa-trash"></i>
                Delete Task
              </div>
            </div>
          </div>
        </draggable>
      </div>
    </div>
    <div class="add-sections__wrapper" @click="addSelection">
      <i class="fa fa-plus mr-1"></i>
      <span>Add Section</span>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { asanaService } from './services';
import { v4 as uuidv4 } from 'uuid';
export default {
  name: 'App',
  components: {
    draggable,
  },
  data() {
    return {
      newTask: '',
      sections: [],
      colors: [
        '#DBE9F9',
        '#D1D9E3',
        '#CCDAD9',
        '#FFE9CC',
        '#E9CFCF',
        '#CCCCCC',
        '#EBEBEB',
      ],
      isPopupCardDetail: false,
      tmpTaskId: null,
      changeSelection: '',
    };
  },
  computed: {
    itemsLength() {
      return this.sections.map((section) => section.tasks);
    },
  },
  watch: {
    sections: {
      handler(val, oldVal) {
        if (oldVal.length != 0) this.changeSelection = val;
      },
      deep: true,
    },
    itemsLength(newValue, oldVal) {
      if (oldVal.length != 0) this.changeSectionTask();
    },
  },
  methods: {
    join(t, a, s) {
      function format(m) {
        let f = new Intl.DateTimeFormat('en', m);
        return f.format(t);
      }
      return a.map(format).join(s);
    },
    addSelection() {
      //this.sections.push({ id: 4, name: 'Section 4', tasks: [] });
      asanaService
        .fetchSectionAdd('New Section')
        .then((res) => {
          console.log('new section=>', res);
        })
        .catch(() => {});
    },
    removeSelection(id) {
      //this.sections.splice(index, 1);
      asanaService
        .fetchSectionDelete(id)
        .then((res) => {
          console.log('delete section=>', res);
        })
        .catch(() => {});
    },
    addTask(id, tasks) {
      // this.sections
      //   .filter((section) => section.id == id)
      //   .map((task) => {
      //     task.tasks.push({
      //       id: 4,
      //       name: 'Eklendi',
      //       backgroundColor: 'red',
      //       date: '15 Ağu',
      //     });
      //   });
      let tmpTask = [];
      let format = [{ day: 'numeric' }, { month: 'short' }];
      let newDate = this.join(new Date(), format, ' ');
      if (tasks && tasks.length != 0) {
        tmpTask = [
          {
            id: uuidv4(),
            name: 'New Task',
            backgroundColor: '#E9CFCF',
            date: newDate,
          },
          ...tasks,
        ];
      } else {
        tmpTask = [
          {
            id: uuidv4(),
            name: 'New Task',
            backgroundColor: '#E9CFCF',
            date: newDate,
          },
        ];
      }
      asanaService
        .fetchSectionTaskAdd(id, tmpTask)
        .then((res) => {
          console.log('change task=>', res);
        })
        .catch(() => {});
    },
    changeColor(sId, tasks, tId, color) {
      // this.sections.forEach((section) => {
      //   section.tasks.forEach((task) => {
      //     if (task.id == id) {
      //       task.backgroundColor = color;
      //     }
      //   });
      // });
      let tmpTasks = [];
      tasks.forEach((task) => {
        if (task.id == tId) {
          task.backgroundColor = color;
          tmpTasks = tasks;
        }
      });

      asanaService
        .fetchSectionTaskUpdate(sId, tmpTasks)
        .then((res) => {
          console.log('change task=>', res);
        })
        .catch(() => {});
    },
    popupCardDetail(id) {
      if (this.tmpTaskId != id) this.tmpTaskId = id;
      else this.tmpTaskId = null;
    },
    getAsanaSection() {
      asanaService
        .fetchSectionList()
        .then((res) => {
          this.sections = res;
        })
        .catch(() => {});
    },
    changeSectionName(id, name) {
      asanaService
        .fetchSectionNameUpdate(id, name)
        .then((res) => {
          console.log('change section name=>', res);
        })
        .catch(() => {});
    },
    changeTaskName(id, tasks) {
      asanaService
        .fetchTaskNameUpdate(id, tasks)
        .then((res) => {
          console.log('change task name=>', res);
        })
        .catch(() => {});
    },
    changeSectionTask() {
      this.changeSelection.forEach((section) => {
        asanaService
          .fetchSectionTaskUpdate(section.id, section.tasks)
          .then((res) => {
            console.log('change task=>', res);
          })
          .catch(() => {});
      });
    },
    removeTask(sId, tasks, tId) {
      let _tmpTask = '';

      _tmpTask = tasks.filter((task) => task.id != tId);
      asanaService
        .fetchTaskDelete(sId, _tmpTask)
        .then((res) => {
          console.log('change task =>', res);
        })
        .catch(() => {});
    },
  },
  created() {
    this.getAsanaSection();
  },
};
</script>

<style lang="scss">
@import './assets/styles/index.scss';
</style>
