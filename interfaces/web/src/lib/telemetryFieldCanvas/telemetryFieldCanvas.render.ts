// Types
import {
  TelemetryFieldDrawOptions,
  TelemetryFieldVariant,
} from './telemetryFieldCanvas.types';

// TelemetryFieldCanvas
import {
  isWorkVariant,
  resolveGridDensity,
  resolveParticleCount,
} from './telemetryFieldCanvas.helpers';
import {
  drawConstellation,
  drawLiveLabStream,
  drawMonitorVectorMatrix,
  drawProjectsWireframe,
  drawTimelineField,
  drawTopologicalMesh,
  drawVoidVectorCrosshairs,
  drawWorkPreview,
} from './telemetryFieldCanvas.drawers';

export const drawTelemetryField = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  options: TelemetryFieldDrawOptions,
): void => {
  const {
    variant,
    time,
    pointer,
    colors,
    pulse = 0,
    scrollOffset = 0,
    constellationNodes = [],
  } = options;

  if (variant === TelemetryFieldVariant.TopologicalMesh) {
    ctx.clearRect(0, 0, width, height);
    drawTopologicalMesh(ctx, width, height, time, pointer);
    return;
  }

  if (variant === TelemetryFieldVariant.Constellation) {
    ctx.clearRect(0, 0, width, height);
    drawConstellation(ctx, width, height, time, pointer, colors, constellationNodes);
    return;
  }

  if (variant === TelemetryFieldVariant.ProjectsWireframe) {
    ctx.clearRect(0, 0, width, height);
    drawProjectsWireframe(ctx, width, height, time, scrollOffset, pointer, colors);
    return;
  }

  if (variant === TelemetryFieldVariant.LiveLabStream) {
    ctx.clearRect(0, 0, width, height);
    drawLiveLabStream(ctx, width, height, time, pulse, colors);
    return;
  }

  if (variant === TelemetryFieldVariant.Timeline) {
    ctx.clearRect(0, 0, width, height);
    drawTimelineField(ctx, width, height, time, pulse, colors);
    return;
  }

  if (isWorkVariant(variant)) {
    ctx.clearRect(0, 0, width, height);
    drawWorkPreview(ctx, width, height, variant, time, pulse, colors);
    return;
  }

  const { cols, rows } = resolveGridDensity(variant);
  const timeScale: number = variant === TelemetryFieldVariant.Monitor
    ? time * (1 + pulse * 0.85)
    : time;
  const vanishY: number = height * (variant === TelemetryFieldVariant.Void ? 0.22 : 0.18);
  const vanishX: number = width * 0.5;
  const marginX: number = width * 0.06;
  const floorY: number = height * 0.92;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = colors.background;
  ctx.globalAlpha = 1;
  ctx.fillRect(0, 0, width, height);

  const pulseBoost: number = Math.min(1, Math.max(0, pulse));
  let gridAlpha: number = 0.34;
  if (variant === TelemetryFieldVariant.Void) {
    gridAlpha = 0.42 + pulseBoost * 0.14;
  } else if (variant === TelemetryFieldVariant.Monitor) {
    gridAlpha = 0.28 + pulseBoost * 0.12;
  }
  ctx.strokeStyle = colors.grid;
  ctx.lineWidth = 1;
  ctx.globalAlpha = gridAlpha;

  for (let row = 0; row <= rows; row += 1) {
    const t: number = row / rows;
    const spread: number = marginX + (width - marginX * 2) * (0.15 + t * 0.85);
    const y: number = vanishY + (floorY - vanishY) * (t * t);
    ctx.beginPath();
    ctx.moveTo(vanishX - spread * (1 - t * 0.35), y);
    ctx.lineTo(vanishX + spread * (1 - t * 0.35), y);
    ctx.stroke();
  }

  /* Observatory home backdrop — horizontal depth only; vertical rails read as harsh "riscos". */
  if (variant !== TelemetryFieldVariant.Observatory) {
    for (let col = 0; col <= cols; col += 1) {
      const u: number = col / cols;
      const x: number = vanishX + (u - 0.5) * (width - marginX * 2) * (0.2 + 0.8 * 1);
      ctx.beginPath();
      ctx.moveTo(x, vanishY);
      ctx.lineTo(vanishX + (u - 0.5) * (width - marginX), floorY);
      ctx.stroke();
    }
  }

  if (variant === TelemetryFieldVariant.Monitor) {
    drawMonitorVectorMatrix(ctx, width, height, timeScale, pulseBoost, colors);
  }

  const tracksSoftTarget: boolean = pointer.active
    || variant === TelemetryFieldVariant.Void;
  const hotspotX: number = tracksSoftTarget
    ? marginX + pointer.x * (width - marginX * 2)
    : vanishX;
  const hotspotY: number = tracksSoftTarget
    ? vanishY + pointer.y * (floorY - vanishY)
    : vanishY + (floorY - vanishY) * 0.45;

  const particleCount: number = resolveParticleCount(variant);
  ctx.globalAlpha = variant === TelemetryFieldVariant.Void ? 0.55 : 0.48;

  for (let i = 0; i < particleCount; i += 1) {
    const seed: number = i * 1.618;
    const px: number = (Math.sin(seed + timeScale * 0.35) * 0.5 + 0.5) * width;
    const py: number = (Math.cos(seed * 0.7 + timeScale * 0.28) * 0.5 + 0.5) * height;
    const drift: number = variant === TelemetryFieldVariant.Monitor ? 16 : 12;
    const warp: number = variant === TelemetryFieldVariant.Void
      ? 1 + pulseBoost * 0.7
      : 1;
    const dx: number = Math.sin(seed * 2 + timeScale * 0.9) * drift * warp;
    const dy: number = Math.cos(seed * 1.3 + timeScale * 0.75) * (drift * 0.65) * warp;
    const dist: number = Math.hypot(px - hotspotX, py - hotspotY);
    let influence: number = 0.15;
    if (pointer.active) {
      influence = Math.max(0, 1 - dist / (width * 0.35));
    } else if (variant === TelemetryFieldVariant.Void) {
      influence = Math.max(0.08, 0.22 - dist / (width * 0.55));
    }
    const radius: number = 1 + influence * 1.4;

    ctx.fillStyle = influence > 0.35 ? colors.accent : colors.node;
    ctx.beginPath();
    ctx.arc(px + dx, py + dy, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  if (variant === TelemetryFieldVariant.Void) {
    drawVoidVectorCrosshairs(
      ctx,
      width,
      height,
      hotspotX,
      hotspotY,
      marginX,
      vanishY,
      floorY,
      pointer,
      time,
      pulseBoost,
      colors,
    );
  }

  const showHotspotGlow: boolean = pointer.active || pulseBoost > 0.08;
  if (showHotspotGlow) {
    const glowRadius: number = Math.min(width, height) * 0.22;
    const gradient = ctx.createRadialGradient(
      hotspotX,
      hotspotY,
      0,
      hotspotX,
      hotspotY,
      glowRadius,
    );
    gradient.addColorStop(0, colors.accent);
    gradient.addColorStop(1, 'transparent');
    ctx.globalAlpha = pointer.active ? 0.22 : 0.1 + pulseBoost * 0.14;
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.globalAlpha = 1;
};
