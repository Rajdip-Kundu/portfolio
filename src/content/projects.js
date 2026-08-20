// ─── Projects ─────────────────────────────────────────────
// Each entry renders a project card.
// image paths must match public/images/projects/...

export const projects = [
  {
    id: 'mapathon',
    title: 'Mapathon — Flood Risk Mapping',
    subtitle: 'IITB · ISRO · AICTE',
    period: '2024',
    category: 'Geospatial Analysis',
    description: `Developed a detailed map explaining flood-prone areas in western West 
Bengal affected by the Damodar River, as part of Mapathon organized by 
IIT Bombay, ISRO, and AICTE. The project involved spatial data 
processing, flood risk identification, and cartographic presentation of 
hydrological patterns.`,
    contributions: [
      'Spatial analysis of the Damodar River basin',
      'Flood-prone area identification and mapping',
      'Cartographic presentation of hydrological data',
      'Integration of satellite imagery and GIS data',
    ],
    tools: ['GIS', 'QGIS', 'Remote Sensing', 'Python'],
    images: {
      main: '/images/projects/mapathon/project-main.png',
      floodMap: '/images/projects/mapathon/flood-map.jpg',
      westBengalMap: '/images/projects/mapathon/west-bengal-map.jpg',
      mapathonEvent: '/images/projects/mapathon/mapathon-event.jpg',
    },
    tags: ['GIS', 'ISRO', 'Remote Sensing', 'Flood Mapping'],
    link: null,
    color: '#38bdf8',
  },
  {
    id: 'fixed-wing-aircraft',
    title: 'Fixed-Wing Aircraft Design & Build',
    subtitle: 'Control Line · RC · Payload',
    period: '2024 — 2025',
    category: 'Aircraft Design',
    description: `Designed and built a fixed-wing Control Line model aircraft from scratch, 
developing full understanding of aerodynamic principles, structural 
integrity, and propulsion balance. Subsequently designed and built an RC 
controlled aircraft with the capability to deploy payloads — integrating 
servo mechanisms, flight control, and payload-release systems.`,
    contributions: [
      'Full aircraft design from aerodynamic calculations',
      'Structural build of Control Line model aircraft',
      'RC aircraft with autonomous payload deployment',
      'Servo integration and flight control systems',
      'Test flights and performance evaluation',
    ],
    tools: ['Autodesk Fusion', 'OpenRocket', 'SolidWorks', 'Arduino'],
    images: {
      main: '/images/projects/fixed-wing-aircraft/project-main.jpg',
      controlLineAircraft: '/images/projects/fixed-wing-aircraft/control-line-aircraft.jpg',
      rcAircraft: '/images/projects/fixed-wing-aircraft/rc-aircraft.jpg',
      aircraftBuild: '/images/projects/fixed-wing-aircraft/aircraft-build.jpg',
      aircraftFlight: '/images/projects/fixed-wing-aircraft/aircraft-flight.jpg',
      payloadSystem: '/images/projects/fixed-wing-aircraft/payload-system.jpg',
    },
    tags: ['Aircraft Design', 'RC Aircraft', 'Payload System', 'Aerodynamics'],
    link: null,
    color: '#818cf8',
  },
  {
    id: 'aerial-robotics-analysis',
    title: 'Airfoil & Stress Analysis',
    subtitle: 'Aerial Robotics Kharagpur',
    period: '2024',
    category: 'Structural Analysis · CFD',
    description: `Comprehensive structural and aerodynamic analysis for Aerial Robotics 
Kharagpur. Conducted stress analysis for different shapes suitable for 
drone arm manufacturing using ANSYS, identifying optimal geometry for 
weight-to-strength performance. Performed air-flow analysis and CFD 
simulation around an airfoil using ANSYS Fluent to evaluate lift and 
drag coefficients across varying angles of attack.`,
    contributions: [
      'ANSYS stress analysis for drone arm geometries',
      'Airfoil selection and performance analysis',
      'CFD simulation of air-flow around airfoil',
      'Comparative analysis of structural configurations',
      'Results documentation and recommendation report',
    ],
    tools: ['ANSYS', 'ANSYS Fluent', 'SolidWorks', 'MATLAB', 'Python'],
    images: {
      main: '/images/projects/aerial-robotics-analysis/project-main.png',
      airfoilAnalysis: '/images/projects/aerial-robotics-analysis/airfoil-analysis.jpg',
      airfoilSimulation: '/images/projects/aerial-robotics-analysis/airfoil-simulation.jpg',
      ansysStressAnalysis: '/images/projects/aerial-robotics-analysis/ansys-stress-analysis.jpg',
      droneArmAnalysis: '/images/projects/aerial-robotics-analysis/drone-arm-analysis.jpg',
      simulationResult: '/images/projects/aerial-robotics-analysis/simulation-result.jpg',
    },
    tags: ['ANSYS', 'CFD', 'Structural Analysis', 'Airfoil', 'Drone'],
    link: null,
    color: '#34d399',
  },
]
