"use client"
import { UserButton } from "@clerk/nextjs";
import { StreamChat} from "stream-chat";
import {Channel, ChannelHeader, Chat, MessageInput, MessageList, Thread, Window} from "stream-chat-react"


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
  return (
    <>
      <Chat client={chatClient}>
      <Channel channel={channel}>
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
