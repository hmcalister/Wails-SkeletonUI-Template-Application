# Wails with Skeleton frontend Template Application

## About

This is a quick template application to use a [SkeletonUI](https://www.skeleton.dev/) frontend on a [Wails](https://wails.io/) application. 

This template is required as there are some nuances that make for poor compatibility between Wails and SkeletonUI. Notably, SkeletonUI creates an application that (when built with SSR) does not have the correct directory structure that Wails wants in the embedded site. This README walks you through setting up a project with Wails and SkeletonUI that still builds correctly using `wails build` and can be live developed using `wails dev`. Alternatively, cloning this repo should offer a template to start developing from.

This template is guided by [Plihelix's repo](https://github.com/plihelix/wails-template-sveltekit), and aims to work better for my own personal projects.

## Setting up a new project

Start by creating a new Wails application:

`wails init -n WailsSkeletonTemplateApp -t svelte`

Moving into the  newly created directory, remove the frontend directory as we will replace it soon:

```
cd WailsSkeletonTemplateApp
rm -r ./frontend
```

Create a new frontend using SkeletonUI:

`npm create skeleton-app@latest frontend`

We now have a frontend using SkeletonUI, with a backend that (when built) does not understand the directory structure. We can fix this by altering the backend and changing svelte to build a static site (disabling SSR). 

First, we note that the new frontend will build to the directory `frontend/build`, so we must embed this in `main.go`.

```go
//go:embed all:frontend/build
var assets embed.FS
```

Your Go linter may complain that `frontend/build` does not exist, which can be silenced by either creating the directory now or waiting to build the project for the first time.

Add the following line to `wails.json`, so Wails places the `wailjs` directory in the default library alias for Sveltekit:

`"wailsjsdir": "./frontend/src/lib",`

We now add the static adapter to the frontend, as well as the svelte preprocessor:

```
cd frontend
npm install -D @sveltejs/adapter-static svelte-preprocess
```

We replace the `frontend/svelte.config.js` file to implement the static adapter. Ensure you replace the Wails generated `frontend/svelte.config.js` with the one from this template repo. We also replace `frontend/vite.config.js` with the file from this repo, updating the resolver to serve `app.html` even when Wails asks for `index.html`.

Edit `frontend.tsconfig.json` and/or `frontend/jsconfig.json` adding the following at the bottom of `"compilerOptions"`, to overwrite the default Sveltekit variables and allows for importing from the `frontend` directory:

```
"paths": {
  "$lib": ["src/lib"],
  "$lib/*": ["src/lib/*"],
  "@/*": ["*"]
}
```

Include `.sveltekit` in your git repo, otherwise cloning your project may produce a copy that does not build correctly!

That's it! Ensure your project operates correctly under both live development (`wails dev`) and building (`wails build`). Happy developing!