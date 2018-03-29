import datePicker from './datePicker.vue';

const datePickerInstaller = {
  install (Vue) {
    Vue.component(datePicker.name, datePicker);
  }
}

if (typeof window !== undefined && window.Vue) {
  window.Vue.use(datePickerInstaller)
}

export default datePickerInstaller

