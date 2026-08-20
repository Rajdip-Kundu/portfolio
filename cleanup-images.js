import fs from 'fs';
import path from 'path';

// The only 11 images the UI actually uses by default for the cards
const keep = [
  "profile/profile-main.jpg",
  "internships/atul-jain/research-main.jpg",
  "internships/sikha-hota/research-main.jpg",
  "projects/mapathon/project-main.jpg",
  "projects/fixed-wing-aircraft/project-main.jpg",
  "projects/aerial-robotics-analysis/project-main.jpg",
  "engagements/aerial-robotics-kharagpur.jpg",
  "engagements/ncc-air-wing.jpg",
  "extracurricular/debate.jpg",
  "extracurricular/guitar.jpg",
  "extracurricular/volunteering.jpg"
];

function cleanDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      cleanDirectory(fullPath);
      // Remove directory if empty
      if (fs.readdirSync(fullPath).length === 0) {
        fs.rmdirSync(fullPath);
      }
    } else {
      // Check if file should be kept
      const relPath = path.relative(path.join(process.cwd(), 'public', 'images'), fullPath).replace(/\\/g, '/');
      if (!keep.includes(relPath)) {
        fs.unlinkSync(fullPath);
        console.log(`Deleted: ${relPath}`);
      }
    }
  }
}

cleanDirectory(path.join(process.cwd(), 'public', 'images'));
console.log("Cleanup complete. Kept only the 11 primary images.");
