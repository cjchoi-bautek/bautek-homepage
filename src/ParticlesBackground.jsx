// src/components/ParticlesBackground.jsx
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },
        particles: {
          number: { value: 80, density: { enable: true, area: 800 } },
          color: { value: "#ffffff" },
          links: { enable: true, color: "#ffffff", distance: 120, opacity: 0.3, width: 1 },
          move: { enable: true, speed: 1 },
          opacity: { value: 0.5 },
          size: { value: 2 },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" } },
          modes: { repulse: { distance: 100 } },
        },
        detectRetina: true,
      }}
    />
  );
}