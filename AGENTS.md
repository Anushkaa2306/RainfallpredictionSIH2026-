<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting published git history.
<!-- LOVABLE:END -->

- Use deterministic local demo data for all rainfall, risk, routing, and emergency information so the public dashboard works without credentials.
- Keep the 3D terrain isolated to the client-only `/inundation` route because WebGL cannot render during server-side rendering.
