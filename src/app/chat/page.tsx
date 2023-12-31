"use client"
import { UserButton, useUser } from "@clerk/nextjs";
import { StreamChat} from "stream-chat";
import {Channel, ChannelHeader, ChannelList, Chat, LoadingIndicator, MessageInput, MessageList, Thread, Window} from "stream-chat-react"
import useInitializeChatClient from "./useInitializeChatClient";


const userId = "user_2VBHq5vtKlssJqqBObPytzR3EpG";

const chatClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_KEY!
)

chatClient.connectUser(
  {
    id:userId,
    name:"Anish Anand"
  },
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl8yVkJIcTV2dEtsc3NKcXFCT2JQeXR6UjNFcEcifQ.3aNXGn29cOnpT-7LMXueI7fbnpLWqetSIIqbUuK-9Gk"
)

const channel = chatClient.channel("messaging","channe_1",{
  name:"Channel #1",
  members:[userId],
})
export default function ChatPage() {

  const chatClient = useInitializeChatClient()
  const {user} = useUser()

  if (!chatClient || !user) {
    return(
      <div className="flex h-screen items-center justify-center">
        <LoadingIndicator size={40}/>
      </div>
    )
  }
  return (
    <>
      <Chat client={chatClient}>
        <ChannelList filters={{
          type:"messaging",
          members: {$in: [user.id]}
        }}
        sort={{ last_message_at: -1}}
        options={{state:true,presence:true,limit:10}}
        />
      <Channel >
        <Window>
          <ChannelHeader/>
          <MessageList/>
          <MessageInput/>
        </Window>
        <Thread/>

      </Channel>
        

      </Chat>
    </>
  );
}
