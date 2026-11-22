# Créditos de modelos 3D

Los originales están en esta carpeta, pero git no los guarda porque pesan mucho. Si faltan, se descargan de nuevo desde los enlaces de abajo.
`npm run models` genera las versiones optimizadas en `public/models/`.
Las licencias CC-BY obligan a dar crédito. En la fase 3 esta lista se muestra en el sitio.

## Publicados (en `public/models/`)

| Archivo optimizado | Original | Autor | Licencia | Fuente |
| --- | --- | --- | --- | --- |
| `cat-evil-katz.glb` | `cat/an_animated_cat.glb` | Evil_Katz | [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/) | ["An Animated Cat"](https://skfb.ly/6YPwH) (Sketchfab) |
| `cat-madtrollstudio.glb` | `cat/Cat by madtrollstudio - YvVobPlTlQ.glb` | madtrollstudio | CC-BY | "Cat" vía [Poly Pizza](https://poly.pizza/m/YvVobPlTlQ) |
| `cat-volkanongun.glb` | `cat/low_poly_cat.glb` | volkanongun | [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/) | ["Low Poly Cat"](https://skfb.ly/OqVx) (Sketchfab) |
| `cat-tuxedo-dreamnoms.glb` | `cat/tuxedo_cat_animated_2.0.glb` | DreamNoms | [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/) | ["Tuxedo Cat Animated 2.0"](https://skfb.ly/ooRuV) (Sketchfab) |
| `cat-somali-dreamnoms.glb` | `cat/somali_cat_animated_ver_1.2.glb` | DreamNoms | [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/) | ["Somali Cat Animated ver 1.2"](https://skfb.ly/6ZsPo) (Sketchfab) |
| `cat-volkanongun-walk.glb` | `cat/low_poly_cat_walk.glb` | volkanongun | [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/) | ["Low Poly Cat Walk"](https://skfb.ly/RGOW) (Sketchfab) |
| `pagoda.glb` | `house/Pagoda by Poly by Google - d1M5ncMBUDi.glb` | Poly by Google | CC-BY | "Pagoda" vía [Poly Pizza](https://poly.pizza/m/d1M5ncMBUDi) |
| `house-daniel-stringer.glb` | `house/japanese_house.glb` | Daniel Stringer | [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/) | ["Japanese House"](https://skfb.ly/ooHFU) (Sketchfab) |
| `house-ig-shero.glb` | `house/japanese_house (1).glb` | IG_Shero | [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/) | ["Japanese House"](https://skfb.ly/pHnOC) (Sketchfab) |
| `shrine-wolvemancer.glb` | `house/japanese_shrine.glb` | Wolvemancer | [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/) | ["Japanese Shrine"](https://skfb.ly/6UNDD) (Sketchfab) |
| `bell-tower-ao-interactive.glb` | `house/japanese_bell_tower.glb` | AO-INTERACTIVE | [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/) | ["Japanese Bell Tower"](https://skfb.ly/6GJE7) (Sketchfab) |
| `stone-lantern-sahir-virmani.glb` | `decor/japanese_stone_lantern.glb` | Sahir Virmani | [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/) | ["Japanese Stone Lantern"](https://skfb.ly/6QTTv) (Sketchfab) |
| `maple-olivermathegames.glb` | `decor/japanese_maple_tree.glb` | OliverMatheGames | [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/) | ["Japanese Maple Tree"](https://skfb.ly/6Swwv) (Sketchfab) |
| `house-janab.glb` | `house/simple_japanese_house_2.glb` | JanaB | [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/) | ["Simple Japanese House 2"](https://skfb.ly/oyDtV) (Sketchfab) |

Los enlaces de Poly Pizza se armaron a partir del ID que trae el nombre del archivo. Hay que comprobar que abren el modelo correcto.

## No publicados

| Original | Autor | Licencia | Fuente | Motivo |
| --- | --- | --- | --- | --- |
| `cat/cat_walk.glb` | LostBoyz2078 | [CC-BY-NC 4.0](http://creativecommons.org/licenses/by-nc/4.0/) | ["Cat Walk"](https://skfb.ly/oFBFP) | La licencia no permite uso comercial, y un portafolio para conseguir trabajo es zona gris |
| `cat/low-poly_catwalk.glb` | dylanheyes | [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/) | ["Low-Poly Catwalk"](https://skfb.ly/oBXXR) | Es una pasarela de moda ("catwalk"), no un gato |
| `house/feudal_japanese_house.glb` | local.yany | [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/) | ["Feudal Japanese House"](https://skfb.ly/pzOPo) | Unos 373 mil triángulos, demasiado pesado para la web |
| `house/japanese_castle.glb` | Zorodroger | [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/) | ["Japanese Castle"](https://skfb.ly/onSqY) | Unos 344 mil triángulos en miles de piezas pequeñas: no baja de ~200 mil (4,5 MB) ni simplificado, demasiado pesado incluso de fondo |
| `house/traditional_japanese_house.glb` | Sulfuric Arts | [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/) | ["Traditional Japanese House"](https://skfb.ly/oULpW) | Unos 814 mil triángulos, demasiado pesado para la web |

## Cómo agregar un modelo

1. Descárgalo en `assets-src/<tipo>/` en formato `.glb`.
2. Agrégalo a la lista `MODELS` de `scripts/optimize-models.mjs`.
3. Agrega su fila en este archivo, con autor, licencia y enlace.
4. Ejecuta `npm run models`.
