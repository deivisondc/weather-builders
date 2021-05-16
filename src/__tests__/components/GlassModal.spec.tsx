import { render } from '@testing-library/react';

import GlassModal from '../../components/GlassModal';

describe('GlassModal component', () => {
  it('should render the component', () => {
    const { getByTestId } = render(
      <GlassModal testId="modal-test" isOpen square={false}>
        <p>Test</p>
      </GlassModal>,
    );

    expect(getByTestId('modal-test')).toBeTruthy();
  });

  it('should render the children', () => {
    const { getByTestId } = render(
      <GlassModal testId="modal-test" isOpen square={false}>
        <p>Specific Test Paragraph</p>
      </GlassModal>,
    );

    expect(getByTestId('modal-test').innerHTML).toContain(
      'Specific Test Paragraph',
    );
  });
});
