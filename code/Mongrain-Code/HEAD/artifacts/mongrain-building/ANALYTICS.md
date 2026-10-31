# Envelope exploration analytics

Go to Publishing settings, enable analytics, and publish or republish your app.
The analytics changes will take effect on the next publish. Replit injects the
tracker; this app does not install a tracker script, website ID, or credentials.
Access to analytics does not mean collection is already enabled.

| Description | Event name | Properties |
| --- | --- | --- |
| Visitor selects a building section via model or section control | `envelope_section_selected` | `section`: `walls`, `roof`, or `foundation` |
| Visitor changes the active detail layer via labels, callouts, model, Previous/Next, or arrow keys | `envelope_layer_selected` | `section`, one-based `layer`, `method`: `pick`, `previous`, or `next` |
| Visitor uses Explode/Reassemble on the building or a section detail | `envelope_assembly_toggled` | `section`: `building`, `walls`, `roof`, or `foundation`; `action`: `explode` or `reassemble` |
| Visitor returns via Back, foundation overview, Escape, or clearing a section | `envelope_building_returned` | `section` being left |

Events describe manual interactions, not animation completion. Re-selecting an
already active layer is not counted. Initial layer state, hover, intro assembly,
replay, and automatic roof guide steps do not fire these events. Returning after
a detail rendering failure is error recovery, not a visitor return.

Only fixed section identifiers, layer numbers, methods, and actions are sent.
No names, emails, personal data, URLs, secrets, or free-form content are included.
Events are sent from handlers, not render effects or state updater callbacks.
An absent, late-loading, throwing, or rejecting tracker cannot block controls.
Events before the tracker loads are not buffered or retried.

## Wix boundary

The standalone, copy-pasted Wix HTML does **not** automatically inherit
Replit-hosted analytics. It has the same safe event calls but no injected
tracker, so these calls are normally no-ops in the Wix iframe. Enabling analytics
on the Replit deployment does not enable tracking in copied HTML. Tracking that
standalone Wix embed requires a separately configured analytics solution in the
iframe; none is installed by this change. The Wix page's own tracker is not
automatically accessible across the iframe boundary.

## Questions to ask once published data arrives

- Which section do visitors select most often?
- Which layer numbers are explored most within each section?
- Do visitors use Explode or Reassemble more often in the building versus details?

## Local verification

Run `pnpm --filter @workspace/mongrain-building test:analytics` to check safe
behavior without a browser or tracker, exact event forwarding, synchronous
errors, blocked tracker access, and rejected network promises. These checks do
not send any live analytics. The existing detail-control regression suite
exercises navigation without an injected tracker.
