"use client";

import { ConnectionCheckerMenuHook } from "./ConnectionChecker.hook";

export function ConnectionCheckerMenu() {

    const { menu } = ConnectionCheckerMenuHook();

    return (
        <div>
            <h1>Menu</h1>
            <ul>
                {menu.length > 0 && menu.map((item) => (
                    <li key={item.id}>
                        {item.name} - ${item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};
