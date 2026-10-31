# Parent/embed boundary example

S05/S10 distinguish four separate labels:

```html
<!-- Illustrative parent markup; configure the actual rendered Wix iframe -->
<iframe title="Interactive building-envelope project demonstration"
        src="https://example.invalid/approved-viewer/"></iframe>
```

The parent page has its own visible H1 and SEO title; the embedded document has its own `<title>`; each meaningful image still needs alt. `example.invalid` is deliberately a placeholder, not a delivery URL.

| Parent Wix | Embedded document |
|---|---|
| Visible essential H1/intro/service copy/CTA | Semantic internal headings and media |
| SEO title/description/canonical/schema | Own document title; not parent metadata |
| Embed title, outer bounds and placement | Responsive inner layout, control states |
| Navigation/footer/forms where required | Visual effects, custom interactions |

Tall-dialog recommendation (S11): test near a trigger several thousand pixels down the iframe, not only in a short standalone viewport. A usable standalone centered dialog is not proof that its Close control is reachable in Wix phone portrait/landscape.

Do not claim automatic height messaging unless both inner and parent code exist, validate sender/origin and are actually checked. Do not import unrelated wildcard message instrumentation from reference HTML.

Source cross-reference: [C04](../../../audit/SOURCES.md).
