import { CanvasTexture, SRGBColorSpace } from "three";

/** Canvas size of a sign board; the board mesh keeps the same 4:1 aspect. */
export const SIGN_TEXTURE = { width: 512, height: 128 };

const WOOD = "#a8744a";
const WOOD_DARK = "#7a5032";
const INK = "#fbf3e4";

/**
 * A painted wooden board shaped like an arrow, with the place's name on it.
 * `pointsRight` decides which end gets the point: each board has two faces, and the back one is drawn
 * pointing the other way so that, seen from behind, the arrow still points along the path and the text reads.
 * Outside the board's shape is transparent (the material cuts it out with alphaTest).
 */
export function createSignTexture(label: string, pointsRight: boolean, font: string) {
  const { width: w, height: h } = SIGN_TEXTURE;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  // Arrow-shaped board: square end, pointed end.
  const tip = 56;
  const inset = 6;
  ctx.beginPath();
  if (pointsRight) {
    ctx.moveTo(inset, inset);
    ctx.lineTo(w - tip, inset);
    ctx.lineTo(w - inset, h / 2);
    ctx.lineTo(w - tip, h - inset);
    ctx.lineTo(inset, h - inset);
  } else {
    ctx.moveTo(w - inset, inset);
    ctx.lineTo(tip, inset);
    ctx.lineTo(inset, h / 2);
    ctx.lineTo(tip, h - inset);
    ctx.lineTo(w - inset, h - inset);
  }
  ctx.closePath();
  ctx.fillStyle = WOOD;
  ctx.fill();
  ctx.lineWidth = 8;
  ctx.strokeStyle = WOOD_DARK;
  ctx.stroke();

  // A couple of wood-grain lines.
  ctx.strokeStyle = "rgba(90, 55, 30, 0.35)";
  ctx.lineWidth = 3;
  for (const y of [h * 0.32, h * 0.7]) {
    ctx.beginPath();
    ctx.moveTo(pointsRight ? 24 : tip + 10, y);
    ctx.lineTo(pointsRight ? w - tip - 10 : w - 24, y);
    ctx.stroke();
  }

  // The name, centred on the flat part of the board, shrunk to fit if needed.
  const textCenter = pointsRight ? (w - tip) / 2 : tip + (w - tip) / 2;
  let size = 60;
  ctx.font = `600 ${size}px ${font}`;
  while (ctx.measureText(label).width > w - tip - 48 && size > 28) {
    size -= 2;
    ctx.font = `600 ${size}px ${font}`;
  }
  ctx.fillStyle = INK;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, textCenter, h / 2 + 3);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}
