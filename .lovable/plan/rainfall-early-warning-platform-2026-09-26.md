# Rainfall Early Warning Platform

## Goal
Build a polished, responsive demo dashboard for real-time rainfall risk, flood probability, inundation outlooks, safe-route guidance, and emergency support.

## Experience
- Use the requested charcoal/navy visual system with cyan for normal conditions, amber for warnings, red for critical risk, and green for safety.
- Make the first screen a live command dashboard with location context, current alert, key measurements, rainfall trend, risk map, monitored zones, and immediate safety actions.
- Add a dedicated inundation view with one interactive 3D terrain scene, forecast timeline, depth legend, affected assets, and scenario controls.
- Add clear citizen/authority modes so the same demo can surface operational details without requiring login.
- Prioritize the urgent warning, current risk, and action buttons on small screens.

## Demo Data and Interactions
- Use deterministic local demo data; no external credentials, database, or live feeds.
- Implement working area selection, map layer switches, forecast-time controls, warning acknowledgement, role switching, and safe-route results.
- Include realistic synthetic rainfall, river, road, hospital, shelter, and neighborhood data.

## Technical Details
- Keep the existing TanStack Start foundation and file-based routing.
- Build reusable dashboard, map, chart, alert, and metric components with semantic Tailwind design tokens.
- Use React Three Fiber for the isolated browser-rendered 3D terrain scene and Recharts for forecast data.
- Add route-specific metadata and preserve accessible keyboard and reduced-motion behavior.

## Verification
- Check dashboard and inundation flows in the live preview at desktop and mobile sizes.
- Confirm controls update visible data, the 3D scene renders and responds, layouts do not overlap, and the build remains error-free.
