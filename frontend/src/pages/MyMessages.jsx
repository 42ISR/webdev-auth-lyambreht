import Feed from '../components/Feed'
import { useMessageStore } from "../store/useMessageStore"
import { useUserStore } from "../store/useUserStore"
import { useEffect, useState } from "react"

const MyMessages = () => {
    const { user } = useUserStore()
        const [isLoading, setIsLoading] = useState(false)
        const [error, setError] = useState(null)
        const {messages, getMessages} = useMessageStore()
        useEffect(() => {
            const load = async () => {
                setError(null)
                setIsLoading(true)
            try {
            await getMessages(true)
            } catch (error) {
                console.error(error)
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        load()    
        }, [])
    
        return (
    <>     

            {isLoading && <p>Загрузка...</p>}
            {error && <p>{error}</p>}
            {messages.length > 0 && (
                <Feed  messages={messages} title="Мои сообщения" />
            )}
        </>
        )
}



export default MyMessages
