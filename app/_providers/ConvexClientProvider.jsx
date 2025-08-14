"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import Provider from "../provider";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export function ConvexClientProvider({ children }) {
    return <ConvexProvider client={convex}>
        <Provider>
            {children}
        </Provider>

    </ConvexProvider>;
}