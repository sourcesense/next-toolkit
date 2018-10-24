/* eslint-env jest */
import { getDisplayName } from '../utils';

describe('getDisplayName', () => {
  it('returns preferably displayName', () => {
    const component = { displayName: 'displayName', name: 'name' };
    expect(getDisplayName(component)).toBe('displayName');
  });
  it('falls back to name', () => {
    const component = { displayName: undefined, name: 'name' };
    expect(getDisplayName(component)).toBe('name');
  });
  it('falls back to "Component"', () => {
    const component = { displayName: undefined, name: undefined };
    expect(getDisplayName(component)).toBe('Component');
  });
});
