# Grommet CMS Content Blocks
Pluggable content blocks built for the Grommet Content Management System.

# Development

1. To start work on this project run the below command:

```bash
make dev
```

This will install the project dependencies, build the project, and use `yarn link` to register the local package. 

2. Link `grommet-cms-content-blocks` to the current project that consumes this package

You will need to switch directories to the project you are working on and link `grommet-cms-content-blocks` via:

```bash
yarn link grommet-cms-content-blocks
```

Now your current project will be consuming the local version of `grommet-cms-content-blocks`.

3. Making changes  

To see your new changes simply re-run the dev command:

```bash
make dev
```

This will re-build the local package again showing your changes where this package is consumded. 

4. Finishing up

When you are done making any changes to the package, you will need to unlink them 

In the current directory (`grommet-cms-content-blocks`):

```bash
yarn unlink
```

In your project directory:

```bash
yarn unlink grommet-cms-content-blocks
```

# Deploy 

1. To deploy the project run:

```bash
make deploy
```

This will build the project, bump the version, and push the changes and tags to github

2.  Install the deployed project 

Switch to your current project directory and update the `grommet-cms-content-blocks` package's version to the new version.  For example:

```json
    "grommet-cms-content-blocks": "git+https://github.com/webmocha/grommet-cms-content-blocks.git#v2.0.10",
```

You will bump the version from `v2.0.10` to the new version that was deployed, and re-install the deployed package.