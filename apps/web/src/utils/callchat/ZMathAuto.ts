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
}

declare global {
    interface Window {
        callchatZMathRequired?: boolean;
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

