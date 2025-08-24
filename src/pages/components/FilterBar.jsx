// src/components/FilterBar.jsx
import React, { useEffect, useState } from "react";
import { useProjectStore } from "/src/stores/projectStore";

const ALL_REGIONS = ["수도권", "중부권", "호남권", "영남권"];

export default function FilterBar() {
  const allProjects = useProjectStore((state) => state.projects);
  const setFilters = useProjectStore((state) => state.setFilters);
  const filters = useProjectStore((state) => state.filters);

  const [allYears, setAllYears] = useState([]);
  const [allBuilders, setAllBuilders] = useState([]);

  useEffect(() => {
    // 고유 준공년도 리스트
    const years = Array.from(
      new Set(allProjects.map((p) => p.year))
    ).sort((a, b) => b - a);
    setAllYears(years);

    // 고유 건설사 리스트
    const builders = Array.from(
      new Set(
        allProjects.flatMap((p) => p.builder.split("/").map((b) => b.trim()))
      )
    ).sort();
    setAllBuilders(builders);
  }, [allProjects]);

  const toggleCheckbox = (type, value) => {
    const prev = filters[type];
    const updated = prev.includes(value)
      ? prev.filter((v) => v !== value)
      : [...prev, value];
    setFilters({ ...filters, [type]: updated });
  };

  return (
    <div className="space-y-4 text-sm text-gray-800">
      {/* 지역 필터 */}
      <div>
        <div className="font-semibold mb-1">지역</div>
        <div className="flex flex-wrap gap-3">
          {ALL_REGIONS.map((region) => (
            <label key={region} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={filters.region.includes(region)}
                onChange={() => toggleCheckbox("region", region)}
              />
              {region}
            </label>
          ))}
        </div>
      </div>

      {/* 준공년도 필터 */}
      <div>
        <div className="font-semibold mb-1">준공년도</div>
        <div className="flex flex-wrap gap-3">
          {allYears.map((year) => (
            <label key={year} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={filters.year.includes(year)}
                onChange={() => toggleCheckbox("year", year)}
              />
              {year}
            </label>
          ))}
        </div>
      </div>

      {/* 건설사 드롭다운 */}
      <div>
        <div className="font-semibold mb-1">건설사</div>
        <select
          multiple
          className="w-full border px-2 py-1"
          value={filters.builders}
          onChange={(e) =>
            setFilters({
              ...filters,
              builders: Array.from(e.target.selectedOptions).map((opt) => opt.value),
            })
          }
        >
          {allBuilders.map((builder) => (
            <option key={builder} value={builder}>
              {builder}
            </option>
          ))}
        </select>
        <div className="text-xs text-gray-500 mt-1">
          ⌘ or Ctrl 키를 누르고 복수 선택 가능
        </div>
      </div>
    </div>
  );
}
