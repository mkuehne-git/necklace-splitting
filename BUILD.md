# Build

The `npm clean-install` ensures, that you build with up-to-date dependencies.

```bash
npm clean-install
npm run build
```

Check for uncommited changes - due to potential change of `package-lock.json` - before deployment.

# Deployment

## GitHub Pages

Within this chapter, the deployment target is denoted as
`https://<USERNAME>.github.io/<REPO>`.

1. `cd` into project root  

2. Create `./deploy.sh` with the following content (see [Vite - Deploying a Static Site](https://vitejs.dev/guide/static-deploy.html#github-pages)).

    ```bash
    #!/usr/bin/env sh

    # abort on errors
    set -e

    # build
    npm run build

    # navigate into the build output directory
    cd dist

    # if you are deploying to a custom domain
    # echo 'www.example.com' > CNAME

    # empty repository
    git init --initial-branch=main
    git add -A
    git commit -m 'deploy'

    # if you are deploying to https://<USERNAME>.github.io
    # git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

    # if you are deploying to https://<USERNAME>.github.io/<REPO>
    # Note: main refers to local branch, gh-pages to upstrem
    git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

    cd -    
    ```

3. Edit `vite.config.js` and change in line #5 `/temp/` to your `<REPO>`.

    ```javascript  {.line-numbers, highlight=5}
    import { defineConfig } from 'vite';
    import glsl from 'vite-plugin-glsl';
    const isProduction = process.env['NODE_ENV'] === 'production';
    const base = isProduction ? '/temp/' : '/';
    export default defineConfig({
        base,
        plugins: [
            glsl()
        ]
    });
    ```

4. Make `deploy.sh` executable, with  

    ```bash
    chmod a+x deploy.sh
    ```

5. Execute  

    ```bash
    ./deploy.sh
    ```
