// Core
import React from 'react';

// Types
import type { ButtonProps } from '@/components/Button/Button.types';

// Components
import { StyledButton } from '@/components/Button/Button.style';

export function Button({
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
}: ButtonProps): React.ReactElement {
  return (
    <StyledButton
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
      style={style}
    >
      {children}
    </StyledButton>
  );
}
