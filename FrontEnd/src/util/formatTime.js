import { format } from "date-fns"

const formatTime = (date) => {
    return format(date, "dd-MM-yyyy")
}

export default formatTime
