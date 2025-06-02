# POC: Comparing BroadcastChannel API and localStorage for Cross-Tab Communication

This proof of concept compares the [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) and the [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) as communication channels between different tabs and windows of the same origin. It also highlights their respective limitations.

---

## Installation

```bash
yarn install
```

Create a `.env.local` file for local development:

```
VITE_IFRAME_URL=
```

Start the development server:

```bash
yarn dev:all
```

---

## Enabling HTTPS and Simulating Production Conditions in Local Development

When running a local server, some browser rules such as [state partitioning](https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/State_Partitioning) may not work as they would in production. To simulate a production-like environment, enable HTTPS and use a custom domain instead of `localhost`.

### Steps:

1. **Install [mkcert](https://github.com/FiloSottile/mkcert#installation)** and generate two certificates.

2. **Install [Caddy](https://caddyserver.com/docs/install)** (or any reverse proxy tool you prefer) and configure it using the following example:

   ```caddyfile
   app.local.co {
       tls /path/to/cert/_wildcard.local.co.pem /path/to/cert/_wildcard.local.co-key.pem
       reverse_proxy localhost:3334
   }

   casino.local.serve {
       tls /path/to/cert/_wildcard.local.serve.pem /path/to/cert/_wildcard.local.serve-key.pem
       reverse_proxy localhost:3333
   }
   ```

3. **Run the Caddy server:**

   ```bash
   caddy run --config /path/to/config
   ```

4. **Update your `/etc/hosts` file:**

   ```
   127.0.0.1    localhost app.local.co casino.local.serve
   ```

5. **Start the development server with the appropriate `.env.local` configuration:**

   ```bash
   yarn dev:all
   ```

---

## Note

- To access the wrapper app in development, use `http://localhost:3334/wrapperApp`. Vite does not support running two separate applications simultaneously during development.
