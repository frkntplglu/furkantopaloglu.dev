# Static Resume PDF

## Goal

Keep the resume PDF as a checked-in static Cloudflare asset without any automatic generation step.

## Source of truth and flow

- `public/resume.pdf` is the static asset served by the site.
- `src/app/resume/page.tsx` links the Download button to `/resume.pdf`.
- `pnpm cf:deploy` runs the existing Vinext Cloudflare deploy command directly.

The deployed application serves the checked-in PDF as a static asset. Updating the PDF is an explicit manual action and is not part of the deploy workflow.

## Implementation boundary

The PDF renderer and generator scripts are removed. The static asset contract and download link remain in place.

## Verification

1. Confirm `public/resume.pdf` remains present.
2. Run the project lint/build checks available in the repository.
3. Confirm the deploy command invokes Cloudflare deployment directly.

## Failure behavior

The deploy command no longer has a PDF generation failure mode. It publishes the checked-in static PDF along with the rest of the site.
