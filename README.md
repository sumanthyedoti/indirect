# inDirect
Communication platform for organisations and communites

# Development Setup
- git-clone the project
### Bootstrap

- Install `pnpm`
```console
npm install -g pnpm
```
- `cd` into the project
- Install `node_modules` in all packages
```console
pnpm bootstrap
```
### Running locally
- run all packages except _web_ and watch for changes
  - this runs `apps/server` and `libs`
```console
pnpm dev
```
- run _web_ and watch for changes (in another terminal window)
```console
pnpm -F @apps/web start
```
- visit the following URL in the browser
```
http://localhost:3000/
```
## Build the project
```console
pnpm build
```
## Start server
```console
pnpm start
```
- visit the following URL in the browser
```
http://localhost:8000/
``
