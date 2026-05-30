// Core
import React from 'react';

// Libraries
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

// Styles
import { darkTheme } from '../../styles/theme';

// Types
import { ButtonProps } from './Button.types';

// Button
import { Button } from './Button';

const defaultProps: ButtonProps = {
  testId: 'button-test',
  children: 'Send',
};

const ButtonComponent = (props: ButtonProps): React.ReactElement => (
  <ThemeProvider theme={darkTheme}>
    <Button {...props} />
  </ThemeProvider>
);

describe('Button Component', (): void => {
  // PROP: TESTID *******************************

  it('should render children and propagate [testId]', (): void => {
    render(
      <ButtonComponent
        {...defaultProps}
        testId="submit-btn"
      >
        Send
      </ButtonComponent>,
    );

    const button: HTMLElement = screen.getByTestId('submit-btn');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Send');
  });

  // PROP: DISABLED *******************************

  it('should apply disabled state when [disabled] is true', (): void => {
    render(
      <ButtonComponent
        {...defaultProps}
        testId="disabled-btn"
        disabled
      >
        Send
      </ButtonComponent>,
    );

    const button: HTMLElement = screen.getByTestId('disabled-btn');
    expect(button).toBeDisabled();
  });
});
