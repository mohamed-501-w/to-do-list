import bcrypt from "bcrypt"

export const hashing = async (password) => {

    const hash = await bcrypt.hash(password, 10)
    return hash
}
export const passCompare = async (password, hash) => {

    return await bcrypt.compare(password , hash)
}