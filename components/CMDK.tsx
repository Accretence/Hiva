import { Command } from 'cmdk'
import { useEffect, useState } from 'react'

export function CMDK({ CMDKVisible, setCMDKVisibility }) {
    return (
        <div
            aria-hidden="true"
            className="h-modal fixed top-0 right-0 left-0 z-50 hidden w-full overflow-y-auto overflow-x-hidden md:inset-0 md:h-full"
        >
            <div className="relative h-full w-full max-w-2xl p-4 md:h-auto">
                <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                    <Command label="Command Menu">
                        <Command.Input />
                        <Command.List>
                            <Command.Empty>No results found.</Command.Empty>

                            <Command.Group heading="Letters">
                                <Command.Item>a</Command.Item>
                                <Command.Item>b</Command.Item>
                                <Command.Separator />
                                <Command.Item>c</Command.Item>
                            </Command.Group>

                            <Command.Item>Apple</Command.Item>
                        </Command.List>
                    </Command>
                </div>
            </div>
        </div>
    )
}
