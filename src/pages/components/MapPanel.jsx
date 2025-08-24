import React, { useEffect, useRef } from "react";
import { useProjectStore } from "/src/stores/projectStore";

export default function MapPanel() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const overlaysRef = useRef([]);
  const markersRef = useRef([]);
  const clustererRef = useRef(null);

  const projects = useProjectStore((state) => state.filteredProjects);
  const selectedId = useProjectStore((state) => state.selectedProjectId);

  // ✅ MarkerClustering 로컬 스크립트 로드 (public/MarkerClustering.js)
  useEffect(() => {
    const existingScript = document.getElementById("marker-clustering");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "/MarkerClustering.js";
      script.id = "marker-clustering";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (
      !window.naver ||
      !projects.length ||
      !window.naver.maps.MarkerClustering
    )
      return;

    const center = new window.naver.maps.LatLng(36.5, 127.5);
    mapInstance.current = new window.naver.maps.Map(mapRef.current, {
      center,
      zoom: 7,
      zoomControl: true,
    });

    renderMarkers();

    return () => {
      if (clustererRef.current) clustererRef.current.clear();
      overlaysRef.current.forEach((o) => o.setMap(null));
    };
  }, [projects]);

  useEffect(() => {
    if (!selectedId || !mapInstance.current) return;
    const selected = projects.find((p) => p.id === selectedId);
    if (!selected) return;

    const position = new window.naver.maps.LatLng(selected.lat, selected.lng);
    mapInstance.current.setZoom(15);
    mapInstance.current.panTo(position);
  }, [selectedId]);

  const renderMarkers = () => {
    if (clustererRef.current) clustererRef.current.clear();
    overlaysRef.current.forEach((o) => o.setMap(null));
    overlaysRef.current = [];

    markersRef.current = projects.map((project) => {
      const { lat, lng, logo, builder, units, year, region, projectName } =
        project;
      const position = new window.naver.maps.LatLng(lat, lng);

      const marker = new window.naver.maps.Marker({
        position,
        map: null,
      });

      const overlayContent = `
        <div style="background:white;border:1px solid #ccc;padding:8px;border-radius:6px;min-width:180px;box-shadow:0 2px 8px rgba(0,0,0,0.2)">
          <img src="${logo}" alt="${builder}" style="height:20px;margin-bottom:4px" />
          <div style="font-weight:bold;">${builder}</div>
          <div>${projectName}</div>
          <div>${units}세대 · ${year}년 · ${region}</div>
        </div>
      `;

      const overlay = new window.naver.maps.OverlayView({
        position,
        content: overlayContent,
        map: null,
      });

      window.naver.maps.Event.addListener(marker, "mouseover", () => {
        overlay.setMap(mapInstance.current);
      });
      window.naver.maps.Event.addListener(marker, "mouseout", () => {
        overlay.setMap(null);
      });

      overlaysRef.current.push(overlay);
      return marker;
    });

    // ✅ 클러스터링 적용
    clustererRef.current = new window.naver.maps.MarkerClustering({
      map: mapInstance.current,
      markers: markersRef.current,
      minClusterSize: 2,
      maxZoom: 13,
      gridSize: 100,
      icons: [],
      indexGenerator: [10, 100, 200, 500, 1000],
      stylingFunction: (clusterMarker, count) => {
        const el = clusterMarker.getElement();
        el.style.background = "#2563eb";
        el.style.color = "white";
        el.style.borderRadius = "50%";
        el.style.padding = "6px";
        el.style.fontSize = "12px";
      },
    });
  };

  return <div ref={mapRef} className="w-full h-full" />;
}
