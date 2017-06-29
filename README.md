# numericconditionals
A small utility which can conditionally return data based on predefined conditions. This can be very useful to for example return different values based on a numeric value.

There are many possible uses - I for example use it for a Slack bot, which prefixes the current temperature with a fitting attribute (e. g. nice 20°C, cold -5°C etc.).

There are three types of objects, dependent on the each other:
* A `Condition` tests a specific case (e. g. is the value bigger than 10? Is it smaller than or equal to 9?)
* A `Case` tests multiple conditions and also holds data. You could for example say that a value should be bigger than 10 and less than or equal to 20, and store an array for when this case is true
* A `Conditional` compares a value against multiple cases. You can either return the data of the first case that fits or return the data of all cases that fit.

## Installation
```bash
npm install numericconditionals
```
```bash
yarn add numericconditionals
```

## Usage
```javascript
const {
  Condition,
  Case,
  Conditional
} = require('numericconditionals');
```

### Conditions
#### Creation
Build up your conditions:
```javascript
const conditions1 = [
  new Condition('>', 0),
  new Condition('<=', 11)
];

const conditions2 = [
  new Condition('>', 10),
  new Condition('<=', 20)
];
```

The first one would match any value bigger than 0 (not 0 itself!), the second one would match any value less than or equal to 10.  
The numbers are run through `Number()`, so you can use everything that fits in there.

#### Usage
Use conditions by calling `isTrue()` on a `Condition`:

```javascript
const c1 = new Condition('>', 10);
c1.isTrue(12); // returns true
c1.isTrue(8); // returns false
```

### Cases
#### Creation
Build up your cases from your conditions:
```javascript
const cases = [
  new Case(
    conditions1,
    ['freezing', 'cold', 'terrible']
  ),
  new Case(
    conditions2,
    ['nice', 'warm', 'refreshing']
  )
];
```

#### Usage
You can test a `Case` by calling `areConditionsTrue`:
```javascript
const c2 = new Case(
  [
    new Condition('>', 10),
    new Condition('<=', 20)
  ],
  ['data', 'which', 'will', 'be', 'returned']
);

c2.areConditionsTrue(15); // returns true
c2.areConditionsTrue(9); // returns false
c2.getValue(); // returns ['data', 'which', 'will', 'be', 'returned']
```

### Conditionals
#### Creation
Build up your conditional:
```javascript
const conditional = new Conditional(cases);
```

### Usage
Now you can get values from your conditional. There are two possibilities:
```javascript
conditional.getFittingCases(10.5); // returns ['freezing', 'cold', 'terrible']
conditional.getFittingCases(10.5, true); // returns [['freezing', 'cold', 'terrible'], ['nice', 'warm', 'refreshing']]
conditional.getFittingCases(15); //returns ['nice', 'warm', 'refreshing']
```

Now you could use these however you'd like - for example get a random value for your chat bot!