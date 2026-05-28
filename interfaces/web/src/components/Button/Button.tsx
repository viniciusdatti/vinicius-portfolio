// Core
import React from 'react';

// Libraries
import { motion } from 'framer-motion';

// Hooks
import { usePhysicalInteraction } from '../../hooks/usePhysicalInteraction';
import type { UsePhysicalInteractionResult } from '../../hooks/usePhysicalInteraction.types';

// Component
import type { ButtonComponent } from './Button.types';
import { StyledButton } from './Button.style';

const MotionStyledButton = motion.create(StyledButton);

interface MotionStyledButtonPolymorphicProps
  extends React.ComponentProps<typeof MotionStyledButton> {
  as?: React.ElementType;
  to?: string;
  replace?: boolean;
  state?: unknown;
}

const PolymorphicMotionButton = MotionStyledButton as React.FC<
MotionStyledButtonPolymorphicProps
>;

export const Button: ButtonComponent = ({
  variant = 'primary',
  as,
  to,
  replace,
  state,
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
}): React.ReactElement => {
  const Component: React.ElementType = as ?? 'button';
  const isNativeButton: boolean = Component === 'button';

  const { ref, motionProps }: UsePhysicalInteractionResult<HTMLElement> = (
    usePhysicalInteraction<HTMLElement>({
      disabled: Boolean(disabled),
      enableTilt: false,
      enableSpotlight: false,
      enableLift: true,
    })
  );

  return (
    <PolymorphicMotionButton
      as={Component}
      ref={ref}
      $variant={variant}
      data-testid={testId}
      to={to}
      replace={replace}
      state={state}
      type={isNativeButton ? (type ?? 'button') : undefined}
      onClick={onClick}
      disabled={isNativeButton ? disabled : undefined}
      className={className}
      id={id}
      name={isNativeButton ? name : undefined}
      value={isNativeButton ? value : undefined}
      form={isNativeButton ? form : undefined}
      formAction={isNativeButton ? formAction : undefined}
      formEncType={isNativeButton ? formEncType : undefined}
      formMethod={isNativeButton ? formMethod : undefined}
      formNoValidate={isNativeButton ? formNoValidate : undefined}
      formTarget={isNativeButton ? formTarget : undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-disabled={!isNativeButton && disabled ? true : ariaDisabled}
      aria-pressed={ariaPressed}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-haspopup={ariaHaspopup}
      role={role}
      tabIndex={!isNativeButton && disabled ? -1 : tabIndex}
      autoFocus={autoFocus}
      title={title}
      style={{ ...motionProps.style, ...style }}
      animate={motionProps.animate}
      transition={motionProps.transition}
      whileTap={motionProps.whileTap}
    >
      {children}
    </PolymorphicMotionButton>
  );
};
