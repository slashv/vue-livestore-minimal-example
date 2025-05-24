# Vue LiveStore - Minimal example

**[!] LiveStore still in private preview - See [LiveStore site](https://livestore.dev/) for updates and information**

This is a minimal example of how to integrate LiveStore with Vue.

For a more comprehensive integration ses [Vue LiveStore](https://github.com/slashv/vue-livestore)

## Relevant files

**store.ts**: Setup store and defines StoreKey as canonical store reference to provide / inject.

**main.ts**: Creates store and provides the store to the app.

**App.vue**: Injects the store, creates and subscribes to query, commits events.

**livestore/schema.ts**: Same as React example

**livestore/livestore.worker.ts**: same as React example

## Running the example

```bash
pnpm install
pnpm dev
```