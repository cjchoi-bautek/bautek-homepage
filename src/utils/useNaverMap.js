// src/utils/useNaverMap.js
import { useEffect, useRef } from "react";

const useNaverMap = (coords, title, addressHtml) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.naver || !mapRef.current) {
      console.warn("네이버 지도 API가 로드되지 않았거나 mapRef가 비어있습니다.");
      return;
    }

    const { naver } = window;
    const location = new naver.maps.LatLng(coords.lat, coords.lng);

    const map = new naver.maps.Map(mapRef.current, {
      center: location,
      zoom: 12,
      minZoom: 10,
      maxZoom: 19,
      mapTypeControl: true,
      zoomControl: true,
    });

    const marker = new naver.maps.Marker({
      position: location,
      map,
      title,
    });

    const infoWindow = new naver.maps.InfoWindow({
      content: addressHtml,
    });

    infoWindow.open(map, marker);

    // Clean-up (optional, mostly unnecessary with Naver API)
    return () => {
      // 예: map.destroy() 같은 명시적 정리는 불필요하지만 참조 제거 가능
      // mapRef.current = null;
    };
  }, [coords.lat, coords.lng, title, addressHtml]); // 변경에 반응

  return mapRef;
};

export default useNaverMap;
