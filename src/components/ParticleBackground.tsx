import React, { useCallback } from 'react';
import styled from 'styled-components';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const ParticleBackgroundDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;

const particleOptions = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        area: 800
      }
    },
    color: {
      value: '#a5b4fc'
    },
    shape: {
      type: 'circle'
    },
    opacity: {
      value: { min: 0.1, max: 0.5 },
      animation: {
        enable: true,
        speed: 0.5,
        minimumValue: 0.1,
        sync: false
      }
    },
    size: {
      value: { min: 1, max: 4 },
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0.5,
        sync: false
      }
    },
    links: {
      enable: true,
      distance: 150,
      color: '#a5b4fc',
      opacity: 0.3,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.2,
      direction: 'none' as const,
      random: true,
      straight: false,
      outModes: {
        default: 'out' as const
      },
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 600
      }
    }
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: ['grab', 'bubble']
      },
      onClick: {
        enable: true,
        mode: 'push'
      }
    },
    modes: {
      grab: {
        distance: 140,
        links: {
          opacity: 0.5
        }
      },
      bubble: {
        distance: 200,
        size: 10,
        duration: 0.5
      },
      push: {
        quantity: 4
      }
    }
  },
  detectRetina: true
};

export function ParticleBackgroundComponent() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <ParticleBackgroundDiv>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleOptions}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </ParticleBackgroundDiv>
  );
}