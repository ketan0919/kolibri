import { render, screen, fireEvent } from '@testing-library/vue';
import SettingsSideBar from '../SettingsSideBar';
import { THEMES } from '../EpubConstants';

function renderSettingsSideBar(props = {}) {
  return render(SettingsSideBar, {
    props: {
      theme: THEMES.BEIGE,
      ...props,
    },
  });
}

describe('Settings side bar', () => {
  it('renders the settings sidebar', () => {
    renderSettingsSideBar();

    // At least one button should exist (font controls / themes)
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });

  it('emits event when decrease font size button is clicked', async () => {
    const { emitted } = renderSettingsSideBar();

    const buttons = screen.getAllByRole('button');

    // First button is decrease font size (based on layout order)
    await fireEvent.click(buttons[0]);

    expect(emitted().decreaseFontSize).toBeTruthy();
  });

  it('emits event when increase font size button is clicked', async () => {
    const { emitted } = renderSettingsSideBar();

    const buttons = screen.getAllByRole('button');

    // Second button is increase font size
    await fireEvent.click(buttons[1]);

    expect(emitted().increaseFontSize).toBeTruthy();
  });

  it('renders a valid number of theme options (2, 3, 4, or 6)', () => {
    renderSettingsSideBar();

    const buttons = screen.getAllByRole('button');

    // Remove first two font-size buttons
    const themeButtons = buttons.slice(2);

    expect([2, 3, 4, 6]).toContain(themeButtons.length);
  });

  it('emits event when a theme is selected', async () => {
    const { emitted } = renderSettingsSideBar();

    const buttons = screen.getAllByRole('button');

    // First theme button after font controls
    const firstThemeButton = buttons[2];

    await fireEvent.click(firstThemeButton);

    expect(emitted().setTheme).toBeTruthy();
    expect(emitted().setTheme[0][0]).toBe(THEMES.WHITE);
  });
});