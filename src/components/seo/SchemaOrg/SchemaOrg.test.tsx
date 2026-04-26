import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SchemaOrg } from './SchemaOrg';

describe('SchemaOrg', () => {
  it('renders script tag with application/ld+json', () => {
    const { container } = render(<SchemaOrg />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();
  });
});
