// src/stores/projectStore.js
import { create } from "zustand";

export const useProjectStore = create((set) => ({
  projects: [],
  filteredProjects: [],
  selectedProjectId: null,
  filters: {
    region: [],      // 예: ['수도권', '영남권']
    year: [],        // 예: [2024, 2023]
    builders: [],    // 예: ['GS건설', 'DL이앤씨']
  },

  // 초기 프로젝트 로드
  setProjects: (projects) =>
    set((state) => ({
      projects,
      filteredProjects: projects, // 최초에는 전체로 시작
    })),

  // 필터 설정
  setFilters: (filters) =>
    set((state) => {
      const filtered = state.projects.filter((p) => {
        const regionMatch =
          state.filters.region.length === 0 || state.filters.region.includes(p.region);
        const yearMatch =
          state.filters.year.length === 0 || state.filters.year.includes(p.year);
        const builderMatch =
          state.filters.builders.length === 0 ||
          state.filters.builders.some((b) => p.builder.includes(b));
        return regionMatch && yearMatch && builderMatch;
      });

      return {
        filters,
        filteredProjects: filtered,
      };
    }),

  // 선택된 프로젝트 ID 설정 (지도/목록 연동용)
  setSelectedProjectId: (id) => set({ selectedProjectId: id }),
}));
