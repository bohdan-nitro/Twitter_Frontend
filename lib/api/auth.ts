import { API_URL } from "./config"

export async function login(data: {email: string}) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    if(res.status !== 200){
        throw new Error("Error during login")
    }

}

export async function authenticate(data: {
    email: string,
    emailToken: string
}) {
    const res = await fetch(`${API_URL}/auth/authenticate`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    if(res.status !== 200){
        throw new Error("Error during login")
    }
    return res.json()
}