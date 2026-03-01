export async function safeQuery<T>(fn: () => Promise<T>): Promise<T> {
    try {
        return await fn()
    } catch (err) {
        console.warn("Database retry after possible cold start...")
        await new Promise(res => setTimeout(res, 1500))
        return await fn()
    }
}
