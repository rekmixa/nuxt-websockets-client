<template>
  <div>
    <h3>Chat</h3>
    <div v-for="(message, index) in loadedMessages" :key="index">
      {{ message }}
    </div>
    <div>
      <input v-model="message" placeholder="Enter message" />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'index',
  head: {
    title: 'Hello, World!',
  },
})
export default class extends Vue {
  websocket?: WebSocket
  message: string = ''

  loadedMessages: string[] = []

  mounted(): void {
    this.websocket = new WebSocket('ws://localhost:3005')

    this.websocket.onopen = () => {
      console.log('WebSocket connection open!')
    }

    this.websocket.onmessage = (event: any) => {
      console.log(event)
      const data = JSON.parse(event.data)

      if (data.event && data.event === 'newMessage') {
        this.loadedMessages.push(data.data.message)
      }
    }
  }

  sendMessage(): void {
    if (!this.websocket) {
      return
    }

    this.websocket.send(JSON.stringify({
      event: 'sendMessage',
      data: {
        message: this.message,
      }
    }))

    this.message = ''
  }
}
</script>
