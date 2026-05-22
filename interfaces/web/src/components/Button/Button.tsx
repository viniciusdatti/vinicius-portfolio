// Core
import React from 'react';

// Libraries
import { motion } from 'framer-motion';

// Hooks
import { usePhysicalInteraction } from '@/hooks/usePhysicalInteraction';

// Types
import type { ButtonComponent } from '@/components/Button/Button.types';
import type { UsePhysicalInteractionResult } from '@/hooks/usePhysicalInteraction.types';

// Components
import { StyledButton } from '@/components/Button/Button.style';

const MotionStyledButton = motion.create(StyledButton);

export const Button: ButtonComponent = function Button({
  variant = 'primary',
  children,
  type,
  onClick,
  disabled,
  className,
  id,
  name,
  value,
  form,
  formAction,
  formEncType,
  formMethod,
  formNoValidate,
  formTarget,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-disabled': ariaDisabled,
  'aria-pressed': ariaPressed,
  'aria-expanded': ariaExpanded,
  'aria-controls': ariaControls,
  'aria-haspopup': ariaHaspopup,
  role,
  tabIndex,
  autoFocus,
  title,
  style,
  testId,
}): React.ReactElement {
  const { ref, motionProps }: UsePhysicalInteractionResult<HTMLButtonElement> = (
    usePhysicalInteraction<HTMLButtonElement>({
      disabled: Boolean(disabled),
      enableTilt: false,
      enableSpotlight: false,
      enableLift: true,
    })
  );

  return (
    <MotionStyledButton
      ref={ref}
      $variant={variant}
      data-testid={testId}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      id={id}
      name={name}
      value={value}
      form={form}
      formAction={formAction}
      formEncType={formEncType}
      formMethod={formMethod}
      formNoValidate={formNoValidate}
      formTarget={formTarget}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-disabled={ariaDisabled}
      aria-pressed={ariaPressed}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-haspopup={ariaHaspopup}
      role={role}
      tabIndex={tabIndex}
      autoFocus={autoFocus}
      title={title}
      style={{ ...motionProps.style, ...style }}
      animate={motionProps.animate}
      transition={motionProps.transition}
      whileTap={motionProps.whileTap}
    >
      {children}
    </MotionStyledButton>
  );
};
