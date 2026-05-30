/**
 * Allowlisted JSX props for @react-three/fiber lowercase intrinsics (mesh, group, …).
 * eslint-plugin-react treats lowercase tags as DOM; R3F maps them to THREE.* constructors.
 * @see https://github.com/jsx-eslint/eslint-plugin-react/issues/3423
 */

/** @type {readonly string[]} */
const R3F_UNKNOWN_PROPERTY_IGNORE = [
  // R3F conveniences
  'attach',
  'args',
  // Object3D
  'position',
  'rotation',
  'scale',
  'visible',
  'castShadow',
  'receiveShadow',
  'renderOrder',
  'frustumCulled',
  // Lights
  'intensity',
  'color',
  'distance',
  'decay',
  'angle',
  'penumbra',
  'target',
  // Materials (MeshStandardMaterial, PointMaterial, …)
  'map',
  'metalness',
  'roughness',
  'toneMapped',
  'transparent',
  'opacity',
  'side',
  'wireframe',
  'flatShading',
  'emissive',
  'emissiveIntensity',
  'depthWrite',
  'depthTest',
  'sizeAttenuation',
  'size',
  'blending',
  // Points / BufferGeometry
  'positions',
  'stride',
  // @react-three/drei Grid
  'cellSize',
  'cellThickness',
  'sectionSize',
  'sectionThickness',
  'fadeDistance',
  'fadeStrength',
  'infiniteGrid',
  'cellColor',
  'sectionColor',
];

/** Glob patterns for modules that render R3F lowercase intrinsics. */
const R3F_SOURCE_GLOBS = [
  'src/components/Hero/HeroVisual3D/**/*.tsx',
  'src/components/workspace/LiveLabAtmosphere/LiveLabGridScene/LiveLabGridScene.tsx',
  'src/components/workspace/LiveLabAtmosphere/LiveLabPostEffects/LiveLabPostEffects.tsx',
  'src/components/workspace/LiveLabAtmosphere/LiveLabAtmosphereGL/LiveLabAtmosphereGL.tsx',
];

module.exports = {
  R3F_UNKNOWN_PROPERTY_IGNORE,
  R3F_SOURCE_GLOBS,
};
