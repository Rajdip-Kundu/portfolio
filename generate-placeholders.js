import fs from 'fs';
import path from 'path';
import https from 'https';

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

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
         return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

async function main() {
  const publicImagesDir = path.join(process.cwd(), 'public', 'images');
  
  const batchSize = 5;
  for (let i = 0; i < images.length; i += batchSize) {
    const batch = images.slice(i, i + batchSize);
    await Promise.all(batch.map(async (imgPath) => {
      const fullPath = path.join(publicImagesDir, imgPath);
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const filename = path.basename(imgPath);
      // Generate a nice aerospace-themed placeholder with the filename written on it
      const url = `https://placehold.co/800x600/0d1117/38bdf8.jpg?text=Demo\\n${filename}`;
      
      try {
        await downloadImage(url, fullPath);
        console.log(`Created: ${imgPath}`);
      } catch (e) {
        console.error(`Failed ${imgPath}:`, e.message);
      }
    }));
  }
  console.log('All demo images generated successfully!');
}

main();
