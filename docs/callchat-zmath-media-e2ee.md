# CallChat ZMath media E2EE

The hosted CallChat web distribution requires ZMath to be unlocked before a
voice or video call starts. At startup, the parent client prepares a
room-scoped factor from the user's passphrase and exact pattern, then launches
the embedded call with a non-secret requirement marker.

The factor is transferred directly in memory to the same-origin embedded call.
It is not placed in the widget URL, Matrix room state, local storage, or a
server request. The media engine combines it with each rotating MatrixRTC
sender key before LiveKit encrypts audio, video, and screen-sharing frames.

Call startup fails closed when the hosted distribution requires ZMath and the
bridge is absent, locked, or in Matrix-only mode. Community builds that do not
enable the CallChat requirement keep the standard Element Call behavior.

The hosted configuration enables `feature_group_calls` and sets Element Call
to exclusive mode so one-to-one calls cannot fall back to the legacy WebRTC
path. The parent prepares the factor before dispatching the room into call
view, and the embedded call checks it again before connecting.

The matching media-engine source and public security boundary are published in
the `ResearchForumOnline/element-call` and `ResearchForumOnline/CallChat`
repositories. Unmodified Element clients do not support this custom call
profile. It uses classical cryptography and does not claim post-quantum
security.
