# Remove Automatic Resume PDF Generation

## Goal

Keep the checked-in `public/resume.pdf` available for direct download while removing all automatic PDF generation from development and deployment workflows.

## Scope

- Remove the PDF renderer and generator scripts under `scripts/`.
- Remove the `resume:pdf` package script.
- Change `cf:deploy` to deploy directly without generating a PDF first.
- Remove `pdfkit` and `@types/pdfkit` from development dependencies and update the lockfile.
- Keep `public/resume.pdf` unchanged.
- Keep the Resume page's download link pointing directly to `/resume.pdf`.
- Update or remove documentation that claims deployment generates the PDF.

## Behavior

The Resume page continues to download the existing static `/resume.pdf` asset. Editing `content/resume.md` no longer regenerates that asset automatically; updating the PDF, if needed, is an explicit manual action outside this change.

## Verification

1. Confirm `public/resume.pdf` remains present.
2. Search the repository for active automatic-generation references and PDF renderer imports.
3. Verify package metadata and lockfile no longer include `pdfkit` or `@types/pdfkit`.
4. Run the available lint and build checks.

## Failure and compatibility considerations

The deploy command no longer fails because PDF generation failed; it only reflects the deployment command's own result. The static PDF contract remains unchanged, so existing download behavior is preserved.
