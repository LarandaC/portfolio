import { CanvasTexture, SRGBColorSpace } from "three";

/** 4:1, like the board mesh. */
export const SIGN_TEXTURE = { width: 512, height: 128 };

const WOOD = "#a8744a";
const WOOD_DARK = "#7a5032";
const INK = "#fbf3e4";

/** Arrow-shaped board with a name. The back face uses the other `pointsRight` so it reads from behind too. */
export function createSignTexture(label: string, pointsRight: boolean, font: string) {
  const { width: w, height: h } = SIGN_TEXTURE;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

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

  ctx.strokeStyle = "rgba(90, 55, 30, 0.35)";
  ctx.lineWidth = 3;
  for (const y of [h * 0.32, h * 0.7]) {
    ctx.beginPath();
    ctx.moveTo(pointsRight ? 24 : tip + 10, y);
    ctx.lineTo(pointsRight ? w - tip - 10 : w - 24, y);
    ctx.stroke();
  }

  // Shrunk to fit if needed.
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
