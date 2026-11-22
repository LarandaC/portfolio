import { Mesh, MeshToonMaterial, type Material, type Object3D, type Texture } from "three";

type WithColorAndMap = Material & { color?: MeshToonMaterial["color"]; map?: Texture | null };

/**
 * Swaps every mesh's material for a toon one (keeping its color and texture) or restores the originals.
 * Originals are stashed on `userData` so toggling back and forth is lossless.
 */
export function applyToonMaterials(root: Object3D, toon: boolean, gradientMap: Texture) {
  root.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    const mesh = object as Mesh & { userData: { original?: Material | Material[]; toon?: Material | Material[] } };

    if (!mesh.userData.original) mesh.userData.original = mesh.material;
    if (!toon) {
      mesh.material = mesh.userData.original;
      return;
    }

    if (!mesh.userData.toon) {
      const make = (source: Material) => {
        const { color, map } = source as WithColorAndMap;
        return new MeshToonMaterial({
          color: color?.clone(),
          map: map ?? null,
          gradientMap,
          transparent: source.transparent,
          side: source.side,
        });
      };
      const original = mesh.userData.original;
      mesh.userData.toon = Array.isArray(original) ? original.map(make) : make(original);
    }
    mesh.material = mesh.userData.toon;
  });
}
