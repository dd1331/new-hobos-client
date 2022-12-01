import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import goodAxios from "../common/good-axios";

export const useJobStore = defineStore("Job", () => {
  const state = reactive({ jobs: [] });
  async function fetchJobs() {
    const { data } = await goodAxios.get("job");
    state.jobs = data;
  }
  const getJobs = computed(() => state.jobs);
  return { fetchJobs, getJobs };
});
