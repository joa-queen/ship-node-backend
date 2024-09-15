#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectName = process.argv[2];

if (!projectName) {
  console.error('Please specify the project name');
  process.exit(1);
}

const currentDir = process.cwd();
const projectDir = path.join(currentDir, projectName);

// Create project directory
fs.mkdirSync(projectDir, { recursive: true });

// Copy template files
const templateDir = path.join(__dirname, '..');
const filesToCopy = [
  '.eslintrc.json',
  'package.json',
  '.gitignore',
  'README.md',
  'tsconfig.json',
];

filesToCopy.forEach(file => {
  const sourcePath = path.join(templateDir, file);
  const destPath = path.join(projectDir, file);

  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
  } else {
    console.warn(`Warning: ${file} not found in the template. Skipping...`);
  }
});

// Copy entire src directory
const srcDir = path.join(templateDir, 'src');
const destSrcDir = path.join(projectDir, 'src');
fs.cpSync(srcDir, destSrcDir, { recursive: true });

// Update package.json
const packageJsonPath = path.join(projectDir, 'package.json');
const packageJson = require(packageJsonPath);
packageJson.name = projectName;
packageJson.version = '1.0.0';
delete packageJson.bin;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { cwd: projectDir, stdio: 'inherit' });

console.log(`Project ${projectName} created successfully!`);
