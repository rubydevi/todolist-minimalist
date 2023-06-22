const localStorageMock = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

localStorageMock.getItem.mockReturnValue(JSON.stringify([
  {
    description: 'Buy groceries',
    completed: false,
    index: 1,
  },
  {
    description: 'Do laundry',
    completed: false,
    index: 2,
  },
]));

export default localStorageMock;
