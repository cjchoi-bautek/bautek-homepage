// src/pages/CompletedSitesPage.jsx
import React, { useEffect } from "react";
import { loadProjectData } from "/src/utils/loadProjectData";
import { useProjectStore } from "/src/stores/projectStore";

import FilterBar from "/src/pages/components/FilterBar";
import MapPanel from "/src/pages/components/MapPanel";
import ProjectList from "/src/pages/components/ProjectList";

export default function CompletedSitesPage() {
  const setProjects = useProjectStore((state) => state.setProjects);

  useEffect(() => {
    loadProjectData().then((data) => {
      setProjects(data);
    });
  }, [setProjects]);

  return (
    <div className="flex h-screen">
      {/* 왼쪽 지도: 3/5 */}
      <div className="w-3/5 h-full border-r">
        <MapPanel />
      </div>

      {/* 오른쪽 필터 + 목록: 2/5 */}
      <div className="w-2/5 h-full flex flex-col">
        {/* 필터바 */}
        <div className="p-4 border-b">
          <FilterBar />
        </div>

        {/* 목록 */}
        <div className="flex-1 overflow-y-auto">
          <ProjectList />
        </div>
      </div>
    </div>
  );
}
