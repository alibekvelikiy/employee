export const baseUrl = "http://localhost:5000"

export const AuthAPI = class {
    static sighUp = async payload => {
        const response = await fetch(`${baseUrl}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        if (response.status !== 200) {
            throw await response.json()
        }
        return response.json()
    }

    static signIn = async payload => {
        const response = await fetch(`${baseUrl}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        if (response.status !== 200) {
            throw await response.json()
        }
        return response.json()
    }
}