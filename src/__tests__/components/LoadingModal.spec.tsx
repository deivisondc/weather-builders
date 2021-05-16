import { render } from '@testing-library/react';

import LoadingModal from '../../components/LoadingModal';

describe('LoadingModal component', () => {
  it('should render the component', () => {
    const { getByTestId } = render(<LoadingModal isOpen />);

    const modalComponent = getByTestId('loadingModal-test');

    expect(modalComponent).toBeTruthy();
  });

  it("should contain 'modalSquare' class", () => {
    const { getByTestId } = render(<LoadingModal isOpen />);

    const modalComponent = getByTestId('loadingModal-test');

    expect(modalComponent).toHaveClass('modalSquare');
  });

  it('should contain a svg', () => {
    const { getByTestId } = render(<LoadingModal isOpen />);

    const modalComponent = getByTestId('loadingModal-test');

    expect(modalComponent.getElementsByTagName('svg')).toHaveLength(1);
  });
});
