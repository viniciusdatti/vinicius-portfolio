// Core
import React from 'react';
import { render, screen } from '@testing-library/react';

// Libraries
import { ThemeProvider } from 'styled-components';

// Config
import { darkTheme } from '@/styles/theme';

// Types
import type { ButtonProps } from '@/components/Button/Button.types';

// Components
import { Button } from '@/components/Button/Button';

/* *************** TEST SUPPORT VARS *************** */

const defaultProps: ButtonProps = {
  testId: 'button-test',
  children: 'Send',
};

function ButtonComponent(props: ButtonProps): React.ReactElement {
  return (
    <ThemeProvider theme={darkTheme}>
      <Button {...props} />
    </ThemeProvider>
  );
}

/* *************** TEST EXECUTION *************** */

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
