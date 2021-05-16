import { render } from '@testing-library/react';
import { debug } from 'console';
import { FiCheck } from 'react-icons/fi';

import Button from '../../components/Button';

describe('Button component', () => {
  it('should render the component', () => {
    const { getByText } = render(<Button>Test button</Button>)

    expect(getByText('Test button')).toBeTruthy();
  });

  it('should contain a outline class', () => {
    const { getByText } = render(<Button>Test button</Button>);

    const buttonElement = getByText('Test button');

    expect(buttonElement).toHaveClass('outline');
  });

  it('should render with an icon', () => {
    const { getByText, getByTestId } = render((
      <Button>
        <FiCheck data-testid="icon-test" />
        Test button
      </Button>
    ));

    const buttonElement = getByText('Test button');
    const iconElement = getByTestId('icon-test');

    expect(buttonElement).toBeTruthy();
    expect(iconElement).toBeTruthy();
  })
})
