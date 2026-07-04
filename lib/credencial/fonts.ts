import os from "os";
import path from "path";
import { writeFileSync } from "fs";

let registrado = false;

export function registrarFontes() {
  if (registrado) return;
  registrado = true;

  const fontDir = path.join(process.cwd(), "public", "credencial", "fonts");
  const cacheDir = path.join(os.tmpdir(), "fontconfig-cache");
  const confPath = path.join(os.tmpdir(), "credencial-fonts.conf");

  const conf = `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${fontDir}</dir>
  <cachedir>${cacheDir}</cachedir>
  <include ignore_missing="yes">/etc/fonts/fonts.conf</include>
</fontconfig>`;

  writeFileSync(confPath, conf);
  process.env.FONTCONFIG_FILE = confPath;
}
