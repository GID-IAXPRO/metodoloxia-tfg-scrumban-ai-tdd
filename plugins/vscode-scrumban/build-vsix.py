#!/usr/bin/env python3
"""
Script lixeiro sen dependencias externas (só Python 3 estándar) para empaquetar
a extensión de VS Code nun ficheiro instalable `.vsix`.
"""
import json
import os
import zipfile

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(ROOT_DIR, "package.json"), "r", encoding="utf-8") as f:
    pkg = json.load(f)

name = pkg["name"]
publisher = pkg.get("publisher", "local")
version = pkg["version"]
display_name = pkg.get("displayName", name)
description = pkg.get("description", "")

vsix_filename = os.path.join(ROOT_DIR, f"{name}-{version}.vsix")

VSIX_MANIFEST = f"""<?xml version="1.0" encoding="utf-8"?>
<PackageManifest Version="2.0.0" xmlns="http://schemas.microsoft.com/developer/vsx-schema/2011" xmlns:d="http://schemas.microsoft.com/developer/vsx-schema-design/2011">
  <Metadata>
    <Identity Language="en-US" Id="{name}" Version="{version}" Publisher="{publisher}" />
    <DisplayName>{display_name}</DisplayName>
    <Description xml:space="preserve">{description}</Description>
    <Tags>scrumban,kanban,markdown,tfg,aidd</Tags>
    <Categories>Other,Visualization</Categories>
    <GalleryFlags>Public</GalleryFlags>
    <Properties>
      <Property Id="Microsoft.VisualStudio.Code.Engine" Value="^1.75.0" />
      <Property Id="Microsoft.VisualStudio.Code.ExtensionDependencies" Value="" />
      <Property Id="Microsoft.VisualStudio.Code.ExtensionPack" Value="" />
      <Property Id="Microsoft.VisualStudio.Code.ExtensionKind" Value="ui,workspace" />
      <Property Id="Microsoft.VisualStudio.Services.Links.Learn" Value="" />
    </Properties>
  </Metadata>
  <Installation>
    <InstallationTarget Id="Microsoft.VisualStudio.Code"/>
  </Installation>
  <Dependencies/>
  <Assets>
    <Asset Type="Microsoft.VisualStudio.Code.Manifest" Path="extension/package.json" Addressable="true" />
    <Asset Type="Microsoft.VisualStudio.Services.Content.Details" Path="extension/README.md" Addressable="true" />
  </Assets>
</PackageManifest>
"""

CONTENT_TYPES = """<?xml version="1.0" encoding="utf-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension=".json" ContentType="application/json"/>
  <Default Extension=".js" ContentType="application/javascript"/>
  <Default Extension=".md" ContentType="text/markdown"/>
  <Default Extension=".vsixmanifest" ContentType="text/xml"/>
</Types>
"""

FILES_TO_INCLUDE = [
    "package.json",
    "README.md",
    "src/extension.js",
    "src/parser.js",
    "src/webview.js",
]

with zipfile.ZipFile(vsix_filename, "w", zipfile.ZIP_DEFLATED) as zf:
    zf.writestr("[Content_Types].xml", CONTENT_TYPES.strip())
    zf.writestr("extension.vsixmanifest", VSIX_MANIFEST.strip())
    for rel_path in FILES_TO_INCLUDE:
        abs_path = os.path.join(ROOT_DIR, rel_path)
        if os.path.exists(abs_path):
            zf.write(abs_path, f"extension/{rel_path}")

print(f"Paquete VSIX xerado correctamente: {vsix_filename}")
