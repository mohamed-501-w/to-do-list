import ratelimit from "../util/ratelimit.js"

//rate limit middleware function
const ratelimiter = async (req, res , next) => {
    try {
        console.log(req.header)
        const id = "user-limit"
        const {success} = await ratelimit.limit(id)

        if(!success) {
            return res.status(429).json({message:"To many requests"})
        }
        
        next()
    } catch (error) {

        console.error("Rate limit error", error)
        next(error)
    } 
}

export default ratelimiter