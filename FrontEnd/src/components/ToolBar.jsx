import { ArrowDownUp, Search } from "lucide-react"
import React from "react"

export default function ToolBar() {
    return (
        <div className="flex justify-end gap-4">
            <Search className="transition duration-300 ease-out hover:scale-120 hover:text-blue-400" />
            <ArrowDownUp className="transition duration-300 ease-out hover:scale-120 hover:text-blue-400" />
        </div>
    )
}
