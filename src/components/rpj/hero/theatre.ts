import { getProject, types } from '@theatre/core';
import { buildHeroState } from './theatre-state';

// Theatre throws if getProject is called twice with different configs (HMR, remounts),
// so the project and its objects live at module scope.
const project = getProject('RPJ Exports', { state: buildHeroState() });
export const heroSheet = project.sheet('Hero');

export const cameraObj = heroSheet.object('Camera', {
  x: types.number(0, { nudgeMultiplier: 0.05 }),
  y: types.number(0, { nudgeMultiplier: 0.05 }),
  z: types.number(8, { nudgeMultiplier: 0.05 }),
  fov: types.number(34, { range: [10, 80] }),
});

export const globeObj = heroSheet.object('Globe', {
  spin: types.number(0, { nudgeMultiplier: 0.01 }),
  scale: types.number(1, { range: [0, 3] }),
  offsetX: types.number(0, { nudgeMultiplier: 0.05 }),
  offsetY: types.number(0, { nudgeMultiplier: 0.05 }),
});

export const atmosphereObj = heroSheet.object('Atmosphere', {
  routes: types.number(1, { range: [0, 1] }),
  seeds: types.number(1, { range: [0, 1] }),
  glow: types.number(1, { range: [0, 2] }),
});

/** When Theatre Studio is open, the scrubber owns the playhead instead of scroll. */
export const studioState = { active: false };
export function enableStudioMode() {
  studioState.active = true;
}
