// src/leafletIconFix.js
import L from "leaflet";
// 아이콘 파일을 모듈로 가져오면 번들러가 최종 경로를 알아서 바꿔줍니다.
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// ❶ 커스텀 기본 아이콘 객체 생성
export const defaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

// ❷ 전역 기본 아이콘으로 지정 (이 줄이 핵심)
L.Marker.prototype.options.icon = defaultIcon;