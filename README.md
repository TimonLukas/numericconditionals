# numericconditionals
A small utility which can conditionally return data based on predefined conditions. This can be very useful to for example return different values based on a numeric value.

There are many possible uses - I for example use it for a Slack bot, which prefixes the current temperature with a fitting attribute (e. g. nice 20°C, cold -5°C etc.).
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
} = require("numericconditionals");
```

### Create conditions
Build up your conditions:
```javascript
const conditions1 = [
  new Condition(">", 0),
  new Condition("<=", 11)
];

const conditions2 = [
  new Condition(">", 10),
  new Condition("<=", 20)
];
```

The first one would match any value bigger than 0 (not 0 itself!), the second one would match any value less than or equal to 10.  
The numbers are run through `Number()`, so you can use everything that fits in there.

### Create cases
Build up your cases from your conditions:
```javascript
const cases = [
  new Case(
    conditions1,
    ["freezing", "cold", "terrible"]
  ),
  new Case(
    conditions2,
    ["nice", "warm", "refreshing"]
  )
];
```

### Create conditional
Build up your conditional:
```javascript
const conditional = new Conditional(cases);
```

### Get values
Now you can get values from your conditional. There are two possibilities:
```javascript
conditional.getFittingCases(10.5); // returns ["freezing", "cold", "terrible"]
conditional.getFittingCases(10.5, true); // returns [["freezing", "cold", "terrible"], ["nice", "warm", "refreshing"]]
conditional.getFittingCases(15); //returns ["nice", "warm", "refreshing"]
```

Now you could use these however you'd like - for example get a random value for your chat bot!