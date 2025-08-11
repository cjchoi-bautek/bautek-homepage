// src/leafletIconFix.js
import L from "leaflet";
// 아이콘 파일을 모듈로 가져오면 번들러가 최종 경로를 알아서 바꿔줍니다.
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Leaflet 기본 아이콘 경로 재설정
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});
