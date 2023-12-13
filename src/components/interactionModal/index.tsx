import { MessageSquare } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useToast } from '../ui/use-toast'

export function InteractionModalButton() {
  const [DM, setDM] = useState('')

  const { toast } = useToast()

  const ToastText = () => {
    return (
      <div>
        <p className="text-center">Sent your message!.</p>
        <p className="text-center">Friday, February 10, 2023 at 5:57 PM</p>
      </div>
    )
  }

  function sendMessage() {
    if (!DM) {
      return
    }

    console.log(DM)
    setDM('')
    toast({
      title: 'Message sent!',
      description: 'Keep an eye on your inbox for a response',
    })
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="grid h-14 w-14 place-content-center rounded-full border-2 border-white p-2">
          <MessageSquare color="white" />
        </div>
      </DialogTrigger>
      <DialogContent className="rounded-lg">
        <div className="space-y-4">
          <p className="text-center">Send private message</p>
          <textarea
            value={DM}
            onChange={(e) => setDM(e.target.value)}
            placeholder="Message"
            rows={4}
            className="w-full rounded-lg border p-2"
          ></textarea>
          <DialogTrigger>
            <Button disabled={!DM} onClick={sendMessage} className="w-full">
              Send
            </Button>
          </DialogTrigger>
          <p className="text-center text-sm">Click send when done typing your message</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
