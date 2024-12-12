import { render } from '@testing-library/react';
import { AnimatedElement } from '../AnimatedElement';

describe('AnimatedElement', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <AnimatedElement>
        <div>Test Content</div>
      </AnimatedElement>
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <AnimatedElement className="custom-class">
        <div>Test Content</div>
      </AnimatedElement>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with default animation props', () => {
    const { container } = render(
      <AnimatedElement>
        <div>Test Content</div>
      </AnimatedElement>
    );

    const motionDiv = container.firstChild as HTMLElement;
    expect(motionDiv).toBeInTheDocument();
  });

  it('renders with custom animation type', () => {
    const { container } = render(
      <AnimatedElement animation="slideUp">
        <div>Test Content</div>
      </AnimatedElement>
    );

    const motionDiv = container.firstChild as HTMLElement;
    expect(motionDiv).toBeInTheDocument();
  });
});
