import fs from 'fs';
import path from 'path';

// The path to the image you just uploaded (the smiley face)
const sourceImage = 'C:/Users/RAJDIP KUNDU/.gemini/antigravity/brain/7a1d35db-6e00-48ee-bf01-df77daf4f1c5/.user_uploaded/media_1787238008678.png';

const images = [
  "profile/profile-main.jpg",
  "profile/profile-secondary.jpg",
  "profile/profile-technical.jpg",
  "hero/aerospace-background.jpg",
  "education/campus-iit-kharagpur.jpg",
  "internships/atul-jain/research-main.jpg",
  "internships/atul-jain/madhubani-infill.jpg",
  "internships/atul-jain/auxetic-structure.jpg",
  "internships/atul-jain/3d-printing.jpg",
  "internships/atul-jain/ansys-analysis.jpg",
  "internships/sikha-hota/research-main.jpg",
  "internships/sikha-hota/trajectory-analysis.jpg",
  "internships/sikha-hota/path-planning.jpg",
  "internships/sikha-hota/guidance-research.jpg",
  "projects/mapathon/project-main.jpg",
  "projects/mapathon/flood-map.jpg",
  "projects/mapathon/west-bengal-map.jpg",
  "projects/mapathon/mapathon-event.jpg",
  "projects/fixed-wing-aircraft/project-main.jpg",
  "projects/fixed-wing-aircraft/control-line-aircraft.jpg",
  "projects/fixed-wing-aircraft/rc-aircraft.jpg",
  "projects/fixed-wing-aircraft/aircraft-build.jpg",
  "projects/fixed-wing-aircraft/aircraft-flight.jpg",
  "projects/fixed-wing-aircraft/payload-system.jpg",
  "projects/aerial-robotics-analysis/project-main.jpg",
  "projects/aerial-robotics-analysis/airfoil-analysis.jpg",
  "projects/aerial-robotics-analysis/airfoil-simulation.jpg",
  "projects/aerial-robotics-analysis/ansys-stress-analysis.jpg",
  "projects/aerial-robotics-analysis/drone-arm-analysis.jpg",
  "projects/aerial-robotics-analysis/simulation-result.jpg",
  "achievements/jee-advanced.jpg",
  "achievements/jee-mains.jpg",
  "achievements/wbjee.jpg",
  "engagements/aerial-robotics-kharagpur.jpg",
  "engagements/ncc-air-wing.jpg",
  "extracurricular/debate.jpg",
  "extracurricular/guitar.jpg",
  "extracurricular/volunteering.jpg",
  "certifications/certification-01.jpg",
  "certifications/certification-02.jpg",
  "certifications/certification-03.jpg",
  "gallery/gallery-01.jpg",
  "gallery/gallery-02.jpg",
  "gallery/gallery-03.jpg",
  "gallery/gallery-04.jpg"
];

const publicImagesDir = path.join(process.cwd(), 'public', 'images');

try {
  for (const imgPath of images) {
    const destPath = path.join(publicImagesDir, imgPath);
    
    // Ensure the folder exists
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Copy the uploaded image to overwrite the placeholder
    fs.copyFileSync(sourceImage, destPath);
    console.log(`Replaced: ${imgPath}`);
  }
  console.log('\nSuccess: Replaced all image placeholders with the uploaded image!');
} catch (error) {
  console.error('Error replacing images:', error.message);
}
