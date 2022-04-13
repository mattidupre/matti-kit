import hasSharedReferences from './hasSharedReferences';

const ref = {};

const obj1 = {
  foo: {
    bar: {
      baz: ref,
    },
  },
};

const obj2 = {
  foo: {
    ref,
    bar: 'baz',
  },
};

const obj3 = {
  foo: {
    bar: {
      baz: null,
    },
  },
  fn: () => {},
};

const obj4 = {
  parent: null,
  foo: {
    bar: {
      baz: 'asdf',
    },
  },
};
obj4.parent = obj4;

describe('for two non-objects', () => {
  it('does not error', () => {
    expect(() =>
      hasSharedReferences(
        (1 as unknown) as Record<string, any>,
        ('asdf' as unknown) as Record<string, any>,
      ),
    ).not.toThrowError();
  });
});

describe('for two objects that DO NOT share references', () => {
  it('does not error', () => {
    expect(() => hasSharedReferences(obj1, obj3)).not.toThrowError();
  });
});

describe('for two objects that DO share references', () => {
  it('errors', () => {
    expect(() => hasSharedReferences(obj1, obj2)).toThrowError();
  });
});

describe('for two objects that DO share references that are EXCLUDED', () => {
  it('errors', () => {
    expect(() => hasSharedReferences(obj1, obj2, ['ref'])).not.toThrowError();
  });
});

describe('for two of the same object', () => {
  it('errors', () => {
    expect(() => hasSharedReferences(obj3, obj3)).toThrowError();
  });
});

describe('for two objects, one that contains circular references', () => {
  describe('that DO NOT share references', () => {
    it('does not error', () => {
      expect(() => hasSharedReferences(obj1, obj4)).not.toThrowError();
    });
  });
});
