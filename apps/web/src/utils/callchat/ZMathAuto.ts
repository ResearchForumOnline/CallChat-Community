/*
 * Copyright 2026 Element Creations Ltd.
 *
 * SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
 * Please see LICENSE files in the repository root for full details.
 */

interface CallChatZMathBridge {
    readonly profile: string;
    isUnlocked(): boolean;
    isMatrixOnly(): boolean;
    prepareFiles(files: File[]): Promise<File[]>;
    prepareCallSecret(roomId: string): Promise<void>;
}

declare global {
    interface Window {
        callchatZMathRequired?: boolean;
        callchatZMathCallRequired?: boolean;
        callchatZMathAuto?: CallChatZMathBridge;
    }
}

/**
 * Gives the CallChat distribution a native choke point for every room upload.
 * Community builds remain unchanged unless they explicitly install the bridge.
 */
export async function prepareCallChatFiles(files: File[]): Promise<File[]> {
    const bridge = window.callchatZMathAuto;
    if (!bridge) {
        if (window.callchatZMathRequired) {
            throw new Error("ZMath Auto is required but its protection module is unavailable. Upload blocked.");
        }
        return files;
    }
    return bridge.prepareFiles(files);
}

/**
 * Returns the memory-only, room-scoped factor used by CallChat's media E2EE.
 * Hosted CallChat builds fail closed if the ZMath bridge is absent or locked.
 */
export async function prepareRequiredCallChatMedia(roomId: string): Promise<boolean> {
    const bridge = window.callchatZMathAuto;
    if (!bridge) {
        if (window.callchatZMathCallRequired) {
            throw new Error("ZMath media protection is required but its protection module is unavailable. Call blocked.");
        }
        return false;
    }

    if (!window.callchatZMathCallRequired) return false;
    await bridge.prepareCallSecret(roomId);
    return true;
}
