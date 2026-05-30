// Core
import React, { memo } from 'react';

// Styles
import { LogLine } from '../LiveLabObservatory.style';

// Types
import { LiveLabObservatoryLogLine } from '../LiveLabObservatory.types';

interface LiveLabObservatoryLogRowProps {
  line: LiveLabObservatoryLogLine;
}

export const LiveLabObservatoryLogRow: React.FC<LiveLabObservatoryLogRowProps> = memo(({
  line,
}): React.ReactElement => (
  <LogLine $type={line.type}>
    <time>{line.time}</time>
    <span>{line.msg}</span>
  </LogLine>
));

LiveLabObservatoryLogRow.displayName = 'LiveLabObservatoryLogRow';
