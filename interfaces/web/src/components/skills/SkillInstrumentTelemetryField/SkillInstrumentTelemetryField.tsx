// Core
import React, { useEffect, useMemo, useState } from 'react';

// Hooks
import { useCanvasTelemetryField } from '@/hooks/useCanvasTelemetryField';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Types
import {
  SkillInstrumentFieldVariant,
  type SkillInstrumentTelemetryFieldProps,
} from '@/components/Skills/SkillInstrumentTelemetryField/SkillInstrumentTelemetryField.types';
import { TelemetryFieldVariant } from '@/lib/telemetryFieldCanvas';

// Components
import {
  SkillInstrumentFieldCanvas,
  SkillInstrumentFieldLayer,
} from '@/components/Skills/SkillInstrumentTelemetryField/SkillInstrumentTelemetryField.style';

// =================================================================================================
// ============================================= CONSTANTS =========================================
// =================================================================================================

const INSTRUMENT_PULSE_TICK_MS: number = 48;

// =================================================================================================
// ============================================= METHODS ===========================================
// =================================================================================================

const resolveTelemetryVariant = (
  variant: SkillInstrumentFieldVariant,
): TelemetryFieldVariant => (
  variant === SkillInstrumentFieldVariant.AiTools
    ? TelemetryFieldVariant.WorkC
    : TelemetryFieldVariant.WorkB
);

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

/**
 * Canvas2D instrument strip for VS Code / AI tools skill cards (Datadog cell aesthetic).
 */
export const SkillInstrumentTelemetryField: React.FC<SkillInstrumentTelemetryFieldProps> = ({
  variant,
}): React.ReactElement => {
  const reduced: boolean = usePrefersReducedMotion();
  const [pulsePhase, setPulsePhase] = useState<number>(0);

  useEffect(() => {
    if (reduced) {
      return undefined;
    }

    const intervalId: ReturnType<typeof setInterval> = setInterval((): void => {
      setPulsePhase((prev: number): number => prev + INSTRUMENT_PULSE_TICK_MS);
    }, INSTRUMENT_PULSE_TICK_MS);

    return (): void => {
      clearInterval(intervalId);
    };
  }, [reduced]);

  const pulse: number = useMemo((): number => {
    if (reduced) {
      return 0;
    }
    const t: number = pulsePhase * 0.001;
    return 0.22 + Math.sin(t * 1.35) * 0.12;
  }, [pulsePhase, reduced]);

  const telemetryVariant: TelemetryFieldVariant = resolveTelemetryVariant(variant);

  const { canvasRef, bindContainerRef } = useCanvasTelemetryField({
    variant: telemetryVariant,
    pulse,
    maxDevicePixelRatio: 1.5,
  });

  return (
    <SkillInstrumentFieldLayer ref={bindContainerRef} data-skill-instrument-field aria-hidden>
      <SkillInstrumentFieldCanvas ref={canvasRef} />
    </SkillInstrumentFieldLayer>
  );
};
