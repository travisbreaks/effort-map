import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Assemble dist/ for the Cloudflare deploy. The Worker serves travismakes.org/effort-map/
// and Workers Static Assets maps URL paths to files, so the page must sit at
// dist/effort-map/index.html. site/index.html remains the downloadable deliverable;
// this only copies it. Nothing is deleted: both outputs are overwritten in place.
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
fs.mkdirSync(path.join(dist, 'effort-map'), {recursive: true});
fs.copyFileSync(path.join(root, 'site/index.html'), path.join(dist, 'effort-map/index.html'));
fs.copyFileSync(path.join(root, 'deploy/_headers'), path.join(dist, '_headers'));
console.log('Packaged dist/effort-map/index.html and dist/_headers for deployment.');
