import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import RunningProjectsSection from "./RunningProjectsSection";

/**
 * 엑셀 스키마(헤더 예시)
 * id, contractor, contractorLogo, name, units, lat, lng
 * 
 * 한국어 헤더를 쓰는 경우 columnMap으로 매핑 가능:
 *   { contractor: ["건설사"], name: ["현장명"], units: ["세대수"], lat: ["위도"], lng: ["경도"] }
 */
export default function RunningProjectsFromXLSX({
  fileUrl = "/data/sites.xlsx", // public/data/sites.xlsx 에 두면 바로 접근 가능
  sheetName,                    // 특정 시트명 선택(없으면 첫 시트)
  columnMap = {
    id: ["id", "ID"],
    contractor: ["contractor", "건설사"],
    contractorLogo: ["contractorLogo", "로고", "logo"],
    name: ["name", "현장명", "프로젝트명"],
    units: ["units", "세대수"],
    lat: ["lat", "위도"],
    lng: ["lng", "경도"],
  },
  ...rest // height, lockZoom 등 기존 RunningProjectsSection props 그대로 전달
}) {
  const [sites, setSites] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(fileUrl);
        if (!res.ok) throw new Error(`엑셀 파일을 불러올 수 없습니다 (${res.status})`);
        const buf = await res.arrayBuffer();
        const wb = XLSX.read(buf, { type: "array" });

        const wsName = sheetName || wb.SheetNames[0];
        if (!wsName) throw new Error("시트를 찾을 수 없습니다.");
        const ws = wb.Sheets[wsName];
        if (!ws) throw new Error(`시트 "${wsName}"을(를) 찾을 수 없습니다.`);

        // 시트 → JSON (각 행 = 객체)
        const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });

        // 헤더 매핑 도우미
        const pick = (row, keys) => {
          for (const k of keys) {
            if (k in row && row[k] !== "") return row[k];
            // 대소문자/공백 관대 매칭
            const key = Object.keys(row).find(
              (col) => col.trim().toLowerCase() === String(k).trim().toLowerCase()
            );
            if (key && row[key] !== "") return row[key];
          }
          return "";
        };

        const parsed = rows
          .map((r, idx) => {
            const id = String(pick(r, columnMap.id) || `row-${idx + 1}`);

            // 숫자 파싱(쉼표/공백 제거)
            const toNum = (v) => {
              if (v === null || v === undefined) return NaN;
              if (typeof v === "number") return v;
              const s = String(v).replace(/[ ,]/g, ""); // "1,234" → "1234"
              const n = parseFloat(s);
              return Number.isFinite(n) ? n : NaN;
            };

            const lat = toNum(pick(r, columnMap.lat));
            const lng = toNum(pick(r, columnMap.lng));
            const unitsRaw = toNum(pick(r, columnMap.units));

            return {
              id,
              contractor: String(pick(r, columnMap.contractor) || ""),
              contractorLogo: String(pick(r, columnMap.contractorLogo) || ""),
              name: String(pick(r, columnMap.name) || ""),
              units: Number.isFinite(unitsRaw) ? unitsRaw : 0,
              lat,
              lng,
            };
          })
          // 위도/경도 없는 행 제거
          .filter((r) => Number.isFinite(r.lat) && Number.isFinite(r.lng));

        // id 기준 중복 제거
        const seen = new Set();
        const uniq = parsed.filter((r) => (!seen.has(r.id) ? (seen.add(r.id), true) : false));

        if (!cancelled) setSites(uniq);
      } catch (e) {
        if (!cancelled) setError(e.message || "엑셀 파싱 실패");
      }
    })();

    return () => { cancelled = true; };
  }, [fileUrl, sheetName]);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 text-red-600">
        엑셀 로드 오류: {error}
      </div>
    );
  }

  return <RunningProjectsSection sites={sites} {...rest} />;
}
