# CallChat Community Fork

This public fork is the corresponding client source for CallChat Community and
the hosted CallChat Shield web experience.

## Product boundary

- The Matrix-compatible web client and CallChat branding modifications are
  public under the upstream AGPL-3.0/GPL-3.0 licensing terms.
- The hosted Shield Showcase uses this same public client with deployment
  configuration and separate server-side services.
- Server entitlement, managed recovery, customer operations, credentials and
  private research are not embedded in this client.
- Official Element mobile and desktop applications remain compatible with the
  CallChat homeserver.

## CallChat changes

- CallChat application, PWA and accessibility identity.
- CallChat icon set.
- A configurable deployment overlay and ZMath integration are maintained in
  `ResearchForumOnline/CallChat`.

Upstream base: Element Web `v1.12.23`, commit
`3a219ab3564f6d8a193732f488a47bec003583af`.
