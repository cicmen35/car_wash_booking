import { useEffect, useState } from 'react'

import { getContactMessages } from '../api/contactMessageApi'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import type { ContactMessageResponse } from '../types'

function formatCreatedAt(value: string): string {
  return new Intl.DateTimeFormat('sk', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function AdminContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessageResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadMessages() {
      try {
        const contactMessages = await getContactMessages()
        setMessages(contactMessages)
      } catch {
        setErrorMessage('Správy sa nepodarilo načítať.')
      } finally {
        setIsLoading(false)
      }
    }

    loadMessages()
  }, [])

  return (
    <main className="admin-contact-page">
      <section className="page-heading">
        <h1>Správy z formulára</h1>
      </section>

      {isLoading && <LoadingSpinner label="Načítavam správy..." />}
      <ErrorMessage message={errorMessage} />

      {!isLoading && !errorMessage && messages.length === 0 && (
        <p>Zatiaľ neboli odoslané žiadne správy.</p>
      )}

      {!isLoading && !errorMessage && messages.length > 0 && (
        <div className="contact-message-list">
          {messages.map((message) => (
            <article className="contact-message-card" key={message.id}>
              <div>
                <h2>{message.name}</h2>
                <p>{formatCreatedAt(message.createdAt)}</p>
              </div>

              <dl>
                <div>
                  <dt>Telefón</dt>
                  <p>{message.phone}</p>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${message.email}`}>{message.email}</a>
                  </dd>
                </div>
                <div className="full-width">
                  <dt>Správa</dt>
                  <p>{message.message || 'Bez správy.'}</p>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}

export default AdminContactMessagesPage
