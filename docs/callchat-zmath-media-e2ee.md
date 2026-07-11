# CallChat ZMath media E2EE

The hosted CallChat web distribution requires ZMath to be unlocked before a
voice or video call starts. At startup, the parent client prepares a per-room
factor from the user's passphrase and exact pattern image, then launches the
embedded call with only a non-secret `zmathMediaE2EE=true` flag.

The factor is transferred directly in memory to the same-origin embedded call.
It is not placed in the widget URL, Matrix room state, local storage, or a
server request. The media engine combines it with each rotating MatrixRTC
sender key before LiveKit encrypts audio, video, and screen-sharing frames.

Call startup fails closed when the hosted distribution requires ZMath and the
bridge is absent, locked, or in Matrix-only mode. Community builds that do not
set `window.callchatZMathCallRequired` keep the standard Element Call behavior.

The hosted configuration enables `feature_group_calls` and sets Element Call
to exclusive mode so one-to-one calls cannot fall back to the legacy WebRTC
path. The parent prepares the factor before dispatching the room into call
view, and the embedded call checks it again before connecting.

The matching media-engine source and cryptographic profile are published in
the `ResearchForumOnline/element-call` fork. Unmodified Element clients do not
support this custom call profile. It uses classical cryptography and does not
claim post-quantum security.
