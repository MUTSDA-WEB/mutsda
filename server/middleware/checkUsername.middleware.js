import { getUserDetails } from "../helpers/getUserInfo";

export default async(c, next) => {
    const {username} = c.req.json()
    username = username.toLowerCase()
    const userDetails = await getUserDetails(username)
    if (!userDetails) {
        return c.json({
            error: "Invalid login credentials"
        }, 400)
    }
    c.set(userInfo, userDetails)
    await next()
}