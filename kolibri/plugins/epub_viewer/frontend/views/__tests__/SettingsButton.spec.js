import { render, screen, fireEvent } from '@testing-library/vue';
import SettingsButton from '../SettingsButton';

describe('Settings button', () => {
  it('renders a button', () => {
    render(SettingsButton);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('emits a click event when the user clicks the button', async () => {
    const { emitted } = render(SettingsButton);

    const button = screen.getByRole('button');

    await fireEvent.click(button);

    expect(emitted().click).toBeTruthy();
  });
});