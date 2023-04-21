export async function handle(state, action) {
  const { input, caller } = action;
  const balances = state.balances;

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

  // function to update comments
  if (input.function === 'addComment') {
    state.comments.push({ comment: input.txnData.comment, username: input.txnData.username, id: action.caller });
    return { state };
  }

  // function to add likes
  if (input.function === 'likePost') {
    if (Object.keys(state.likes).includes(action.caller)) {

      throw new ContractError('User has voted!')
    } else {
      state.likes[caller] = Object.keys(state.likes).length + 1;

      return { state };
    }
  }

  else {
    throw new ContractError('Unrecognised function \\"' + input.function + '\\"');
  }
  
actions = [ (sum, 1), (sum, 2), (sum, 3) ]
initState = 0

async function handle (state, action) {
    if (function === 'sum') {
        state = state + input
    }
}
// src/pages/start.svelte

<script>
    import { profile } from "../store.js";
  import { Othent } from "permawebjs/auth";

    async function handleConnect() {
    // write code for handling connection with app
  }
</script>

<!-- landing page ui -->
  
// src/pages/start.svelte
<script>
// imports

async function handleConnect() {
    $profile = await Othent.logIn();
}
</script>

<!-- landing page ui -->

 // src/pages/start.svelte

<button class="btn btn-primary" on:click={handleConnect}>Connect</button>

// src/components/navbar.svelte

<script>
import { profile } from "../store.js";
import { Othent } from "permawebjs/auth";

$: name = $profile ? $profile.given_name + " " + $profile.family_name : "";

  async function handleConnect() {
    $profile = await Othent.logIn();
  }

  async function handleDisconnect() {
    await Othent.logOut();
    $profile = null;
  }
</script> 

<!-- navbar component ui -->

{#if $profile}
  <!-- displays connected user's name from variable 'name' -->
  <!-- doubles as the log out button calling handle disconnect on click -->
  <button class="btn btn-ghost" on:click={handleDisconnect}>{name}</button>
{:else}
  <!-- connect button to handle log in -->
  <button on:click={handleConnect} class="btn btn-ghost">Connect</button>
{/if}

# Command Line

npm run dev

#or

yarn dev
