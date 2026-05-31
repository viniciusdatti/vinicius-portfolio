// Libraries
import {
  describe,
  expect,
  it,
} from 'vitest';

// Utils
import { getFocusableElements, trapTabKey } from './focusTrap';

describe('utils/focusTrap', (): void => {
  it('should list focusable elements inside a container', (): void => {
    const container: HTMLDivElement = document.createElement('div');
    container.innerHTML = `
      <button type="button">First</button>
      <a href="#next">Link</a>
      <button type="button" disabled>Disabled</button>
    `;
    document.body.appendChild(container);

    const focusables: HTMLElement[] = getFocusableElements(container);
    expect(focusables).toHaveLength(2);

    document.body.removeChild(container);
  });

  it('should cycle Tab from last to first focusable element', (): void => {
    const container: HTMLDivElement = document.createElement('div');
    container.innerHTML = `
      <button type="button" id="first">First</button>
      <button type="button" id="last">Last</button>
    `;
    document.body.appendChild(container);

    const last: HTMLElement | null = container.querySelector('#last');
    last?.focus();

    const event: KeyboardEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
    });

    const handled: boolean = trapTabKey(container, event);
    expect(handled).toBe(true);
    expect(document.activeElement?.id).toBe('first');

    document.body.removeChild(container);
  });
});
