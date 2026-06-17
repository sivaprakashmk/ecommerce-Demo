// Centralized test data — change credentials here and it reflects across all tests

export const USERS = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'wrong_user',
    password: 'wrong_pass',
  },
};

export const CHECKOUT_INFO = {
  firstName: 'Siva',
  lastName: 'Prakash',
  postalCode: '600001',
};

export const MESSAGES = {
  lockedError: 'Epic sadface: Sorry, this user has been locked out.',
  invalidError: 'Epic sadface: Username and password do not match any user in this service',
  orderConfirm: 'Thank you for your order!',
};

export const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
};
