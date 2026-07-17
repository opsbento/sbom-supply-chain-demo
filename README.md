# SBOM Supply Chain Demo

This repository contains a compact Node.js supply-chain demo for generating SBOMs with Syft and scanning them with Grype in GitHub Actions.

## Important Safety Notice

> WARNING
> 
> This repository intentionally includes a vulnerable demo target in `app/`.
> 
> Do not copy these dependencies into any real project.
> Do not run `npm install`, `npm ci`, or any other install command against the vulnerable demo in a personal, shared, CI, staging, or production environment unless that environment is intentionally isolated for security research.
> Do not copy-paste the vulnerable manifest into another repository.
> Do not treat the vulnerable app as a safe starter template.
> 
> If you only need a comparison target, use `app-clean/`.

## Overview

The repository intentionally contains two scan targets:

- `app/`: a demo application with dependencies that are expected to produce vulnerability findings
- `app-clean/`: a comparison application that is intended to stay clean or much cleaner than `app/`

Both targets are scanned from source folders and dependency manifests. No Docker image build is involved.

## Repository Contents

- `app/index.js`: vulnerable demo app entry point
- `app/package.json`: vulnerable dependency set for SBOM and CVE demo output
- `app-clean/index.js`: comparison app entry point
- `app-clean/package.json`: dependency set intended to avoid known CVEs
- `.github/workflows/sbom-scan.yml`: workflow for scanning `app/`
- `.github/workflows/sbom-scan-clean.yml`: workflow for scanning `app-clean/`

## Pipeline Flow

```text
Checkout
  -> Generate CycloneDX SBOM from target folder with Syft
  -> Scan SBOM with Grype
  -> Fail on high severity or above
```

## Workflows

- `sbom-scan.yml` scans `app/` and writes `sbom.cdx.json`
- `sbom-scan-clean.yml` scans `app-clean/` and writes `sbom-clean.cdx.json`

Each workflow generates its SBOM and scans it within the same GitHub Actions job, so Grype can read the file produced by Syft directly from the runner workspace.

## Notes

- Generated SBOM files and scan outputs are CI artifacts of the run and are not committed.
- The severity gate is currently `high`.
- The repository is prepared through file changes only. Running the application, install commands, or scans is not required to maintain the demo structure.
