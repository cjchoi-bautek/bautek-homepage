// src/utils/loadProjectData.js
import * as XLSX from "xlsx";

export async function loadProjectData(xlsxPath = "/data/sites.xlsx") {
  const response = await fetch(xlsxPath);
  const arrayBuffer = await response.arrayBuffer();

  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawData = XLSX.utils.sheet_to_json(sheet);

  // 데이터 정제
  const cleanData = rawData.map((item, idx) => ({
    id: item["id"] ?? `site-${idx}`,
    builder: item["건설사"] ?? "",
    logo: item["로고"] ?? "/KeyClient/default.png",
    projectName: item["현장명"] ?? "",
    units: item["세대수"] ?? 0,
    year: typeof item["준공년도"] === "string" 
            ? parseInt(item["준공년도"].replace("년", ""), 10) 
            : item["준공년도"],
    region: item["지역"] ?? "",
    lat: item["위도"],
    lng: item["경도"],
  }));

  return cleanData;
}
