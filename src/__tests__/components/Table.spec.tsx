import { render } from '@testing-library/react';

import Table from '../../components/Table';

describe('Table component', () => {
  it('should render the component', () => {
    const data = [];
    const { getByTestId } = render(<Table data={data} />);

    expect(getByTestId('table-test')).toBeTruthy();
  });

  it('should render with correct style', () => {
    const data = [];
    const { getByTestId } = render(<Table data={data} />);

    expect(getByTestId('table-test')).toHaveClass('table');
  });

  it('should display the data', () => {
    const data = [
      { label: 'Label 1', value: 'Value 1' },
      { label: 'Label 2', value: 'Value 2' },
    ];

    const { getByTestId } = render(<Table data={data} />);
    const tableComponent = getByTestId('table-test');
    const trChildren = tableComponent.getElementsByTagName('tr');

    expect(trChildren).toHaveLength(2);
    expect(trChildren[0]).toHaveTextContent('Label 1');
    expect(trChildren[0]).toHaveTextContent('Value 1');
    expect(trChildren[1]).toHaveTextContent('Label 2');
    expect(trChildren[1]).toHaveTextContent('Value 2');
  });
});
