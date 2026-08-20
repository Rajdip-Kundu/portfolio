// ─── Internships / Research ────────────────────────────────
// Each entry maps to an internship card.
// image paths must match public/images/internships/...

export const internships = [
  {
    id: 'atul-jain',
    title: 'Research Internship',
    supervisor: 'Prof. Atul Jain',
    department: 'Department of Mechanical Engineering',
    institution: 'IIT Kharagpur',
    period: 'Summer 2025',
    researchArea: 'Additive Manufacturing & Structural Engineering',
    description: `Research involving Indian traditional Madhubani art inspired infill 
material for improved mechanical attributes of auxetic structures using 
3D-printing software and finite element analysis (ANSYS). The study 
explores how culturally-inspired infill geometries can enhance the 
compressive and tensile properties of auxetic metamaterials.`,
    tools: ['ANSYS', 'SolidWorks', 'Onshape', 'Python', 'FEA'],
    images: {
      main: '/images/internships/atul-jain/research-main.jpg',
      madhubaniInfill: '/images/internships/atul-jain/madhubani-infill.jpg',
      auxeticStructure: '/images/internships/atul-jain/auxetic-structure.jpg',
      printing3d: '/images/internships/atul-jain/3d-printing.jpg',
      ansysAnalysis: '/images/internships/atul-jain/ansys-analysis.jpg',
    },
    tags: ['Auxetic Structures', '3D Printing', 'FEA', 'Madhubani Art', 'ANSYS'],
    link: null,
  },
  {
    id: 'sikha-hota',
    title: 'Research Internship',
    supervisor: 'Prof. Sikha Hota',
    department: 'Department of Aerospace Engineering',
    institution: 'IIT Kharagpur',
    period: '2025',
    researchArea: 'Guidance, Navigation & Control',
    description: `Research involving optimized missile path planning and impact angle 
guidance. Work covers trajectory optimization and terminal guidance law 
design for improved impact accuracy, using numerical methods and simulation 
to evaluate guidance performance under various engagement scenarios.`,
    tools: ['MATLAB', 'Python', 'NumPy', 'Pandas', 'Simulink'],
    images: {
      main: '/images/internships/sikha-hota/research-main.jpg',
      trajectoryAnalysis: '/images/internships/sikha-hota/trajectory-analysis.jpg',
      pathPlanning: '/images/internships/sikha-hota/path-planning.jpg',
      guidanceResearch: '/images/internships/sikha-hota/guidance-research.jpg',
    },
    tags: ['Missile Guidance', 'Path Planning', 'Trajectory Optimization', 'GNC', 'MATLAB'],
    link: null,
  },
]
