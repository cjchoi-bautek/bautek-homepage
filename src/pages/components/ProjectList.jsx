// src/components/ProjectList.jsx
import React from "react";
import { useProjectStore } from "/src/stores/projectStore";
import clsx from "clsx";

export default function ProjectList() {
  const projects = useProjectStore((state) => state.filteredProjects);
  const selectedId = useProjectStore((state) => state.selectedProjectId);
  const setSelected = useProjectStore((state) => state.setSelectedProjectId);

  // 준공년도 내림차순으로 정렬
  const sortedProjects = [...projects].sort((a, b) => b.year - a.year);

  return (
    <div className="divide-y">
      {sortedProjects.map((project) => (
        <div
          key={project.id}
          className={clsx(
            "p-4 cursor-pointer transition-colors",
            project.id === selectedId
              ? "bg-blue-100"
              : "hover:bg-gray-100"
          )}
          onClick={() => setSelected(project.id)}
        >
          <div className="flex items-center gap-2">
            <img
              src={project.logo}
              alt={project.builder}
              className="h-5 w-auto"
            />
            <div className="font-semibold">{project.projectName}</div>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {project.builder} · {project.units}세대 · {project.year}년 · {project.region}
          </div>
        </div>
      ))}
    </div>
  );
}
