// Types
import {
  ConstellationNodeState,
  TelemetryFieldColors,
  TelemetryFieldPointer,
  TelemetryFieldVariant,
} from './telemetryFieldCanvas.types';

// TelemetryFieldCanvas
import {
  COBALT_MESH_CURSOR_RGBA,
  COBALT_MESH_RGBA,
  CONSTELLATION_CONNECT_RADIUS,
  CONSTELLATION_CURSOR_RADIUS,
  TOPOLOGICAL_MESH_COLS,
  TOPOLOGICAL_MESH_ROWS,
} from './telemetryFieldCanvas.constants';

export const drawVoidVectorCrosshairs = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  hotspotX: number,
  hotspotY: number,
  marginX: number,
  vanishY: number,
  floorY: number,
  pointer: TelemetryFieldPointer,
  time: number,
  pulseBoost: number,
  colors: TelemetryFieldColors,
): void => {
  const isCompact: boolean = width < 520;
  const crossAlpha: number = pointer.active
    ? 0.9
    : 0.28 + pulseBoost * 0.48 + Math.sin(time * 1.15) * 0.05;
  const lineWidth: number = isCompact ? 1.25 : 1;
  const tick: number = Math.min(width, height) * (isCompact ? 0.022 : 0.018);
  const bracket: number = tick * 2.4;
  const armInset: number = isCompact ? marginX * 0.65 : marginX;

  ctx.strokeStyle = colors.accent;
  ctx.lineWidth = lineWidth;
  ctx.globalAlpha = crossAlpha;
  ctx.setLineDash([]);

  ctx.beginPath();
  ctx.moveTo(armInset, hotspotY);
  ctx.lineTo(width - armInset, hotspotY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(hotspotX, vanishY);
  ctx.lineTo(hotspotX, floorY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(hotspotX - tick, hotspotY);
  ctx.lineTo(hotspotX + tick, hotspotY);
  ctx.moveTo(hotspotX, hotspotY - tick);
  ctx.lineTo(hotspotX, hotspotY + tick);
  ctx.stroke();

  const drawBracket = (bx: number, by: number, flipX: number, flipY: number): void => {
    ctx.beginPath();
    ctx.moveTo(bx, by + flipY * bracket);
    ctx.lineTo(bx, by);
    ctx.lineTo(bx + flipX * bracket, by);
    ctx.stroke();
  };

  drawBracket(hotspotX - tick * 2.2, hotspotY - tick * 2.2, 1, 1);
  drawBracket(hotspotX + tick * 2.2, hotspotY - tick * 2.2, -1, 1);
  drawBracket(hotspotX - tick * 2.2, hotspotY + tick * 2.2, 1, -1);
  drawBracket(hotspotX + tick * 2.2, hotspotY + tick * 2.2, -1, -1);

  const arrow: number = tick * 1.35;
  const drawArrowhead = (ax: number, ay: number, dirX: number, dirY: number): void => {
    const px: number = -dirY * arrow * 0.55;
    const py: number = dirX * arrow * 0.55;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(ax - dirX * arrow + px, ay - dirY * arrow + py);
    ctx.lineTo(ax - dirX * arrow - px, ay - dirY * arrow - py);
    ctx.closePath();
    ctx.fillStyle = colors.accent;
    ctx.globalAlpha = crossAlpha * 0.85;
    ctx.fill();
    ctx.globalAlpha = crossAlpha;
  };

  drawArrowhead(armInset, hotspotY, -1, 0);
  drawArrowhead(width - armInset, hotspotY, 1, 0);
  drawArrowhead(hotspotX, vanishY, 0, -1);
  drawArrowhead(hotspotX, floorY, 0, 1);

  const showCoords: boolean = pointer.active || pulseBoost > 0.12 || !isCompact;
  if (showCoords) {
    const xPct: number = Math.round(pointer.x * 1000) / 10;
    const yPct: number = Math.round(pointer.y * 1000) / 10;
    const labelX: number = Math.min(hotspotX + 10, width - armInset - 52);
    const fontSize: number = isCompact ? 9 : 10;
    ctx.font = `${fontSize}px ui-monospace, monospace`;
    ctx.fillStyle = colors.accent;
    ctx.globalAlpha = crossAlpha * 0.95;
    ctx.fillText(`X ${xPct}%`, labelX, hotspotY - 8);
    ctx.fillText(`Y ${yPct}%`, labelX, hotspotY + (isCompact ? 14 : 18));
  }

  ctx.globalAlpha = 1;
};

export const drawMonitorVectorMatrix = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pulse: number,
  colors: TelemetryFieldColors,
): void => {
  const cols: number = 14;
  const rows: number = 9;
  const marginX: number = width * 0.08;
  const marginY: number = height * 0.12;
  const cellW: number = (width - marginX * 2) / cols;
  const cellH: number = (height - marginY * 2) / rows;
  const flowSpeed: number = 1 + pulse * 2.8;

  ctx.strokeStyle = colors.grid;
  ctx.lineWidth = 1;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const cx: number = marginX + (col + 0.5) * cellW;
      const cy: number = marginY + (row + 0.5) * cellH;
      const phase: number = (row * cols + col) * 0.41 + time * flowSpeed * 1.35;
      const angle: number = phase + Math.sin(phase * 0.7) * 0.35;
      const magnitude: number = (8 + pulse * 14)
        * (0.45 + 0.55 * (0.5 + 0.5 * Math.sin(phase * 1.1)));
      const dx: number = Math.cos(angle) * magnitude;
      const dy: number = Math.sin(angle) * magnitude * 0.72;

      const influence: number = 0.22 + pulse * 0.38;
      ctx.globalAlpha = influence;
      ctx.beginPath();
      ctx.moveTo(cx - dx * 0.35, cy - dy * 0.35);
      ctx.lineTo(cx + dx, cy + dy);
      ctx.stroke();

      ctx.fillStyle = colors.accent;
      ctx.globalAlpha = influence * (0.35 + pulse * 0.25);
      ctx.beginPath();
      ctx.arc(cx + dx, cy + dy, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};

export const drawTimelineField = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pulse: number,
  colors: TelemetryFieldColors,
): void => {
  const railX: number = width * 0.08;
  const nodeCount: number = 5;
  const step: number = (height * 0.82) / (nodeCount - 1);
  const startY: number = height * 0.1;

  ctx.strokeStyle = colors.grid;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.55;
  ctx.beginPath();
  ctx.moveTo(railX, startY);
  ctx.lineTo(railX, startY + step * (nodeCount - 1));
  ctx.stroke();

  for (let i = 0; i < nodeCount; i += 1) {
    const y: number = startY + step * i;
    const phase: number = time * 0.8 + i * 0.9;
    const active: boolean = Math.sin(phase) > 0.55 - pulse * 0.2;
    const radius: number = active ? 4 + pulse * 2 : 2.5;

    ctx.fillStyle = active ? colors.accent : colors.node;
    ctx.globalAlpha = active ? 0.85 : 0.45;
    ctx.beginPath();
    ctx.arc(railX, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
};

export const drawWorkPreview = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  variant: TelemetryFieldVariant,
  time: number,
  pulse: number,
  colors: TelemetryFieldColors,
): void => {
  const padX: number = width * 0.08;
  const padY: number = height * 0.12;
  const innerW: number = width - padX * 2;
  const innerH: number = height - padY * 2;

  if (variant === TelemetryFieldVariant.WorkA) {
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.35 + pulse * 0.25;
    const waveCount: number = 3;
    for (let w = 0; w < waveCount; w += 1) {
      ctx.beginPath();
      for (let x = 0; x <= innerW; x += 4) {
        const t: number = x / innerW;
        const y: number = padY + innerH * 0.55
          + Math.sin(t * 8 + time * 1.2 + w * 1.4) * innerH * 0.14
          + Math.sin(t * 3 + time * 0.6) * innerH * 0.06;
        if (x === 0) {
          ctx.moveTo(padX + x, y);
        } else {
          ctx.lineTo(padX + x, y);
        }
      }
      ctx.stroke();
    }
    return;
  }

  if (variant === TelemetryFieldVariant.WorkB) {
    const cols: number = 8;
    const rows: number = 5;
    const cellW: number = innerW / cols;
    const cellH: number = innerH / rows;
    ctx.strokeStyle = colors.grid;
    ctx.globalAlpha = 0.4;
    for (let c = 0; c <= cols; c += 1) {
      const x: number = padX + c * cellW;
      ctx.beginPath();
      ctx.moveTo(x, padY);
      ctx.lineTo(x, padY + innerH);
      ctx.stroke();
    }
    for (let r = 0; r <= rows; r += 1) {
      const y: number = padY + r * cellH;
      ctx.beginPath();
      ctx.moveTo(padX, y);
      ctx.lineTo(padX + innerW, y);
      ctx.stroke();
    }
    ctx.fillStyle = colors.accent;
    ctx.globalAlpha = 0.12 + pulse * 0.2;
    for (let i = 0; i < 6; i += 1) {
      const cx: number = padX + ((i * 1.7 + time * 0.4) % cols) * cellW;
      const cy: number = padY + ((i * 2.3) % rows) * cellH;
      ctx.fillRect(cx + 2, cy + 2, cellW - 4, cellH - 4);
    }
    return;
  }

  ctx.font = '10px monospace';
  ctx.fillStyle = colors.node;
  ctx.globalAlpha = 0.45 + pulse * 0.15;
  const lines: string[] = [
    'export const stream = () => {',
    '  socket.on("tick", emit);',
    '  return teardown;',
    '};',
  ];
  lines.forEach((line: string, index: number) => {
    const y: number = padY + index * 18 + Math.sin(time + index) * 2;
    ctx.fillText(line, padX, y);
  });
  ctx.strokeStyle = colors.accent;
  ctx.globalAlpha = 0.25;
  ctx.beginPath();
  ctx.moveTo(padX, padY + innerH * 0.75);
  ctx.lineTo(padX + innerW * (0.35 + pulse * 0.1), padY + innerH * 0.75);
  ctx.stroke();
};

export const drawTopologicalMesh = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: TelemetryFieldPointer,
): void => {
  const cellW: number = width / (TOPOLOGICAL_MESH_COLS - 1);
  const cellH: number = height / (TOPOLOGICAL_MESH_ROWS - 1);
  const waveAmp: number = Math.min(width, height) * 0.038;
  const cursorX: number = pointer.active ? pointer.x * width : width * 0.5;
  const cursorY: number = pointer.active ? pointer.y * height : height * 0.5;
  const cursorInfluence: number = pointer.active ? Math.min(width, height) * 0.28 : 0;
  const points: { x: number; y: number }[][] = [];

  for (let row = 0; row < TOPOLOGICAL_MESH_ROWS; row += 1) {
    points[row] = [];
    for (let col = 0; col < TOPOLOGICAL_MESH_COLS; col += 1) {
      const u: number = col / (TOPOLOGICAL_MESH_COLS - 1);
      const v: number = row / (TOPOLOGICAL_MESH_ROWS - 1);
      const wave: number = Math.sin(u * 4.2 + time * 0.55)
        * Math.cos(v * 3.6 + time * 0.42)
        + Math.sin((u + v) * 5.5 + time * 0.35) * 0.45;
      let z: number = wave * waveAmp;
      const px: number = col * cellW;
      const py: number = row * cellH;
      if (pointer.active && cursorInfluence > 0) {
        const dist: number = Math.hypot(px - cursorX, py - cursorY);
        const pull: number = Math.max(0, 1 - dist / cursorInfluence);
        z += pull * waveAmp * 2.4;
      }
      const perspective: number = 0.85 + v * 0.15;
      const x: number = px + z * 0.35 * perspective;
      const y: number = py + z * perspective;
      points[row][col] = { x, y };
    }
  }

  ctx.strokeStyle = COBALT_MESH_RGBA;
  ctx.lineWidth = 1;

  for (let row = 0; row < TOPOLOGICAL_MESH_ROWS; row += 1) {
    for (let col = 0; col < TOPOLOGICAL_MESH_COLS; col += 1) {
      const p = points[row][col];
      const dist: number = Math.hypot(p.x - cursorX, p.y - cursorY);
      const nearCursor: boolean = pointer.active && dist < cursorInfluence;
      ctx.strokeStyle = nearCursor ? COBALT_MESH_CURSOR_RGBA : COBALT_MESH_RGBA;
      ctx.globalAlpha = nearCursor ? 0.85 : 1;
      if (col < TOPOLOGICAL_MESH_COLS - 1) {
        const right = points[row][col + 1];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(right.x, right.y);
        ctx.stroke();
      }
      if (row < TOPOLOGICAL_MESH_ROWS - 1) {
        const down = points[row + 1][col];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(down.x, down.y);
        ctx.stroke();
      }
      if (col < TOPOLOGICAL_MESH_COLS - 1 && row < TOPOLOGICAL_MESH_ROWS - 1) {
        const diag = points[row + 1][col + 1];
        ctx.globalAlpha = nearCursor ? 0.35 : 0.55;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(diag.x, diag.y);
        ctx.stroke();
      }
    }
  }

  if (pointer.active) {
    const glowRadius: number = cursorInfluence * 0.85;
    const gradient = ctx.createRadialGradient(
      cursorX,
      cursorY,
      0,
      cursorX,
      cursorY,
      glowRadius,
    );
    gradient.addColorStop(0, 'rgba(0, 82, 255, 0.22)');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.fillStyle = COBALT_MESH_RGBA;
  ctx.globalAlpha = 1;
  for (let row = 0; row < TOPOLOGICAL_MESH_ROWS; row += 2) {
    for (let col = 0; col < TOPOLOGICAL_MESH_COLS; col += 2) {
      const p = points[row][col];
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};

export const drawConstellation = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: TelemetryFieldPointer,
  colors: TelemetryFieldColors,
  nodes: ConstellationNodeState[],
): void => {
  const cursorX: number = pointer.active
    ? pointer.x * width
    : width * 0.5 + Math.sin(time * 0.25) * width * 0.12;
  const cursorY: number = pointer.active
    ? pointer.y * height
    : height * 0.5 + Math.cos(time * 0.31) * height * 0.1;
  const connectPx: number = Math.min(width, height) * CONSTELLATION_CONNECT_RADIUS;
  const cursorPx: number = Math.min(width, height) * CONSTELLATION_CURSOR_RADIUS;

  nodes.forEach((node: ConstellationNodeState) => {
    const nx: number = node.x * width;
    const ny: number = node.y * height;
    const distCursor: number = Math.hypot(nx - cursorX, ny - cursorY);

    ctx.fillStyle = colors.accent;
    ctx.globalAlpha = distCursor < cursorPx ? 0.85 : 0.42;
    ctx.beginPath();
    ctx.arc(nx, ny, distCursor < cursorPx ? 2.4 : 1.4, 0, Math.PI * 2);
    ctx.fill();
  });

  for (let i = 0; i < nodes.length; i += 1) {
    const a = nodes[i];
    const ax: number = a.x * width;
    const ay: number = a.y * height;
    const nearCursorA: boolean = Math.hypot(ax - cursorX, ay - cursorY) < cursorPx;

    for (let j = i + 1; j < nodes.length; j += 1) {
      const b = nodes[j];
      const bx: number = b.x * width;
      const by: number = b.y * height;
      const linkDist: number = Math.hypot(ax - bx, ay - by);
      if (linkDist <= connectPx) {
        const nearCursorB: boolean = Math.hypot(bx - cursorX, by - cursorY) < cursorPx;
        const glow: boolean = nearCursorA || nearCursorB;

        ctx.strokeStyle = colors.accent;
        ctx.globalAlpha = glow
          ? 0.45 + (1 - linkDist / connectPx) * 0.5
          : 0.04 + (1 - linkDist / connectPx) * 0.06;
        ctx.lineWidth = glow ? 1.6 : 0.65;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
    }
  }

  if (pointer.active) {
    const gradient = ctx.createRadialGradient(
      cursorX,
      cursorY,
      0,
      cursorX,
      cursorY,
      cursorPx * 1.4,
    );
    gradient.addColorStop(0, 'rgba(0, 229, 255, 0.14)');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.globalAlpha = 1;
};

export const drawProjectsWireframe = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  scrollOffset: number,
  pointer: TelemetryFieldPointer,
  colors: TelemetryFieldColors,
): void => {
  const cols: number = 20;
  const rows: number = 14;
  const scrollShift: number = scrollOffset * 0.14;
  const pointerShiftX: number = pointer.active ? (pointer.x - 0.5) * 0.06 : 0;
  const pointerShiftY: number = pointer.active ? (pointer.y - 0.5) * 0.04 : 0;
  const vanishY: number = height * (0.14 - scrollShift + pointerShiftY);
  const vanishX: number = width * (0.5 + pointerShiftX);
  const marginX: number = width * 0.05;
  const floorY: number = height * 0.94;
  const parallax: number = scrollOffset * 18;

  ctx.strokeStyle = colors.grid;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.32 + Math.sin(time * 0.4) * 0.04;

  for (let row = 0; row <= rows; row += 1) {
    const t: number = row / rows;
    const spread: number = marginX + (width - marginX * 2) * (0.12 + t * 0.88);
    const y: number = vanishY + (floorY - vanishY) * (t * t) + parallax * (t - 0.5) * 0.15;
    ctx.beginPath();
    ctx.moveTo(vanishX - spread * (1 - t * 0.3), y);
    ctx.lineTo(vanishX + spread * (1 - t * 0.3), y);
    ctx.stroke();
  }

  for (let col = 0; col <= cols; col += 1) {
    const u: number = col / cols;
    const xTop: number = vanishX + (u - 0.5) * (width - marginX * 2) * 0.35;
    const xFloor: number = vanishX + (u - 0.5) * (width - marginX);
    ctx.beginPath();
    ctx.moveTo(xTop, vanishY);
    ctx.lineTo(xFloor, floorY + parallax * 0.08);
    ctx.stroke();
  }

  ctx.strokeStyle = colors.accent;
  ctx.globalAlpha = 0.12 + scrollOffset * 0.08;
  const isoStep: number = Math.min(width, height) * 0.08;
  for (let i = -4; i < 12; i += 1) {
    const timeOffset: number = (time * 12) % isoStep;
    const offset: number = i * isoStep + timeOffset;
    ctx.beginPath();
    ctx.moveTo(offset, floorY);
    ctx.lineTo(offset + height * 0.35, vanishY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(width - offset, floorY);
    ctx.lineTo(width - offset - height * 0.35, vanishY);
    ctx.stroke();
  }

  if (pointer.active) {
    const hotspotX: number = pointer.x * width;
    const hotspotY: number = pointer.y * height;
    const glowRadius: number = Math.min(width, height) * 0.22;
    const gradient = ctx.createRadialGradient(
      hotspotX,
      hotspotY,
      0,
      hotspotX,
      hotspotY,
      glowRadius,
    );
    gradient.addColorStop(0, `${colors.accent}33`);
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.globalAlpha = 0.85;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 1.25;
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.arc(hotspotX, hotspotY, glowRadius * 0.35, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
};

export const drawLiveLabStream = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pulse: number,
  colors: TelemetryFieldColors,
): void => {
  const cols: number = 18;
  const rows: number = 11;
  const marginX: number = width * 0.04;
  const marginY: number = height * 0.08;
  const cellW: number = (width - marginX * 2) / cols;
  const cellH: number = (height - marginY * 2) / rows;
  const flowSpeed: number = 1.15 + pulse * 3.6;
  const luminanceBoost: number = 0.32 + pulse * 0.55;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const cx: number = marginX + (col + 0.5) * cellW;
      const cy: number = marginY + (row + 0.5) * cellH;
      const phase: number = (row * cols + col) * 0.37 + time * flowSpeed;
      const streamBias: number = (col / cols) * Math.PI * 0.35;
      const angle: number = streamBias + Math.sin(phase * 0.65) * 0.22;
      const magnitude: number = (10 + pulse * 22)
        * (0.5 + 0.5 * Math.sin(phase * 1.05 + pulse * 2.2));
      const dx: number = Math.cos(angle) * magnitude;
      const dy: number = Math.sin(angle) * magnitude * 0.35;

      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      ctx.globalAlpha = luminanceBoost;
      ctx.beginPath();
      ctx.moveTo(cx - dx * 0.5, cy - dy * 0.5);
      ctx.lineTo(cx + dx, cy + dy);
      ctx.stroke();

      ctx.fillStyle = colors.accent;
      ctx.globalAlpha = luminanceBoost * (0.4 + pulse * 0.45);
      ctx.beginPath();
      ctx.arc(cx + dx, cy + dy, 1 + pulse * 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const streakCount: number = 24;
  ctx.strokeStyle = colors.accent;
  for (let i = 0; i < streakCount; i += 1) {
    const seed: number = i * 2.17;
    const rawPhase: number = (time * flowSpeed * 0.35) + seed;
    const progress: number = rawPhase % 1;
    const sx: number = marginX + progress * (width - marginX * 2);
    const sy: number = marginY + ((seed * 0.31) % 1) * (height - marginY * 2);
    const len: number = 28 + pulse * 48;
    ctx.globalAlpha = 0.08 + pulse * 0.35;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + len, sy - len * 0.12);
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
};
