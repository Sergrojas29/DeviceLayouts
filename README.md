---
config:
  layout: fixed
---
flowchart TD
 subgraph React_Native["React Native Parent Node"]
        G["Skia View"]
  end
    A["CSV/TXT Data Input"] --> B["Process Data<br>Convert to Object Array"]
    B --> C["Get Canvas Size"]
    C --> D{"Create View"}
    D --> E["SVG View"] & F["Canvas View"]
    D -.-> G
    A@{ shape: cyl}
    style A stroke:#000000,fill:#FFD600
