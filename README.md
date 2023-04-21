# ArGram Starter Repo

Refer to the following steps to get setup:

## Install dependencies

```bash
yarn
```

## Run server

```bash
yarn dev
```

Open the link provided in the browser or visit [http://localhost:3000](http://localhost:3000).
npm install

#or

yarn
src/contract/handle.js:
// handle.js

export async function handle(state, action) {
  const { input, caller } = action;

    // contract functions' definitions

}
// function to get owner
  if (input.function === 'getOwner') {
    return { result: state.owner }
  }
  // function to get balances
  if (input.function === "balance") {
    let target;
    if (!input.target) {
      target = caller;
    } else {
      target = input.target;
    }
    const ticker = state.ticker;

    ContractAssert(typeof target === "string", "Must specify target to get balance for.")
    ContractAssert(typeof balances[target] === "number", "Cannot get balance; target does not exist.")

    return {
      result: {
        target,
        ticker,
        balance: balances[target],
      },
    };
  }
  // functions to transfer ownership
  if (input.function === 'transfer') {
    const { qty, target } = input
    ContractAssert(target, 'target MUST be defined')
    ContractAssert(target !== caller, 'target can not be caller')
    ContractAssert(typeof qty === 'number', 'qty MUST be a number')
    ContractAssert(qty > 0, 'qty MUST be greater than zero')
    ContractAssert(Object.keys(balances).includes(caller))
    ContractAssert(balances[caller] >= qty, 'caller does not have enough qty')

    state.balances[caller] -= qty
    if (!state.balances[target]) {
      state.balances[target] = qty
    } else {
      state.balances[target] += qty
    }

    return { state }
  }
