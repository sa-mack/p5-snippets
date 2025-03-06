#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs';
import path from 'path';

const DEFAULTS_DIR = path.join(process.cwd(), 'defaults'); // Default files directory
const SKETCHES_DIR = path.join(process.cwd(), 'sketches'); // Sketches directory
const TOOLS_DIR = path.join(process.cwd(), 'palet-tools'); // Directory for reusable p5 tools

// Ensure TOOLS_DIR exists
if (!fs.existsSync(TOOLS_DIR)) {
  fs.mkdirSync(TOOLS_DIR, { recursive: true });
}

// Read available tools from palet-tools
const toolFiles = fs.readdirSync(TOOLS_DIR).filter(file => file.endsWith('.js'));

// Commander setup
const sketchCommand = program
  .command('new <name>')
  .description('Create a new p5.js sketch');

// Add each tool as a CLI option dynamically
toolFiles.forEach(tool => {
  const optionName = `--${tool.replace('.js', '')}`; // Convert filename to CLI option
  sketchCommand.option(optionName, `Include ${tool}`);
});

sketchCommand.action((name, options) => {
  const sketchDir = path.join(SKETCHES_DIR, name);
  if (!fs.existsSync(sketchDir)) {
    fs.mkdirSync(sketchDir, { recursive: true });
  }

  // Paths for new sketch files
  const sketchFile = path.join(sketchDir, 'sketch.js');
  const indexFile = path.join(sketchDir, 'index.html');
  const cssFile = path.join(sketchDir, 'style.css');

  // Read default files if they exist
  const sketchContent = fs.existsSync(path.join(DEFAULTS_DIR, 'sketch.js'))
    ? fs.readFileSync(path.join(DEFAULTS_DIR, 'sketch.js'), 'utf-8')
    : '';

  let indexContent = fs.existsSync(path.join(DEFAULTS_DIR, 'index.html'))
    ? fs.readFileSync(path.join(DEFAULTS_DIR, 'index.html'), 'utf-8')
    : '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n</body>\n</html>'; // Fallback content

  const cssContent = fs.existsSync(path.join(DEFAULTS_DIR, 'style.css'))
    ? fs.readFileSync(path.join(DEFAULTS_DIR, 'style.css'), 'utf-8')
    : '';

  // Collect selected tools
  let scriptTags = [`<script src="sketch.js"></script>`];

  toolFiles.forEach(tool => {
    const toolOption = tool.replace('.js', '');
    if (options[toolOption]) {
      const toolSource = path.join(TOOLS_DIR, tool);
      const toolDest = path.join(sketchDir, tool);
      fs.copyFileSync(toolSource, toolDest);
      scriptTags.push(`<script src="${tool}"></script>`);
    }
  });

  // Insert script tags before </body>
  indexContent = indexContent.replace('</body>', scriptTags.join('\n') + '\n</body>');

  // Write files
  fs.writeFileSync(sketchFile, sketchContent, 'utf-8');
  fs.writeFileSync(indexFile, indexContent, 'utf-8');
  fs.writeFileSync(cssFile, cssContent, 'utf-8');

  console.log(`Sketch created in: ${sketchDir}`);
});

// Parse CLI arguments
program.parse(process.argv);
